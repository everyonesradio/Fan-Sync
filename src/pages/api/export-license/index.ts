import type { NextApiRequest, NextApiResponse } from "next";

import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { fanData, selectedBg } = req.body;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1350 });

  // Inject your license template HTML
  await page.setContent(`
    <div style="width: 900px; height: 1350px;">
      <!-- Your ExportTemplate HTML here -->
    </div>
  `);

  const buffer = await page.screenshot({
    type: "jpeg",
    quality: 100,
  });

  await browser.close();

  res.setHeader("Content-Type", "image/jpeg");
  res.send(buffer);
}
