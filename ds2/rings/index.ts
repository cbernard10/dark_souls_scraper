import { ds2_rings } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as rings_data from "./rings.json";

export async function insert_rings(): Promise<void> {

  for (const kv of Object.entries(rings_data)) {
    console.log(kv[0], kv[1]);
    if(!kv[0] || !kv[1] || !kv[1].effects || !kv[1].acquisition) continue;
    try {
      await db.insert(ds2_rings).values({
        name: kv[0],
        weight: kv[1].weight,
        effects: kv[1].effects,
        acquisition: kv[1].acquisition,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
