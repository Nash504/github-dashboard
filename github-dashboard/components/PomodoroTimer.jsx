// Filename - index.js
'use client';
import React, { useState,useEffect, use } from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play,Pause } from 'lucide-react';
import { AnimatedCircularProgressBar } from './magicui/animated-circular-progress-bar';
export default function PomodoroTimer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [value, setValue] = useState(0);
    const [duration, setDuration] = useState(25 * 60); // 25 minutes in seconds
 

useEffect(() => {
    if(duration <= 0) {
        setIsPlaying(false);
        setDuration(25 * 60); // Reset to 25 minutes
    }
    if (!isPlaying) return;
    const timer = setInterval(() => {setDuration(prev => prev - 1);}, 1000);
    return () => clearInterval(timer);
}, [ isPlaying]);

const minutes = Math.floor(duration / 60);
const seconds = duration % 60;
    return (
        <div>
         <Card className="bg-black text-white border-gray-700 h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold" style={{ color: '#c2f245' }}>Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 justify-center flex flex-col items-center text-2xl text">
         <p>{minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            <div className="flex items-center justify-center space-x-4">
                <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
                >
                    {isPlaying ? <div className='flex items-center gap-4'><Pause/> Pause</div> : <div className='flex items-center gap-4'><Play/> Start</div>}
                </Button>
            </div>
        </CardContent>
    </Card>
</div>
);
}
