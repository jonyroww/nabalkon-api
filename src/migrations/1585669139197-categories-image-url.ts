import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class categoriesImageUrl1585669139197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'categories',
      new TableColumn({ name: 'image_url', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('categories', 'image_url');
  }
}
