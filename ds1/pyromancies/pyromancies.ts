import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const getPyromancyRoot = async (
  url: string = "/Pyromancies"
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

type Pyromancy = {
  [key: string]: {
    uses: string;
    slots: string;
    description: string;
    acquisition: string[];
    cost: string;
    type: string;
  };
};

type PyromancyData = {
  [key: string]: Pyromancy;
};

const getPyromancyData = async (cheerioRoot: cheerio.Root): Promise<Pyromancy> => {
  const $ = cheerioRoot;

  await browser.close();

  const pyromancyData: Pyromancy = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = $(row).find("td").eq(1).text();
    const slots = $(row).find("td").eq(2).text();
    const description = $(row).find("td").eq(3).text();
    const acquisition = nodesToText($, $(row).find("td").eq(4));
    const cost = $(row).find("td").eq(5).text();    
    const type = $(row).find("td").eq(6).text();

    pyromancyData[name] = {
      uses,
      slots,
      description,
      acquisition,
      cost,
      type,
    };
  }

  return pyromancyData;
};

const scrapeAndSave = async (output: string = "pyromancies"): Promise<void> => {
  const pyromancyRoot = await getPyromancyRoot();
  if (!pyromancyRoot) {
    console.log("Failed to get pyromancies urls");
    return;
  }

  const magicData = await getPyromancyData(pyromancyRoot);

  fs.writeFileSync(
    `${__dirname}/${output}.json`,
    JSON.stringify(magicData, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
