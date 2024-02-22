import { pgTable, serial, text, numeric, boolean } from "drizzle-orm/pg-core";

export const ds1_magic = pgTable("ds1_magic", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  uses: text("uses").notNull(),
  slots: text("slots").notNull(),
  intelligence: text("intelligence").notNull(),
  description: text("description").notNull(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds1_miracles = pgTable("ds1_miracles", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  uses: text("uses").notNull(),
  slots: text("slots").notNull(),
  faith: text("faith").notNull(),
  description: text("description").notNull(),
  acquisition: text("acquisition").notNull().array(),
});
export const ds1_pyromancies = pgTable("ds1_pyromancies", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  uses: text("uses").notNull(),
  slots: text("slots").notNull(),
  description: text("description").notNull(),
  cost: text("cost").notNull(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds1_rings = pgTable("ds1_rings", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  effects: text("effects").notNull().array(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds1_armor = pgTable("ds1_armor", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  durability: text("durability").notNull(),
  weight: text("weight").notNull(),
  poise: text("poise").notNull(),
  physical: text("physical").notNull(),
  strike: text("strike").notNull(),
  slash: text("slash").notNull(),
  thrust: text("thrust").notNull(),
  magic: text("magic").notNull(),
  fire: text("fire").notNull(),
  lightning: text("lightning").notNull(),
  bleed: text("bleed").notNull(),
  poison: text("poison").notNull(),
  curse: text("curse").notNull(),
  type: text("type").notNull(),
});

export const ds1_upgrades = pgTable("ds1_upgrades", {
  id: serial("id").primaryKey().notNull(),
  weapon_name: text("weapon").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: text("physical").notNull().array(), // as many entries as range
  magic: text("magic").notNull().array(),
  fire: text("fire").notNull().array(),
  lightning: text("lightning").notNull().array(),
  strength: text("strength").notNull().array(),
  dexterity: text("dexterity").notNull().array(),
  intelligence: text("intelligence").notNull().array(),
  faith: text("faith").notNull().array(),
  divine: text("divine").notNull().array(),
  occult: text("occult").notNull().array(),
  physical_defense: text("physical_defense").notNull().array(),
  magic_defense: text("magic_defense").notNull().array(),
  fire_defense: text("fire_defense").notNull().array(),
  lightning_defense: text("lightning_defense").notNull().array(),
  stability: text("stability").notNull().array(),
});

export const ds1_weapons = pgTable("ds1_weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  strength: text("strength"),
  dexterity: text("dexterity"),
  intelligence: text("intelligence"),
  faith: text("faith"),
  durability: text("durability").notNull(),
  weight: text("weight").notNull(),
  critical: text("critical").notNull(),
  type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  enchantable: boolean("enchantable").notNull(),
  special: text("special").notNull(),
  auxiliary: text("auxiliary"),
});

export const ds1_shields = pgTable("ds1_shields", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  strength: text("strength"),
  dexterity: text("dexterity"),
  intelligence: text("intelligence"),
  faith: text("faith"),
  durability: text("durability").notNull(),
  weight: text("weight").notNull(),
  critical: text("critical").notNull(),
  type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  enchantable: boolean("enchantable").notNull(),
});

export const ds2_magic = pgTable("ds2_magic", {
  id: serial("id").primaryKey().notNull(),
  category: text("category").notNull(),
  name: text("name").notNull().unique(),
  uses: text("uses").notNull(),
  int: text("int").notNull(),
  fth: text("fth").notNull(),
  attunement: text("attunement").notNull(),
  description: text("description").notNull(),
});

export const ds2_rings = pgTable("ds2_rings", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  weight: text("weight").notNull().array(),
  effects: text("effects").notNull().array(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds2_upgrades = pgTable("ds2_upgrades", {
  id: serial("id").primaryKey().notNull(),
  weapon_name: text("weapon").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: text("physical").notNull().array(), // as many entries as range
  magicdmg: text("magicdmg").notNull().array(),
  fire: text("fire").notNull().array(),
  lightning: text("lightning").notNull().array(),
  dark: text("dark").notNull().array(),
  counter: text("counter").notNull().array(),
  poise: text("poise").notNull().array(),
  strength: text("strength").notNull().array(),
  dexterity: text("dexterity").notNull().array(),
  magic: text("magic").notNull().array(),
  poison: text("poison").notNull().array(),
  bleed: text("bleed").notNull().array(),
  physical_defense: text("physical_defense").notNull().array(),
  magic_defense: text("magic_defense").notNull().array(),
  fire_defense: text("fire_defense").notNull().array(),
  lightning_defense: text("lightning_defense").notNull().array(),
  dark_defense: text("dark_defense").notNull().array(),
});

export const ds2_weapons = pgTable("ds2_weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  strength: text("strength"),
  dexterity: text("dexterity"),
  intelligence: text("intelligence"),
  faith: text("faith"),
  durability: text("durability"),
  weight: text("weight").notNull(),
  type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  enchantable: boolean("enchantable").notNull(),
  special: text("special").notNull(),
});

export const ds2_armor = pgTable("ds2_armor", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  type: text("type").notNull(),
  physical_defense_bonus: text("physical_defense_bonus"),
  physical_defense: text("physical_defense"),
  strike_defense: text("strike_defense"),
  slash_defense: text("slash_defense"),
  thrust_defense: text("thrust_defense"),
  magic_defense: text("magic_defense"),
  fire_defense: text("fire_defense"),
  lightning_defense: text("lightning_defense"),
  dark_defense: text("dark_defense"),
  poise: text("poise"),
  poison_resist: text("poison_resist"),
  bleed_resist: text("bleed_resist"),
  petrify_resist: text("petrify_resist"),
  curse_resist: text("curse_resist"),
  special: text("special"),
  weight: text("weight").notNull(),
  durability: text("durability").notNull(),
});

export const ds2_shield_upgrades = pgTable("ds2_shield_upgrades", {
  id: serial("id").primaryKey().notNull(),
  shield_name: text("shield").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: text("physical").notNull().array(), // as many entries as range
  magic: text("magic").notNull().array(),
  fire: text("fire").notNull().array(),
  lightning: text("lightning").notNull().array(),
  dark: text("dark").notNull().array(),
  physical_bonus: text("physical_bonus").notNull().array(),
  dexterity_bonus: text("dexterity_bonus").notNull().array(),
  magic_bonus: text("magic_bonus").notNull().array(),
  fire_bonus: text("fire_bonus").notNull().array(),
  lightning_bonus: text("lightning_bonus").notNull().array(),
  dark_bonus: text("dark_bonus").notNull().array(),
  poison: text("poison").notNull().array(),
  poison_def: text("poison_def").notNull().array(),
  bleed: text("bleed").notNull().array(),
  bleed_def: text("bleed_def").notNull().array(),
  petrify_def: text("petrify_def").notNull().array(),
  curse_def: text("curse_def").notNull().array(),
  physical_def: text("physical_def").notNull().array(),
  magic_def: text("magic_def").notNull().array(),
  fire_def: text("fire_def").notNull().array(),
  lightning_def: text("lightning_def").notNull().array(),
  dark_def: text("dark_def").notNull().array(),
  stability: text("stability").notNull().array(),
});

export const ds2_shields = pgTable("ds2_shields", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  durability: text("durability").notNull(),
  weight: text("weight").notNull(),
  stability: text("stability").notNull(),
  str: text("strength"),
  str_scaling: text("str_scaling"),
  dex: text("dex"),
  dex_scaling: text("dex_scaling"),
  int: text("int"),
  int_scaling: text("int_scaling"),
  faith: text("faith"),
  faith_scaling: text("faith_scaling"),
  type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
});
