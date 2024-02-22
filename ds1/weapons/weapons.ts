import getHtml from "../../lib/getHtml";
import { browser, start_browser } from "../../lib/browser";
import fs from "fs";
import { WeaponData, WeaponURL, UpgradeTable } from "../types";
import { has } from "cheerio/lib/api/traversing";

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
): Promise<WeaponData> => {
  const $ = cheerioRoot;

  await browser.close();

  const table = $(".wiki_table").eq(0);

  const damageTable = table.find("tr").filter((i, el) => {
    return [1, 2, 3, 4].includes(i);
  });

  const requirementsTable = table.find("tr").filter((i, el) => {
    return i === 7;
  });

  let otherTable = table.find("tr").filter((i, el) => {
    return [8, 9, 10, 11, 12].includes(i);
  });

  let hasAuxiliary =
    $(otherTable[0]).find("th").text().trim() === "Auxiliary" ||
    $(otherTable[0]).find("th").text().trim() === "Auxiliar" ||
    $(otherTable[0]).find("th").text().trim() === "Auxillary";

  const other: {
    auxiliary: string | null;
    type: string;
    attack_type: string;
    enchantable: boolean;
    special: string;
  } = hasAuxiliary
    ? {
        auxiliary: $(otherTable[0]).find("td").eq(0).text().trim(),
        type: $(otherTable[1]).find("td").eq(0).text().trim(),
        attack_type: $(otherTable[2]).find("td").eq(0).text().trim(),
        enchantable: $(otherTable[3]).find("td").eq(0).text().trim() === "Yes",
        special: $(otherTable[4]).find("td").eq(0).text().trim(),
      }
    : {
        auxiliary: null,
        type: $(otherTable[0]).find("td").eq(0).text().trim(),
        attack_type: $(otherTable[1]).find("td").eq(0).text().trim(),
        enchantable: $(otherTable[2]).find("td").eq(0).text().trim() === "Yes",
        special: $(otherTable[3]).find("td").eq(0).text().trim(),
      };

  if (
    other.auxiliary &&
    (other.auxiliary === "No" ||
      other.auxiliary === "–" ||
      other.auxiliary === "-")
  ) {
    other.auxiliary = null;
  }

  const str = $(requirementsTable).find("td").eq(0).text().trim();
  const dex = $(requirementsTable).find("td").eq(1).text().trim();
  const int = $(requirementsTable).find("td").eq(2).text().trim();
  const faith = $(requirementsTable).find("td").eq(3).text().trim();

  return {
    damage: {
      physical: $(damageTable[0]).find("td").eq(1).text().trim(),
      magic: $(damageTable[0]).find("td").eq(3).text().trim(),
      fire: $(damageTable[2]).find("td").eq(1).text().trim(),
      lightning: $(damageTable[3]).find("td").eq(1).text().trim(),
    },
    requirements: {
      strength: str === "–" || str === "-" ? null : str,
      dexterity: dex === "–" || dex === "-" ? null : dex,
      intelligence: int === "–" || int === "-" ? null : int,
      faith: faith === "–" || faith === "-" ? null : faith,
    },
    critical: $(damageTable[0]).find("td").eq(3).text().trim(),
    stability: $(damageTable[1]).find("td").eq(3).text().trim(),
    auxiliary: other.auxiliary,
    durability: $(damageTable[2]).find("td").eq(3).text().trim(),
    weight: $(damageTable[3]).find("td").eq(3).text().trim(),
    type: other.type,
    attack_type: other.attack_type,
    enchantable: other.enchantable,
    special: other.special,
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

const scrapeAndSave = async (output: string = "weapons"): Promise<void> => {
  const weaponUrls = await getWeaponURLs();
  if (!weaponUrls) {
    console.log("Failed to get weapon urls");
    return;
  }

  const allWeapons: {
    [key: string]: WeaponData;
  } = {};

  for (const weapon of weaponUrls) {
    if (weapon.name === "Pyromancy Flame (Upgraded)") {
      continue;
    }
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

    if (weapon.name === "Canvas Talisman") {
      data.attack_type = "Strike";
      data.type = "Talisman";
    }

    allWeapons[weapon.name] = { ...data, upgrades: upgradeTable };
    await sleep(1500);
  }

  fs.writeFileSync(
    `${__dirname}/out/${output}.json`,
    JSON.stringify(allWeapons, null, 2)
  );
};

(async () => {
  await scrapeAndSave();
})();
