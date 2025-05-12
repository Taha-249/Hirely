import clientPromise from './connect';
import { ObjectId } from 'mongodb';

// Create a new user (store only credentials)
export async function createUser({ name, email, password, role }) {
  const client = await clientPromise;
  const db = client.db();

  const user = {
    name,
    email,
    password,
    role,
    createdAt: new Date(),
  };

  const result = await db.collection('Users').insertOne(user);
  return result.ops?.[0] || { ...user, _id: result.insertedId };
}

// Get user by email (for login or signup check)
export async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('Users').findOne({ email });
}

// Get user by ID
export async function getUserByID(id) {
  const client = await clientPromise;
  const db = client.db();
  return await db.collection('Users').findOne({ _id: new ObjectId(id) });
}

// Optional: Delete user
export async function deleteUserByID(id) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db
    .collection('Users')
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
