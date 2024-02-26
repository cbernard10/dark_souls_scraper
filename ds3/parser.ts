////////////////////////////////////////////////
//
//  Need to manually change in .json:
//  "" -> "Club" (Name of weapon is in a <span> but script looks for <h2>)
//  Requirements of Club: "C" -> 10
//  Delete upgrades of Dark Hand
//
////////////////////////////////////////////////

type UpgradeTable = {
  [key: string]: {
    [key: string]: string | number | null;
  };
};

const translate = Object.freeze({
  "/file/Dark-Souls-3/icon-wp_physicalAttack.png": "physical",
  "/file/Dark-Souls-3/icon-magicbonus.png": "magic",
  "/file/Dark-Souls-3/icon-firebonus.png": "fire",
  "/file/Dark-Souls-3/icon-lightningbonus.png": "lightning",
  "/file/Dark-Souls-3/icon-darkbonus.png": "dark",
  "/file/Dark-Souls-3/STR.jpg": "strength_bonus",
  "/file/Dark-Souls-3/DEX.jpg": "dexterity_bonus",
  "/file/Dark-Souls-3/INT.jpg": "intelligence_bonus",
  "/file/Dark-Souls-3/FTH.jpg": "faith_bonus",
  "/file/Dark-Souls-3/icon-wp_poisonbld.png": "poison",
  "/file/Dark-Souls-3/icon-wp_frost.png": "frost",
  "/file/Dark-Souls-3/icon-wp_bleed.png": "bleed",
  "/file/Dark-Souls-3/icon-wp_physicaldef.png": "physical_defense",
  "/file/Dark-Souls-3/icon-wp_magicdef.png": "magic_defense",
  "/file/Dark-Souls-3/icon-wp_firedef.png": "fire_defense",
  "/file/Dark-Souls-3/icon-wp_lightningdef.png": "lightning_defense",
  "/file/Dark-Souls-3/icon-wp_darkdef.png": "dark_defense",
  "/file/Dark-Souls-3/spell_buff.jpg": "spell_buff",
  "/file/Dark-Souls-3/range.jpg": "range",
  "/file/Dark-Souls-3/icon-wp_stability2.png": "stability",
  "/file/Dark-Souls-3/icon-wp_stability.png": "stability",
  "icon-wp_luck.png": "luck",
});

const parseTableElement = (str: string) => {
  if (["-", "–", "--", "", "+", "???", "?", "??"].includes(str)) {
    return null;
  }
  if (parseFloat(str) || parseFloat(str) === 0) {
    return parseFloat(str);
  }
  return str;
};

const getNumericFromString = (str: string): number | null => {
  return str
    .split("")
    .filter((x) => !isNaN(parseInt(x)))
    .join("") === ""
    ? null
    : parseInt(
        str
          .split("")
          .filter((x) => !isNaN(parseInt(x)))
          .join("")
      );
};

export const parseUpgradeTable = ($: cheerio.Root): UpgradeTable => {
  let starting_idx = 1;
  if (
    $(".wiki_table").eq(1).find("tbody>tr>td").eq(0).text().trim() ===
      "Attack Type" ||
    $(".wiki_table").eq(1).find("tbody>tr>td").eq(0).text().trim() ===
      "Max HP" ||
    $(".wiki_table").eq(1).find("tbody>tr>td").eq(0).text().trim() === "Luck"
  ) {
    starting_idx = 2;
    console.log(
      `weapon ${$(".wiki_table")
        .eq(0)
        .find("h2")
        .text()
        .trim()} has frame data table`
    );
  }
  const table = $(".wiki_table").eq(starting_idx);

  const rows = table.find("tr").slice(2);
  const upgradeTable: UpgradeTable = {};

  let colNames = table
    .find("tr")
    .eq(1)
    .find("th")
    .slice(1)
    .map((i, el) => {
      if ($(el).text().trim() === "Luck") {
        return "icon-wp_luck.png";
      }
      return $(el).find("img").attr("src");
    })
    .get();

  if (colNames.length === 0) {
    colNames = table
      .find("tr")
      .eq(1)
      .find("td")
      .slice(0)
      .map((i, el) => $(el).find("img").attr("src"))
      .get();
  }

  for (const row of rows) {
    const upgradeRow: {
      [key: string]: string | number | null;
    } = {};
    const upgradeName =
      $(row).find("th").eq(0).text().trim() === ""
        ? "Regular"
        : $(row).find("th").eq(0).text().trim();
    for (const col of colNames) {
      const idx = colNames.indexOf(col);
      const val = $(row).find("td").eq(idx).text().trim();
      upgradeRow[translate[col as keyof typeof translate]] =
        parseTableElement(val);
    }
    upgradeTable[upgradeName] = upgradeRow;
  }

  return upgradeTable;
};

type WeaponTable = {
  name: string;
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  critical: number;
  durability: number;
  weight: number;
  auxiliary: {
    [key: string]: number;
  } | null;
  weapon_type: string;
  attack_type: string;
  special: string;
  stability: number;
  fp: string;
  spell_buff: number | null;
};

