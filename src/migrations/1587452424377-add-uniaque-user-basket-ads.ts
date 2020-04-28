import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUniaqueUserBasketAds1587452424377
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_basket_ads" ADD CONSTRAINT "UQ_user_basket_ads_user_id" UNIQUE (user_id)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_basket_ads" ADD CONSTRAINT "UQ_user_basket_ads_ad_id" UNIQUE (ad_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_basket_ads" DROP CONSTRAINT "UQ_user_basket_ads_user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_basket_ads" DROP CONSTRAINT "UQ_user_basket_ads_ad_id"`,
    );
  }
}
