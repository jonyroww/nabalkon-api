import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  Table
} from "typeorm";

export class dropAdsCategories1585739753209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("ads_categories");
    await queryRunner.addColumn(
      "ads",
      new TableColumn({ name: "category_id", type: "int", isNullable: false })
    );
    await queryRunner.createForeignKey(
      "ads",
      new TableForeignKey({
        name: "FK_ads_category_id",
        columnNames: ["category_id"],
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "ads_categories",
        foreignKeys: [
          {
            columnNames: ["ad_id"],
            referencedTableName: "ads",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          },
          {
            columnNames: ["category_id"],
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
          }
        ],
        columns: [
          {
            name: "ad_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          },
          {
            name: "category_id",
            type: "int",
            isNullable: false,
            isPrimary: true
          }
        ]
      })
    );
    await queryRunner.dropColumn("ads", "category_id");
    await queryRunner.dropForeignKey("ads", "FK_ads_category_id");
  }
}
