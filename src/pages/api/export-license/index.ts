import type {
  NextApiRequest as _NextApiRequest,
  NextApiResponse as _NextApiResponse,
} from "next";

import chromium from "chrome-aws-lambda";
import { Puppeteer } from "puppeteer-core";

/**
 * This is the `export-license` API endpoint for handling request to export a license as a JPEG image.
 * --> also think about generating video, gifs, etc.
 * This function is the request handler for the `/api/export-license` endpoint. It takes the `fanData` and `selectedBg` from the request body, launches a Puppeteer-powered headless Chrome browser, injects the license template HTML, takes a screenshot of the rendered page, and sends the JPEG image data back in the response.
 *
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { fanData, selectedBg } = req.body;

//   const browser = await puppeteer.launch({
//     args: chromium.args,
//     executablePath: await chromium.executablePath,
//     headless: true,
//   });

//   const page = await browser.newPage();
//   await page.setViewport({ width: 900, height: 1350 });

//   // Inject your license template HTML
//   await page.setContent(`
//     <div style="width: 900px; height: 1350px;">
//       <!-- Your ExportTemplate HTML here -->
//     </div>
//   `);

//   const buffer = await page.screenshot({
//     type: "jpeg",
//     quality: 100,
//   });

//   await browser.close();

//   res.setHeader("Content-Type", "image/jpeg");
//   res.send(buffer);
// }
