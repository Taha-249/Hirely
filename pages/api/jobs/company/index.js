import { getAllJobs } from '@/src/helpers/mongodb/jobService';

export default async function handler(req, res) {
  try {
    const jobs = await getAllJobs();
    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
}



/*import { getJobsByCompany } from '@/src/helpers/mongodb/jobService';

export default async function handler(req, res) {
  const { companyId } = req.query;

  if (!companyId) {
    return res.status(400).json({ message: 'Company ID is required' });
  }

  try {
    const jobs = await getJobsByCompany(companyId);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Failed to fetch jobs' });
  }
}*/
