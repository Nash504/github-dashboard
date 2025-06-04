'use client';
import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import ExampleChart from '@/components/ExampleChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuickLinks from '@/components/QuickLinks';
import WeatherReport from '@/components/WeatherReport';
import PomodoroTimer from '@/components/PomodoroTimer';
export default function Home() {
 
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
          <PomodoroTimer/>
          {/* GitHub Contributions Section */}
          <div className="space-y-4 lg:col-span-2">
            <Card className="bg-black text-white border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                  GitHub Contributions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <ExampleChart/>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
