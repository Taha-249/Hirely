'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // const { success, message } = await login(email, password);
    // if (success) {
    //   router.push('/dashboard');
    // } else {
    //   setError(message);
    // }
  }

  return (
    <form className="space-y-4">
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
      <button onClick={handleSubmit}>Login In</button>
      <Link href={'/signup'}> Donot have account? Click to Sign Up</Link>
      
    </form>
  );
}
