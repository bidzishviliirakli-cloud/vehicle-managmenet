import { Repository } from 'typeorm';
import { CommonEntity } from '../entities/common.entity';

export class CommonService<Entity extends CommonEntity> {
  constructor(readonly repository: Repository<Entity>) {}

  async findOne(id: string) {
    try {
    } catch (error) {}
  }
  async findAll() {}
  async create() {}
  async update() {}
  async delete() {}
}
