import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class foreignKeyUserId1586348301547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      "phone_verifications",
      new TableForeignKey({
        name: "FK_phone_verifications_user_id",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      "phone_verifications",
      "FK_phone_verifications_user_id"
    );
  }
}
