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
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
      router.push('/login');
    } else {
      alert(data.message || "Signup failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        className="border p-2 w-full"
      >
        <option value="user">User</option>
        <option value="company">Company</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      <Link href={'/login'}>Already have an account? Click to Sign In</Link>
    </form>
  );
}
