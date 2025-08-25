import React, { useState } from "react";

function UrlForm({ onShorten }) {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });
      const data = await res.json();
      onShorten(data.shortUrl);
      setOriginalUrl(""); // clear input after submission
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Enter a long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        required
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

export default UrlForm;
