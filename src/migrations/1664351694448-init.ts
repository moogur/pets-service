import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664351694448 implements MigrationInterface {
    name = 'init1664351694448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pets_gender_enum" AS ENUM('MALE', 'FEMALE')`);
        await queryRunner.query(`CREATE TYPE "public"."pets_animal_type_enum" AS ENUM('CAT', 'DOG')`);
        await queryRunner.query(`CREATE TABLE "pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_date" integer NOT NULL, "updated_date" integer, "user_id_for_create" uuid NOT NULL, "user_ids_for_view" uuid array NOT NULL DEFAULT '{}', "gender" "public"."pets_gender_enum" NOT NULL, "birth_date" integer NOT NULL, "animal_type" "public"."pets_animal_type_enum" NOT NULL, "breeder" character varying(30) NOT NULL, "name" character varying(30) NOT NULL, "color" character varying(30) NOT NULL, "signs" character varying(5000), "description" character varying(15000), CONSTRAINT "PK_d01e9e7b4ada753c826720bee8b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pets"`);
        await queryRunner.query(`DROP TYPE "public"."pets_animal_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."pets_gender_enum"`);
    }

}
