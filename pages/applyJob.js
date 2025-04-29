'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyPage({ params }) {
//   const { id: jobId } = params;
  const router = useRouter();

  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!resumeFile) {
      setFeedback({ message: 'Please upload your resume.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('message', message);
    formData.append('contactInfo', contactInfo);
    // formData.append('jobId', jobId);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}` // Assumes you stored JWT in localStorage
        }
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ message: 'Application submitted successfully!', type: 'success' });
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setFeedback({ message: data.msg, type: 'error' });
      }
    } catch (error) {
      setFeedback({ message: 'Something went wrong!', type: 'error' });
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl mb-6 text-center">Apply for Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Upload Resume (PDF)</label>
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="block"
          />
          {resumeFile && <p className="text-green-600 mt-1">Selected: {resumeFile.name}</p>}
        </div>

        <div>
          <label className="block mb-1">Message / Cover Letter</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short message..."
            className="border p-2 w-full"
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-1">Your Contact Info (Phone/Email)</label>
          <input 
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="example@gmail.com / +123456789"
            className="border p-2 w-full"
          />
        </div>

        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Submit Application
        </button>

        {feedback.message && (
          <p className={`mt-4 text-center ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
}
