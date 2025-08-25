import React, { useEffect, useState } from "react";

function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/urls`)
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading admin data:", err));
  };

  const deleteUrl = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/urls/${id}`, {
      method: "DELETE",
    });
    fetchUrls(); // refresh list
  };

  const copyUrl = (shortCode) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied: " + shortUrl);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Visits</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td>
                  <a
                    href={`/${url.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {window.location.origin}/{url.shortCode}
                  </a>
                </td>
                <td>
                  <a href={url.originalUrl} target="_blank" rel="noreferrer">
                    {url.originalUrl}
                  </a>
                </td>
                <td>{url.visits}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => copyUrl(url.shortCode)}>Copy</button>
                  <button onClick={() => deleteUrl(url._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
