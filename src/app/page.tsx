'use client'
import React, { useState, useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase.config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Home = () => {
  const [user] = useAuthState(auth);
  console.log('user', user);
  const router = useRouter();
  const userSession = sessionStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if(!user && !userSession){
        setIsLoggedIn(false);
      }else {
        setIsLoggedIn(true);
      }
  }, [user, userSession]);

  const handleSignOut = () => {
    console.log('Signing out...');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Short Url</h1>
      {!isLoggedIn ? (
        <div>
          <Link href="/sign-up" className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
              Sign Up
          </Link>
          <Link href="/sign-in" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300">
              Sign In
          </Link>
        </div>
      ) : (
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};


export default Home;