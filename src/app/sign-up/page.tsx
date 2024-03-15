'use client'
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.config.js';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // todo: remove console log
    console.log(email, password);
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log('{res}', {res});
      sessionStorage.setItem('user', 'true');
      setEmail('');
      setPassword('');
      router.push('./')
    } catch (err){
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email} onChange={(e) => setEmail(e.target.value)}
                id="email" required />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password} onChange={(e) => setPassword(e.target.value)}
                id="password" required />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
