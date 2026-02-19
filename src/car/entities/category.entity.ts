import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class CategoryEntity extends CommonEntity {
  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;
}
