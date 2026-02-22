import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiQuery, getSchemaPath } from "@nestjs/swagger";

export function ApiQueryDecorator(fieldName: string, queryDto: Function) {
	return applyDecorators(
		ApiExtraModels(queryDto),
		ApiQuery({
			required: false,
			name: fieldName,
			style: "deepObject",
			explode: true,
			type: "object",
			schema: {
				$ref: getSchemaPath(queryDto)
			}
		})
	);
}
