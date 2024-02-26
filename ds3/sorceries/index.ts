import { ds3_sorceries } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as miracles_data from "./sorceries.json";

export async function insert_miracles(): Promise<void> {
  for (const kv of Object.entries(miracles_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].acquisition) continue;
    try {
      await db.insert(ds3_sorceries).values({
        name: kv[0],
        fp: kv[1].FP,
        slots: kv[1].slots,
        int: kv[1].int,
        description: kv[1].description,
        acquisition: kv[1].acquisition,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
