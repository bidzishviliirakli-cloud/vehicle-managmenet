export type TPaginated<TReport> = {
	content: TReport;
	meta: TPaginationMetadata;
};

export type TPaginationMetadata = {
	total: number;
	totalPages: number;
	limit: number;
	page: number;
};
