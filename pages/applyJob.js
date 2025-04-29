'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ApplyPage({ params }) {
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

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
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
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Apply for Job</h2>

      {feedback.message && (
        <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload Resume (PDF)</label>
          <input 
            type="file" 
            accept="application/pdf" 
            className="form-control"
            onChange={(e) => setResumeFile(e.target.files[0])} 
          />
          {resumeFile && <small className="text-success">Selected: {resumeFile.name}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Message / Cover Letter</label>
          <textarea 
            className="form-control" 
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a short message..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Info</label>
          <input 
            type="text" 
            className="form-control"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="example@gmail.com / +123456789"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Application</button>
      </form>
    </div>
  );
}
