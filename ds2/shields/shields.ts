import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { WeaponURL, UpgradeTable } from "../types";
import { nodesToText } from "../../lib/utils";

const BASE_URL = "https://darksouls2.wiki.fextralife.com/";

const sleep = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};

const getWeaponURLs = async (): Promise<WeaponURL[] | null> => {
  await start_browser();

  const getDs1WeaponUrls = async (): Promise<WeaponURL[] | null> => {
    const result = await getHtml(BASE_URL + "Shields");
    if (!result) {
      return null;
    }
    const { html, $ } = result;

    const table = $(".wiki_table>tbody").eq(0);
    const rows = table.find("tr").slice(1);
    const weapons: WeaponURL[] = [];

    rows.each((i, row) => {
      const element = $(row).find("td>a");
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

type ShieldData = {
  physical_defense: string;
  poison_resist: string;
  magic_defense: string;
  bleed_resist: string;
  fire_defense: string;
  petrify_resist: string;
  lightning_defense: string;
  curse_resist: string;
  dark_defense: string;
  durability: string;
  stability: string;
  weight: string;
  str: string;
  str_scaling: string;
  dex: string;
  dex_scaling: string;
  int: string;
  int_scaling: string;
  faith: string;
  faith_scaling: string;
  type: string;
  attack_type: string;
  upgrades: UpgradeTable;
};

const getWeaponData = async (
  cheerioRoot: cheerio.Root
): Promise<ShieldData> => {
  const $ = cheerioRoot;

  await browser.close();

  const table = $(".wiki_table").eq(0);
  const physical_defense = table.find("tr").eq(2).find("td").eq(1).text();
  const poison_resist = table.find("tr").eq(2).find("td").eq(3).text();
  const magic_defense = table.find("tr").eq(3).find("td").eq(1).text();
  const bleed_resist = table.find("tr").eq(3).find("td").eq(3).text();
  const fire_defense = table.find("tr").eq(4).find("td").eq(1).text();
  const petrify_resist = table.find("tr").eq(4).find("td").eq(3).text();
  const lightning_defense = table.find("tr").eq(5).find("td").eq(1).text();
  const curse_resist = table.find("tr").eq(5).find("td").eq(3).text();
  const dark_defense = table.find("tr").eq(6).find("td").eq(1).text();
  const durability = table.find("tr").eq(6).find("td").eq(3).text();
  const stability = table.find("tr").eq(7).find("td").eq(1).text();
  const weight = table.find("tr").eq(7).find("td").eq(3).text();
  const [str, str_scaling] = nodesToText(
    $,
    table.find("tr").eq(10).find("td").eq(0)
  );
  const [dex, dex_scaling] = nodesToText(
    $,
    table.find("tr").eq(10).find("td").eq(1)
  );
  const [int, int_scaling] = nodesToText(
    $,
    table.find("tr").eq(10).find("td").eq(2)
  );
  const [faith, faith_scaling] = nodesToText(
    $,
    table.find("tr").eq(10).find("td").eq(3)
  );
  const type = table.find("tr").eq(11).find("td").eq(0).text().trim();
  const attack_type = table.find("tr").eq(11).find("td").eq(1).text().trim();

  return {
    physical_defense,
    poison_resist,
    magic_defense,
    bleed_resist,
    fire_defense,
    petrify_resist,
    lightning_defense,
    curse_resist,
    dark_defense,
    durability,
    stability,
    weight,
    str,
    str_scaling,
    dex,
    dex_scaling,
    int,
    int_scaling,
    faith,
    faith_scaling,
    type,
    attack_type,
    upgrades: {},
  };
};

const getUpgradeTable = async (cheerioRoot: cheerio.Root) => {
  const $ = cheerioRoot;

  const colNames = [
    "physical",
    "magic",
    "fire",
    "lightning",
    "dark",
    "physical_bonus",
    "dexterity_bonus",
    "magic_bonus",
    "fire_bonus",
    "lightning_bonus",
    "dark_bonus",
    "poison",
    "poison_def",
    "bleed",
    "bleed_def",
    "petrify_def",
    "curse_def",
    "physical_def",
    "magic_def",
    "fire_def",
    "lightning_def",
    "dark_def",
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
      if (i === 11) {
        const [poison, poison_def] = nodesToText($, rows.find("td").eq(i));
        upgradeTable[upgradeName]["poison"] = poison;
        upgradeTable[upgradeName]["poison_def"] = poison_def;
        continue;
      } else if (i === 12) {
        const [bleed, bleed_def] = nodesToText($, rows.find("td").eq(i));
        upgradeTable[upgradeName]["bleed"] = bleed;
        upgradeTable[upgradeName]["bleed_def"] = bleed_def;
        continue;
      }
      if (i > 12) {
        upgradeTable[upgradeName][colNames[i + 2]] = $(cells[i]).text().trim();
      } else {
        upgradeTable[upgradeName][colNames[i]] = $(cells[i]).text().trim();
      }
    }
  });

  return upgradeTable;
};

const scrapeAndSave = async (
  output: string = "shields"
): Promise<void | unknown> => {
  const weaponUrls = await getWeaponURLs();
  if (!weaponUrls) {
    console.log("Failed to get shield urls");
    return;
  }

  const allWeapons: {
    [key: string]: ShieldData;
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
  const res = await scrapeAndSave();
})();
