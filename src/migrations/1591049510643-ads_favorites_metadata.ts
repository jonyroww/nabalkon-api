import { MigrationInterface, QueryRunner } from 'typeorm';

export class adsFavoritesMetadata1591049510643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE VIEW ads_favorites_metadata AS SELECT ads.id AS ad_id, count(favorite_ads.ad_id) AS count_favorite_ads
      FROM ads LEFT JOIN favorite_ads ON ads.id = favorite_ads.ad_id
      GROUP BY ads.id`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP VIEW "ads_favorites_metadata"`);
  }
}
