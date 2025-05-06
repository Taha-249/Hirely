'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push('/applyJob/1');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="User Name" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
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

      <button type="submit" className="btn btn-primary w-100">Login</button>
      <p className="mt-3 text-center">
        <Link href="/signup">Don't have an account? Sign up</Link>
      </p>
    </form>
  );
}
