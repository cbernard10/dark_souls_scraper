CREATE TABLE IF NOT EXISTS "ds1_armor" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"durability" text NOT NULL,
	"weight" text NOT NULL,
	"poise" text NOT NULL,
	"physical" text NOT NULL,
	"strike" text NOT NULL,
	"slash" text NOT NULL,
	"thrust" text NOT NULL,
	"magic" text NOT NULL,
	"fire" text NOT NULL,
	"lightning" text NOT NULL,
	"bleed" text NOT NULL,
	"poison" text NOT NULL,
	"curse" text NOT NULL,
	"type" text NOT NULL,
	CONSTRAINT "ds1_armor_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_magic" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"uses" text NOT NULL,
	"slots" text NOT NULL,
	"intelligence" text NOT NULL,
	"description" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds1_magic_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_miracles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"uses" text NOT NULL,
	"slots" text NOT NULL,
	"faith" text NOT NULL,
	"description" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds1_miracles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_pyromancies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"uses" text NOT NULL,
	"slots" text NOT NULL,
	"description" text NOT NULL,
	"cost" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds1_pyromancies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_rings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"effects" text[],
	"acquisition" text[],
	CONSTRAINT "ds1_rings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_shields" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"strength" text,
	"dexterity" text,
	"intelligence" text,
	"faith" text,
	"durability" text NOT NULL,
	"weight" text NOT NULL,
	"critical" text NOT NULL,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	"enchantable" boolean NOT NULL,
	CONSTRAINT "ds1_shields_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon" text NOT NULL,
	"range" text[],
	"physical" text[],
	"magic" text[],
	"fire" text[],
	"lightning" text[],
	"strength" text[],
	"dexterity" text[],
	"intelligence" text[],
	"faith" text[],
	"divine" text[],
	"occult" text[],
	"physical_defense" text[],
	"magic_defense" text[],
	"fire_defense" text[],
	"lightning_defense" text[],
	"stability" text[],
	CONSTRAINT "ds1_upgrades_weapon_unique" UNIQUE("weapon")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"strength" text,
	"dexterity" text,
	"intelligence" text,
	"faith" text,
	"durability" text NOT NULL,
	"weight" text NOT NULL,
	"critical" text NOT NULL,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	"enchantable" boolean NOT NULL,
	"special" text NOT NULL,
	"auxiliary" text,
	CONSTRAINT "ds1_weapons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_armor" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"physical_defense_bonus" text,
	"physical_defense" text,
	"strike_defense" text,
	"slash_defense" text,
	"thrust_defense" text,
	"magic_defense" text,
	"fire_defense" text,
	"lightning_defense" text,
	"dark_defense" text,
	"poise" text,
	"poison_resist" text,
	"bleed_resist" text,
	"petrify_resist" text,
	"curse_resist" text,
	"special" text,
	"weight" text NOT NULL,
	"durability" text NOT NULL,
	CONSTRAINT "ds2_armor_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_magic" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"name" text NOT NULL,
	"uses" text NOT NULL,
	"int" text NOT NULL,
	"fth" text NOT NULL,
	"attunement" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "ds2_magic_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_rings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"weight" text[],
	"effects" text[],
	"acquisition" text[],
	CONSTRAINT "ds2_rings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_shield_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"shield" text NOT NULL,
	"range" text[],
	"physical" text[],
	"magic" text[],
	"fire" text[],
	"lightning" text[],
	"dark" text[],
	"physical_bonus" text[],
	"dexterity_bonus" text[],
	"magic_bonus" text[],
	"fire_bonus" text[],
	"lightning_bonus" text[],
	"dark_bonus" text[],
	"poison" text[],
	"poison_def" text[],
	"bleed" text[],
	"bleed_def" text[],
	"petrify_def" text[],
	"curse_def" text[],
	"physical_def" text[],
	"magic_def" text[],
	"fire_def" text[],
	"lightning_def" text[],
	"dark_def" text[],
	"stability" text[],
	CONSTRAINT "ds2_shield_upgrades_shield_unique" UNIQUE("shield")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_shields" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"durability" text NOT NULL,
	"weight" text NOT NULL,
	"stability" text NOT NULL,
	"strength" text,
	"str_scaling" text,
	"dex" text,
	"dex_scaling" text,
	"int" text,
	"int_scaling" text,
	"faith" text,
	"faith_scaling" text,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	CONSTRAINT "ds2_shields_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon" text NOT NULL,
	"range" text[],
	"physical" text[],
	"magicdmg" text[],
	"fire" text[],
	"lightning" text[],
	"dark" text[],
	"counter" text[],
	"poise" text[],
	"strength" text[],
	"dexterity" text[],
	"magic" text[],
	"poison" text[],
	"bleed" text[],
	"physical_defense" text[],
	"magic_defense" text[],
	"fire_defense" text[],
	"lightning_defense" text[],
	"dark_defense" text[],
	CONSTRAINT "ds2_upgrades_weapon_unique" UNIQUE("weapon")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"strength" text,
	"dexterity" text,
	"intelligence" text,
	"faith" text,
	"durability" text,
	"weight" text NOT NULL,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	"enchantable" boolean NOT NULL,
	"special" text NOT NULL,
	CONSTRAINT "ds2_weapons_name_unique" UNIQUE("name")
);
