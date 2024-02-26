import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import { ArmorData } from "../types";
const BASE_URL = "https://darksouls.wiki.fextralife.com";
import { tdToNumber } from "../../lib/utils";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getArmorRoot = async (url: string): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL + url);
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

const getArmorData = async (): Promise<ArmorData> => {
  const armorData: ArmorData = {};

  for (const armorType of [
    ["/Helms", "Helms"],
    ["/Chest+Armor", "Chest Armor"],
    ["/Gauntlets", "Gauntlets"],
    ["/Leg+Armor", "Leggings"],
  ]) {
    await sleep(1500);
    const $ = await getArmorRoot(armorType[0]);
    if (!$) {
      throw new Error("Failed to get armor root");
    }

    const table = $(".wiki_table").eq(0);
    const rows = table.find("tr").slice(1);

    for (const row of rows) {
      const name = $(row).find("td").eq(0).text();
      const durability = tdToNumber($, row, 1);
      const weight = tdToNumber($, row, 2);
      const protection = {
        physical: tdToNumber($, row, 3),
        strike: tdToNumber($, row, 4),
        slash: tdToNumber($, row, 5),
        thrust: tdToNumber($, row, 6),
        magic: tdToNumber($, row, 7),
        fire: tdToNumber($, row, 8),
        lightning: tdToNumber($, row, 9),
        bleed: tdToNumber($, row, 10),
        poison: tdToNumber($, row, 11),
        curse: tdToNumber($, row, 12),
      };
      const poise = tdToNumber($, row, 13);

      const type = armorType[1];
      armorData[name] = {
        type,
        durability,
        weight,
        protection,
        poise,
      };
    }
  }

  const result = Object.fromEntries(
    Object.entries(armorData).sort()
  ) as ArmorData;
  return result;
};

export default getArmorData;
