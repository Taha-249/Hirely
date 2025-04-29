'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Signup successful!');
      router.push('/login');
    } else {
      alert(data.message || 'Signup failed.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Sign Up</h2>

      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <input 
          type="email" 
          className="form-control" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <input 
          type="password" 
          className="form-control" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <select 
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)} 
        >
          <option value="user">User</option>
          <option value="company">Company</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100">Sign Up</button>
      <p className="mt-3 text-center">
        <Link href="/login">Already have an account? Sign in</Link>
      </p>
    </form>
  );
}
