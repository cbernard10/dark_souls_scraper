import getHtml from "../../lib/getHtml";
import { browser, start_browser, page } from "../../lib/browser";
import { WeaponShieldData, WeaponURL } from "../types";
import { parseUpgradeTable, parseWeaponTable } from "../util";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getWeaponURLs = async (): Promise<WeaponURL[] | null> => {
  const getDs1WeaponUrls = async (): Promise<WeaponURL[] | null> => {
    const result = await getHtml(BASE_URL + "/Shields");
    if (!result) {
      return null;
    }
    const { html, $ } = result;

    const rows = $(".row").slice(3, $(".row").length - 1);
    const weapons: WeaponURL[] = [];

    rows.each((i, row) => {
      const element = $(row).find("div>a");
      element.each((i, el) => {
        const name = $(el).text();
        const url = $(el).attr("href")!;
        weapons.push({ name, url });
      });
    });

    return weapons;
  };

  const weaponUrls = await getDs1WeaponUrls();

  return weaponUrls
    ? weaponUrls.sort((a, b) => a.name.localeCompare(b.name))
    : null;
};

const getShieldData = async (
  cheerioRoot: cheerio.Root
): Promise<WeaponShieldData> => {
  const $ = cheerioRoot;

  const weaponTable = parseWeaponTable($);
  const upgradeTable = parseUpgradeTable($);

  return {
    ...weaponTable,
    upgrades: upgradeTable,
  };
};

const getAllShieldsData = async () => {
  await start_browser();
  const urls = await getWeaponURLs();
  if (!urls) {
    return;
  }
  const shields = [];
  console.log(urls.length);

  for (let i = 0; i < urls.length; i++) {
    const { name, url } = urls[i];
    let $;
    try {
      const html$ = await getHtml(BASE_URL + url)!;
      if (!html$) {
        continue;
      }
      $ = html$.$;
    } catch (e) {
      console.error(e);
      i--;
      continue;
    }
    if (!$) {
      continue;
    }
    console.log(name);
    const shieldData = await getShieldData($);
    shields.push({ name, ...shieldData });
    await sleep(1000);
  }

  await browser.close();
  return shields;
};

export default getAllShieldsData;
