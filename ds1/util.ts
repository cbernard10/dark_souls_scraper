type UpgradeTable = {
  [key: string]: {
    [key: string]: string | number | null;
  };
};

const translate = Object.freeze({
  "/file/Dark-Souls/physical_damage_dark_souls.jpg": "physical",
  "/file/Dark-Souls/icon_dmg_phy.png": "physical",
  "/file/Dark-Souls/magic_damage_dark_souls.jpg": "magic",
  "/file/Dark-Souls/icon_dmg_magi.png": "magic",
  "/file/Dark-Souls/fire_damage_dark_souls.jpg": "fire",
  "/file/Dark-Souls/icon_dmg_fire.png": "fire",
  "/file/Dark-Souls/lightning_damage_dark_souls.jpg": "lightning",
  "/file/Dark-Souls/icon_dmg_lightn.png": "lightning",
  "/file/Dark-Souls/critical_dark_souls.jpg": "critical",
  "/file/Dark-Souls/icon_dmg_cbonus.png": "critical",
  "/file/Dark-Souls/strength_dark_souls.jpg": "strength",
  "/file/Dark-Souls/icon_strength.png": "strength",
  "/file/Dark-Souls/dexterity_dark_souls.jpg": "dexterity",
  "/file/Dark-Souls/icon_dexterity.png": "dexterity",
  "/file/Dark-Souls/intelligence_dark_souls.jpg": "intelligence",
  "/file/Dark-Souls/icon_intelligence.png": "intelligence",
  "/file/Dark-Souls/faith_dark_souls.jpg": "faith",
  "/file/Dark-Souls/icon_faith.png": "faith",
  "/file/Dark-Souls/bleed_dark_souls.jpg": "bleed",
  "/file/Dark-Souls/icon_res_bleed.png": "bleed",
  "/file/Dark-Souls/poison_dark_souls.jpg": "poison",
  "/file/Dark-Souls/icon_res_poison.png": "poison",
  "/file/Dark-Souls/divine_dark_souls.jpg": "divine",
  "/file/Dark-Souls/icon_res_divine.png": "divine",
  "/file/Dark-Souls/occult_dark_souls.jpg": "occult",
  "/file/Dark-Souls/icon_res_occult.png": "occult",
  "/file/Dark-Souls/physical_defense_dark_souls.jpg": "physical_defense",
  "/file/Dark-Souls/icon_prot_phy.png": "physical_defense",
  "/file/Dark-Souls/magic_defense_dark_souls.jpg": "magic_defense",
  "/file/Dark-Souls/icon_prot_magi.png": "magic_defense",
  "/file/Dark-Souls/fire_defense_dark_souls.jpg": "fire_defense",
  "/file/Dark-Souls/icon_prot_fire.png": "fire_defense",
  "/file/Dark-Souls/lightning_defense_dark_souls.jpg": "lightning_defense",
  "/file/Dark-Souls/icon_prot_lightn.png": "lightning_defense",
  "/file/Dark-Souls/stability_dark_souls.jpg": "stability",
  "/file/Dark-Souls/icon_prot_stab.png": "stability",
  "/file/Dark-Souls/magic_adjustment_dark_souls.jpg": "magic_adjustment",
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

export const parseUpgradeTable = ($: cheerio.Root): UpgradeTable => {
  const table = $(".wiki_table").eq(1);
  const rows = table.find("tr").slice(2);
  const upgradeTable: UpgradeTable = {};

  const colNames = table
    .find("tr")
    .eq(1)
    .find("th")
    .slice(1)
    .map((i, el) => $(el).find("img").attr("src"))
    .get();

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
  critical: number;
  durability: number;
  weight: number;
  auxiliary: number | null;
  weapon_type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
};

export const parseWeaponTable = ($: cheerio.Root): WeaponTable => {
  const table = $(".wiki_table").eq(0);
  const rows = table.find("tr").slice(7);
  const hasAuxiliary = rows.length === 6;
  if (rows.length !== 5 && rows.length !== 6) {
    throw new Error("Invalid table: unexpected number of columns");
  }

  const critical = parseFloat(
    table.find("tr").eq(1).find("td").eq(3).text().trim()
  );
  const durability = parseFloat(
    table.find("tr").eq(3).find("td").eq(3).text().trim()
  );
  const weight = parseFloat(
    table.find("tr").eq(4).find("td").eq(3).text().trim()
  );

  const requirements = {
    strength: ["-", "–"].includes($(rows[0]).find("td").eq(0).text().trim())
      ? 0
      : parseInt($(rows[0]).find("td").eq(0).text().trim()),
    dexterity: ["-", "–"].includes($(rows[0]).find("td").eq(1).text().trim())
      ? 0
      : parseInt($(rows[0]).find("td").eq(1).text().trim()),
    intelligence: ["-", "–"].includes($(rows[0]).find("td").eq(2).text().trim())
      ? 0
      : parseInt($(rows[0]).find("td").eq(2).text().trim()),
    faith: ["-", "–"].includes($(rows[0]).find("td").eq(3).text().trim())
      ? 0
      : parseInt($(rows[0]).find("td").eq(3).text().trim()),
  };

  if (hasAuxiliary) {
    return {
      requirements,
      critical,
      durability,
      weight,
      auxiliary: parseFloat($(rows[1]).find("td").eq(0).text().trim()),
      weapon_type: $(rows[2]).find("td").eq(0).text(),
      attack_type: $(rows[3]).find("td").eq(0).text(),
      enchantable: $(rows[4]).find("td").eq(0).text().trim() === "Yes",
      special: $(rows[5]).find("td").eq(0).text(),
    };
  } else {
    return {
      critical,
      durability,
      weight,
      requirements,
      auxiliary: null,
      weapon_type: $(rows[1]).find("td").eq(0).text(),
      attack_type: $(rows[2]).find("td").eq(0).text(),
      enchantable: $(rows[3]).find("td").eq(0).text().trim() === "Yes",
      special: $(rows[4]).find("td").eq(0).text(),
    };
  }
};
