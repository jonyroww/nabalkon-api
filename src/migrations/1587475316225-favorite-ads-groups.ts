import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class favoriteAdsGroups1587475316225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "favorite_ads_groups",
        foreignKeys: [
          {
            name: "FK_favorite_ads_groups_user_id",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        indices: [
          { name: "IX_favorite_ads_groups_user_id", columnNames: ["user_id"] },
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
            name: "title",
            type: "varchar",
            isNullable: true,
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
    await queryRunner.dropTable("favorite_ads_groups");
  }
}
