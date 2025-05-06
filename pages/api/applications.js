import { MongoClient } from "mongodb";
import formidable from "formidable"; // for file uploads
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disallow default body parsing
  },
};

const uri = 'YOUR_MONGO_URI_HERE';
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    // Parse form data (multipart/form-data)
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ msg: "Failed to parse form" });
      }

      const { message, contactInfo, jobId } = fields;
      const resumeFile = files.resume;

      if (!resumeFile || !jobId) {
        return res.status(400).json({ msg: "Resume and Job ID are required" });
      }

      // Connect to DB
      await client.connect();
      const db = client.db("hirely");
      const collection = db.collection("applications");

      // Insert application
      const result = await collection.insertOne({
        jobId,
        message,
        contactInfo,
        resumeFileName: resumeFile.originalFilename,
        appliedAt: new Date(),
      });

      return res.status(200).json({ success: true, insertedId: result.insertedId });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
