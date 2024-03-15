'use client'
import React, { useState } from 'react';

const UrlShortenerDisplay = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShortenUrl = async () => {
    // Placeholder for URL shortening logic
    // This is where you would call your API to shorten the URL
    console.log('Shortening URL:', longUrl);
    // Simulate a short URL response
    const simulatedShortUrl = `https://short.url/${Math.random().toString(36).substr(2, 5)}`;
    setShortUrl(simulatedShortUrl);
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
