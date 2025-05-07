import clientPromise from '@/src/helpers/mongodb/connect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  if (method !== 'PATCH') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
     const client = await clientPromise; 
    const db = client.db();
    const jobsCollection = db.collection('Jobs');

    const objectId = new ObjectId(id);

    const job = await jobsCollection.findOne({ _id: objectId });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const updatedStatus = !job.isOpen;

    const result = await jobsCollection.updateOne(
      { _id: objectId },
      { $set: { isOpen: updatedStatus } }
    );

    return res.status(200).json({
      message: updatedStatus ? 'Job reopened' : 'Job closed',
      isOpen: updatedStatus
    });

  } catch (error) {
    console.error('Error toggling job status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
