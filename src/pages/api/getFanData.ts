import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { licenseID } = req.query;

  if (!licenseID) {
    return res.status(400).json({ error: "Missing licenseID" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("fanbase");
    const collection = db.collection("fans");
    const fanData = await collection.findOne({ uuid: licenseID });

    if (!fanData) {
      return res.status(404).json({ error: "Fan data not found" });
    }

    return res.status(200).json(fanData);
  } catch (error) {
    console.error("Database fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: errorMessage });
  }
}
