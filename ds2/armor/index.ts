import { ds2_armor } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as armor_data from "./armor.json";
// import { ArmorData } from "../types";

type ArmorData = {
  [key: string]: {
    [key: string]: {
      physical_defense_bonus: string;
      physical_defense: string;
      strike_defense: string;
      slash_defense: string;
      thrust_defense: string;
      magic_defense: string;
      fire_defense: string;
      lightning_defense: string;
      dark_defense: string;
      poise: string;
      poison_resistance: string;
      bleed_resistance: string;
      petrify_resistance: string;
      curse_resistance: string;
      special_effect: string;
      weight: string;
      durability: string;
    };
  };
};

export async function insert_armor() {
  const armorData = armor_data as ArmorData;
  for (const typePieces of Object.entries(armorData)) {
    const type = typePieces[0];
    const pieces = typePieces[1];
    for (const kv of Object.entries(pieces)) {
      console.log(kv[0]);
      if (!kv[0] || !kv[1] || !kv[1].durability) continue;
      try {
        await db.insert(ds2_armor).values({
          name: kv[0],
          type: type,
          physical_defense_bonus: kv[1].physical_defense_bonus,
          physical_defense: kv[1].physical_defense,
          strike_defense: kv[1].strike_defense,
          slash_defense: kv[1].slash_defense,
          thrust_defense: kv[1].thrust_defense,
          magic_defense: kv[1].magic_defense,
          fire_defense: kv[1].fire_defense,
          lightning_defense: kv[1].lightning_defense,
          dark_defense: kv[1].dark_defense,
          poise: kv[1].poise,
          poison_resist: kv[1].poison_resistance,
          bleed_resist: kv[1].bleed_resistance,
          petrify_resist: kv[1].petrify_resistance,
          curse_resist: kv[1].curse_resistance,
          special: kv[1].special_effect,
          weight: kv[1].weight ?? "0",
          durability: kv[1].durability ?? "0",
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
}
