import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationTables1748065000000 implements MigrationInterface {
    name = 'CreateRelationTables1748065000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // sentence_expressions 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "sentence_expressions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "sentence_id" uuid NOT NULL,
                "expression_id" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_dc4934e5b2e54d4cdf4173d8b9d" PRIMARY KEY ("id")
            )
        `);

        // sentence_expressions 복합 인덱스 생성
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_sentence_expression" ON "sentence_expressions" ("sentence_id", "expression_id")
        `);

        // default_examples 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "default_examples" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "expression_id" uuid NOT NULL,
                "example_text" text NOT NULL,
                "korean_translation" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_77c0a7a9d15e3a60141bc65f1d9" PRIMARY KEY ("id")
            )
        `);

        // user_examples 테이블 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_examples" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "expression_id" uuid NOT NULL,
                "example_text" text NOT NULL,
                "korean_translation" text,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6d05f8e81353f8a24a68f2e5520" PRIMARY KEY ("id")
            )
        `);

        // 외래 키 제약조건 추가
        await queryRunner.query(`
            ALTER TABLE "sentence_expressions" ADD CONSTRAINT "FK_sentence_expressions_sentences"
            FOREIGN KEY ("sentence_id") REFERENCES "sentences"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "sentence_expressions" ADD CONSTRAINT "FK_sentence_expressions_expressions"
            FOREIGN KEY ("expression_id") REFERENCES "expressions"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "default_examples" ADD CONSTRAINT "FK_default_examples_expressions"
            FOREIGN KEY ("expression_id") REFERENCES "expressions"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "user_examples" ADD CONSTRAINT "FK_user_examples_users"
            FOREIGN KEY ("user_id") REFERENCES "users"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "user_examples" ADD CONSTRAINT "FK_user_examples_expressions"
            FOREIGN KEY ("expression_id") REFERENCES "expressions"("id")
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 외래 키 제약조건 삭제
        await queryRunner.query(`ALTER TABLE "user_examples" DROP CONSTRAINT IF EXISTS "FK_user_examples_expressions"`);
        await queryRunner.query(`ALTER TABLE "user_examples" DROP CONSTRAINT IF EXISTS "FK_user_examples_users"`);
        await queryRunner.query(`ALTER TABLE "default_examples" DROP CONSTRAINT IF EXISTS "FK_default_examples_expressions"`);
        await queryRunner.query(`ALTER TABLE "sentence_expressions" DROP CONSTRAINT IF EXISTS "FK_sentence_expressions_expressions"`);
        await queryRunner.query(`ALTER TABLE "sentence_expressions" DROP CONSTRAINT IF EXISTS "FK_sentence_expressions_sentences"`);
        
        // 인덱스 삭제
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_sentence_expression"`);
        
        // 테이블 삭제
        await queryRunner.query(`DROP TABLE IF EXISTS "user_examples"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "default_examples"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "sentence_expressions"`);
    }
} 