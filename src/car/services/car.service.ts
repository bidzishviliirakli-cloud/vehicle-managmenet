import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateCarDto } from "src/admin/dto/createCar.dto";
import { CarEntity } from "src/car/entities/car.entity";
import { RepositoryService } from "src/common/services/repository.service";
import { PaginationDto } from "src/common/dto/Pagination.dto";

import { CarImageEntity } from "../entities/carImage.entity";
import { CarTagEntity } from "../entities/carTag.entity";
import { CarFilterDto } from "../dto/CarFilter.dto";
import { CarSortDto } from "../dto/CarSort.dto";
import { CarTagService } from "./carTag.service";
import { CarImageService } from "./carImage.service";

export class CarService extends RepositoryService<CarEntity> {
	constructor(
		@InjectRepository(CarEntity)
		readonly carRepository: Repository<CarEntity>,
		private carImageService: CarImageService,
		private carTagService: CarTagService
	) {
		super(carRepository);
	}

	async findAvailable(paginationDto: PaginationDto, filterDto: CarFilterDto, sortDto: CarSortDto) {
		try {
			const query = `SELECT 
                            car.id,
                            car."plateNumber",
                            car."isAvailable",
                            car.latitude,
                            car.longitude,
                            category.title AS category,
                            category.description,

                            (
                                SELECT COALESCE(json_agg(image.url), '[]')
                                FROM car_image_entity image
                                WHERE image."carId" = car.id
                            ) AS images,

                            (
                                SELECT COALESCE(json_agg(tag.title), '[]')
                                FROM car_tag_entity ct
                                JOIN tag_entity tag ON tag.id = ct."tagId"
                                WHERE ct."carId" = car.id
                            ) AS tags

                            FROM car_entity car

                            LEFT JOIN category_entity category
                            ON car."categoryId" = category.id`;

			return await this.collect({ query, paginationDto, filterDto, sortDto });
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async findByCategory() {
		try {
			const query = `SELECT
                                category.id AS "categoryId",
                                category.title AS "category",
                                category.description,

                                COUNT(car.id) AS "totalCars",

                                COALESCE(
                                    json_agg(
                                        json_build_object(
                                            'id', car.id,
                                            'plateNumber', car."plateNumber",
                                            'isAvailable', car."isAvailable",
                                            'latitude', car.latitude,
                                            'longitude', car.longitude,
                                            'images',
                                                (
                                                    SELECT COALESCE(json_agg(image.url), '[]')
                                                    FROM car_image_entity image
                                                    WHERE image."carId" = car.id
                                                ),
                                            'tags',
                                                (
                                                    SELECT COALESCE(json_agg(tag.title), '[]')
                                                    FROM car_tag_entity ct
                                                    JOIN tag_entity tag ON tag.id = ct."tagId"
                                                    WHERE ct."carId" = car.id
                                                )
                                        )
                                    ) FILTER (WHERE car.id IS NOT NULL),
                                    '[]'
                                ) AS cars

                            FROM category_entity category

                            LEFT JOIN car_entity car
                                ON car."categoryId" = category.id

                            GROUP BY category.id, category.title, category.description
                            ORDER BY category.title`;

			return await this.collect({ query });
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async save(createCarDto: CreateCarDto) {
		const car = await this.create(createCarDto);
		if (car) {
			const media = createCarDto.media.split(",");
			const carImages = [] as DeepPartial<CarImageEntity>[];
			const carTags = [] as DeepPartial<CarTagEntity>[];

			for (let i = 0; i < media.length; i++) {
				carImages.push({ carId: car.id, url: media[i], isPrimary: false });
			}

			for (let i = 0; i < createCarDto.tag.length; i++) {
				carTags.push({ carId: car.id, tagId: createCarDto.tag[i] });
			}

			await this.carImageService.bulkInsert(carImages);
			await this.carTagService.bulkInsert(carTags);
		}
	}
}
