import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSentenceAndExpressionTables1748064900000 implements MigrationInterface {
    name = 'CreateSentenceAndExpressionTables1748064900000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // sentences 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sentences" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "source_id" uuid NOT NULL,
                "original_text" text NOT NULL,
                "korean_translation" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_c4d382d21d25e0e63b9a6a3e777" PRIMARY KEY ("id")
            )
        `);

        // expressions 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "expressions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "expression_text" character varying NOT NULL,
                "korean_meaning" text NOT NULL,
                "usage_context" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_a8efd5b4a9ed9cbabf992c26d77" UNIQUE ("expression_text"),
                CONSTRAINT "PK_3b7f74637babfa026b32b9ed230" PRIMARY KEY ("id")
            )
        `);

        // 외래 키 제약조건 추가
        await queryRunner.query(`
            ALTER TABLE "sentences" ADD CONSTRAINT "FK_sentences_sources"
            FOREIGN KEY ("source_id") REFERENCES "sources"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 외래 키 제약조건 삭제
        await queryRunner.query(`ALTER TABLE "sentences" DROP CONSTRAINT IF EXISTS "FK_sentences_sources"`);
        
        // 테이블 삭제
        await queryRunner.query(`DROP TABLE IF EXISTS "sentences"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "expressions"`);
    }
} 