'use client';
import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase.config';
import Chart from 'react-apexcharts';

const Analytics = () => {
  const [user] = useAuthState(auth);
  const [shortUrlId, setShortUrlId] = useState('');
  const [timeFrame, setTimeFrame] = useState('all');
  const [accessCount, setAccessCount] = useState(0);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/url/analytics?shortUrlId=${shortUrlId}&timeFrame=${timeFrame}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data.');
      }

      const data = await response.json();
      setAccessCount(data.accessCount); // Update your state with the fetched data
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      alert('Failed to fetch analytics data.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <TopNavBar isLoggedIn={!!user} handleSignOut={() => auth.signOut()} />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <input
            type="text"
            value={shortUrlId}
            onChange={(e) => setShortUrlId(e.target.value)}
            placeholder="Enter short URL id here"
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="w-full p-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <button
            onClick={fetchAnalyticsData}
            className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Fetch Analytics
          </button>
        </div>
        <div className="mt-8">
          <Chart
            options={{
              chart: {
                id: 'access-count'
              },
              xaxis: {
                categories: [timeFrame] // Simplified for demonstration
              }
            }}
            series={[{
              name: 'Access Count',
              data: [accessCount] // Simplified for demonstration
            }]}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
