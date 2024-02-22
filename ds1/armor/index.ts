import { ds1_armor } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as armor_data from "./armor.json";
import { ArmorData } from "../types";

export async function insert_armor() {
  const armorData = armor_data as ArmorData;
  for (const typePieces of Object.entries(armorData)) {
    const type = typePieces[0];
    const pieces = typePieces[1];
    for (const kv of Object.entries(pieces)) {
      console.log(kv[0], kv[1]);
      if (!kv[0] || !kv[1] || !kv[1].protection) continue;
      try {
        await db.insert(ds1_armor).values({
          name: kv[0],
          durability: kv[1].durability,
          weight: kv[1].weight,
          poise: kv[1].poise,
          physical: kv[1].protection.physical,
          strike: kv[1].protection.strike,
          slash: kv[1].protection.slash,
          thrust: kv[1].protection.thrust,
          magic: kv[1].protection.magic,
          fire: kv[1].protection.fire,
          lightning: kv[1].protection.lightning,
          bleed: kv[1].protection.bleed,
          poison: kv[1].protection.poison,
          curse: kv[1].protection.curse,
          type: type,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
