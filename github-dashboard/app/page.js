'use client';
import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import ExampleChart from '@/components/ExampleChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuickLinks from '@/components/QuickLinks';
export default function Home() {
  const [users] = useState(['deiondz', 'Nash504', 'srijankulal','VinshMachado','shadow1951']);
  const [data, setData] = useState({});
  


  const openTab = (url) => {
    window.open(url, '_blank');
  };

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
  }, []);

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <h1 className='text-white text-4xl'>Hello NAUAH</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen p-4 sm:p-6 gap-4 sm:gap-6">

        <QuickLinks className="space-y-4 sm:space-y-6 order-1 lg:order-1" />

      {/* GitHub Contributions Section */}
      <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              GitHub Contributions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <ExampleChart users={data} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}