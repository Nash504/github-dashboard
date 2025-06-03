'use client';
import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import ExampleChart from '@/components/ExampleChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuickLinks from '@/components/QuickLinks';
import WeatherReport from '@/components/WeatherReport';

export default function Home() {
  const [users] = useState(['deiondz', 'Nash504', 'srijankulal','VinshMachado','shadow1951']);
  const [data, setData] = useState({});
  const now = new Date();
  const formattedDateTime = now.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

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
    <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className='text-white text-4xl mb-2'>Hello Nash</h1>
          <h2 className='text-white text-lg'>{formattedDateTime}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weather Report Section */}
          <WeatherReport className="space-y-4" />
          <QuickLinks className="space-y-4" />
          {/* GitHub Contributions Section */}
          <div className="space-y-4 lg:col-span-2">
            <Card className="bg-gray-800 text-white border-gray-700">
              <CardHeader className="pb-4">
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
    </div>
  );
}
