import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntitiesWithSoftDeleteAndGeneratedAt1748065200000 implements MigrationInterface {
    name = 'UpdateEntitiesWithSoftDeleteAndGeneratedAt1748065200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Generated_pdfs 테이블에 generated_at 필드 추가
        await queryRunner.query(`
            ALTER TABLE "generated_pdfs" ADD COLUMN IF NOT EXISTS "generated_at" TIMESTAMP
        `);

        // 2. pdf_downloads_download_type_enum에 'web' 값 추가
        await queryRunner.query(`
            ALTER TYPE "public"."pdf_downloads_download_type_enum" ADD VALUE IF NOT EXISTS 'web'
        `);

        // 3. 외래 키 관계 수정 (user 관련 FK를 SET NULL로 변경)
        
        // 먼저 기존 제약 조건 삭제
        await queryRunner.query(`ALTER TABLE "user_examples" DROP CONSTRAINT IF EXISTS "FK_user_examples_users"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks" DROP CONSTRAINT IF EXISTS "FK_user_bookmarks_users"`);
        await queryRunner.query(`ALTER TABLE "generated_pdfs" DROP CONSTRAINT IF EXISTS "FK_generated_pdfs_users"`);
        await queryRunner.query(`ALTER TABLE "pdf_downloads" DROP CONSTRAINT IF EXISTS "FK_pdf_downloads_users"`);

        // 새로운 제약 조건 추가 (SET NULL로 변경)
        await queryRunner.query(`
            ALTER TABLE "user_examples" ADD CONSTRAINT "FK_user_examples_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "user_bookmarks" ADD CONSTRAINT "FK_user_bookmarks_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "generated_pdfs" ADD CONSTRAINT "FK_generated_pdfs_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "pdf_downloads" ADD CONSTRAINT "FK_pdf_downloads_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. 외래 키 관계 복원 (CASCADE로 원복)
        
        // 먼저 기존 제약 조건 삭제
        await queryRunner.query(`ALTER TABLE "user_examples" DROP CONSTRAINT IF EXISTS "FK_user_examples_users"`);
        await queryRunner.query(`ALTER TABLE "user_bookmarks" DROP CONSTRAINT IF EXISTS "FK_user_bookmarks_users"`);
        await queryRunner.query(`ALTER TABLE "generated_pdfs" DROP CONSTRAINT IF EXISTS "FK_generated_pdfs_users"`);
        await queryRunner.query(`ALTER TABLE "pdf_downloads" DROP CONSTRAINT IF EXISTS "FK_pdf_downloads_users"`);

        // 이전 제약 조건 추가 (CASCADE로 변경)
        await queryRunner.query(`
            ALTER TABLE "user_examples" ADD CONSTRAINT "FK_user_examples_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "user_bookmarks" ADD CONSTRAINT "FK_user_bookmarks_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
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

        // 2. Generated_pdfs 테이블에서 generated_at 필드 제거
        await queryRunner.query(`
            ALTER TABLE "generated_pdfs" DROP COLUMN IF EXISTS "generated_at"
        `);

        // 3. Enum 타입은 PostgreSQL에서 값 제거가 복잡하므로 생략 (값 추가만 하고 제거는 안함)
    }
} 