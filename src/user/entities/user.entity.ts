import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';

import { CommonEntity } from 'src/common/entities/common.entity';
import { RoleEntity } from './role.entity';

@Entity()
export class UserEntity extends CommonEntity {
  @Column({ unique: true })
  readonly email: string;

  @Column({ unique: true })
  readonly fullName: string;

  @Column()
  @Exclude()
  readonly password: string;

  @Column()
  @OneToOne(() => RoleEntity, (role) => role.id)
  readonly roleId: string;

  @Column()
  readonly active: boolean;
}
