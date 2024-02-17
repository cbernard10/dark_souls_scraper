import express from "express";
import { db } from "../drizzle.config";
import weapons from "../schema/weapons";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await db.select().from(weapons);
  res.json(results);
});

router.post("/", async (req, res) => {
  const {
    name,
    physical,
    critical,
    magic,
    stability,
    fire,
    durability,
    lightning,
    weight,
    strength,
    dexterity,
    intelligence,
    faith,
    type,
    attack_type,
    enchantable,
  } = req.body;
  const results = await db.insert(weapons).values({
    name,
    physical,
    critical,
    magic,
    stability,
    fire,
    durability,
    lightning,
    weight,
    strength,
    dexterity,
    intelligence,
    faith,
    type,
    attack_type,
    enchantable,
  });
  res.json({ results, message: `added ${name}` }).status(201);
});

export { router };
