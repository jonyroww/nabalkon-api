import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class adsFavoritesMetadata1591049510643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE VIEW "ads_favorites_metadata" AS SELECT "ad_id", count("ad_id") AS "count_ad_favorites" FROM "favorite_ads" GROUP BY "ad_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP VIEW "ads_favorites_metadata"`);
  }
}
