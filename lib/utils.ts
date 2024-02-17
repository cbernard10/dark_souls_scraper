export const nodesToText = ($: cheerio.Root, node: cheerio.Cheerio) =>
  // extracts text from a node whose children are <br> separated
  $(node)
    .html()
    ?.split("<br>")
    .map((effect) => effect.replace(/<[^>]*>?/gm, "").trim()) ?? [];
