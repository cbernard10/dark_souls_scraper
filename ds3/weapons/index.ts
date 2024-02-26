import { ds3_weapons, ds3_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import weapon_data from "../../output/ds3/weapons.json";
import { UpgradeTable } from "../types";

export async function insert_weapons(): Promise<void> {
  console.log(weapon_data[0].name);
  for (let i = 0; i < weapon_data.length; i++) {
    const weapon = weapon_data[i];
    const weapon_name = weapon.name;
    console.log(weapon_name);
    const upgradeTable: UpgradeTable = weapon.upgrades;

    const upgradeLevels = Object.keys(upgradeTable);
    const upgradeData = Object.values(upgradeTable);

    const physical = upgradeData.map((x) => x.physical);
    const magic = upgradeData.map((x) => x.magic);
    const fire = upgradeData.map((x) => x.fire);
    const lightning = upgradeData.map((x) => x.lightning);
    const dark = upgradeData.map((x) => x.dark);
    const strength_bonus = upgradeData.map((x) => x.strength_bonus);
    const dexterity_bonus = upgradeData.map((x) => x.dexterity_bonus);
    const intelligence_bonus = upgradeData.map((x) => x.intelligence_bonus);
    const faith_bonus = upgradeData.map((x) => x.faith_bonus);
    const poison = upgradeData.map((x) => x.poison);
    const bleed = upgradeData.map((x) => x.bleed);
    const frost = upgradeData.map((x) => x.frost);
    const physical_defense = upgradeData.map((x) => x.physical_defense);
    const magic_defense = upgradeData.map((x) => x.magic_defense);
    const fire_defense = upgradeData.map((x) => x.fire_defense);
    const lightning_defense = upgradeData.map((x) => x.lightning_defense);
    const dark_defense = upgradeData.map((x) => x.dark_defense);
    const stability = upgradeData.map((x) => x.stability);

    try {
      await db.insert(ds3_upgrades).values({
        weapon_name,
        range: upgradeLevels,
        physical,
        magic,
        fire,
        lightning,
        dark,
        strength_bonus,
        dexterity_bonus,
        intelligence_bonus,
        faith_bonus,
        poison,
        bleed,
        frost,
        physical_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        dark_defense,
        stability,
      });
    } catch (e) {
      console.log("could not insert weapon upgrades", e);
    }

    try {
      // @ts-ignore
      await db.insert(ds3_weapons).values({
        name: weapon_name,
        critical: weapon.critical,
        durability: weapon.durability ?? 0,
        weight: weapon.weight ?? 0,
        weapon_type: weapon.weapon_type,
        attack_type: weapon.attack_type,
        special: weapon.special,
        strength: weapon.requirements.strength ?? 0,
        dexterity: weapon.requirements.dexterity ?? 0,
        intelligence: weapon.requirements.intelligence ?? 0,
        faith: weapon.requirements.faith ?? 0,
        spell_buff: weapon.spell_buff ?? 0,
        stability: weapon.stability,
        fp: weapon.fp,
        auxiliary: weapon.auxiliary ? Object.keys(weapon.auxiliary)[0] : "-",
        auxiliary_value: weapon.auxiliary
          ? Object.values(weapon.auxiliary)[0]
          : 0,
      });
    } catch (e) {
      console.log("could not insert weapon", e);
    }
  }
}
