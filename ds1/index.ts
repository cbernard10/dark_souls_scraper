import getArmorData from "./armor/armor";
import getMagicData from "./magic/magic";
import getMiracleData from "./miracles/miracles";
import getPyromancyData from "./pyromancies/pyromancies";
import getRingData from "./rings/rings";
import getAllShieldsData from "./shields/shields";
import getAllWeaponsData from "./weapons/weapons";
import { saveJson } from "../lib/utils";

export async function scrapeDS1() {
  const armorData = await getArmorData();
  const magicData = await getMagicData();
  const miracleData = await getMiracleData();
  const pyromancyData = await getPyromancyData();
  const ringData = await getRingData();
  const shieldData = await getAllShieldsData();
  const weaponData = await getAllWeaponsData();

  saveJson(armorData, "output/ds1/armor.json");
  saveJson(magicData, "output/ds1/magic.json");
  saveJson(miracleData, "output/ds1/miracles.json");
  saveJson(pyromancyData, "output/ds1/pyromancies.json");
  saveJson(ringData, "output/ds1/rings.json");
  saveJson(shieldData, "output/ds1/shields.json");
  saveJson(weaponData, "output/ds1/weapons.json");
}

