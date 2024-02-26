import { db } from "./drizzle.config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql } from "@vercel/postgres";
import { insertDS3 } from "./ds3/insert";

(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await insertDS3();
})();
