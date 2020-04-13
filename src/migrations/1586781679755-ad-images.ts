import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class adImages1586781679755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "ad_images",
        foreignKeys: [
          {
            columnNames: ["ad_id"],
            referencedTableName: "ads",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          }
        ],
        columns: [
          {
            name: "id",
            type: "int",
            isGenerated: true,
            isPrimary: true
          },
          {
            name: "created_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          },
          {
            name: "updated_at",
            type: "timestamp without time zone",
            isNullable: false,
            default: "NOW()"
          },
          {
            name: "deleted_at",
            type: "timestamp without time zone",
            isNullable: true,
            default: null
          },
          {
            name: "ad_id",
            type: "int",
            isNullable: false
          },
          {
            name: "image_url",
            type: "varchar",
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("ad_images");
  }
}
