import getHtml from "../../lib/getHtml";
import { browser, page, start_browser } from "../../lib/browser";
import fs from "fs";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://eldenring.wiki.fextralife.com/Talismans";

const getMagicRoot = async (): Promise<cheerio.Root | undefined> => {
  await start_browser();
  const result = await getHtml(BASE_URL);
  await page?.waitForSelector(".tabtitle");
  await page?.click(".tabtitle");
  await browser.close();
  if (!result) {
    return;
  }
  const { html, $ } = result;
  return $;
};

type Talismans = {
  [key: string]: {
    effects: string[];
    weight: number;
    location: string[];
  };
};

const getMagicData = async (cheerioRoot: cheerio.Root): Promise<Talismans> => {
  const $ = cheerioRoot;

  await browser.close();

  const magicData: Talismans = {};
  const table = $(".wiki_table>tbody").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text().trim();
    const effects =
      $(row).find("td").eq(1).find("li").length > 0
        ? $(row)
            .find("td")
            .eq(1)
            .find("li")
            .map((i, el) => {
              return $(el).text().trim();
            })
            .get()
        : [$(row).find("td").eq(1).text().trim()];
    const weight = parseFloat($(row).find("td").eq(2).text().trim())
    const location = $(row)
      .find("td")
      .eq(3)
      .find("li")
      .map((i, el) => {
        return $(el).text().trim();
      })
      .get();

    magicData[name] = {
      effects,
      weight,
      location,
    };
  }

  return magicData;
};

const scrapeAndSave = async (output: string = "talismans"): Promise<void> => {
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
