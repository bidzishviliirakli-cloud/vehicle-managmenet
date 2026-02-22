import { RequestMethod } from "@nestjs/common";

export const DEFAULT_OFFSET = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

export const INCLUDE_ADMIN_ENDPOINTS = "admin/*";
export const EXCLUDE_ADMIN_ENDPOINTS = "admin/(.*)";
export const PUBLIC_ENDPOINTS = [
	{ path: "user/signIn", method: RequestMethod.POST },
	{ path: "user/signUp", method: RequestMethod.POST },
	{ path: "car", method: RequestMethod.GET },
	{ path: "car/findByCategory", method: RequestMethod.GET }
];
