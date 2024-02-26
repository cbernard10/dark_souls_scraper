import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import { nodesToText } from "../../lib/utils";
import { tdToNumber } from "../../lib/utils";

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
    uses: number;
    slots: number;
    description: string;
    acquisition: string[];
    cost: string;
    type: string;
  };
};

const getPyromancyData = async (): Promise<Pyromancy> => {
  const $ = await getPyromancyRoot()!;
  if (!$) {
    throw new Error("Failed to get root");
  }

  await browser.close();

  const pyromancyData: Pyromancy = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const uses = tdToNumber($, row, 1);
    const slots = tdToNumber($, row, 2);
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

export default getPyromancyData;
