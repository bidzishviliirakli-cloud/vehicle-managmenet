import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771752650926 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Insert categories
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
		await queryRunner.query(`DELETE FROM car_tag_entity`);
		await queryRunner.query(`DELETE FROM car_image_entity`);
		await queryRunner.query(`DELETE FROM car_entity`);
		await queryRunner.query(`DELETE FROM tag_entity`);
		await queryRunner.query(`DELETE FROM category_entity`);
	}
}
