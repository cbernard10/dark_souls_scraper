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
  weapon_name: text("weapon_name").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: numeric("physical").notNull().array(), // as many entries as range
  magic: numeric("magic").notNull().array(),
  fire: numeric("fire").notNull().array(),
  lightning: numeric("lightning").notNull().array(),
  strength: text("strength").notNull().array(),
  dexterity: text("dexterity").notNull().array(),
  intelligence: text("intelligence").notNull().array(),
  faith: text("faith").notNull().array(),
  bleed: numeric("bleed").notNull().array(),
  poison: numeric("poison").notNull().array(),
  divine: numeric("divine").notNull().array(),
  occult: numeric("occult").notNull().array(),
  physical_defense: numeric("physical_defense").notNull().array(),
  magic_defense: numeric("magic_defense").notNull().array(),
  fire_defense: numeric("fire_defense").notNull().array(),
  lightning_defense: numeric("lightning_defense").notNull().array(),
  stability: numeric("stability").notNull().array(),
  magic_adjust: numeric("magic_adjust").notNull().array(),
});

export const ds1_weapons = pgTable("ds1_weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  critical: numeric("critical"),
  durability: numeric("durability"),
  weight: numeric("weight").notNull(),
  weapon_type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  enchantable: boolean("enchantable").notNull(),
  special: text("special").notNull(),
  strength: numeric("strength"),
  dexterity: numeric("dexterity"),
  intelligence: numeric("intelligence"),
  faith: numeric("faith"),
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
  weapon_name: text("weapon_name").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: text("physical").notNull().array(),
  magic: text("magic").notNull().array(),
  fire: text("fire").notNull().array(),
  lightning: text("lightning").notNull().array(),
  dark: text("dark").notNull().array(),
  strength_bonus: text("strength_bonus").notNull().array(),
  dexterity_bonus: text("dexterity_bonus").notNull().array(),
  magic_bonus: text("magic_bonus").notNull().array(),
  fire_bonus: text("fire_bonus").notNull().array(),
  lightning_bonus: text("lightning_bonus").notNull().array(),
  dark_bonus: text("dark_bonus").notNull().array(),
  poison: text("poison").notNull().array(),
  bleed: text("bleed").notNull().array(),
  physical_defense: text("physical_defense").notNull().array(),
  magic_defense: text("magic_defense").notNull().array(),
  fire_defense: text("fire_defense").notNull().array(),
  lightning_defense: text("lightning_defense").notNull().array(),
  dark_defense: text("dark_defense").notNull().array(),
  weapon_range: text("weapon_range").notNull().array(),
  cast_speed: text("cast_speed").notNull().array(),
});

export const ds2_weapons = pgTable("ds2_weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  strength: text("strength"),
  dexterity: text("dexterity"),
  intelligence: text("intelligence"),
  faith: text("faith"),
  counter_damage: text("counter_damage"),
  poise_damage: text("poise_damage"),
  stability: text("stability"),
  durability: text("durability"),
  weight: text("weight"),
  weapon_type: text("type"),
  attack_type: text("attack_type"),
  enchantable: boolean("enchantable"),
  special: text("special"),
});

export const ds2_shields = pgTable("ds2_shields", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  durability: text("durability").notNull(),
  weight: text("weight").notNull(),
  strength: text("strength"),
  dexterity: text("dexterity"),
  intelligence: text("intelligence"),
  faith: text("faith"),
  weapon_type: text("weapon_type").notNull(),
  attack_type: text("attack_type").notNull(),
  special: text("special").notNull(),
});

