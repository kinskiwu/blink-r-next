'use client'
import React from 'react'
import TopNavBar from '../components/TopNavBar';
import UrlShortenerDisplay from '../components/UrlShortnerDisplay';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.config';

const ShortenUrl = () => {
const [user] = useAuthState(auth);

  const handleSignOut = () => {
    console.log('Signing out...');
    auth.signOut();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <TopNavBar isLoggedIn={!!user} handleSignOut={handleSignOut} />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-8"> Minerva's Quill</h2>
        <UrlShortenerDisplay />
      </div>
    </div>
  );
};
export default ShortenUrl;