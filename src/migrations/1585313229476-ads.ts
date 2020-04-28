import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { IsDecimal } from 'class-validator';

export class ads1585313229476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'ads',
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
            name: 'updated_at',
            type: 'timestamp without time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp without time zone',
            isNullable: true,
            default: null,
          },
          {
            name: 'active_until',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state_description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal(10, 2)',
            isNullable: true,
          },
          {
            name: 'transfer_mode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deal_address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deal_coordinates',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'contact_email',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'contact_phone',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'contact_call_time_start',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contact_call_time_end',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contact_can_call_rdc',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'contact_no_matter',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('ads');
  }
}
