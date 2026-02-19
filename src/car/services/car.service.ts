import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { CarEntity } from 'src/car/entities/car.entity';

export class CarService {
  constructor(readonly repository: Repository<CarEntity>) {}

  async findOne(id: string) {
    try {
      const car = await this.repository.query(
        `SELECT * FROM car_entity WHERE id = $1`,
        [id],
      );

      return car[0];
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    const cars = await this.repository.query(`SELECT * FROM car_entity`);

    return cars;
  }

  async create(car: CarEntity) {
    await this.repository.save(car);
    return 'ok';
  }

  async update(id: string, car: Partial<CarEntity>) {
    await this.repository.update(id, car);
    return 'ok';
  }

  async delete(id: string) {
    await this.repository.delete(id);

    return 'ok';
  }
}
