'use client';
import { useEffect, useState } from 'react';
import ExampleChart from '@/components/ExampleChart';
export default function Home() {
  const [users] = useState(['deiondz', 'Nash504', 'srijankulal']);
  const [data, setData] = useState({});

  useEffect(() => {
    users.forEach(user => {
      fetch(`/api/github/?user=${user}`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((userData) => {
          setData(prev => ({ ...prev, [user]: userData.contributions || [] }));
        })
        .catch((err) => {
          console.error(err);
          setData(prev => ({ ...prev, [user]: { error: err.message } }));
        });
    });
  }, [users]);

  return (
    <div>
      <h1>GitHub Contributions</h1>
      {users.map(user => (
        <div key={user}>
          <h2>{user}</h2>
          <pre>{JSON.stringify(data[user], null, 2)}</pre>
        </div>
      ))}
      <ExampleChart users={data}/>
    </div>
  );
}
