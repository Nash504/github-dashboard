'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

useEffect(() => {
  fetch('/api/github')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(setData)
    .catch((err) => {
      console.error(err);
      setData({ error: err.message });
    });
}, []);


  return (
    <main>
      <h1>API says:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
