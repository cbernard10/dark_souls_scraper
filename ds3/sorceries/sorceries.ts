import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls3.wiki.fextralife.com/Sorceries";

const getMiracleRoot = async (): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL);
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Miracle = {
  [key: string]: {
    description: string;
    FP: string;
    slots: string;
    int: string;
    acquisition: string[];
  };
};

type MiracleData = {
  [key: string]: Miracle;
};

const getMiracleData = async (cheerioRoot: cheerio.Root): Promise<Miracle> => {
  const $ = cheerioRoot;

  await browser.close();

  const miracleData: Miracle = {};
  const table = $(".wiki_table").eq(1);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(1).text().trim();
    const description = $(row).find("td").eq(2).text().trim();
    const FP = $(row).find("td").eq(3).text().trim();
    const slots = $(row).find("td").eq(4).text().trim();
    const int = $(row).find("td").eq(5).text().trim();

    const acquisition = $(row)
      .find("td")
      .eq(6)
      .find("li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();

    miracleData[name] = {
      description,
      FP,
      slots,
      int,
      acquisition,
    };
  }

  return miracleData;
};

const scrapeAndSave = async (output: string = "sorceries"): Promise<void> => {
  const miracleRoot = await getMiracleRoot();
  if (!miracleRoot) {
    console.log("Failed to get sorceries urls");
    return;
  }

  const magicData = await getMiracleData(miracleRoot);

  fs.writeFileSync(
    `${__dirname}/${output}.json`,
    JSON.stringify(magicData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
