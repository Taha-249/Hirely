const companies = [
    { id: '1', name: 'TechCorp', industry: 'Software', location: 'NYC', description: 'We build scalable software.' },
    { id: '2', name: 'HealthHub', industry: 'Healthcare', location: 'San Francisco', description: 'Revolutionizing health.' },
    // more companies...
  ];
  
  export default function handler(req, res) {
    res.status(200).json(companies);
  }
  

  // pages/api/companies/index.js
/*import clientPromise from '@/src/helpers/mongodb/connect';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const companies = await db.collection('companies').find({}).toArray();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
}*/
