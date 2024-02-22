import { ds1_miracles } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as miracles_data from "./miracles.json";

export async function insert_miracles(): Promise<void> {
  for (const kv of Object.entries(miracles_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].uses) continue;
    try {
      await db.insert(ds1_miracles).values({
        name: kv[0],
        uses: kv[1].uses,
        slots: kv[1].slots,
        faith: kv[1].faith,
        description: kv[1].description,
        acquisition: kv[1].acquisition,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
