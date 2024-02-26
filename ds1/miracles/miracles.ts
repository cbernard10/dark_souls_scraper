import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import { nodesToText } from "../../lib/utils";
import { tdToNumber } from "../../lib/utils";

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
    uses: number;
    slots: number;
    faith: number;
    description: string;
    acquisition: string[];
    type: string;
  };
};

type MiracleData = {
  [key: string]: Miracle;
};

const getMiracleData = async (): Promise<Miracle> => {
  const $ = await getMiracleRoot()!;
  if (!$) {
    throw new Error("Failed to get root");
  }
  await browser.close();

  const miracleData: Miracle = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = tdToNumber($, row, 1);
    const slots = tdToNumber($, row, 2);
    const faith = tdToNumber($, row, 3);
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

export default getMiracleData;