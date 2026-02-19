import { Column, Entity } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class RoleEntity extends CommonEntity {
  @Column({ unique: true })
  readonly title: string;
}
