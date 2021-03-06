import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class userBasketAds1587120854628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user_basket_ads',
        foreignKeys: [
          {
            name: 'FK_user_basket_ads_users_user_id',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            name: 'FK_user_basket_ads_ads_ad_id',
            columnNames: ['ad_id'],
            referencedTableName: 'ads',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { name: 'IX_user_basket_ads_user_id', columnNames: ['user_id'] },
          { name: 'IX_user_basket_ads_ad_id', columnNames: ['ad_id'] },
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
            name: 'user_id',
            type: 'int',
            isNullable: false,
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
    await queryRunner.dropTable('user_basket_ads');
  }
}
