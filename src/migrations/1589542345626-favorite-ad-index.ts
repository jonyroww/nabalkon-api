import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class favoriteAdIndex1589542345626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      'favorite_ads',
      new TableIndex({
        columnNames: ['ad_id', 'user_id'],
        isUnique: true,
        name: 'UQ_favorite_ads__ad_id__user_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex(
      'favorite_ads',
      'UQ_favorite_ads__ad_id__user_id',
    );
  }
}
