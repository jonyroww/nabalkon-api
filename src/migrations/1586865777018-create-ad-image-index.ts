import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class createAdImageIndex1586865777018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createIndex(
      'ad_images',
      new TableIndex({ name: 'IX_ad_image_ad_id', columnNames: ['ad_id'] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex('ad_images', 'IX_ad_image_ad_id');
  }
}
