import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771752798144 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
                                    CREATE FUNCTION public.count_estimate(query text) RETURNS integer
                                        LANGUAGE plpgsql
                                        AS $$
                                    DECLARE
                                        plan jsonb;
                                    BEGIN
                                        EXECUTE FORMAT('EXPLAIN (ANALYZE, FORMAT JSON) %s', query) INTO plan;
                                        RETURN (plan->0->'Plan'->>'Actual Rows')::integer;
                                    END;
                                    $$;`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
