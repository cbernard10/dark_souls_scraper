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
    const result = await getHtml(BASE_URL + "/Weapons");
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
  const weapons = [];
  console.log(urls.length);

  for (let i = 0; i < urls.length; i++) {
    const { name, url } = urls[i];
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
    console.log(name);
    let weaponData;
    try {
      weaponData = await getWeaponData($);
    } catch (e) {
      console.log(e);
      continue;
    }
    weapons.push({ name, ...weaponData });
    await sleep(1000);
  }

  await browser.close();
  return weapons;
};

export default getAllWeaponsData;
