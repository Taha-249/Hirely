import { createApplicant, getApplicant } from '@/src/helpers/mongodb/applicantService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, jobId } = req.body;

  if (!userId || !jobId) {
    return res.status(400).json({ message: 'userId and jobId are required' });
  }

  try {
    const applicant = await getApplicant(userId, jobId)
    if(applicant) {
        return res.status(409).json({ message: 'You have already applied to this job.' });
    }
    const result = await createApplicant(userId, jobId);

    return res.status(201).json({
      message: 'Application submitted successfully',
      applicantId: result.insertedId,
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
