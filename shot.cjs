// Renders index.html into out/01.png, out/02.png ... and out/carousel.pdf,
// then prints a list of anything that overflows a slide.
//
//   npm install
//   npm run build
//
// To use a Chrome you already have instead of the one puppeteer downloads:
//   CHROME_PATH="/path/to/chrome" npm run build

const fs = require("fs");
const path = require("path");

let puppeteer;
try { puppeteer = require("puppeteer"); } catch { puppeteer = require("puppeteer-core"); }

const W = 1080, H = 1350;
const DIR = __dirname;
const OUT = path.join(DIR, "out");
const PAGE = "file://" + path.join(DIR, "index.html");

(async () => {
  const launch = { headless: true, args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files"] };
  if (process.env.CHROME_PATH) launch.executablePath = process.env.CHROME_PATH;
  const browser = await puppeteer.launch(launch);
  const page = await browser.newPage();
  page.on("pageerror", (e) => { console.error("Page error:", e.message); process.exitCode = 1; });
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.goto(PAGE, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));

  const count = await page.$$eval(".s", (els) => els.length);
  if (!count) throw new Error("No slides found. Check slides.js for a typo.");

  // Overflow check: text wider than the slide, a column taller than the slide,
  // a card whose content does not fit, or a headline longer than 3 lines.
  const issues = await page.$$eval(".s", (els, W) => els.map((s, i) => {
    const out = [];
    const col = s.querySelector(".in");
    if (col && col.scrollHeight > col.clientHeight + 1) out.push(`content too tall (${col.scrollHeight}px of ${col.clientHeight}px)`);
    const viz = s.querySelector(".viz");
    if (viz && (viz.scrollHeight > viz.clientHeight + 1 || viz.scrollWidth > viz.clientWidth + 1)) out.push("card content does not fit");
    if (viz && viz.clientHeight < 200) out.push(`card squeezed to ${viz.clientHeight}px, shorten the headline or the tip`);
    const h = s.querySelector("h1,h2");
    if (h) { const lh = parseFloat(getComputedStyle(h).lineHeight); const lines = Math.round(h.getBoundingClientRect().height / lh); if (lines > 3) out.push(`headline is ${lines} lines`); }
    s.querySelectorAll("h1,h2,p,li,.q,.k,.res,.r .u,.punch,.li span").forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.right > W - 40 || e.scrollWidth > e.clientWidth + 1) out.push("too wide: " + e.textContent.trim().slice(0, 40));
    });
    return { slide: i + 1, out };
  }), W);

  fs.mkdirSync(OUT, { recursive: true });
  fs.readdirSync(OUT).filter((f) => /^\d+\.png$/.test(f)).forEach((f) => fs.unlinkSync(path.join(OUT, f)));
  for (let i = 0; i < count; i++) {
    await page.screenshot({ path: path.join(OUT, String(i + 1).padStart(2, "0") + ".png"), clip: { x: 0, y: i * H, width: W, height: H } });
  }
  await page.pdf({ path: path.join(OUT, "carousel.pdf"), width: W + "px", height: H + "px", printBackground: true, preferCSSPageSize: true });
  await browser.close();

  console.log(`${count} slides -> out/01.png ... out/${String(count).padStart(2, "0")}.png and out/carousel.pdf`);
  const bad = issues.filter((x) => x.out.length);
  if (!bad.length) console.log("Overflow check: all slides fit.");
  else { console.log("Overflow check:"); bad.forEach((x) => console.log(`  slide ${x.slide}: ${x.out.join(" | ")}`)); }
})().catch((e) => { console.error(e.message); process.exit(1); });
