import { readFile, writeFile } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(
  __dirname,
  "node_modules",
  "@spotify",
  "web-api-ts-sdk",
  "dist",
  "mjs",
  "endpoints",
  "SearchEndpoints.d.ts"
);

readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const result = data.replace(
    /<const T extends readonly ItemTypes\[\]>/g,
    "<T extends readonly ItemTypes[]>"
  );

  writeFile(filePath, result, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Fixed SearchEndpoints.d.ts");
    }
  });
});
