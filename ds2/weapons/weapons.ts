import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { DS2WeaponData, WeaponURL, UpgradeTable } from "../types";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls2.wiki.fextralife.com/";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getWeaponURLs = async (): Promise<WeaponURL[] | null> => {
  await start_browser();

  const getDs2WeaponUrls = async (): Promise<WeaponURL[] | null> => {
    const result = await getHtml(BASE_URL + "Weapons+Sortable");
    if (!result) {
      return null;
    }
    const { html, $ } = result;

    const rows = $(".wiki_table").eq(0).find("tr").slice(1);
    const weapons: WeaponURL[] = [];

    rows.each((i, row) => {
      const element = $(row).find("td").eq(0).find("a");
      element.each((i, el) => {
        const name = $(el).text();
        const url = $(el).attr("href")!;
        weapons.push({ name, url });
      });
    });

    return weapons;
  };

  const weaponUrls = await getDs2WeaponUrls();

  await browser.close();

  return weaponUrls
    ? weaponUrls.sort((a, b) => a.name.localeCompare(b.name))
    : null;
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
): Promise<DS2WeaponData> => {
  const $ = cheerioRoot;

  await browser.close();

  const table = $(".wiki_table").eq(0);
  const stability = parseInt(
    table.find("tr").eq(3).find("td").eq(3).text().trim()
  );
  const durability = parseInt(
    table.find("tr").eq(4).find("td").eq(3).text().trim()
  );
  const weight = parseInt(
    table.find("tr").eq(5).find("td").eq(3).text().trim()
  );

  const requirementsTable = table.find("tr").eq(8);

  const str = parseInt($(requirementsTable).find("td").eq(0).text().trim());
  const dex = parseInt($(requirementsTable).find("td").eq(1).text().trim());
  const int = parseInt($(requirementsTable).find("td").eq(2).text().trim());
  const faith = parseInt($(requirementsTable).find("td").eq(3).text().trim());

  const type = table.find("tr").eq(11).find("td").eq(0).text().trim();
  const attack_type = table.find("tr").eq(12).find("td").eq(0).text().trim();
  const enchantable =
    table.find("tr").eq(13).find("td").eq(0).text().trim() === "Yes"
      ? true
      : false;
  const special = table.find("tr").eq(14).find("td").eq(0).text().trim();

  return {
    requirements: {
      strength: str || 0,
      dexterity: dex || 0,
      intelligence: int || 0,
      faith: faith || 0,
    },
    stability,
    durability,
    weight,
    type,
    attack_type,
    enchantable,
    special,
    upgrades: {},
  };
};

const getUpgradeTable = async (cheerioRoot: cheerio.Root) => {
  const $ = cheerioRoot;

  const colNames = [
    "physical",
    "magicdmg",
    "fire",
    "lightning",
    "dark",
    "counter",
    "strength",
    "dexterity",
    "magic",
    "fire",
    "lightning",
    "dark",
    "poison",
    "bleed",
    "physical_defense",
    "magic_defense",
    "fire_defense",
    "lightning_defense",
    "dark_defense",
  ];

  const table = $(".wiki_table").eq(1);
  const rows = table.find("tr").slice(2);

  const upgradeTable: UpgradeTable = {};

  rows.each((i, el) => {
    const upgradeName = $(el).find("th").text().trim();

    const cells = $(el).find("td");

    upgradeTable[upgradeName] = {};

    for (let i = 0; i < cells.length; i++) {
      if (colNames[i] === "counter") {
        const [counter, poise] = nodesToText($, $(cells[i]));

        upgradeTable[upgradeName]["counter"] = parseInt(counter);
        upgradeTable[upgradeName]["poise"] = parseInt(poise);
      } else {
        let cellContent: string | number = $(cells[i]).text().trim();
        cellContent =
          cellContent === "–" || cellContent === "-" ? 0 : cellContent;
        const parsed = parseInt(`${cellContent}`);
        upgradeTable[upgradeName][colNames[i]] = parsed ? parsed : cellContent;
      }
    }
  });

  return upgradeTable;
};

const scrapeAndSave = async (
  output: string = "weapons"
): Promise<void | unknown> => {
  const weaponUrls = await getWeaponURLs();
  if (!weaponUrls) {
    console.log("Failed to get weapon urls");
    return;
  }

  const allWeapons: {
    [key: string]: DS2WeaponData;
  } = {};

  for (let i = 0; i < weaponUrls.length; i++) {
    const weapon = weaponUrls[i];
    const { name, url } = weapon;
    console.log("Scraping", name);
    let $;
    try {
      $ = await getWeaponRoot(url!)!;
    } catch (e) {
      console.log("Failed to get weapon root");
      await sleep(1500);
      i--;
      continue;
    }
    const weaponData = await getWeaponData($!);
    const upgradeTable = await getUpgradeTable($!);
    allWeapons[name] = {
      ...weaponData,
      upgrades: upgradeTable,
    };
    await sleep(1500);
  }

  fs.writeFileSync(
    `${__dirname}/${output}.json`,
    JSON.stringify(allWeapons, null, 2)
  );
};

(async () => {
  const weps = await scrapeAndSave();
  console.log(weps);
})();
