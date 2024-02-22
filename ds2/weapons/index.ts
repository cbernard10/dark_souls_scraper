import { ds2_weapons, ds2_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as weapon_data from "./weapons.json";
import { UpgradeTable } from "../types";

export async function insert_weapons(): Promise<void> {
  for (const kv of Object.entries(weapon_data)) {
    console.log(kv[0], kv[1]);
    if(kv[0] === 'Key to the Embedded') continue;
    if (!kv[0] || !kv[1] || !kv[1].upgrades) continue;
    const weapon_name = kv[0];
    const upgradeTable: UpgradeTable = kv[1].upgrades;

    const upgradeLevels = Object.keys(upgradeTable);
    const upgradeData = Object.values(upgradeTable);

    const physical = upgradeData.map((x) => x.physical);
    const magicdmg = upgradeData.map((x) => x.magicdmg);
    const fire = upgradeData.map((x) => x.fire);
    const lightning = upgradeData.map((x) => x.lightning);
    const dark = upgradeData.map((x) => x.dark);
    const counter = upgradeData.map((x) => x.counter);
    const poise = upgradeData.map((x) => x.poise);
    const strength = upgradeData.map((x) => x.strength);
    const dexterity = upgradeData.map((x) => x.dexterity);
    const magic = upgradeData.map((x) => x.magic);
    const poison = upgradeData.map((x) => x.poison);
    const bleed = upgradeData.map((x) => x.bleed);

    const physical_defense = upgradeData.map(
      (x) => x["physical defense"] ?? "0"
    );
    const magic_defense = upgradeData.map((x) => x["magic defense"] ?? "0");
    const fire_defense = upgradeData.map((x) => x["fire defense"] ?? "0");
    const lightning_defense = upgradeData.map(
      (x) => x["lightning defense"] ?? "0"
    );
    const dark_defense = upgradeData.map((x) => x["dark defense"] ?? "0");

    try {
      await db.insert(ds2_upgrades).values({
        weapon_name: kv[0],
        range: upgradeLevels,
        physical,
        magic: magicdmg,
        fire,
        lightning,
        dark,
        counter,
        poise,
        strength,
        dexterity,
        magic,
        poison,
        bleed,
        physical_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        dark_defense,
      });
    } catch (e) {
      console.log(e);
    }

    // @ts-ignore
    try {
      await db.insert(ds2_weapons).values({
        name: kv[0],
        strength: kv[1].requirements.strength,
        dexterity: kv[1].requirements.dexterity,
        intelligence: kv[1].requirements.intelligence,
        faith: kv[1].requirements.faith,
        durability: kv[1].durability,
        weight: kv[1].weight,
        type: kv[1].type,
        attack_type: kv[1].attack_type,
        enchantable: kv[1].enchantable,
        special: kv[1].special,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
