import { db } from "../../drizzle.config";
import {
  ds1_armor,
  ds1_magic,
  ds1_rings,
  ds1_weapons,
  ds1_shields,
  ds1_upgrades,
  ds1_miracles,
} from "../../schema/schema";

import { insert_armor } from "../armor";
import { insert_magic } from "../magic";
import { insert_rings } from "../rings";
import { insert_weapons } from "../weapons";
import { insert_shields } from "../shields";
import { insert_miracles } from "../miracles";
import { insert_pyromancies } from "../pyromancies";

export async function ds1_delete_all() {
  try {
    await db.delete(ds1_armor);
  } catch (e) {
    console.log("error deleting armor", e);
  }
  try {
    await db.delete(ds1_magic);
  } catch (e) {
    console.log("error deleting magic", e);
  }
  try {
    await db.delete(ds1_rings);
  } catch (e) {
    console.log("error deleting rings", e);
  }
  try {
    await db.delete(ds1_weapons);
  } catch (e) {
    console.log("error deleting weapons", e);
  }
  try {
    await db.delete(ds1_shields);
  } catch (e) {
    console.log("error deleting shields", e);
  }
  try {
    await db.delete(ds1_upgrades);
  } catch (e) {
    console.log("error deleting upgrades", e);
  }
  try {
    await db.delete(ds1_miracles);
  } catch (e) {
    console.log("error deleting miracles", e);
  }
}

export async function ds1_insert_all() {
  await insert_armor();
  await insert_magic();
  await insert_rings();
  await insert_weapons();
  await insert_shields();
  await insert_miracles();
  await insert_pyromancies();
}
