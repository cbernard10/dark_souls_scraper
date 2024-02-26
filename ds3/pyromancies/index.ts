import { ds3_pyromancies } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as miracles_data from "./pyromancies.json";

export async function insert_pyromancies(): Promise<void> {
  for (const kv of Object.entries(miracles_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].acquisition) continue;
    try {
      await db.insert(ds3_pyromancies).values({
        name: kv[0],
        fp: kv[1].FP,
        slots: kv[1].slots,
        int: kv[1].int,
        faith: kv[1].fth,
        description: kv[1].description,
        acquisition: kv[1].acquisition,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
