import { ds1_magic } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as magic_data from "./magic.json";

export async function insert_magic(): Promise<void> {

  for (const kv of Object.entries(magic_data)) {
    console.log(kv[0], kv[1]);
    try {
      await db.insert(ds1_magic).values({
        name: kv[0],
        uses: kv[1].uses,
        slots: kv[1].slots,
        intelligence: kv[1].intelligence,
        description: kv[1].description,
        acquisition: kv[1].acquisition,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
