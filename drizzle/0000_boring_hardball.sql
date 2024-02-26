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
CREATE TABLE IF NOT EXISTS "ds1_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_name" text NOT NULL,
	"range" text[],
	"physical" numeric[],
	"magic" numeric[],
	"fire" numeric[],
	"lightning" numeric[],
	"strength" text[],
	"dexterity" text[],
	"intelligence" text[],
	"faith" text[],
	"bleed" numeric[],
	"poison" numeric[],
	"divine" numeric[],
	"occult" numeric[],
	"physical_defense" numeric[],
	"magic_defense" numeric[],
	"fire_defense" numeric[],
	"lightning_defense" numeric[],
	"stability" numeric[],
	"magic_adjust" numeric[],
	CONSTRAINT "ds1_upgrades_weapon_name_unique" UNIQUE("weapon_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds1_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"critical" numeric,
	"durability" numeric,
	"weight" numeric NOT NULL,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	"enchantable" boolean NOT NULL,
	"special" text NOT NULL,
	"strength" numeric,
	"dexterity" numeric,
	"intelligence" numeric,
	"faith" numeric,
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
	"shield_name" text NOT NULL,
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
	"poison_defense" text[],
	"bleed" text[],
	"bleed_defense" text[],
	"petrify_defense" text[],
	"curse_defense" text[],
	"physical_defense" text[],
	"magic_defense" text[],
	"fire_defense" text[],
	"lightning_defense" text[],
	"dark_defense" text[],
	"stability" text[],
	CONSTRAINT "ds2_shield_upgrades_shield_name_unique" UNIQUE("shield_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_shields" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"durability" text NOT NULL,
	"weight" text NOT NULL,
	"strength" text,
	"dexterity" text,
	"intelligence" text,
	"faith" text,
	"weapon_type" text NOT NULL,
	"attack_type" text NOT NULL,
	"special" text NOT NULL,
	CONSTRAINT "ds2_shields_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_name" text NOT NULL,
	"range" text[],
	"physical" text[],
	"magic" text[],
	"fire" text[],
	"lightning" text[],
	"dark" text[],
	"strength_bonus" text[],
	"dexterity_bonus" text[],
	"magic_bonus" text[],
	"fire_bonus" text[],
	"lightning_bonus" text[],
	"dark_bonus" text[],
	"poison" text[],
	"bleed" text[],
	"physical_defense" text[],
	"magic_defense" text[],
	"fire_defense" text[],
	"lightning_defense" text[],
	"dark_defense" text[],
	"weapon_range" text[],
	"cast_speed" text[],
	CONSTRAINT "ds2_upgrades_weapon_name_unique" UNIQUE("weapon_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds2_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"strength" text,
	"dexterity" text,
	"intelligence" text,
	"faith" text,
	"counter_damage" text,
	"poise_damage" text,
	"stability" text,
	"durability" text,
	"weight" text,
	"type" text,
	"attack_type" text,
	"enchantable" boolean,
	"special" text,
	CONSTRAINT "ds2_weapons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_miracles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fp" text NOT NULL,
	"slots" text NOT NULL,
	"faith" text NOT NULL,
	"description" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds3_miracles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_pyromancies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fp" text NOT NULL,
	"slots" text NOT NULL,
	"int" text NOT NULL,
	"faith" text NOT NULL,
	"description" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds3_pyromancies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_rings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"weight" text NOT NULL,
	"effects" text[],
	"acquisition" text[],
	CONSTRAINT "ds3_rings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_sorceries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"fp" text NOT NULL,
	"slots" text NOT NULL,
	"int" text NOT NULL,
	"description" text NOT NULL,
	"acquisition" text[],
	CONSTRAINT "ds3_sorceries_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_upgrades" (
	"id" serial PRIMARY KEY NOT NULL,
	"weapon_name" text NOT NULL,
	"range" text[],
	"physical" numeric[],
	"magic" numeric[],
	"fire" numeric[],
	"lightning" numeric[],
	"dark" numeric[],
	"strength_bonus" text[],
	"dexterity_bonus" text[],
	"intelligence_bonus" text[],
	"faith_bonus" text[],
	"poison" numeric[],
	"bleed" numeric[],
	"frost" numeric[],
	"physical_defense" numeric[],
	"magic_defense" numeric[],
	"fire_defense" numeric[],
	"lightning_defense" numeric[],
	"dark_defense" numeric[],
	CONSTRAINT "ds3_upgrades_weapon_name_unique" UNIQUE("weapon_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ds3_weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"critical" numeric,
	"durability" numeric NOT NULL,
	"weight" numeric NOT NULL,
	"type" text NOT NULL,
	"attack_type" text NOT NULL,
	"special" text NOT NULL,
	"strength" text NOT NULL,
	"dexterity" text NOT NULL,
	"intelligence" text NOT NULL,
	"faith" text NOT NULL,
	"spell_buff" numeric NOT NULL,
	"stability" numeric,
	"fp" text,
	"auxiliary" text NOT NULL,
	"auxiliary_value" numeric,
	CONSTRAINT "ds3_weapons_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eldenring_spells" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"effect" text NOT NULL,
	"fp" text NOT NULL,
	"slots" text NOT NULL,
	"int" text NOT NULL,
	"fth" text NOT NULL,
	"arc" text NOT NULL,
	"stamina" text NOT NULL,
	"bonus" text NOT NULL,
	CONSTRAINT "eldenring_spells_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eldenring_talismans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"weight" numeric NOT NULL,
	"effects" text[],
	"acquisition" text[],
	CONSTRAINT "eldenring_talismans_name_unique" UNIQUE("name")
);
