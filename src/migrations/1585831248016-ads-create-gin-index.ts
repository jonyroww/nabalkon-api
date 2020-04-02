import { MigrationInterface, QueryRunner } from "typeorm";

export class adsCreateGinIndex1585831248016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
      CREATE INDEX "IX_ads__title"
      ON "ads"
      USING GIN (to_tsvector('simple', "title"));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("ads", "IX_ads__title");
  }
}
