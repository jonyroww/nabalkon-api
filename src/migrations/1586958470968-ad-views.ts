import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class adViews1586958470968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "ad_views",
        foreignKeys: [
          {
            name: "FK_ad_views_ad_id",
            columnNames: ["ad_id"],
            referencedTableName: "ads",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            name: "FK_ad_views_user_id",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()",
          },
          {
            name: "ad_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("ad_views");
  }
}
