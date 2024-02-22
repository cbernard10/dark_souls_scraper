import { ds2_shields, ds2_shield_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as shield_data from "./shields.json";
import { UpgradeTable } from "../types";

export async function insert_shields(): Promise<void> {
  for (const kv of Object.entries(shield_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].upgrades) continue;

    const shield_name = kv[0];
    const upgradeTable: UpgradeTable = kv[1].upgrades;

    const upgradeLevels = Object.keys(upgradeTable);
    const upgradeData = Object.values(upgradeTable);

    const physical = upgradeData.map((x) => x.physical);
    const magic = upgradeData.map((x) => x.magic);
    const fire = upgradeData.map((x) => x.fire);
    const lightning = upgradeData.map((x) => x.lightning);
    const dark = upgradeData.map((x) => x.dark);
    const physical_bonus = upgradeData.map((x) => x.physical_bonus);
    const magic_bonus = upgradeData.map((x) => x.magic_bonus);
    const fire_bonus = upgradeData.map((x) => x.fire_bonus);
    const lightning_bonus = upgradeData.map((x) => x.lightning_bonus);
    const dark_bonus = upgradeData.map((x) => x.dark_bonus);
    const poison = upgradeData.map((x) => x.poison);
    const poison_def = upgradeData.map((x) => x.poison_def);
    const bleed = upgradeData.map((x) => x.bleed);
    const bleed_def = upgradeData.map((x) => x.bleed_def);
    const petrify_def = upgradeData.map((x) => x.petrify_def);
    const curse_def = upgradeData.map((x) => x.curse_def);
    const physical_def = upgradeData.map((x) => x.physical_def);
    const magic_def = upgradeData.map((x) => x.magic_def);
    const fire_def = upgradeData.map((x) => x.fire_def);
    const lightning_def = upgradeData.map((x) => x.lightning_def);
    const dark_def = upgradeData.map((x) => x.dark_def);
    const stability = upgradeData.map((x) => x.stability);

    try {
      await db.insert(ds2_shield_upgrades).values({
        shield_name: shield_name,
        range: upgradeLevels,
        physical,
        magic,
        fire,
        lightning,
        dark,
        physical_bonus,
        magic_bonus,
        fire_bonus,
        lightning_bonus,
        dark_bonus,
        poison,
        poison_def,
        bleed,
        bleed_def,
        petrify_def,
        curse_def,
        physical_def,
        magic_def,
        fire_def,
        lightning_def,
        dark_def,
        stability,
      });
    } catch (e) {
      console.log(e);
    }

    // @ts-ignore
    await db.insert(ds2_shields).values({
      name: shield_name,
      durability: kv[1].durability,
      weight: kv[1].weight,
      stability: kv[1].stability,
      str: kv[1].str,
      str_scaling: kv[1].str_scaling,
      dex: kv[1].dex,
      dex_scaling: kv[1].dex_scaling,
      int: kv[1].int,
      int_scaling: kv[1].int_scaling,
      faith: kv[1].faith,
      faith_scaling: kv[1].faith_scaling,
      type: kv[1].type,
      attack_type: kv[1].attack_type,
    });
  }
}
