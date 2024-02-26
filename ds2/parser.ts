import { nodesToText } from "../lib/utils";
import getHtml from "../lib/getHtml";
import { start_browser, browser } from "../lib/browser";

type UpgradeTable = {
  [key: string]: {
    [key: string]: string | number | null;
  };
};

const translate = Object.freeze({
  "/file/Dark-Souls-2/icon-wp_physicalAttack.png": "physical",
  "/file/Dark-Souls-2/icon-wp_magdmg.png": "magic",
  "/file/Dark-Souls-2/icon-wp_firedmg.png": "fire",
  "/file/Dark-Souls-2/icon-wp_lightningdmg.png": "lightning",
  "/file/Dark-Souls-2/icon-darkbonus.png": "dark",
  "/file/Dark-Souls-2/icon-strengthscale_green.png": "strength_bonus",
  "/file/Dark-Souls-2/icon-strengthscale_green_22.png": "strength_bonus",
  "/file/Dark-Souls-2/icon-dexscale_green.png": "dexterity_bonus",
  "/file/Dark-Souls-2/icon-dexscale_green_22.png": "dexterity_bonus",
  "/file/Dark-Souls-2/icon-magicbonus_green.png": "magic_bonus",
  "/file/Dark-Souls-2/icon-magicbonus_green_22.png": "magic_bonus",
  "/file/Dark-Souls-2/icon-firebonus_green.png": "fire_bonus",
  "/file/Dark-Souls-2/icon-firebonus_green_22.png": "fire_bonus",
  "/file/Dark-Souls-2/icon-lgtngbonus_green.png": "lightning_bonus",
  "/file/Dark-Souls-2/icon-lgtngbonus_green_22.png": "lightning_bonus",
  "/file/Dark-Souls-2/icon-darkbonus_green.png": "dark_bonus",
  "/file/Dark-Souls-2/icon-darkbonus_green_22.png": "dark_bonus",
  "/file/Dark-Souls-2/icon-wp_poisonbld.png": "poison",
  "/file/Dark-Souls-2/icon-wp_poisondef.png": "poison_defense",
  "/file/Dark-Souls-2/icon-wp_bleed.png": "bleed",
  "/file/Dark-Souls-2/icon-wp_bleeddef.png": "bleed_defense",
  "/file/Dark-Souls-2/icon-wp_petrifydef.png": "petrify_defense",
  "/file/Dark-Souls-2/icon-wp_cursedef.png": "curse_defense",
  "/file/Dark-Souls-2/icon-wp_physicaldef.png": "physical_defense",
  "/file/Dark-Souls-2/icon-wp_magicdef.png": "magic_defense",
  "/file/Dark-Souls-2/icon-wp_firedef.png": "fire_defense",
  "/file/Dark-Souls-2/icon-wp_lightningdef.png": "lightning_defense",
  "/file/Dark-Souls-2/icon-wp_darkdef.png": "dark_defense",
  "/file/Dark-Souls-2/icon-wp_stability.png": "stability",
  "/file/Dark-Souls-2/icon-Counter%26poisedamage.png": "poise_damage",
  "/file/Dark-Souls-2/icon-wp_CastSpeed.png": "cast_speed",
  "/file/Dark-Souls-2/icon-wp_range.png": "range",
});

const parseTableElement = (str: string) => {
  if (["-", "–", "--", "", "+", "???", "?", "??", "&nbsp;"].includes(str)) {
    return null;
  }
  if (parseFloat(str) || parseFloat(str) === 0) {
    return parseFloat(str);
  }
  return str;
};

const splitTdToTextOrText = (
  $: cheerio.Root,
  td: cheerio.Cheerio
): string[] => {
  // extracts text from a node whose children are <br> separated
  const res =
    $(td)!
      .html()
      ?.split("<br>")
      .map((effect) => effect.replace(/<[^>]*>?/gm, "").trim()) ?? [];
  return res;
};

export const parseUpgradeTable = ($: cheerio.Root): UpgradeTable => {
  const table = $(".wiki_table").eq(1);
  const rows = table.find("tr").slice(2);
  const upgradeTable: UpgradeTable = {};

  const colNames = table
    .find("tr")
    .eq(1)
    .find("th")
    .slice(1)
    .map((i, el) =>
      $(el)
        .find("img")
        .map((i, el) => $(el).attr("src"))
        .get()
    )
    .get();

  for (const row of rows) {
    const upgradeRow: {
      [key: string]: string | number | null;
    } = {};
    const upgradeName =
      $(row).find("th").eq(0).text().trim() === ""
        ? "Regular"
        : $(row).find("th").eq(0).text().trim();

    // first expand the cells with 2 elements

    const cellsContent: (string | number | null)[] = [];
    for (let i = 0; i < colNames.length; i++) {
      const colName = colNames[i];
      let val: string[] = [];
      // @ts-ignore
      if (translate[colName] !== "poise_damage") {
        // we need to do that because of the messed up formatting of the table
        // the column has two images in a single <img> tag which cannot be expanded into two elements
        // the poise and counter damage will be extracted in the weapon table, but we need to keep them in the upgrade table
        // to have a consistent number of columns.
        val = splitTdToTextOrText($, $(row).find("td").eq(i));
      } else {
        val = [splitTdToTextOrText($, $(row).find("td").eq(i))[0]];
      }
      if (val && val.length === 2) {
        cellsContent.push(parseTableElement(val[0]));
        cellsContent.push(parseTableElement(val[1]));
        // i++;
      } else if (val && val.length === 1) {
        cellsContent.push(parseTableElement(val[0]));
      }
    }
    if (cellsContent.length !== colNames.length) {
      throw new Error("Invalid table: unexpected number of columns");
    }

    for (const col of colNames) {
      const idx = colNames.indexOf(col);
      const val = cellsContent[idx];
      upgradeRow[translate[col]] = parseTableElement(val);
    }
    upgradeTable[upgradeName] = upgradeRow;
  }

  return upgradeTable;
};

