import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class cadegoriesForeignKey1585561665488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'categories',
      new TableForeignKey({
        name: 'FK_parent_category_id_id',
        columnNames: ['parent_category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('categories', 'FK_parent_category_id_id');
  }
}
