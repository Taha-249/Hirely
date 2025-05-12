import clientPromise from './connect';
import { ObjectId } from 'mongodb';

export async function createApplicant(userId, jobId) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default DB or specify as db("your_db_name")
    const applicantsCollection = db.collection('applicants');

    const result = await applicantsCollection.insertOne({
      userId: new ObjectId(userId),
      jobId: new ObjectId(jobId),
      appliedAt: new Date()
    });

    return result;
  } catch (error) {
    console.error('Error creating applicant:', error);
    throw error;
  }
}

export async function getApplicant(userId, jobId) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use default or specify db("your_db_name")
    const applicantsCollection = db.collection('applicants');

    const applicant = await applicantsCollection.findOne({
      userId: new ObjectId(userId),
      jobId: new ObjectId(jobId)
    });

    return applicant;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    throw error;
  }
}