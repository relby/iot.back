import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1682119129525 implements MigrationInterface {
    name = 'Initial1682119129525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metrics" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "meter_serial" character(8) NOT NULL, CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meters" ("serial" character(8) NOT NULL, "description" text, "last_time_paid" TIMESTAMP, CONSTRAINT "PK_adb41db373405315c4d7ae7cac9" PRIMARY KEY ("serial"))`);
        await queryRunner.query(`ALTER TABLE "metrics" ADD CONSTRAINT "FK_c5b6536a14fc8ed4e2add25aa36" FOREIGN KEY ("meter_serial") REFERENCES "meters"("serial") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metrics" DROP CONSTRAINT "FK_c5b6536a14fc8ed4e2add25aa36"`);
        await queryRunner.query(`DROP TABLE "meters"`);
        await queryRunner.query(`DROP TABLE "metrics"`);
    }

}
