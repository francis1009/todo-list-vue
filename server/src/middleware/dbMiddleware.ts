import { D1Dialect } from "kysely-d1";
import { env } from "cloudflare:workers";
import { Kysely } from "kysely";
import type { MiddlewareHandler } from "hono";
import type { Database } from "@/types/db";

export const dbMiddleware = (): MiddlewareHandler => {
	return async (c, next) => {
		if (!env.DB) {
			return c.json(
				{ error: "Internal Server Error: DB Binding Missing" },
				500,
			);
		}

		const dbInstance = new Kysely<Database>({
			dialect: new D1Dialect({ database: env.DB }),
		});
		c.set("db", dbInstance);
		await next();
	};
};
