import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { dbMiddleware } from "@/middleware/dbMiddleware";
import todoRouter from "@/features/todo/todoRouter";

const app = new Hono();

app.use(cors());
app.use(dbMiddleware());

app.route("/todo", todoRouter);

app.notFound((c) => {
	return c.json(
		{
			error: "Not Found",
			message: `Route ${c.req.method} ${c.req.path} not found.`,
		},
		404
	);
});
app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json({ error: err.message }, err.status);
	}
	return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
