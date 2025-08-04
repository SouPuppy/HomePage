import { useEffect, useState } from 'react';

export default function ProfileCard() {
  const [info, setInfo] = useState<{ name: string; bio: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/info')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setInfo(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!info) return <p>No data</p>;

  return (
    <div>
      <h1>Hi, I'm {info.name}</h1>
      <p>{info.bio}</p>
    </div>
  );
}
