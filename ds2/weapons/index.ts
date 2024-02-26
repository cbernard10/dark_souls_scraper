import { ds2_weapons, ds2_upgrades } from "../../schema/schema";
import { db } from "../../drizzle.config";
import weapon_data from "../../output/ds2/weapons.json";
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
    const magic_bonus = upgradeData.map((x) => x.magic_bonus);
    const fire_bonus = upgradeData.map((x) => x.fire_bonus);
    const lightning_bonus = upgradeData.map((x) => x.lightning_bonus);
    const dark_bonus = upgradeData.map((x) => x.dark_bonus);
    const poison = upgradeData.map((x) => x.poison);
    const bleed = upgradeData.map((x) => x.bleed);
    const physical_defense = upgradeData.map((x) => x.physical_defense);
    const magic_defense = upgradeData.map((x) => x.magic_defense);
    const fire_defense = upgradeData.map((x) => x.fire_defense);
    const lightning_defense = upgradeData.map((x) => x.lightning_defense);
    const dark_defense = upgradeData.map((x) => x.dark_defense);
    const cast_speed = upgradeData.map((x) => x.cast_speed ?? null);
    const weapon_range = upgradeData.map((x) => x.range ?? null);

    await db.insert(ds2_upgrades).values({
      weapon_name,
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
      bleed,
      physical_defense,
      magic_defense,
      fire_defense,
      lightning_defense,
      dark_defense,
      cast_speed,
      weapon_range: weapon_range,
    });

    // @ts-ignore
    await db.insert(ds2_weapons).values({
      name: weapon_name,
      strength: weapon.requirements.strength,
      dexterity: weapon.requirements.dexterity,
      intelligence: weapon.requirements.intelligence,
      faith: weapon.requirements.faith,
      counter_damage: weapon.counter_damage,
      poise_damage: weapon.poise_damage,
      stability: weapon.stability,
      durability: weapon.durability,
      weight: weapon.weight,
      weapon_type: weapon.weapon_type,
      attack_type: weapon.attack_type,
      enchantable: weapon.enchantable,
      special: weapon.special,
    });
  }
}
