import clientPromise from './connect';
import { ObjectId } from 'mongodb';

// Create a person profile linked to a user
export async function createPersonProfile({
  userId,
  jobTypes,
  degree,
  experienceLevel,
  skills,
  location,
  interests,
}) {
  const client = await clientPromise;
  const db = client.db();

  const personProfile = {
    userId: new ObjectId(userId),
    jobTypes, 
    degree, 
    experienceLevel, 
    skills, 
    location,
    interests,
  };

  const result = await db.collection('Persons').insertOne(personProfile);
  return result.ops?.[0] || { ...personProfile, _id: result.insertedId };
}

// Get person profile by userId
export async function getPersonProfileByUserId(userId) {
  const client = await clientPromise;
  const db = client.db();

  return await db.collection('Persons').findOne({
    userId: new ObjectId(userId),
  });
}

// Update person profile
export async function updatePersonProfileByUserId(userId, updateData) {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection('Persons').updateOne(
    { userId: new ObjectId(userId) },
    { $set: updateData }
  );

  return result.modifiedCount > 0;
}

// Delete person profile
export async function deletePersonProfileByUserId(userId) {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection('Persons').deleteOne({
    userId: new ObjectId(userId),
  });

  return result.deletedCount > 0;
}
