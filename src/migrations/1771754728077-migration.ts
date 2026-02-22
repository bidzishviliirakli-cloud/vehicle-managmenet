import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771754728077 implements MigrationInterface {
	name = "Migration1771754728077";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "UQ_e5886df1ff081af2de2d8013669" UNIQUE ("title"), CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "fullName" character varying NOT NULL, "password" character varying NOT NULL, "roleId" uuid NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_c0d8c28a9011614a0b79581161f" UNIQUE ("fullName"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "tag_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, CONSTRAINT "UQ_46718e5603c448db27e66371d17" UNIQUE ("title"), CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "category_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_a342b9c2de14a2aaac0ab778fe6" UNIQUE ("title"), CONSTRAINT "PK_1a38b9007ed8afab85026703a53" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "car_tag_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "UQ_d0712937e786031a3a65010ee3c" UNIQUE ("carId", "tagId"), CONSTRAINT "PK_d01469647fede0f6916d03bc8f0" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "car_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "plateNumber" character varying NOT NULL, "isAvailable" boolean NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "UQ_f7919998740d2abb8fdc08e0a96" UNIQUE ("plateNumber"), CONSTRAINT "PK_4a4479a27609fb0802a00c0d54f" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "car_image_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "carId" uuid NOT NULL, "url" character varying NOT NULL, "isPrimary" boolean NOT NULL, "carIdId" uuid, CONSTRAINT "PK_435b2f340689a610ce13e9fdb73" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "car_image_entity" ADD CONSTRAINT "FK_65c89e0dce544e11def015a7b83" FOREIGN KEY ("carIdId") REFERENCES "car_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(`
      INSERT INTO category_entity (id, title, description)
      VALUES
        ('bab6c351-e03a-4e35-905e-6962495134ff', 'SUV', 'Sport Utility Vehicle'),
        ('5bdc2027-2ec5-4d21-b65c-9d3cba3f4e07', 'Sedan', 'Comfortable city car');
    `);

		// Insert tags
		await queryRunner.query(`
            INSERT INTO tag_entity (id, title)
            VALUES
                ('0ac831f0-5a7a-4c68-9ab5-691caf808a96', 'Luxury'),
                ('ddb5c283-3059-42f9-ad9f-780494284ac8', 'Economy'),
                ('d8cdc031-9f1c-410c-8285-42d5ff5c2898', 'Family');
            `);

		// Insert cars
		await queryRunner.query(`
            INSERT INTO car_entity (id, "plateNumber", "isAvailable", "categoryId", latitude, longitude)
            VALUES
                ('1af9538d-e10d-4bbb-832e-7abf3da4fdbe', 'AA-123-AA', true, 'bab6c351-e03a-4e35-905e-6962495134ff', 41.7151, 44.8271),
                ('63d382c5-3e19-46e7-bfa3-fa6dec8c2c06', 'BB-456-BB', true, '5bdc2027-2ec5-4d21-b65c-9d3cba3f4e07', 41.7200, 44.8200);
            `);

		// Insert car images
		await queryRunner.query(`
            INSERT INTO car_image_entity (id, url, "carId", "isPrimary")
            VALUES
                ('a05cbeac-95c9-4669-b1cf-ac8d6de86051', 'https://test.com/suv1.jpg', '1af9538d-e10d-4bbb-832e-7abf3da4fdbe', false),
                ('8b1ab3e7-6a87-4f36-acc9-69c84a0d1e26', 'https://test.com/sedan1.jpg', '63d382c5-3e19-46e7-bfa3-fa6dec8c2c06', false);
            `);

		// Insert car tags
		await queryRunner.query(`
            INSERT INTO car_tag_entity ("carId", "tagId")
            VALUES
                ('63d382c5-3e19-46e7-bfa3-fa6dec8c2c06', '0ac831f0-5a7a-4c68-9ab5-691caf808a96'),
                ('63d382c5-3e19-46e7-bfa3-fa6dec8c2c06', 'ddb5c283-3059-42f9-ad9f-780494284ac8'),
                ('1af9538d-e10d-4bbb-832e-7abf3da4fdbe', 'd8cdc031-9f1c-410c-8285-42d5ff5c2898');
            `);
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
