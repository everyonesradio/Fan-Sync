import type { NextApiRequest, NextApiResponse } from "next";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@lib/firebase";
import {
  formidableConfig,
  formidablePromise,
  fileConsumer,
} from "@lib/formidable";

export default async function filePOST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chunks: never[] = [];
  const { fields, files } = await formidablePromise(req, {
    ...formidableConfig,
    fileWriteStreamHandler: () => fileConsumer(chunks),
  });
  const file = files.file;
  const fileBuffer = Buffer.concat(chunks);
  if (!file?.[0]) {
    return res.status(400).json({ error: "No File Provided" });
  }
  if (file[0].size > 5 * 1024 * 1024) {
    return res
      .status(400)
      .json({ error: "File size exceeds the limit of  5 MB." });
  }

  try {
    const storageRef = ref(storage, `avatars/${file[0].originalFilename}`);
    const { metadata } = await uploadBytes(storageRef, fileBuffer);
    const { fullPath } = metadata;
    if (!fullPath) {
      return res.status(403).json({
        error: "There was some error while uploading the file.",
      });
    }
    const fileURL = await getDownloadURL(storageRef); // Get the download URL

    return res.status(200).json({ fileURL }); // Return the download URL in the response
  } catch (e: any) {
    const tmp = e.message || e.toString();
    console.log(tmp);
    return res.status(500).send(tmp);
  }
}

// Disable parsing the body by Next.js default behavior
export const config = {
  api: {
    bodyParser: false,
  },
};
