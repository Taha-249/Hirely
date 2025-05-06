import { MongoClient } from "mongodb";

const uri = 'mongodb+srv://d6989607:Ly2Ish2OpK3R9Y16@hirely.6b2mswq.mongodb.net/?retryWrites=true&w=majority&appName=Hirely';
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  console.log("Received request with method:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB");

    const db = client.db("hirely");
    const collection = db.collection("users");
    console.log("Selected 'hirely' database and 'users' collection");

    // Debug incoming request body
    console.log("Request body:", req.body);

    // Validate body
    if (!req.body || typeof req.body !== "object") {
      console.error("Invalid request body");
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Insert document
    console.log("Inserting document into collection...");
    const result = await collection.insertOne(req.body);
    console.log("Document inserted with ID:", result.insertedId);

    res.status(201).json({
      message: "Data inserted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error inserting data:", error);

    // Return actual error message during development
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
