'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Timer, Coffee } from 'lucide-react';

export default function PomodoroTimer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(25 * 60);
    const [streak, setStreak] = useState(1);
    const [isBreak, setIsBreak] = useState(false);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedVisitData = localStorage.getItem('visit_data');
        let newStreak = 1;

        if (storedVisitData) {
            const data = JSON.parse(storedVisitData);
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

        const storedTimerState = localStorage.getItem('pomodoro_timer_state');
        if (storedTimerState) {
            const { savedEndTime, savedIsBreak, savedIsPlaying } = JSON.parse(storedTimerState);
            const now = new Date().getTime();

            if (savedEndTime && savedEndTime > now) {
                setEndTime(savedEndTime);
                setIsBreak(savedIsBreak);
                setIsPlaying(savedIsPlaying);
                setDuration(Math.round((savedEndTime - now) / 1000));
            } else {
                localStorage.removeItem('pomodoro_timer_state');
                setDuration(25 * 60);
                setIsBreak(false);
                setIsPlaying(false);
            }
        }
    }, []);

    useEffect(() => {
        let timerInterval;

        if (isPlaying && endTime) {
            timerInterval = setInterval(() => {
                const now = new Date().getTime();
                const remaining = Math.round((endTime - now) / 1000);

                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    setIsPlaying(false);

                    setIsBreak(prevIsBreak => {
                        const nextIsBreak = !prevIsBreak;
                        setDuration(nextIsBreak ? 5 * 60 : 25 * 60);
                        setEndTime(null);
                        localStorage.removeItem('pomodoro_timer_state');

                        if (Notification.permission === 'granted') {
                            new Notification('Timer done!', {
                                body: nextIsBreak ? 'Focus session done! Take a break.' : 'Break over! Time to focus.',
                            });
                        } else if (Notification.permission !== 'denied') {
                            Notification.requestPermission().then(permission => {
                                if (permission === 'granted') {
                                    new Notification('Timer done!', {
                                        body: nextIsBreak ? 'Focus session done! Take a break.' : 'Break over! Time to focus.',
                                    });
                                }
                            });
                        }
                        return nextIsBreak;
                    });
                } else {
                    setDuration(remaining);
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [isPlaying, endTime]);

    useEffect(() => {
        if (isPlaying && endTime) {
            localStorage.setItem('pomodoro_timer_state', JSON.stringify({
                savedEndTime: endTime,
                savedIsBreak: isBreak,
                savedIsPlaying: isPlaying,
            }));
        } else if (!isPlaying && duration === (isBreak ? 5 * 60 : 25 * 60)) {
            localStorage.removeItem('pomodoro_timer_state');
        }
    }, [isPlaying, endTime, isBreak, duration]);

    const handlePlayPause = () => {
        setIsPlaying(prev => {
            const newState = !prev;
            if (newState && !endTime) {
                const currentSessionDuration = isBreak ? 5 * 60 : 25 * 60;
                setEndTime(new Date().getTime() + currentSessionDuration * 1000);
            }
            return newState;
        });
    };

    const handleReset = () => {
        setIsPlaying(false);
        setDuration(25 * 60);
        setIsBreak(false);
        setEndTime(null);
        localStorage.removeItem('pomodoro_timer_state');
    };

    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    const initialDurationOfCurrentPhase = isBreak ? 5 * 60 : 25 * 60;
    const progress = ((initialDurationOfCurrentPhase - duration) / initialDurationOfCurrentPhase) * 100;

    return (
        <Card className="bg-black border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 text-white">
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

                <div className="flex justify-center gap-3">
                    <Button
                        onClick={handlePlayPause}
                        className="bg-[#c2f245] hover:bg-lime-400 hover:text-black text-black px-6"
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 mr-2" />
                        ) : (
                            <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                </div>

                <p className="text-sm text-gray-400">
                    {isBreak ? 'Take a break and relax' : 'Stay focused on your task'}
                </p>
            </CardContent>
        </Card>
    );
}
