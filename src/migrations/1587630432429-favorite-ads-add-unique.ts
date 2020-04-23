import { MigrationInterface, QueryRunner } from "typeorm";

export class favoriteAdsAddUnique1587630432429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "favorite_ads" ADD CONSTRAINT "UQ_favorite_ads_user_id" UNIQUE (user_id)`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_ads" ADD CONSTRAINT "UQ_favorite_ads_ad_id" UNIQUE (ad_id)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "favorite_ads" DROP CONSTRAINT "UQ_favorite_ads_user_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_ads" DROP CONSTRAINT "UQ_favorite_ads_ad_id"`
    );
  }
}
