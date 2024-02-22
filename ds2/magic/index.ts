import { ds2_magic } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as magic_data from "./magic.json";

export async function insert_magic(): Promise<void> {
  for (const kv of Object.entries(magic_data)) {
    console.log(kv[0], kv[1]);
    try {
      await db.insert(ds2_magic).values({
        name: kv[0],
        category: kv[1].category,
        uses: kv[1].uses,
        int: kv[1].int,
        fth: kv[1].fth,
        attunement: kv[1].attunement,
        description: kv[1].description,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
