import { Column, Entity, ManyToOne } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';
import { CarEntity } from './car.entity';

@Entity()
export class CarImageEntity extends CommonEntity {
  @Column()
  @ManyToOne(() => CarEntity, (car) => car.id)
  carId: string;

  @Column()
  url: string;

  @Column()
  isPrimary: boolean;
}
