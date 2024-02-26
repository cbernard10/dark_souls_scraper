import { scrapeDS1 } from "./ds1";
import { scrapeDS2 } from "./ds2";
import { scrapeDS3 } from "./ds3";

async function scrape() {
  // await scrapeDS1();
  // await scrapeDS2();
  await scrapeDS3();
}

scrape();
