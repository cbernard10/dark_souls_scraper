import { ds1_pyromancies } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as pyromancies_data from "./pyromancies.json";

export async function insert_pyromancies(): Promise<void> {
  for (const kv of Object.entries(pyromancies_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].uses) continue;
    try {
      await db.insert(ds1_pyromancies).values({
        name: kv[0],
        uses: kv[1].uses,
        slots: kv[1].slots,
        description: kv[1].description,
        acquisition: kv[1].acquisition,
        cost: kv[1].cost,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
