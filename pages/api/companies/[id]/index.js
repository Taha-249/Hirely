import {
  getCompanyByID,
  updateCompanyByID,
  deleteCompanyByID
} from '@/src/helpers/mongodb/companyService';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const company = await getCompanyByID(id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(company);
    } else if (req.method === 'PUT') {
      const updated = await updateCompanyByID(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Company not found or not updated' });
      }
      res.status(200).json({ message: 'Company updated successfully' });
    } else if (req.method === 'DELETE') {
      const deleted = await deleteCompanyByID(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Company not found or not deleted' });
      }
      res.status(200).json({ message: 'Company deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in company/[id] handler:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