export const parseWeaponTable = ($: cheerio.Root): WeaponTable => {
  const table = $(".wiki_table").eq(0);
  const name = table.find("h2").text().trim();

  let rows = table.find("tr").slice(8);
  const hasBonusRow = rows.length === 7;
  const bonusRow = hasBonusRow ? rows.eq(0) : null;
  const rest = hasBonusRow ? rows.slice(1) : rows;

  let hasAuxiliary = false;
  let hasSpellBuff = false;

  let auxType = "";
  let auxValue = 0;
  let spell_buff = null;

  if (hasBonusRow) {
    if (bonusRow!.find("td").length === 1) {
      hasAuxiliary = bonusRow!.find("td").eq(0).text().includes("Aux");
      hasSpellBuff = false;
      auxType =
        translate[
          bonusRow!
            .find("td")
            .eq(0)
            .find("img")
            .attr("src") as keyof typeof translate
        ];
      auxValue = getNumericFromString(bonusRow!.find("td").eq(0).text()) ?? 0;
    }
    if (bonusRow!.find("td").length === 4) {
      hasAuxiliary =
        bonusRow!.find("td").eq(0).text() === "Aux" &&
        bonusRow!.find("td").eq(1).text().trim() !== "" &&
        bonusRow!.find("td").eq(1).text().trim() !== "-" &&
        bonusRow!.find("td").eq(1).text().trim() !== "–" &&
        bonusRow!.find("td").eq(1).text().trim() !== "--" &&
        bonusRow!.find("td").eq(1).text().trim() !== "None";
      hasSpellBuff =
        translate[
          bonusRow!.find("img").attr("src") as keyof typeof translate
        ] === "spell_buff";
      if (hasAuxiliary) {
        auxType =
          translate[
            bonusRow!
              .find("td")
              .eq(1)
              .find("img")
              .attr("src") as keyof typeof translate
          ];
        auxValue = parseFloat(bonusRow!.find("td").eq(1).text());
      }
      if (hasSpellBuff) {
        spell_buff = parseFloat(bonusRow!.find("td").eq(3).text());
      }
    }
  }
  const weight = parseFloat(
    table.find("tr").eq(7).find("td").eq(1).text().trim()
  );
  const critical = parseFloat(
    table.find("tr").eq(6).find("td").eq(1).text().trim()
  );
  const stability = parseFloat(
    table.find("tr").eq(6).find("td").eq(3).text().trim()
  );
  const durability = parseFloat(
    table.find("tr").eq(7).find("td").eq(3).text().trim()
  );

  let requirements_are_top = true;
  const top_cells = $(rest[2])
    .find("td")
    .map((i, el) => $(el).text().trim())
    .get();
  const bottom_cells = $(rest[3])
    .find("td")
    .map((i, el) => $(el).text().trim())
    .get();

  if (bottom_cells.some((x) => !isNaN(parseInt(x)))) {
    requirements_are_top = false;
  }
  if (top_cells.some((x) => !isNaN(parseInt(x))) && !requirements_are_top) {
    console.log("top cells", top_cells);
    console.log("bottom cells", bottom_cells);
    console.log("Could not parse requirements");
  }

  console.log(
    requirements_are_top ? "top" : "bottom",
    "cells",
    top_cells,
    bottom_cells
  );

  const requirements = Object.fromEntries(
    ["strength", "dexterity", "intelligence", "faith"].map((x, i) => [
      x,
      parseTableElement(
        requirements_are_top ? top_cells[i] : bottom_cells[i]
      ) as number,
    ])
  );

  // const requirements = {
  //   strength: ["-", "–"].includes($(rest[3]).find("td").eq(0).text().trim())
  //     ? 0
  //     : parseInt($(rest[3]).find("td").eq(0).text().trim()),
  //   dexterity: ["-", "–"].includes($(rest[3]).find("td").eq(1).text().trim())
  //     ? 0
  //     : parseInt($(rest[3]).find("td").eq(1).text().trim()),
  //   intelligence: ["-", "–"].includes($(rest[3]).find("td").eq(2).text().trim())
  //     ? 0
  //     : parseInt($(rest[3]).find("td").eq(2).text().trim()),
  //   faith: ["-", "–"].includes($(rest[3]).find("td").eq(3).text().trim())
  //     ? 0
  //     : parseInt($(rest[3]).find("td").eq(3).text().trim()),
  // };

  if (hasAuxiliary) {
    return {
      name,
      requirements,
      critical,
      durability,
      weight,
      auxiliary: { [`${auxType}`]: auxValue },
      weapon_type: $(rest[4]).find("td").eq(1).text(),
      attack_type: $(rest[4]).find("td").eq(3).text(),
      special: $(rest[5]).find("td").eq(1).text(),
      fp: $(rest[5]).find("td").eq(3).text().split(" ")[0].trim(),
      stability,
      spell_buff,
    };
  } else {
    return {
      name,
      critical,
      durability,
      weight,
      requirements,
      auxiliary: null,
      weapon_type: $(rest[4]).find("td").eq(1).text(),
      attack_type: $(rest[4]).find("td").eq(3).text(),
      special: $(rest[5]).find("td").eq(1).text(),
      fp: $(rest[5]).find("td").eq(3).text().split(" ")[0].trim(),
      stability,
      spell_buff,
    };
  }
};
