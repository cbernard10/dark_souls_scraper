import { insert_weapons } from "./weapons";
import { insert_shields } from "./shields";
import { db } from "../drizzle.config";
import { sql } from "@vercel/postgres";
import { ds2_weapons, ds2_upgrades, ds2_shield_upgrades, ds2_shields } from "../schema/schema";

export async function insertDS2() {
    // try {
    //   await db.delete(ds2_weapons);
    //   await db.delete(ds2_upgrades);
    // } catch (e) {
    //   console.log("could not delete tables", e);
    // }
  // await insert_weapons();
  
  try {
    await db.delete(ds2_shields);
    await db.delete(ds2_shield_upgrades);
  } catch (e) {
    console.log("could not delete tables", e);
  }

  await insert_shields();
  await sql.end();
}
