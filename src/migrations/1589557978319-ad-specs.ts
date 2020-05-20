import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class adSpecs1589557978319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'ad_specs',
        foreignKeys: [
          {
            name: 'FK_ad_specs_ad_id',
            columnNames: ['ad_id'],
            referencedTableName: 'ads',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [{ name: 'IX_ad_specs_ad_id', columnNames: ['ad_id'] }],
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ad_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ad_specs');
  }
}
