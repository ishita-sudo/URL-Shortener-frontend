import React, { useState } from "react";
import UrlForm from "./urlForm";
import "./App.css"

function App() {
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = (url) => {
    setShortUrl(url);
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div className="app container">
      <h1>🔗 URL Shortener</h1>

      {/* Reusable form component */}
      <UrlForm onShorten={handleShorten} />

      {shortUrl && (
        <div className="result">
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <button onClick={copyToClipboard} className="copy-btn">📋 Copy</button>
        </div>
      )}
    </div>
  );
}

export default App;
