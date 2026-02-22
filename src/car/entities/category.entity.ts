import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class CategoryEntity extends BaseEntity {
	@Column({ unique: true })
	title: string;

	@Column({ nullable: true })
	description: string;
}
