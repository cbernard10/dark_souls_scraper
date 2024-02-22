import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";
import { ArmorData, ArmorPiece } from "../types";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

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
  const armorData: ArmorData = {
    Helms: {},
    "Chest Armor": {},
    Gauntlets: {},
    Leggings: {},
  };

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
    const armorPieces: {
      [key: string]: ArmorPiece;
    } = {};

    for (const row of rows) {
      const name = $(row).find("td").eq(0).text();
      const durability = $(row).find("td").eq(1).text();
      const weight = $(row).find("td").eq(2).text();
      const protection = {
        physical: $(row).find("td").eq(3).text(),
        strike: $(row).find("td").eq(4).text(),
        slash: $(row).find("td").eq(5).text(),
        thrust: $(row).find("td").eq(6).text(),
        magic: $(row).find("td").eq(7).text(),
        fire: $(row).find("td").eq(8).text(),
        lightning: $(row).find("td").eq(9).text(),
        bleed: $(row).find("td").eq(10).text(),
        poison: $(row).find("td").eq(11).text(),
        curse: $(row).find("td").eq(12).text(),
      };
      const poise = $(row).find("td").eq(13).text();

      const type = armorType[1];
      armorPieces[name] = {
        durability,
        weight,
        protection,
        poise,
      };

      console.log(type, name);
    }
    armorData[armorType[1]] = Object.fromEntries(
      Object.entries(armorPieces).sort()
    );
  }

  return armorData;
};

const scrapeAndSave = async (output: string = "armor"): Promise<void> => {
  const armorData = await getArmorData();

  fs.writeFileSync(
    `${__dirname}/out/${output}.json`,
    JSON.stringify(armorData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
