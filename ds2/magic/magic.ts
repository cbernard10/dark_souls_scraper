import getHtml from "../../lib/getHtml";
import { browser, page, start_browser } from "../../lib/browser";
import fs from "fs";
import { WeaponData, WeaponURL, UpgradeTable } from "../types";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls2.wiki.fextralife.com/Magic";

const getMagicRoot = async (): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL);
  await page?.waitForSelector(".tabtitle");
  await page?.click(".table-tab");
  await page?.waitForSelector("[title='icon-attunement.png']");
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Magic = {
  [key: string]: {
    category: string;
    uses: string;
    fth: string;
    int: string;
    attunement: string;
    description: string;
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
    const category = $(row).find("td").eq(1).text();
    const uses = $(row).find("td").eq(2).text();
    const fth = $(row).find("td").eq(3).text();
    const int = $(row).find("td").eq(5).text();
    const attunement = $(row).find("td").eq(4).text();
    const description = $(row).find("td").eq(6).text();

    magicData[name] = {
      category,
      uses,
      fth: fth === "-" ? "0" : fth,
      int: int === "-" ? "0" : int,
      attunement: attunement === "-" ? "0" : attunement,
      description,
    };
  }

  return magicData;
};

const scrapeAndSave = async (output: string = "magic"): Promise<void> => {
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
