const jobs = [
    { _id: 'a1', title: 'Frontend Dev', companyId: '1', company: 'TechCorp', location: 'NYC', category: 'Engineering', salary: '100k', isOpen: true },
    { _id: 'a2', title: 'Backend Dev', companyId: '1', company: 'TechCorp', location: 'Remote', category: 'Engineering', salary: '120k', isOpen: true },
    { _id: 'b1', title: 'Medical Analyst', companyId: '2', company: 'HealthHub', location: 'San Francisco', category: 'Research', salary: '90k', isOpen: true },
  ];
  
  export default function handler(req, res) {
    const { id } = req.query;
    const filtered = jobs.filter((job) => job.companyId === id);
    res.status(200).json(filtered);
  }
  

  // pages/api/companies/[id]/jobs.js
/*import clientPromise from '@/src/helpers/mongodb/connect';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db();
    const jobs = await db.collection('jobs').find({ companyId: new ObjectId(id) }).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs for company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
 */