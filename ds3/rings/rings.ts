import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls3.wiki.fextralife.com/Rings";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getMagicRoot = async (): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL);
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Ring = {
  [key: string]: {
    weight: string;
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
    const name = $(row).find("td").eq(0).text().trim();
    const weight = $(row).find("td").eq(1).text().trim();
    const maybeEffects =
      $(row).find("td").eq(2).find("p").length > 1
        ? $(row)
            .find("td")
            .eq(2)
            .find("p")
            .map((i, el) => {
              return $(el).text().trim();
            })
            .get()
        : [$(row).find("td").eq(2).text().trim()];

    const maybeAcquisition =
      $(row).find("td").eq(3).find("p").length > 1
        ? $(row)
            .find("td")
            .eq(3)
            .find("p")
            .map((i, el) => {
              return $(el).text().trim();
            })
            .get()
        : [$(row).find("td").eq(3).text().trim()];

    rings[name] = {
      weight: weight,
      effects: maybeEffects,
      acquisition: maybeAcquisition,
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
    `${__dirname}/${output}.json`,
    JSON.stringify(magicData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
