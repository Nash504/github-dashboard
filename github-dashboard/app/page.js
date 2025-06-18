"use client";
import { useEffect, useState } from "react";
import { Github, Zap, Calendar, RotateCcw, Plus } from "lucide-react";
import ExampleChart from "@/components/ExampleChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WeatherReport from "@/components/WeatherReport";
import PomodoroTimer from "@/components/PomodoroTimer";
import QuickLinks from "@/components/QuickLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
export default function Home() {
  const [users] = useState([
    "deiondz",
    "Nash504",
    "srijankulal",
    "VinshMachado",
    "shadow1951",
    "TheJonathanC",
  ]);
  const [data, setData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [streak, setStreak] = useState(() => {
    const stored = localStorage.getItem("visit_data");
    return stored ? JSON.parse(stored).streak : 1;
  });

  useEffect(() => {
    users.forEach((user) => {
      fetch(`/api/github/?user=${user}`)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((userData) => {
          setData((prev) => ({
            ...prev,
            [user]: userData.contributions || [],
          }));
        })
        .catch((err) => {
          console.error(err);
          setData((prev) => ({
            ...prev,
            [user]: { error: err.message },
          }));
        });
    });
  }, [users]);

  const handleAPI = () => {
    users.forEach((user) => {
      fetch(`/api/github/?user=${user}`)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((userData) => {
          setData((prev) => ({
            ...prev,
            [user]: userData.contributions || [],
          }));
        })
        .catch((err) => {
          console.error(err);
          setData((prev) => ({
            ...prev,
            [user]: { error: err.message },
          }));
        });
    });
  };

  const now = new Date();
  const formattedDateTime = now.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const handleInput = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-black min-h-screen py-4 px-8">
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
        <div className="lg:col-span-2">
          <Card className="bg-black text-white border-gray-700">
            <CardHeader className="pb-4 justify-between flex items-center">
              <CardTitle className="flex items-center  gap-2 text-lg sm:text-xl">
                <Github className="h-5 w-5" />
                GitHub Contributions
              </CardTitle>
              <div className="flex items-center gap-2">
                <Plus onClick={setIsDialogOpen} className="  cursor-pointer" />
                <RotateCcw className="h-5" onClick={handleAPI} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <ExampleChart data={data} />
              </div>
            </CardContent>
          </Card>{" "}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto border-cyan-400 bg-transparent text-cyan-400 hover:bg-transparent hover:text-cyan-300 transform transition-transform duration-200 hover:scale-105"
              >
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black text-white border-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Add GitHub User
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  className="bg-black text-white border-white"
                  type="text"
                  placeholder="Enter github user name"
                  onChange={(e) => setTempLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleInput()}
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    className="border-white text-white bg-black"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="text-black"
                    style={{ backgroundColor: "#c2f245" }}
                  >
                    Add User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
