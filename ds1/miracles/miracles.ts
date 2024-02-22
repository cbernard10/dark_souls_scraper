import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const getMiracleRoot = async (
  url: string = "/Miracles"
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

type Miracle = {
  [key: string]: {
    uses: string;
    slots: string;
    faith: string;
    description: string;
    acquisition: string[];
    type: string;
  };
};

type MiracleData = {
  [key: string]: Miracle;
};

const getMiracleData = async (cheerioRoot: cheerio.Root): Promise<Miracle> => {
  const $ = cheerioRoot;

  await browser.close();

  const miracleData: Miracle = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = $(row).find("td").eq(1).text();
    const slots = $(row).find("td").eq(2).text();
    const faith = $(row).find("td").eq(3).text();
    const description = $(row).find("td").eq(4).text();
    const acquisition = nodesToText($, $(row).find("td").eq(5));

    const type = $(row).find("td").eq(6).text();

    miracleData[name] = {
      uses,
      slots,
      faith,
      description,
      acquisition,
      type,
    };
  }

  return miracleData;
};

const scrapeAndSave = async (output: string = "miracles"): Promise<void> => {
  const miracleRoot = await getMiracleRoot();
  if (!miracleRoot) {
    console.log("Failed to get miracles urls");
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
