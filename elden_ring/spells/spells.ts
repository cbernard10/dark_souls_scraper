import getHtml from "../../lib/getHtml";
import { browser, page, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://eldenring.wiki.fextralife.com/Magic+Spells";

const getMagicRoot = async (): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL);
  await page?.waitForSelector(".tabtitle");
  await page?.click(".tabtitle");
  await page?.waitForSelector(
    "[src='/file/Elden-Ring/agheels_flame_incantation_elden_ring_wiki_guide_200px.png']"
  );
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Magic = {
  [key: string]: {
    type: string;
    effect: string;
    fp: string;
    slots: string;
    int: string;
    fth: string;
    arc: string;
    stamina: string;
    bonus: string;
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
    const type = $(row).find("td").eq(1).text();
    const effect = $(row).find("td").eq(2).text();
    const fp =
      $(row).find("td").eq(3).find("p").length > 1
        ? $(row).find("td").eq(3).find("p").eq(0).text()
        : $(row).find("td").eq(3).text();
    const slots = $(row).find("td").eq(4).text();
    const int = $(row).find("td").eq(5).text();
    const fth = $(row).find("td").eq(6).text();
    const arc = $(row).find("td").eq(7).text();
    const stamina = $(row).find("td").eq(8).text();
    const bonus = $(row).find("td").eq(9).text();

    magicData[name] = {
      type,
      effect,
      fp,
      slots,
      int,
      fth,
      arc,
      stamina,
      bonus,
    };
  }

  return magicData;
};

const scrapeAndSave = async (output: string = "spells"): Promise<void> => {
  const magicRoot = await getMagicRoot();
  if (!magicRoot) {
    console.log("Failed to get magic urls");
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
