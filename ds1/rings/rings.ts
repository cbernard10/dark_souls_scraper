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
  url: string = "/Rings"
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

type Ring = {
  [key: string]: {
    effects: string[];
    acquisition: string[];
  };
};

const getRingData = async (): Promise<Ring> => {
  const $ = await getMagicRoot()!;
  if (!$) {
    throw new Error("Failed to get root");
  }

  await browser.close();

  const rings: Ring = {};
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(1);

  for (const row of rows) {
    const name = $(row).find("td").eq(0).text();
    const effects = nodesToText($, $(row).find("td").eq(1));
    const acquisition = nodesToText($, $(row).find("td").eq(2));

    rings[name] = {
      effects,
      acquisition,
    };
  }

  return rings;
};

export default getRingData;