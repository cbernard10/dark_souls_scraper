import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { WeaponData, WeaponURL, UpgradeTable } from "../types";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getMagicRoot = async (
  url: string = "/Magic"
): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL + url);
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Magic = {
  [key: string]: {
    uses: string;
    slots: string;
    intelligence: string;
    description: string;
    acquisition: string[];
    type: string;
  };
};

type MagicData = {
  [key: string]: Magic;
};

const getMagicData = async (cheerioRoot: cheerio.Root): Promise<Magic> => {
  const $ = cheerioRoot;

  await browser.close();

  const magicData: Magic = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = $(row).find("td").eq(1).text();
    const slots = $(row).find("td").eq(2).text();
    const intelligence = $(row).find("td").eq(3).text();
    const description = $(row).find("td").eq(4).text();
    const acquisition = nodesToText($, $(row).find("td").eq(5));

    const type = $(row).find("td").eq(6).text();

    magicData[name] = {
      uses,
      slots,
      intelligence,
      description,
      acquisition,
      type,
    };
  }

  return magicData;
};

const scrapeAndSave = async (output: string = "magic"): Promise<void> => {
  const magicRoot = await getMagicRoot();
  if (!magicRoot) {
    console.log("Failed to get weapon urls");
    return;
  }

  const magicData = await getMagicData(magicRoot);

  fs.writeFileSync(
    `${__dirname}/out/${output}.json`,
    JSON.stringify(magicData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
