import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class TagEntity extends CommonEntity {
  @Column({ unique: true })
  title: string;
}
