import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class createIndexAdId1587050676134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      "ad_views",
      new TableIndex({ name: "IX_ad_views_ad_id", columnNames: ["ad_id"] })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("ad_views", "IX_ad_views_ad_id");
  }
}
