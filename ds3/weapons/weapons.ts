import getHtml from "../../lib/getHtml";
import { browser, start_browser, page } from "../../lib/browser";
import { WeaponShieldData, WeaponURL } from "../types";
import { parseUpgradeTable, parseWeaponTable } from "../parser";

const BASE_URL = "https://darksouls3.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getWeaponURLs = async () => {
  const getDs1WeaponUrls = async () => {
    const result = await getHtml(BASE_URL + "/Weapons");
    if (!result) {
      return null;
    }
    const { html, $ } = result;

    const rows = $(".row").slice(3, $(".row").length - 1);
    console.log(rows.length);
    const weapons: { url: string }[] = [];

    rows.each((i, row) => {
      const element = $(row).find("div>.wiki_link");
      element.each((i, el) => {
        const url = $(el).attr("href")!;
        weapons.push({ url });
      });
    });

    return weapons;
  };

  const weaponUrls = await getDs1WeaponUrls();

  return weaponUrls;
};

const getWeaponData = async (
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

const getAllWeaponsData = async () => {
  await start_browser();
  const urls = await getWeaponURLs();
  if (!urls) {
    return;
  }
  const weapons: {
    [key: string]: unknown;
  }[] = [];
  console.log(urls.length);

  for (let i = 0; i < urls.length; i++) {
    const { url } = urls[i];
    let $;
    try {
      const result = await getHtml(BASE_URL + url)!;
      $ = result.$;
    } catch (e) {
      console.log(e);
      i--;
      continue;
    }
    if (!$) {
      continue;
    }
    console.log(url);
    let weaponData: { [key: string]: unknown } = {};
    try {
      weaponData = await getWeaponData($);
    } catch (e) {
      console.log(e);
      continue;
    }

    if (!weapons.map((w) => w.name).includes(weaponData.name)) {
      weapons.push({ ...weaponData });
    } else {
      console.log("duplicate weapon", weaponData.name);
    }

    await sleep(1000);
  }

  await browser.close();
  return weapons;
};

export default getAllWeaponsData;
