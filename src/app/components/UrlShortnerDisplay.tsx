'use client'
import React, { useState } from 'react';

const UrlShortenerDisplay = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

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


  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      alert('Short URL copied to clipboard!');
    });
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
            <button
              onClick={handleCopy}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerDisplay;
