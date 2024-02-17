import { pgTable, serial, text, numeric, boolean } from "drizzle-orm/pg-core";

export default pgTable("weapons", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  physical: text("physical").notNull(),
  critical: text("critical").notNull(),
  magic: text("magic").notNull(),
  stability: text("stability").notNull(),
  fire: text("fire").notNull(),
  durability: text("durability").notNull(),
  lightning: text("lightning").notNull(),
  weight: text("weight").notNull(),
  strength: text("strength").notNull(),
  dexterity: text("dexterity").notNull(),
  intelligence: text("intelligence").notNull(),
  faith: text("faith").notNull(),
  type: text("type").notNull(),
  attack_type: text("attack_type").notNull(),
  enchantable: boolean("enchantable").notNull(),
});
