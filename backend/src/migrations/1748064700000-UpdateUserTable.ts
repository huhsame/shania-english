import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1748064700000 implements MigrationInterface {
    name = 'UpdateUserTable1748064700000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 테이블 이름 변경: user -> users (필요한 경우)
        await queryRunner.query(`ALTER TABLE IF EXISTS "user" RENAME TO "users"`);

        // 이미 테이블이 존재하는지 확인하고, 존재하지 않으면 생성
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "googleId" character varying UNIQUE,
                "email" character varying NOT NULL UNIQUE,
                "name" character varying NOT NULL,
                "picture" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

        // goodnote_mail 필드 추가 (이미 존재하지 않는 경우에만)
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='users' AND column_name='goodnote_mail'
                ) THEN
                    ALTER TABLE "users" ADD "goodnote_mail" character varying;
                END IF;
            END $$;
        `);

        // user_type enum 생성 및 필드 추가
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_type WHERE typname = 'users_user_type_enum'
                ) THEN
                    CREATE TYPE "public"."users_user_type_enum" AS ENUM('free', 'starter', 'pro', 'expert');
                END IF;
            END $$;
        `);

        // user_type 필드 추가
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='users' AND column_name='user_type'
                ) THEN
                    ALTER TABLE "users" ADD "user_type" "public"."users_user_type_enum" NOT NULL DEFAULT 'free';
                END IF;
            END $$;
        `);

        // personalization_info 필드 추가
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name='users' AND column_name='personalization_info'
                ) THEN
                    ALTER TABLE "users" ADD "personalization_info" text;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // personalization_info 필드 제거
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "personalization_info"`);
        
        // user_type 필드 제거
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "user_type"`);
        
        // user_type enum 타입 제거
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_user_type_enum"`);
        
        // goodnote_mail 필드 제거
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "goodnote_mail"`);
    }
} 