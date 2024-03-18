'use client'
import React, { useState, useEffect} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase.config';
import UrlShortenerDisplay from './components/UrlShortnerDisplay';
import TopNavBar from './components/TopNavBar';

const Home = () => {
  const [user] = useAuthState(auth);
  console.log('user', user);
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
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <TopNavBar isLoggedIn={!!user} handleSignOut={handleSignOut} />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Minerva</h1>
        {isLoggedIn && <UrlShortenerDisplay />}
      </div>
    </div>
  );
};

export default Home;