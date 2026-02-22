import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
export class TagEntity extends BaseEntity {
	@Column({ unique: true })
	title: string;
}
