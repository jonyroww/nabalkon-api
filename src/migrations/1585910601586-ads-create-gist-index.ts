import { MigrationInterface, QueryRunner } from "typeorm";

export class adsCreateGistIndex1585910601586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IX_ads__title" CASCADE;`);
    await queryRunner.query(`CREATE INDEX "IX_ads__title" ON ads USING GIST (
        (
          title
        )
        gist_trgm_ops
      );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IX_ads__title" CASCADE;`);
  }
}
