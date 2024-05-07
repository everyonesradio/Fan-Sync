import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { storage } from "@/lib/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { imageURL, uuid } = req.body;

  if (!imageURL || !uuid) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Assuming imageURL is a data URL, convert it to a Blob for Firebase Storage
    const response = await fetch(imageURL);
    const blob = await response.blob();
    const storageRef = ref(storage, `signatures/${uuid}.png`);
    await uploadBytes(storageRef, blob);
    const publicUrl = await getDownloadURL(storageRef);

    // Update MongoDB document with the new signature URL
    const client = await clientPromise;
    const db = client.db("fanbase");
    const collection = db.collection("fans");
    const result = await collection.updateOne(
      { uuid },
      {
        $set: {
          signature: publicUrl,
        },
      }
    );

    return res.status(200).json({ success: true, document: result });
  } catch (error) {
    console.error("Database update error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: errorMessage });
  }
}
