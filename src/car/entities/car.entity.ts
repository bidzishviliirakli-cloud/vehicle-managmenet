import { Column, Entity, OneToOne } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';
import { CategoryEntity } from './category.entity';

@Entity()
export class CarEntity extends CommonEntity {
  @Column({ unique: true })
  plateNumber: string;

  @Column()
  isAvailable: boolean;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  @OneToOne(() => CategoryEntity, (category) => category.id)
  categoryId: string;
}
