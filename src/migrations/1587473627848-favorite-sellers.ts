import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class favoriteSellers1587473627848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'favorite_sellers',
        foreignKeys: [
          {
            name: 'FK_favorite_sellers_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_favorite_sellers_seller_id',
            columnNames: ['seller_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { name: 'IX_favorite_sellers_user_id', columnNames: ['user_id'] },
          { name: 'IX_favorite_sellers_seller_id', columnNames: ['seller_id'] },
        ],
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'seller_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('favorite_sellers');
  }
}
