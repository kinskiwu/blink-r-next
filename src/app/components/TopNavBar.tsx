'use client'
import React from 'react';
import Link from 'next/link';

interface TopNavBarProps {
  isLoggedIn: boolean;
  handleSignOut: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ isLoggedIn, handleSignOut }) => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-4 py-6 flex justify-between items-center">
        <h2 className="text-xl px-4 font-semibold text-blue-600">MinervaL</h2>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/shorten-url" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                Shorten Url
              </Link>
              <Link href="/analytics" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300">
                Analytic
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-x-4" >
              <Link href="/sign-up" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
               Sign Up
              </Link>
              <Link href="/sign-in" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;