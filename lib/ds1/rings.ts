import getHtml from "../getHtml";
import { browser, start_browser } from "../browser";
import fs from "fs";
import { nodesToText } from "../utils";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getMagicRoot = async (
  url: string = "/Rings"
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

type Ring = {
  [key: string]: {
    effects: string[];
    acquisition: string[];
  };
};

type RingData = {
  [key: string]: Ring;
};

const getMagicData = async (cheerioRoot: cheerio.Root): Promise<Ring> => {
  const $ = cheerioRoot;

  await browser.close();

  const rings: Ring = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const effects = nodesToText($, $(row).find("td").eq(1));
    const acquisition = nodesToText($, $(row).find("td").eq(2))

    rings[name] = {
      effects,
      acquisition,
    };
  }

  return rings;
};

const scrapeAndSave = async (output: string = "rings"): Promise<void> => {
  const magicRoot = await getMagicRoot();
  if (!magicRoot) {
    console.log("Failed to get root");
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
