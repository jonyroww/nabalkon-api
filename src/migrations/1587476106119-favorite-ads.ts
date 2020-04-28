import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class favoriteAds1587476106119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'favorite_ads',
        foreignKeys: [
          {
            name: 'FK_favorite_ads_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_favorite_ads_ad_id',
            columnNames: ['ad_id'],
            referencedTableName: 'ads',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_favorite_ads_group_id',
            columnNames: ['group_id'],
            referencedTableName: 'favorite_ads_groups',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { name: 'IX_favorite_ads_user_id', columnNames: ['user_id'] },
          { name: 'IX_favorite_ads_ad_id', columnNames: ['ad_id'] },
          { name: 'IX_favorite_ads_group_id', columnNames: ['group_id'] },
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
            name: 'ad_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'group_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('favorite_ads');
  }
}
