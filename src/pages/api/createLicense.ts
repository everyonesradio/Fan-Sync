import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { licenseID, imageURL } = req.body;

  if (!licenseID || !imageURL) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("fanbase");
    const collection = db.collection("fans");
    const result = await collection.insertOne({
      uuid: licenseID,
      profile_picture: imageURL,
      timestamp: new Date(),
    });

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
