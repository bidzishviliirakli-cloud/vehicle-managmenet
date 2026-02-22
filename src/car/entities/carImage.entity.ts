import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";
import { CarEntity } from "./car.entity";

@Entity()
export class CarImageEntity extends BaseEntity {
	@Column("uuid")
	@ManyToOne(() => CarEntity, (car) => car.id)
	carId: string;

	@Column()
	url: string;

	@Column()
	isPrimary: boolean;
}
