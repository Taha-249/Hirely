import { getAllCompanies, createCompany } from '@/src/helpers/mongodb/companyService';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { page, limit } = req.query;
      const data = await getAllCompanies(page, limit);
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const companyData = req.body;
      const newCompany = await createCompany(companyData);
      res.status(201).json(newCompany);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in companies handler:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
