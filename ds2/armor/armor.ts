import getHtml from "../../lib/getHtml";
import { browser, start_browser, page } from "../../lib/browser";
import fs, { copyFileSync } from "fs";
import { nodesToText } from "../../lib/utils";
import { ArmorData, ArmorPiece } from "../types";

const BASE_URL = "https://darksouls2.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getArmorRoot = async (url: string): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL + url);
  await sleep(1000);
  if (url === "/Helms" || url === "/Chest+Pieces") {
    await page?.click(".tabtitle.max-tab");
    await sleep(1000);
  }
  // if (url === "Gauntlets" || url === "Leggings") {
  //   await page?.click(".tabtitle.maxtable-tab.tabcurrent");
  //   await sleep(1000);
  // }
  await sleep(100);
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
    "Chest Pieces": {},
    Gauntlets: {},
    Leggings: {},
  };

  for (const armorType of [
    ["/Helms", "Helms"],
    ["/Chest+Pieces", "Chest Pieces"],
    ["/Gauntlets", "Gauntlets"],
    ["/Leggings", "Leggings"],
  ]) {
    const type = armorType[1];
    await sleep(1500);
    const $ = await getArmorRoot(armorType[0]);
    if (!$) {
      throw new Error("Failed to get armor root");
    }

    const table = $(".wiki_table>tbody").eq(0);
    const rows = $(table).find("tr");
    const armorPieces: {
      [key: string]: {
        [key: string]: string;
      };
    } = {};

    for (const row of rows) {
      const name = $(row).find("td").eq(0).find("a").text().split(" +")[0];
      const physical_defense_bonus = $(row).find("td").eq(1).text();
      const physical_defense = $(row).find("td").eq(2).text();
      const strike_defense = $(row).find("td").eq(3).text();
      const slash_defense = $(row).find("td").eq(4).text();
      const thrust_defense = $(row).find("td").eq(5).text();
      const magic_defense = $(row).find("td").eq(6).text();
      const fire_defense = $(row).find("td").eq(7).text();
      const lightning_defense = $(row).find("td").eq(8).text();
      const dark_defense = $(row).find("td").eq(9).text();
      const poise = $(row).find("td").eq(10).text();
      const poison_resistance = $(row).find("td").eq(11).text();
      const bleed_resistance = $(row).find("td").eq(12).text();
      const petrify_resistance = $(row).find("td").eq(13).text();
      const curse_resistance = $(row).find("td").eq(14).text();
      const special_effect = $(row).find("td").eq(15).text();
      const weight = $(row).find("td").eq(16).text();
      const durability = $(row).find("td").eq(17).text();

      armorPieces[name] = {
        physical_defense_bonus,
        physical_defense,
        strike_defense,
        slash_defense,
        thrust_defense,
        magic_defense,
        fire_defense,
        lightning_defense,
        dark_defense,
        poise,
        poison_resistance,
        bleed_resistance,
        petrify_resistance,
        curse_resistance,
        special_effect,
        weight,
        durability,
      };
      armorData[type][name] = armorPieces[name];
    }
  }

  return armorData;
};

const scrapeAndSave = async (output: string = "armor"): Promise<void> => {
  const armorData = await getArmorData();

  fs.writeFileSync(
    `${__dirname}/${output}.json`,
    JSON.stringify(armorData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
