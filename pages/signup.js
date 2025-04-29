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
    // const { success, message } = await register(email, password, role);
    // if (success) {
    //   router.push('/dashboard');
    // } else {
    //   setError(message);
    // }
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
      <button onClick={handleSubmit}>Submit</button>
      <Link href={'/login'}> Already has account? Click to Sign In</Link>
    </form>
  );
}
