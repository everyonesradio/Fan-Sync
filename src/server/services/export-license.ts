// ** Third-Party Imports
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

// ** Custom Components, Hooks, Utils, etc.
import type { FansRouterOutputs } from "@/types/api";
import { truncateString } from "@/utils/truncate-string";
import { upperCase } from "@/utils/upper-case";

type FanType = NonNullable<FansRouterOutputs["get"]>;

class _ExportService {
  async generateLicense(fanData: FanType, selectedBg: string) {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 1350 });

    await page.setContent(`
      <div id='export' className='hidden'>
      <div
        style={{
          width: "900px", // Higher resolution for export
          height: "1350px",
          backgroundColor: "rgba(245, 101, 101, 0)",
          backgroundImage: url(${selectedBg}),
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "rgba(245, 101, 101, 0)",
        }}
      >
        <>
          <div className='flex flex-col space-y-6 items-center text-white'>
            <img
              src=${fanData.profilePicture}
              alt='Profile picture'
              height={360}
              width={136}
              className='rounded-full aspect-square object-cover border-4 border-white'
            />
            <p className='font-bold text-xl'>${fanData.username}</p>
            <p>Location: ${fanData.location}</p>
            <p>Date of Birth: ${fanData.dob}</p>
            <p>NO. ${fanData.uuid}</p>
            <div className='flex items-center w-auto h-auto space-x-2 bg-black rounded-full border-2 border-white py-1 px-7'>
              <div className='space-y-1'>
                <p className='truncate font-bold'>
                  &quot;${truncateString(fanData.anthem?.name || "", 20)}&quot;
                </p>
                <p>
                  ${fanData.anthem?.release_date?.split("-")[0]} -{" "}
                  ${
                    fanData.anthem?.album_type &&
                    upperCase(fanData.anthem.album_type)
                  }
                </p>
              </div>
              <FaSpotify className='text-2xl' />
            </div>
          </div>
        </>
      </div>
    </div>
     `);

    const buffer = await page.screenshot({
      type: "jpeg",
      quality: 100,
    });

    await browser.close();
    return buffer;
  }
}

export const ExportService = new _ExportService();
