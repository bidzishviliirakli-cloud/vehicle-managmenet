import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771520502208 implements MigrationInterface {
    name = 'Migration1771520502208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "UQ_e5886df1ff081af2de2d8013669" UNIQUE ("title"), CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "fullName" character varying NOT NULL, "password" character varying NOT NULL, "roleId" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_c0d8c28a9011614a0b79581161f" UNIQUE ("fullName"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "UQ_46718e5603c448db27e66371d17" UNIQUE ("title"), CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_a342b9c2de14a2aaac0ab778fe6" UNIQUE ("title"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_tag_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carId" character varying NOT NULL, "tagId" character varying NOT NULL, CONSTRAINT "UQ_85dd92a9727f90cd34980985604" UNIQUE ("carId"), CONSTRAINT "UQ_c44da820f2dc01e1bbb848a2c0b" UNIQUE ("tagId"), CONSTRAINT "PK_d01469647fede0f6916d03bc8f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "plateNumber" character varying NOT NULL, "isAvailable" boolean NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "categoryId" character varying NOT NULL, CONSTRAINT "UQ_f7919998740d2abb8fdc08e0a96" UNIQUE ("plateNumber"), CONSTRAINT "PK_4a4479a27609fb0802a00c0d54f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_image_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carId" character varying NOT NULL, "url" character varying NOT NULL, "isPrimary" boolean NOT NULL, "carIdId" uuid, CONSTRAINT "PK_435b2f340689a610ce13e9fdb73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_image_entity" ADD CONSTRAINT "FK_65c89e0dce544e11def015a7b83" FOREIGN KEY ("carIdId") REFERENCES "car_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_image_entity" DROP CONSTRAINT "FK_65c89e0dce544e11def015a7b83"`);
        await queryRunner.query(`DROP TABLE "car_image_entity"`);
        await queryRunner.query(`DROP TABLE "car_entity"`);
        await queryRunner.query(`DROP TABLE "car_tag_entity"`);
        await queryRunner.query(`DROP TABLE "category_entity"`);
        await queryRunner.query(`DROP TABLE "tag_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
