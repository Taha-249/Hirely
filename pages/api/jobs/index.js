import { getAllJobs, createJob } from "@/src/helpers/mongodb/jobService";

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { page = 1, limit = 10,  search = '', jobTypes = '', workMode = '', experience = ''} = req.query;
      const jobTypesArray = jobTypes ? jobTypes.split(',').filter(Boolean) : []
      const workModeArray = workMode ? workMode.split(',').filter(Boolean) : []
      const experienceArray = experience ? experience.split(',').filter(Boolean) : []
      const {jobs, totalJobs } = await getAllJobs(page, limit, search, jobTypesArray, workModeArray, experienceArray);
      return res.status(200).json({jobs, totalJobs});
    }

    if (req.method === 'POST') {
      const job = await createJob(req.body);
      return res.status(201).json(job);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
