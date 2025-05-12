import clientPromise from './connect';
import { ObjectId } from 'mongodb';

export async function getAllJobs(page = 1, limit = 10) {
  const client = await clientPromise;
  const db = client.db(); // uses DB from connection string
  
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;

  const skip = (pageNumber - 1) * limitNumber;

  const totalJobs = await db.collection('Jobs').countDocuments();
  const jobs = await db
    .collection('Jobs')
    .find({})
    .skip(skip) 
    .limit(limitNumber) 
    .toArray();
  
  return { jobs, totalJobs };
}

export async function createJob(jobData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('Jobs').insertOne(jobData);
  return result.ops?.[0] || result;
}

export async function getJobByID(id) {
    const client = await clientPromise;
    const db = client.db();
    const job = await db
    .collection('Jobs')
    .findOne({_id: new ObjectId(id)})
    return job
}


export async function getJobsByCompany(companyId) {
  const client = await clientPromise;
  const db = client.db();
  const jobs = await db
    .collection('Jobs')
    .find({ createdBy: companyId })
    .toArray();
  return jobs;
}
