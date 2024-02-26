import { insert_weapons } from "./weapons";
import {insert_shields} from "./shields";
import { db } from "../drizzle.config";
import { sql } from "@vercel/postgres";
import { ds3_weapons, ds3_upgrades } from "../schema/schema";

export async function insertDS3() {
  
  // try {
  //   await db.delete(ds3_weapons);
  //   await db.delete(ds3_upgrades);
  // } catch (e) {
  //   console.log("could not delete tables", e);
  // }

  // await insert_weapons();
  await insert_shields();
  await sql.end();
}
