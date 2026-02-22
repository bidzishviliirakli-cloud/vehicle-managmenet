import { Exclude } from "class-transformer";
import { Column, Entity, OneToOne } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";
import { RoleEntity } from "./role.entity";

@Entity()
export class UserEntity extends BaseEntity {
	@Column({ unique: true })
	readonly email: string;

	@Column({ unique: true })
	readonly fullName: string;

	@Column()
	@Exclude()
	readonly password: string;

	@Column("uuid")
	@OneToOne(() => RoleEntity, (role) => role.id)
	readonly roleId: string;

	@Column()
	readonly active: boolean;
}
