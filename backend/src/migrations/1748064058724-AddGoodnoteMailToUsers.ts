import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoodnoteMailToUsers1748064058724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "goodnote_mail" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "goodnote_mail"`);
    }

}
