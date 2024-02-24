import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsRefactor1708704610707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "comment" TO "note"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "note" TO "comment"`,
    );
  }
}
