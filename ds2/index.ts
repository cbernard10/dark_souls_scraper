import getAllWeaponsData from "./weapons/weapons";
import getAllShieldsData from "./shields/shields";
import { saveJson } from "../lib/utils";

export async function scrapeDS2() {
  //   const armorData = await getArmorData();
  //   const magicData = await getMagicData();
  //   const miracleData = await getMiracleData();
  //   const pyromancyData = await getPyromancyData();
  //   const ringData = await getRingData();
  const shieldData = await getAllShieldsData();
  // const weaponData = await getAllWeaponsData();

  // saveJson(weaponData, "output/ds2/weapons.json");
  saveJson(shieldData, "output/ds2/shields.json");
}
