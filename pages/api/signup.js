import { MongoClient } from "mongodb";

// Your MongoDB Atlas connection string
const uri = "mongodb+srv://d6989607:rP7pQBg4NR7F9j33@hirely.dchzs9w.mongodb.net/hirely?retryWrites=true&w=majority&directConnection=true";

// Create a client
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("hirely"); // Replace with your database name
    const collection = db.collection("users"); // Replace with your collection name

    // Insert the incoming data (assuming JSON body)
    const result = await collection.insertOne(req.body);

    res
      .status(201)
      .json({
        message: "Data inserted successfully",
        insertedId: result.insertedId,
      });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await client.close();
  }
}
