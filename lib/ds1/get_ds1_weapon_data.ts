import getHtml from "../getHtml";
import { browser, start_browser } from "../browser";
import fs from "fs";
import { WeaponData, WeaponURL, UpgradeTable } from "./types";

const BASE_URL = "https://darksouls.wiki.fextralife.com";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getWeaponURLs = async (): Promise<WeaponURL[] | null> => {
  await start_browser();

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

  await browser.close();

  if (!weaponUrls) {
    return null;
  }

  return weaponUrls.sort((a, b) => a.name.localeCompare(b.name));
};

const getWeaponRoot = async (
  url: string
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

const getWeaponData = async (
  cheerioRoot: cheerio.Root
): Promise<WeaponData> => {
  const $ = cheerioRoot;

  await browser.close();

  const table = $(".wiki_table").eq(0);

  const rows = table.find("tr").filter((i, el) => {
    return [1, 2, 3, 4, 7, 8, 9, 10].includes(i);
  });

  const phys = $(rows[0]).find("td").eq(1).text().trim();
  const crit = $(rows[0]).find("td").eq(3).text().trim();
  const magic = $(rows[1]).find("td").eq(1).text().trim();
  const stab = $(rows[1]).find("td").eq(3).text().trim();
  const fire = $(rows[2]).find("td").eq(1).text().trim();
  const dur = $(rows[2]).find("td").eq(3).text().trim();
  const light = $(rows[3]).find("td").eq(1).text().trim();
  const weight = $(rows[3]).find("td").eq(3).text().trim();

  const str = $(rows[4]).find("td").eq(0).text().trim();
  const dex = $(rows[4]).find("td").eq(1).text().trim();
  const int = $(rows[4]).find("td").eq(2).text().trim();
  const fth = $(rows[4]).find("td").eq(3).text().trim();

  const type = $(rows[5]).find("td").eq(0).text().trim();
  const atk_type = $(rows[6]).find("td").eq(0).text().trim();
  const ench = $(rows[7]).find("td").eq(0).text().trim() === "Yes";

  return {
    damage: {
      physical: phys,
      magic,
      fire,
      lightning: light,
    },
    requirements: {
      strength: str,
      dexterity: dex,
      intelligence: int,
      faith: fth,
    },
    critical: crit,
    stability: stab,
    durability: dur,
    weight,
    type,
    attack_type: atk_type,
    enchantable: ench,
    upgrades: undefined,
  };
};

const getUpgradeTable = async (cheerioRoot: cheerio.Root) => {
  const $ = cheerioRoot;

  const colNames = [
    "physical",
    "magic",
    "fire",
    "lightning",
    "strength",
    "dexterity",
    "intelligence",
    "faith",
    "divine",
    "occult",
    "physical defense",
    "magic defense",
    "fire defense",
    "lightning defense",
    "stability",
  ];

  const table = $(".wiki_table").eq(1);
  const rows = table.find("tr").slice(2);

  const upgradeTable: UpgradeTable = {};

  rows.each((i, el) => {
    const upgradeName = $(el).find("th").text().trim();
    const cells = $(el).find("td");

    upgradeTable[upgradeName] = {};
    for (let i = 0; i < cells.length; i++) {
      upgradeTable[upgradeName][colNames[i]] = $(cells[i]).text().trim();
    }
  });

  return upgradeTable;
};

const scrapeAndSave = async (output: string = "ds1_weapons"): Promise<void> => {
  const weaponUrls = await getWeaponURLs();
  if (!weaponUrls) {
    console.log("Failed to get weapon urls");
    return;
  }

  const allWeapons: {
    [key: string]: WeaponData;
  } = {};

  for (const weapon of weaponUrls) {
    console.log("Scraping", weapon.name);
    const $ = await getWeaponRoot(weapon.url!);
    if (!$) {
      console.log("Failed to get weapon root");
      return;
    }
    const data = await getWeaponData($);
    if (!data) {
      console.log("Failed to get weapon data for", weapon.name);
      continue;
    }

    const upgradeTable = await getUpgradeTable($);
    if (!upgradeTable) {
      console.log("Failed to get upgrade table for", weapon.name);
      continue;
    }

    allWeapons[weapon.name] = { ...data, upgrades: upgradeTable };
    await sleep(1000);
  }

  fs.writeFileSync(
    `${__dirname}/out/${output}.json`,
    JSON.stringify(allWeapons, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
