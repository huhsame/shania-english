import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSourceTable1748064800000 implements MigrationInterface {
    name = 'CreateSourceTable1748064800000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // content_type enum 생성
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'sources_content_type_enum'
                ) THEN
                    CREATE TYPE "public"."sources_content_type_enum" AS ENUM('webpage', 'youtube', 'text');
                END IF;
            END $$;
        `);

        // sources 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sources" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "url" character varying NOT NULL,
                "title" character varying NOT NULL,
                "content_type" "public"."sources_content_type_enum" NOT NULL,
                "processed_at" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e373cb45301c4e04c3df128f5a6" UNIQUE ("url"),
                CONSTRAINT "PK_8d2a338591eef548145a6bd81bd" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // sources 테이블 삭제
        await queryRunner.query(`DROP TABLE IF EXISTS "sources"`);
        
        // content_type enum 타입 삭제
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."sources_content_type_enum"`);
    }
} 