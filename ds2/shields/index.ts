import { ds2_shields, ds2_shield_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import shields_data from "../../output/ds2/shields.json";
import { UpgradeTable } from "../types";

export async function insert_shields(): Promise<void> {
  console.log(shields_data[0].name);
  for (let i = 0; i < shields_data.length; i++) {
    const weapon = shields_data[i];
    const shield_name = weapon.name;
    console.log(shield_name);
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
    const magic_bonus = upgradeData.map((x) => x.magic_bonus);
    const fire_bonus = upgradeData.map((x) => x.fire_bonus);
    const lightning_bonus = upgradeData.map((x) => x.lightning_bonus);
    const dark_bonus = upgradeData.map((x) => x.dark_bonus);
    const poison = upgradeData.map((x) => x.poison);
    const poison_defense = upgradeData.map((x) => x.poison_defense);
    const bleed = upgradeData.map((x) => x.bleed);
    const bleed_defense = upgradeData.map((x) => x.bleed_defense);
    const petrify_defense = upgradeData.map((x) => x.petrify_defense);
    const curse_defense = upgradeData.map((x) => x.curse_defense);
    const physical_defense = upgradeData.map((x) => x.physical_defense);
    const magic_defense = upgradeData.map((x) => x.magic_defense);
    const fire_defense = upgradeData.map((x) => x.fire_defense);
    const lightning_defense = upgradeData.map((x) => x.lightning_defense);
    const dark_defense = upgradeData.map((x) => x.dark_defense);
    const stability = upgradeData.map((x) => x.stability);

    try {
      await db.insert(ds2_shield_upgrades).values({
        shield_name,
        range: upgradeLevels,
        physical,
        magic,
        fire,
        lightning,
        dark,
        strength_bonus,
        dexterity_bonus,
        magic_bonus,
        fire_bonus,
        lightning_bonus,
        dark_bonus,
        poison,
        poison_defense,
        bleed,
        bleed_defense,
        petrify_defense,
        curse_defense,
        physical_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        dark_defense,
        stability,
      });
    } catch (e) {
      console.log("could not add row", e);
    }

    // @ts-ignore
    try {
      await db.insert(ds2_shields).values({
        name: shield_name,
        durability: weapon.durability,
        weight: weapon.weight,
        strength: weapon.requirements.strength,
        dexterity: weapon.requirements.dexterity,
        intelligence: weapon.requirements.intelligence,
        faith: weapon.requirements.faith,
        weapon_type: weapon.weapon_type,
        attack_type: weapon.attack_type,
        special: weapon.special,
      });
    } catch (e) {
      console.log("could not add row", e);
    }
  }
}
