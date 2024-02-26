import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import { nodesToText } from "../../lib/utils";
import { tdToNumber } from "../../lib/utils";

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
    uses: number;
    slots: number;
    intelligence: number;
    description: string;
    acquisition: string[];
    type: string;
  };
};

const getMagicData = async (): Promise<Magic> => {
  const $ = await getMagicRoot();
  if (!$) {
    throw new Error("Failed to get root");
  }

  await browser.close();

  const magicData: Magic = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = tdToNumber($, row, 1);
    const slots = tdToNumber($, row, 2);
    const intelligence = tdToNumber($, row, 3);
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

export default getMagicData;
