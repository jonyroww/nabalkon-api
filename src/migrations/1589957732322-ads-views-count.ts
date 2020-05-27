import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class adsViewsCount1589957732322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'ads',
      new TableColumn({
        name: 'views_count',
        type: 'int',
        isNullable: false,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('ads', 'views_count');
  }
}
