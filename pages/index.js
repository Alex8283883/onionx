// pages/index.js
import useSWR from 'swr';
const fetcher = (url) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/latest', fetcher, { refreshInterval: 5000 });

  if (error) return <div style={{ color: 'red' }}>Error loading email.</div>;
  if (!data) return <p>Loading…</p>;
  if (data.empty) return <p>No emails found yet.</p>;

  return (
    <main style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h1>{data.subject}</h1>
      <p style={{ color: '#666' }}>
        From: <strong>{data.from}</strong> — {new Date(data.date).toLocaleString()}
      </p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: data.html || `<p>${data.intro}</p>` }} />
    </main>
  );
}
