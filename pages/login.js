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
      // ✅ redirect to protected page
      router.push('/applyJob');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  }

  return (
    <form className="space-y-4">
      <input 
        type="text" 
        placeholder="user name" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleSubmit}>Login In</button>
      <Link href={'/signup'}> Donot have account? Click to Sign Up</Link>
      
    </form>
  );
}
