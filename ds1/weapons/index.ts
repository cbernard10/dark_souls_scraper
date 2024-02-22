import { ds1_weapons, ds1_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import * as weapon_data from "./weapons.json";
import { UpgradeTable } from "../types";

export async function insert_weapons(): Promise<void> {
  for (const kv of Object.entries(weapon_data)) {
    console.log(kv[0], kv[1]);
    if (!kv[0] || !kv[1] || !kv[1].upgrades) continue;
    const weapon_name = kv[0];
    const upgradeTable: UpgradeTable = kv[1].upgrades;

    const upgradeLevels = Object.keys(upgradeTable);
    const upgradeData = Object.values(upgradeTable);

    const physical = upgradeData.map((x) => x.physical);
    const magic = upgradeData.map((x) => x.magic);
    const fire = upgradeData.map((x) => x.fire);
    const lightning = upgradeData.map((x) => x.lightning);
    const strength = upgradeData.map((x) => x.strength);
    const dexterity = upgradeData.map((x) => x.dexterity);
    const intelligence = upgradeData.map((x) => x.intelligence);
    const faith = upgradeData.map((x) => x.faith);
    const divine = upgradeData.map((x) => x.divine);
    const occult = upgradeData.map((x) => x.occult ?? "0");
    const physical_defense = upgradeData.map(
      (x) => x["physical defense"] ?? "0"
    );
    const magic_defense = upgradeData.map((x) => x["magic defense"] ?? "0");
    const fire_defense = upgradeData.map((x) => x["fire defense"] ?? "0");
    const lightning_defense = upgradeData.map(
      (x) => x["lightning defense"] ?? "0"
    );
    const stability = upgradeData.map((x) => x.stability ?? "0");

    try {
      await db.insert(ds1_upgrades).values({
        weapon_name: weapon_name,
        range: upgradeLevels,
        physical,
        magic,
        fire,
        lightning,
        strength,
        dexterity,
        intelligence,
        faith,
        divine,
        occult,
        physical_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        stability,
      });
    } catch (e) {
      console.log(e);
    }

    // @ts-ignore
    await db.insert(ds1_weapons).values({
      name: weapon_name,
      strength: kv[1].requirements.strength,
      dexterity: kv[1].requirements.dexterity,
      intelligence: kv[1].requirements.intelligence,
      faith: kv[1].requirements.faith,
      durability: kv[1].durability,
      weight: kv[1].weight,
      critical: kv[1].critical,
      type: kv[1].type,
      attack_type: kv[1].attack_type,
      enchantable: kv[1].enchantable,
      auxiliary: kv[1].auxiliary,
      special: kv[1].special,
    });
  }
}
