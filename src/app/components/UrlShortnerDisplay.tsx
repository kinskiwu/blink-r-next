'use client'
import React, { useState, useEffect } from 'react';

const UrlShortenerDisplay = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [viewAnalytics, setViewAnalytics] = useState(false);
  const [timeFrame, setTimeFrame] = useState('All Time');
  const [accessCount, setAccessCount] = useState(0);

    useEffect(() => {
    if (viewAnalytics) {
      handleFetchAnalytics();
    }
  }, [viewAnalytics]);

  const handleShortenUrl = async () => {
    if (!longUrl) {
      alert('Please enter a URL to shorten.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ longUrl })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      console.log('data', data)
      console.log(response.status, response.statusText);
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error('There was an error shortening the URL:', error);
      alert('Failed to shorten the URL.');
    }
  };

  const handleFetchAnalytics = async () => {
    const shortUrlId = shortUrl.split('/').pop();
    try {
      const response = await fetch(`http://localhost:4000/api/v1/url/analytics?shortUrlId=${shortUrlId}&timeFrame=all`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics data.');
      }

      const data = await response.json();
      setTimeFrame(data.timeFrame);
      setAccessCount(data.accessCount);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      alert('Failed to fetch analytics data.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert('Short URL copied to clipboard!');
    });
  };

    const handleViewAnalytics = () => {
    setViewAnalytics(true);
  };

  return (
    <div className="mt-10 w-full max-w-md">
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter your long URL here"
        className="w-full p-4 mb-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleShortenUrl}
        className="w-full p-4 bg-blue-500 text-white rounded-b-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        Shorten URL
      </button>
      {shortUrl && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow">
          <div className="flex justify-between items-center">
            <span className="break-all">{shortUrl}</span>
            <div>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Copy
              </button>
              <button
                onClick={handleViewAnalytics}
                className="ml-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      )}
      {viewAnalytics && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md shadow text-center">
          <h3 className="text-lg font-bold">Analytics for {shortUrl}</h3>
          <p>Time Frame: {timeFrame}</p>
          <p>Assess Count: {accessCount}</p>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerDisplay;