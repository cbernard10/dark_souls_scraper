import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls2.wiki.fextralife.com/Rings";

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
    weight: string[];
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
    const weight = $(row)
      .find("ul")
      .eq(0)
      .find("li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();
    const effects = $(row)
      .find("ul")
      .eq(1)
      .find("li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();
    const acquisition = $(row)
      .find("ul")
      .eq(2)
      .find("li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();

    rings[name] = {
      weight,
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
    `${__dirname}/${output}.json`,
    JSON.stringify(magicData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
