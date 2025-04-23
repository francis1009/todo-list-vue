import { Generated } from "kysely";

export interface Database {
	todo: TodoTable;
}

export interface TodoTable {
	id: Generated<number>;
	task: string;
	status: string;
	priority: string;
	updated_at: string;
	created_at: Generated<string>;
}
