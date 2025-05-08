const companies = [
    { id: '1', name: 'TechCorp', industry: 'Software', location: 'NYC', description: 'We build scalable software.' },
    { id: '2', name: 'HealthHub', industry: 'Healthcare', location: 'San Francisco', description: 'Revolutionizing health.' },
  ];
  
  export default function handler(req, res) {
    const { id } = req.query;
    const company = companies.find((c) => c.id === id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  }
  
  // pages/api/companies/[id].js
/*import clientPromise from '@/src/helpers/mongodb/connect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db();
    const company = await db.collection('companies').findOne({ _id: new ObjectId(id) });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
*/