import { ds1_weapons, ds1_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import weapon_data from "../../output/ds1/weapons.json";
import { UpgradeTable } from "../types";

export async function insert_weapons(): Promise<void> {
  for (const weapon of weapon_data) {
    // if (!kv[0] || !kv[1] || !kv[1].upgrades) continue;
    const weapon_name = weapon.name;
    console.log(weapon_name);
    const upgradeTable: UpgradeTable = weapon.upgrades;

    const upgradeLevels = Object.keys(upgradeTable);
    const upgradeData = Object.values(upgradeTable);

    const physical = upgradeData.map((x) => x.physical);
    const magic = upgradeData.map((x) => x.magic);
    const fire = upgradeData.map((x) => x.fire);
    const lightning = upgradeData.map((x) => x.lightning);
    const strength = upgradeData.map((x) => x.strength);
    const dexterity = upgradeData.map((x) => x.dexterity);
    const intelligence = upgradeData.map((x) => x.intelligence);
    const faith = upgradeData.map((x) => x.faith ?? null);
    const bleed = upgradeData.map((x) => x.bleed ?? null);
    const poison = upgradeData.map((x) => x.poison ?? null);
    const divine = upgradeData.map((x) => x.divine ?? null);
    const occult = upgradeData.map((x) => x.occult ?? null);
    const physical_defense = upgradeData.map((x) => x["physical_defense"] ?? null);
    const magic_defense = upgradeData.map((x) => x["magic_defense"] ?? null);
    const fire_defense = upgradeData.map((x) => x["fire_defense"] ?? null);
    const lightning_defense = upgradeData.map(
      (x) => x["lightning_defense"] ?? null
    );
    const stability = upgradeData.map((x) => x.stability ?? null);
    const magic_adjust = upgradeData.map(
      (x) => x["magic_adjustment"] ?? null
    );

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
        bleed,
        poison,
        divine,
        occult,
        physical_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        stability,
        magic_adjust,
      });
    } catch (e) {
      console.log("could not add row", e);
    }

    // @ts-ignore
    try {
      await db.insert(ds1_weapons).values({
        name: weapon_name,
        critical: weapon.critical,
        durability: weapon.durability,
        weight: weapon.weight,
        weapon_type: weapon.weapon_type,
        attack_type: weapon.attack_type,
        enchantable: weapon.enchantable,
        special: weapon.special,
        dexterity: weapon.requirements.dexterity,
        strength: weapon.requirements.strength,
        intelligence: weapon.requirements.intelligence,
        faith: weapon.requirements.faith,
      });
    } catch (e) {
      console.log("could not add row", e);
    }
  }
}
