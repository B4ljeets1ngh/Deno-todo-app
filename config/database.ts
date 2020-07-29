import { Pool } from "https://deno.land/x/postgres/mod.ts";

const pool = new Pool({
  hostname: "localhost",
  port: 5432,
  user: "postgres",
  password: "baljeet",
  database: "todoapi",
  applicationName: "todo",
}, 20);

// await pool.connect();

export default pool;
