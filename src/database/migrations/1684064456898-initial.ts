import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684064456898 implements MigrationInterface {
    name = 'Initial1684064456898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "metrics" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "meter_serial" character(8) NOT NULL, CONSTRAINT "PK_5283cad666a83376e28a715bf0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" BIGSERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "meter_serial" character(8) NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meters" ("serial" character(8) NOT NULL, "description" text, CONSTRAINT "PK_adb41db373405315c4d7ae7cac9" PRIMARY KEY ("serial"))`);
        await queryRunner.query(`ALTER TABLE "metrics" ADD CONSTRAINT "FK_c5b6536a14fc8ed4e2add25aa36" FOREIGN KEY ("meter_serial") REFERENCES "meters"("serial") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_538a0deae7db6bc515ae1a331c1" FOREIGN KEY ("meter_serial") REFERENCES "meters"("serial") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_538a0deae7db6bc515ae1a331c1"`);
        await queryRunner.query(`ALTER TABLE "metrics" DROP CONSTRAINT "FK_c5b6536a14fc8ed4e2add25aa36"`);
        await queryRunner.query(`DROP TABLE "meters"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "metrics"`);
    }

}
