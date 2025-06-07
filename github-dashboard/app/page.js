'use client';
import { useEffect, useState } from 'react';
import { Github, Zap, Calendar } from 'lucide-react';
import ExampleChart from '@/components/ExampleChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WeatherReport from '@/components/WeatherReport';
import PomodoroTimer from '@/components/PomodoroTimer';
import QuickLinks from '@/components/QuickLinks';

export default function Home() {
  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem('visit_data');
    return stored ? JSON.parse(stored).streak : 1;
  });

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

  return (
    <div className="bg-black min-h-screen py-4 px-8  ">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold mb-1">Hello Nash</h1>
            <div className="flex mt-4 items-center gap-2 text-gray-400 text-md">
              <Calendar className="h-4 w-4" />
              <span>{formattedDateTime}</span>
            </div>
          </div>
          <Badge className="bg-black text-lime-400 border border-lime-500 text-sm rounded-full shadow-[0_0_10px_rgba(132,204,22,0.5)] px-4 py-2">
            <Zap className="inline h-4 w-4 mr-1" />
            {streak} Day Streak
          </Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WeatherReport />
          <PomodoroTimer />
          <QuickLinks />
        </div>

        {/* GitHub Contributions */}
        <div className="lg:col-span-3">
          <Card className="bg-black text-white border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Github className="h-5 w-5" />
                GitHub Contributions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <ExampleChart />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
