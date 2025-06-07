'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Timer, Coffee } from 'lucide-react';

export default function PomodoroTimer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(25*60);
    const [streak, setStreak] = useState(1);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('visit_data');
        let newStreak = 1;

        if (stored) {
            const data = JSON.parse(stored);
            const lastDate = data.date;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate === today) {
                newStreak = data.streak;
            } else if (lastDate === yesterday.toDateString()) {
                newStreak = data.streak + 1;
            }
        }

        setStreak(newStreak);
        localStorage.setItem('visit_data', JSON.stringify({ date: today, streak: newStreak }));
    }, []);
useEffect(() => {
  if (duration <= 0) {
    setIsPlaying(false);
    setIsBreak(!isBreak);
    setDuration(isBreak ? 25 * 60 : 5 * 60);

    // Notify user when timer ends
    if (Notification.permission === 'granted') {
      new Notification('Timer done!', {
        body: isBreak ? 'Break over! Time to focus.' : 'Focus session done! Take a break.',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Timer done!', {
            body: isBreak ? 'Break over! Time to focus.' : 'Focus session done! Take a break.',
          });
        }
      });
    }
  }

  if (!isPlaying) return;
  const timer = setInterval(() => setDuration(prev => prev - 1), 1000);
  return () => clearInterval(timer);
}, [isPlaying, duration, isBreak]);

    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const progress =
        ((isBreak ? 5 * 60 : 25 * 60) - duration) / (isBreak ? 5 * 60 : 25 * 60) * 100;

    return (
        <Card className="bg-black  border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 text-white">
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                {isBreak ? (
                    <Coffee className="w-5 h-5 text-[#c2f245]" />
                ) : (
                    <Timer className="w-5 h-5 text-[#c2f245]" />
                )}
                <CardTitle className="text-lg font-semibold text-[#c2f245] ml-2">
                    {isBreak ? 'Break Time' : 'Focus Time'}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 text-center">
                {/* Circular Progress */}
                <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#374151" strokeWidth="8" />
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#c2f245"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 54}`}
                            strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                            className="transition-all duration-1000 ease-linear"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-mono font-bold text-white">
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-3">
                    <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-[#c2f245]  text-black px-6"
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 mr-2" />
                        ) : (
                            <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying ? 'Pause' : 'Start'}
                    </Button>
                    <Button
                        onClick={() => {
                            setIsPlaying(false);
                            setDuration(25 * 60);
                            setIsBreak(false);
                        }}
                    >
                        Reset
                    </Button>
                </div>

                {/* Status */}
                <p className="text-sm text-gray-400">
                    {isBreak ? 'Take a break and relax' : 'Stay focused on your task'}
                </p>
            </CardContent>
        </Card>
    );
}
