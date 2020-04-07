import { MigrationInterface, QueryRunner } from "typeorm";

export class usersSetNotNull1586255338469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "full_name" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "full_name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL`
    );
  }
}
