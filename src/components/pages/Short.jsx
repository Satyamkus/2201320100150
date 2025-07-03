import React, { useState } from 'react';
import axios from 'axios';

const Short = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const shortenUrl = async () => {
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }
    try {
      const response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${longUrl}`);
      setShortUrl(response.data.result.full_short_link);
      setError('');
    } catch (err) {
      setError('Failed to shorten the URL. Make sure it is valid.');
      setShortUrl('');
    }
  };

  return (
    <div className="shortener">
      
      <input
        type="text"
        placeholder="Enter  URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={shortenUrl}>Shorten</button>
      {shortUrl && (
        <div>
          <p>Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Short;
