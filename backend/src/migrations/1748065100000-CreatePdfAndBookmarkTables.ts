import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePdfAndBookmarkTables1748065100000 implements MigrationInterface {
    name = 'CreatePdfAndBookmarkTables1748065100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // user_bookmarks 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_bookmarks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "expression_id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f6d31f58d89140012557c83275f" PRIMARY KEY ("id")
            )
        `);

        // user_bookmarks 복합 인덱스 생성
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_expression_bookmark" ON "user_bookmarks" ("user_id", "expression_id")
        `);

        // PDF 유형 enum 생성
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'generated_pdfs_pdf_type_enum'
                ) THEN
                    CREATE TYPE "public"."generated_pdfs_pdf_type_enum" AS ENUM('common', 'personalized');
                END IF;
            END $$;
        `);

        // 생성 상태 enum 생성
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'generated_pdfs_generation_status_enum'
                ) THEN
                    CREATE TYPE "public"."generated_pdfs_generation_status_enum" AS ENUM('processing', 'completed', 'failed');
                END IF;
            END $$;
        `);

        // generated_pdfs 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "generated_pdfs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source_id" uuid NOT NULL,
                "user_id" uuid,
                "pdf_type" "public"."generated_pdfs_pdf_type_enum" NOT NULL,
                "file_path" character varying NOT NULL,
                "file_size" bigint NOT NULL,
                "generation_status" "public"."generated_pdfs_generation_status_enum" NOT NULL DEFAULT 'processing',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_ed9c55d9103e5c54e12f21bb78d" PRIMARY KEY ("id")
            )
        `);

        // generated_pdfs 인덱스 생성
        await queryRunner.query(`
            CREATE INDEX "IDX_source_user" ON "generated_pdfs" ("source_id", "user_id")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_source_pdf_type" ON "generated_pdfs" ("source_id", "pdf_type")
        `);

        // 다운로드 유형 enum 생성
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'pdf_downloads_download_type_enum'
                ) THEN
                    CREATE TYPE "public"."pdf_downloads_download_type_enum" AS ENUM('email', 'goodnote');
                END IF;
            END $$;
        `);

        // pdf_downloads 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "pdf_downloads" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "pdf_id" uuid NOT NULL,
                "download_type" "public"."pdf_downloads_download_type_enum" NOT NULL,
                "downloaded_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_37a3ec40ff5d29e79a2bcaef3c5" PRIMARY KEY ("id")
            )
        `);

        // 외래 키 제약조건 추가
        await queryRunner.query(`
            ALTER TABLE "user_bookmarks" ADD CONSTRAINT "FK_user_bookmarks_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "user_bookmarks" ADD CONSTRAINT "FK_user_bookmarks_expressions"
            FOREIGN KEY ("expression_id") REFERENCES "expressions"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "generated_pdfs" ADD CONSTRAINT "FK_generated_pdfs_sources"
            FOREIGN KEY ("source_id") REFERENCES "sources"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "generated_pdfs" ADD CONSTRAINT "FK_generated_pdfs_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "pdf_downloads" ADD CONSTRAINT "FK_pdf_downloads_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "pdf_downloads" ADD CONSTRAINT "FK_pdf_downloads_generated_pdfs"
            FOREIGN KEY ("pdf_id") REFERENCES "generated_pdfs"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 외래 키 제약조건 삭제
        await queryRunner.query(`ALTER TABLE "pdf_downloads" DROP CONSTRAINT IF EXISTS "FK_pdf_downloads_generated_pdfs"`);
        await queryRunner.query(`ALTER TABLE "pdf_downloads" DROP CONSTRAINT IF EXISTS "FK_pdf_downloads_users"`);
        await queryRunner.query(`ALTER TABLE "generated_pdfs" DROP CONSTRAINT IF EXISTS "FK_generated_pdfs_users"`);
        await queryRunner.query(`ALTER TABLE "generated_pdfs" DROP CONSTRAINT IF EXISTS "FK_generated_pdfs_sources"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks" DROP CONSTRAINT IF EXISTS "FK_user_bookmarks_expressions"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks" DROP CONSTRAINT IF EXISTS "FK_user_bookmarks_users"`);
        
        // 인덱스 삭제
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_source_pdf_type"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_source_user"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_expression_bookmark"`);
        
        // 테이블 삭제
        await queryRunner.query(`DROP TABLE IF EXISTS "pdf_downloads"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "generated_pdfs"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "user_bookmarks"`);
        
        // enum 타입 삭제
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."pdf_downloads_download_type_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."generated_pdfs_generation_status_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."generated_pdfs_pdf_type_enum"`);
    }
} 