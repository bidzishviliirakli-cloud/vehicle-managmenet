import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class CarTagEntity extends CommonEntity {
  @Column({ unique: true })
  carId: string;

  @Column({ unique: true })
  tagId: string;
}