export const ds2_shield_upgrades = pgTable("ds2_shield_upgrades", {
  id: serial("id").primaryKey().notNull(),
  shield_name: text("shield_name").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: text("physical").notNull().array(), // as many entries as range
  magic: text("magic").notNull().array(),
  fire: text("fire").notNull().array(),
  lightning: text("lightning").notNull().array(),
  dark: text("dark").notNull().array(),
  strength_bonus: text("physical_bonus").notNull().array(),
  dexterity_bonus: text("dexterity_bonus").notNull().array(),
  magic_bonus: text("magic_bonus").notNull().array(),
  fire_bonus: text("fire_bonus").notNull().array(),
  lightning_bonus: text("lightning_bonus").notNull().array(),
  dark_bonus: text("dark_bonus").notNull().array(),
  poison: text("poison").notNull().array(),
  poison_defense: text("poison_defense").notNull().array(),
  bleed: text("bleed").notNull().array(),
  bleed_defense: text("bleed_defense").notNull().array(),
  petrify_defense: text("petrify_defense").notNull().array(),
  curse_defense: text("curse_defense").notNull().array(),
  physical_defense: text("physical_defense").notNull().array(),
  magic_defense: text("magic_defense").notNull().array(),
  fire_defense: text("fire_defense").notNull().array(),
  lightning_defense: text("lightning_defense").notNull().array(),
  dark_defense: text("dark_defense").notNull().array(),
  stability: text("stability").notNull().array(),
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

export const ds3_weapons = pgTable("ds3_weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  critical: numeric("critical"),
  durability: numeric("durability").notNull(),
  weight: numeric("weight").notNull(),
  weapon_type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  special: text("special").notNull(),
  strength: text("strength").notNull(),
  dexterity: text("dexterity").notNull(),
  intelligence: text("intelligence").notNull(),
  faith: text("faith").notNull(),
  spell_buff: numeric("spell_buff").notNull(),
  stability: numeric("stability"),
  fp: text("fp"),
  auxiliary: text("auxiliary").notNull(),
  auxiliary_value: numeric("auxiliary_value"),
});

export const ds3_upgrades = pgTable("ds3_upgrades", {
  id: serial("id").primaryKey().notNull(),
  weapon_name: text("weapon_name").notNull().unique(),
  range: text("range").notNull().array(), // regular, regular+1, etc
  physical: numeric("physical").notNull().array(), // as many entries as range
  magic: numeric("magic").notNull().array(),
  fire: numeric("fire").notNull().array(),
  lightning: numeric("lightning").notNull().array(),
  dark: numeric("dark").notNull().array(),
  strength_bonus: text("strength_bonus").notNull().array(),
  dexterity_bonus: text("dexterity_bonus").notNull().array(),
  intelligence_bonus: text("intelligence_bonus").notNull().array(),
  faith_bonus: text("faith_bonus").notNull().array(),
  poison: numeric("poison").notNull().array(),
  bleed: numeric("bleed").notNull().array(),
  frost: numeric("frost").notNull().array(),
  physical_defense: numeric("physical_defense").notNull().array(),
  magic_defense: numeric("magic_defense").notNull().array(),
  fire_defense: numeric("fire_defense").notNull().array(),
  lightning_defense: numeric("lightning_defense").notNull().array(),
  dark_defense: numeric("dark_defense").notNull().array(),
});

export const ds3_sorceries = pgTable("ds3_sorceries", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  fp: text("fp").notNull(),
  slots: text("slots").notNull(),
  int: text("int").notNull(),
  description: text("description").notNull(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds3_miracles = pgTable("ds3_miracles", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  fp: text("fp").notNull(),
  slots: text("slots").notNull(),
  faith: text("faith").notNull(),
  description: text("description").notNull(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds3_pyromancies = pgTable("ds3_pyromancies", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  fp: text("fp").notNull(),
  slots: text("slots").notNull(),
  int: text("int").notNull(),
  faith: text("faith").notNull(),
  description: text("description").notNull(),
  acquisition: text("acquisition").notNull().array(),
});

export const ds3_rings = pgTable("ds3_rings", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  weight: text("weight").notNull(),
  effects: text("effects").notNull().array(),
  acquisition: text("acquisition").notNull().array(),
});

export const eldenring_spells = pgTable("eldenring_spells", {
  id: serial("id").primaryKey().notNull(),
  type: text("type").notNull(),
  name: text("name").notNull().unique(),
  effect: text("effect").notNull(),
  fp: text("fp").notNull(),
  slots: text("slots").notNull(),
  int: text("int").notNull(),
  fth: text("fth").notNull(),
  arc: text("arc").notNull(),
  stamina: text("stamina").notNull(),
  bonus: text("bonus").notNull(),
});

export const eldenring_talismans = pgTable("eldenring_talismans", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull().unique(),
  weight: numeric("weight").notNull(),
  effects: text("effects").notNull().array(),
  acquisition: text("acquisition").notNull().array(),
});
