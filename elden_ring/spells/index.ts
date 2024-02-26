import { eldenring_spells } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as magic_data from "./spells.json";

export async function insert_spells(): Promise<void> {
  for (const kv of Object.entries(magic_data)) {
    console.log(kv[0], kv[1]);
    if (
      !kv[0] ||
      !kv[1] ||
      !kv[1].type ||
      !kv[1].effect ||
      !kv[1].fp ||
      !kv[1].slots ||
      !kv[1].int ||
      !kv[1].fth ||
      !kv[1].arc ||
      !kv[1].stamina ||
      !kv[1].bonus
    )
      continue;
    try {
      await db.insert(eldenring_spells).values({
        name: kv[0],
        type: kv[1].type,
        effect: kv[1].effect,
        fp: kv[1].fp,
        slots: kv[1].slots,
        int: kv[1].int,
        fth: kv[1].fth,
        arc: kv[1].arc,
        stamina: kv[1].stamina,
        bonus: kv[1].bonus,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
