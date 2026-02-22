import { Column, Entity, OneToOne } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";
import { CategoryEntity } from "./category.entity";

@Entity()
export class CarEntity extends BaseEntity {
	@Column({ unique: true })
	plateNumber: string;

	@Column()
	isAvailable: boolean;

	@Column()
	latitude: string;

	@Column()
	longitude: string;

	@Column("uuid")
	@OneToOne(() => CategoryEntity, (category) => category.id)
	categoryId: string;
}
