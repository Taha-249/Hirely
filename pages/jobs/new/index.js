import { useState } from 'react';
import styles from '@/styles/CreateJob.module.css';

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    category: '',
    salary: '',
    workmode: '',
    experience: '',
    isOpen: true,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Job posted successfully!');
        setFormData({
          title: '',
          company: '',
          location: '',
          category: '',
          salary: '',
          workmode: '',
          experience: '',
          isOpen: true,
        });
      } else {
        setMessage(result.message || 'Failed to post job.');
      }
    } catch (error) {
      setMessage('An error occurred while posting the job.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post a New Job</h1>
      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit}>
        {['title', 'company', 'location', 'category', 'salary', 'workmode', 'experience'].map((field) => (
          <div className={styles.formGroup} key={field}>
            <label className={styles.label}>
              {field[0].toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        ))}

        <button type="submit" className={styles.button}>
          Create Job
        </button>
      </form>
    </div>
  );
}
