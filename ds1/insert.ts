import { insert_weapons } from "./weapons";
import { db } from "../drizzle.config";
import { sql } from "@vercel/postgres";
import { ds1_weapons, ds1_upgrades } from "../schema/schema";
import { insert_shields } from "./shields";

export async function insertDS1() {
  try {
    await db.delete(ds1_weapons);
    await db.delete(ds1_upgrades);
  } catch (e) {
    console.log("could not delete tables", e);
  }
  await insert_weapons();
  await insert_shields();
  await sql.end();
}
