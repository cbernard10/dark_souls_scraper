import getAllWeaponsData from "./weapons/weapons";
import getAllShieldsData from "./shields/shields";
import { saveJson } from "../lib/utils";

export async function scrapeDS3() {
  // const shieldData = await getAllWeaponsData();
  const shieldData = await getAllShieldsData();
  saveJson(shieldData, "output/ds3/shields.json");
}
