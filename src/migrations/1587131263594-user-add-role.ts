import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class userAddRole1587131263594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'role', type: 'varchar', isNullable: false }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('users', 'role');
  }
}
