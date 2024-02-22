import { db } from "./drizzle.config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { sql } from "@vercel/postgres";
import { ds1_delete_all, ds1_insert_all } from "./ds1/util";
import { insert_magic } from "./ds2/magic/index";
import { insert_rings } from "./ds2/rings/index";
import { insert_weapons } from "./ds2/weapons";
import { insert_shields } from "./ds2/shields";
import { insert_armor } from "./ds2/armor";
import { ds2_armor, ds2_magic, ds2_rings, ds2_shields } from "./schema/schema";

(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
  // await ds1_delete_all();
  // await ds1_insert_all();
  // await db.delete(ds2_magic)
  // await insert_magic();
  // await db.delete(ds2_rings);

  // await insert_rings();
  // await insert_weapons( )
  // await db.delete(ds2_armor);
  // await insert_armor();
  // await db.delete(ds2_shields);
  await insert_shields();
  await sql.end();
})();
