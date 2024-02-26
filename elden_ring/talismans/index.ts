import { eldenring_talismans } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as magic_data from "./talismans.json";

type Talisman = {
  effects: string[];
  weight: number;
  location: string[];
};

export async function insert_talismans(): Promise<void> {
  for (const kv of Object.entries(magic_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].effects || !kv[1].weight || !kv[1].location)
      continue;
    const entry = kv[1] as Talisman;
    try {
      await db.insert(eldenring_talismans).values({
        name: kv[0],
        effects: entry.effects,
        weight: entry.weight,
        acquisition: entry.location,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
