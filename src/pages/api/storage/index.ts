// ** React/Next.js Imports
import type { NextApiRequest, NextApiResponse } from "next";

// ** Third-Party Imports
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ** Custom Components, Hooks, Utils, etc.
import { storage } from "@lib/firebase";
import {
  formidableConfig,
  formidablePromise,
  fileConsumer,
} from "@lib/formidable";

/**
 * This is the `storage` API endpoint for handling file uploads to Firebase Storage.
 * It uses the `formidable` library to parse incoming multipart form data and uploads the file to Firebase.
 *
 * Features:
 * - Parses incoming HTTP requests to extract file data using `formidable`.
 * - Validates the presence and size of the uploaded file, ensuring it does not exceed 5 MB.
 * - Uploads the file to Firebase Storage and retrieves the download URL.
 * - Returns the download URL in the response upon successful upload.
 * - Handles errors during the upload process and returns appropriate error messages.
 *
 * @param req - The incoming HTTP request object.
 * @param res - The HTTP response object used to send back the desired HTTP response.
 *
 * @returns A JSON response containing the download URL of the uploaded file or an error message.
 */

export default async function filePOST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chunks: never[] = [];
  const { fields: _fields, files } = await formidablePromise(req, {
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
  } catch (e: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }

    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }
}

// Disable parsing the body by Next.js default behavior
export const config = {
  api: {
    bodyParser: false,
  },
};
