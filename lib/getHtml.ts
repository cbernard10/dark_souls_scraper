import cheerio from "cheerio";
import { browser, page } from "./browser";
import "dotenv/config";

const getHtml = async (
  url: string
): Promise<{
  html: string;
  $: cheerio.Root;
} | null> => {
  let html = "";
  let $: cheerio.Root;
  if (!page) {
    return null;
  }
  try {
    try {
      await page.goto(url, { timeout: 20000 });
    } catch (e) {
      throw new Error(`url unreachable ${url}: ${e}`);
    }

    html = await page.content();
    $ = cheerio.load(html);
  } catch (e) {
    throw new Error(`could not get html from ${url}: ${e}`);
  }

  return { html, $ };
};

export default getHtml;
