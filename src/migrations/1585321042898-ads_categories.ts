import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class adsCategories1585321042898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'ads_categories',
        foreignKeys: [
          {
            columnNames: ['ad_id'],
            referencedTableName: 'ads',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['category_id'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        columns: [
          {
            name: 'ad_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'category_id',
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ads_categories');
  }
}
