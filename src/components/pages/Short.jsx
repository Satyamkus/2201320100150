import { useState, useEffect } from 'react';

const Short = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // Load click count from localStorage if shortUrl exists
  useEffect(() => {
    if (shortUrl) {
      const storedCount = localStorage.getItem(shortUrl);
      if (storedCount) {
        setClickCount(parseInt(storedCount));
      } else {
        setClickCount(0);
      }
    }
  }, [shortUrl]);

  const handleShorten = async (e) => {
    e.preventDefault();
    console.log("submitted");

    if (!longUrl) {
      alert("Please enter a URL");
      return;
    }

    const res = await fetch("https://api.tinyurl.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer HPiqqT5ddOjVh2etrua8mWsUw5F7D5H2WLQIiwpu1OHG4eX1SohvukapiYgJ"
      },
      body: JSON.stringify({
        url: longUrl,
        domain: "tinyurl.com"
      })
    });

    const data = await res.json();
    console.log(data);

    if (data.data && data.data.tiny_url) {
      const newShortUrl = data.data.tiny_url;
      setShortUrl(newShortUrl);

      // Check if URL already exists in localStorage
      const existingCount = localStorage.getItem(newShortUrl);
      setClickCount(existingCount ? parseInt(existingCount) : 0);
    } else {
      console.error("Error Response:", data);
      alert(data.errors?.[0]?.message || "Failed to shorten the URL");
    }
  };

  const handleLinkClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    localStorage.setItem(shortUrl, newCount); // Save to localStorage
  };

  return (
    <>
      <div className="container">
        <form>
          <h1>Link Shortener</h1>
          <input
            type="url"
            placeholder="Enter URL to short"
            required
            pattern="https?://.+"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          /><br />
          <button onClick={handleShorten}>Submit</button>
        </form>

        {shortUrl && (
          <div className="result">
            <p>
              Short URL:{" "}
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                {shortUrl}
              </a>
            </p>
            <p>Link clicked: {clickCount} times</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Short;
