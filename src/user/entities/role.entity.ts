import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class RoleEntity extends BaseEntity {
	@Column({ unique: true })
	readonly title: string;
}