type WeaponTable = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  counter_damage: number;
  poise_damage: number;
  stability: number;
  durability: number;
  weight: number;
  weapon_type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
};

export const parseWeaponTable = ($: cheerio.Root): WeaponTable => {
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(8);
  // const hasAuxiliary = rows.length === 6;
  if (rows.length !== 7) {
    throw new Error("Invalid table: unexpected number of columns");
  }

  const counter_damage = parseFloat(
    table.find("tr").eq(1).find("td").eq(3).text().trim()
  );
  const poise_damage = parseFloat(
    table.find("tr").eq(2).find("td").eq(3).text().trim()
  );
  const stability = parseFloat(
    table.find("tr").eq(3).find("td").eq(3).text().trim()
  );
  const durability = parseFloat(
    table.find("tr").eq(4).find("td").eq(3).text().trim()
  );
  const weight = parseFloat(
    table.find("tr").eq(5).find("td").eq(3).text().trim()
  );

  const requirements = {
    strength: ["-", "–"].includes($(rows[0]).find("td").eq(0).text().trim())
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(0))[0]),
    dexterity: ["-", "–"].includes($(rows[0]).find("td").eq(1).text().trim())
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(1))[0]),
    intelligence: ["-", "–"].includes($(rows[0]).find("td").eq(2).text().trim())
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(2))[0]),
    faith: ["-", "–"].includes($(rows[0]).find("td").eq(3).text().trim())
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(3))[0]),
  };

  return {
    requirements,
    counter_damage,
    poise_damage,
    stability,
    durability,
    weight,
    weapon_type: $(rows[3]).find("td").eq(0).text(),
    attack_type: $(rows[4]).find("td").eq(0).text(),
    enchantable: $(rows[5]).find("td").eq(0).text().trim() === "Yes",
    special: $(rows[6]).find("td").eq(0).text(),
  };
};

type ShieldTable = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  durability: number;
  weight: number;
  weapon_type: string;
  attack_type: string;
  special: string;
};

export const parseShieldTable = ($: cheerio.Root): ShieldTable => {
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(10);
  // const hasAuxiliary = rows.length === 6;
  if (rows.length !== 3) {
    throw new Error("Invalid table: unexpected number of columns");
  }

  const durability = parseFloat(
    table.find("tr").eq(6).find("td").eq(3).text().trim()
  );
  const weight = parseFloat(
    table.find("tr").eq(7).find("td").eq(3).text().trim()
  );

  const requirements = {
    strength: ["-", "–", "--"].includes(
      $(rows[0]).find("td").eq(0).text().trim()
    )
      ? 0
      : isNaN(parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(0))[0]))
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(0))[0]),
    dexterity: ["-", "–", "--"].includes(
      $(rows[0]).find("td").eq(1).text().trim()
    )
      ? 0
      : isNaN(parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(1))[0]))
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(1))[0]),
    intelligence: ["-", "–", "--"].includes(
      $(rows[0]).find("td").eq(2).text().trim()
    )
      ? 0
      : isNaN(parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(2))[0]))
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(2))[0]),
    faith: ["-", "–", "--"].includes($(rows[0]).find("td").eq(3).text().trim())
      ? 0
      : isNaN(parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(3))[0]))
      ? 0
      : parseInt(splitTdToTextOrText($, $(rows[0]).find("td").eq(3))[0]),
  };

  return {
    requirements,
    durability,
    weight,
    weapon_type: $(rows[1]).find("td").eq(0).text(),
    attack_type: $(rows[1]).find("td").eq(1).text(),
    special: $(rows[2]).find("td").eq(1).text(),
  };
};

// (async () => {
//   await start_browser();
//   const result = await getHtml(
//     "https://darksouls2.wiki.fextralife.com/Archdrake+Shield"
//   );
//   await browser.close();
//   if (!result) {
//     return;
//   }
//   const { $ } = result;
//   // console.log(parseUpgradeTable($));
//   console.log(parseShieldTable($));
// })();
