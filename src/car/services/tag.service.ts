import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { TagEntity } from 'src/car/entities/tag.entity';

export class TagService {
  constructor(readonly repository: Repository<TagEntity>) {}

  async findOne(id: string) {
    try {
      const tag = await this.repository.query(
        `SELECT * FROM tag_entity WHERE id = $1`,
        [id],
      );

      return tag[0];
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    const tags = await this.repository.query(`SELECT * FROM tag_entity`);

    return tags;
  }

  async create(tag: TagEntity) {
    await this.repository.save(tag);
    return 'ok';
  }

  async update(id: string, tag: Partial<TagEntity>) {
    await this.repository.update(id, tag);
    return 'ok';
  }

  async delete(id: string) {
    await this.repository.delete(id);

    return 'ok';
  }
}
