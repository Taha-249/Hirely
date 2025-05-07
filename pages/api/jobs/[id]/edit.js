import clientPromise from '@/src/helpers/mongodb/connect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  try {
    const client = await clientPromise; 
    const db = client.db();
    const jobsCollection = db.collection('Jobs');

    const objectId = new ObjectId(id);

    if (method === 'PUT') {
      const updateData = req.body;
      console.log('Update Data:', updateData); // 👈 Add console log here

      const result = await jobsCollection.updateOne(
        { _id: objectId },
        { $set: updateData }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Updated successfully' });
    }

    if (method === 'DELETE') {
      const result = await jobsCollection.deleteOne({ _id: objectId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json({ message: 'Deleted successfully' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
