import pool from "../config/database.ts";
import { validateTodo } from "../utils/validations.ts";

export default {
  async getTodos(ctx: any): Promise<void> {
    const result = await pool.query("SELECT * FROM todos;");
    ctx.response.status = 200;
    ctx.response.body = result.rowsOfObjects();
    return;
  },
  async getTodo(ctx: any): Promise<void> {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.response.status = 422;
      ctx.response.body = {
        error: `Id should be a number`,
      };
      return;
    }
    const result = await pool.query("SELECT * FROM todos WHERE id=$1;", id);
    ctx.response.status = 200;
    ctx.response.body = result.rowsOfObjects();
  },
  async addTodo(ctx: any): Promise<void> {
    const resp = await ctx.request.body();
    const data = resp.value;
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // bad request
      ctx.response.body = {
        error: "Please provide required data",
      };
    }
    const validateResult: any = validateTodo(data);
    if (validateResult.error === true) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: `${validateResult.missingField} field is required`,
      };
      return;
    }
    await pool.query(
      "INSERT INTO todos(description,status,title) VALUES ($1,$2,$3);",
      data.description,
      data.status,
      data.title,
    );
    ctx.response.status = 201;
    ctx.response.body = {
      message: "Todo created",
    };
  },
  async deleteTodo(ctx: any): Promise<void> {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: `Id should be a number`,
      };
      return;
    }
    await pool.query("DELETE FROM todos WHERE	id=$1;", id);
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Todo deleted",
    };
  },
  async updateTodo(ctx: any): Promise<void> {
    const id = Number(ctx.params.id);
    if (isNaN(id)) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: `Id should be a number`,
      };
      return;
    }
    const resp = await ctx.request.body();
    const data = resp.value;
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // bad request
      ctx.response.body = {
        error: "Please provide required data",
      };
    }
    const validateResult: any = validateTodo(data);
    if (validateResult.error === true) {
      ctx.response.status = 422; // unprocessable entity
      ctx.response.body = {
        error: `${validateResult.missingField} field is required`,
      };
      return;
    }

    await pool.query(
      "UPDATE todos SET description = $1, status = $2, title = $3 WHERE id = $4",
      data.description,
      data.status,
      data.title,
      id,
    );
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Todo updated",
    };
  },
};
