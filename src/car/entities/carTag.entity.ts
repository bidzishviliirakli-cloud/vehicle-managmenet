import { Column, Entity, Unique } from "typeorm";

import { BaseEntity } from "src/common/entities/base.entity";

@Entity()
@Unique(["carId", "tagId"])
export class CarTagEntity extends BaseEntity {
	@Column("uuid")
	carId: string;

	@Column("uuid")
	tagId: string;
}
