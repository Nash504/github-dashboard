"use client";

import { Github, RotateCcw, Plus } from "lucide-react";
import ExampleChart from "@/components/ExampleChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import React, { useState } from "react";

export default function GitHubUserModal() {
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
  const handleInput = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="lg:col-span-2">
      <Card className="bg-black text-white border-gray-700">
        <CardHeader className="pb-4 justify-between flex items-center">
          <CardTitle className="flex items-center  gap-2 text-lg sm:text-xl">
            <Github className="h-5 w-5" />
            GitHub Contributions
          </CardTitle>
          <div className="flex items-center gap-2">
            <Plus
              onClick={() => setIsDialogOpen(true)}
              className="h-5  text-gray-400 cursor-pointer"
            />
            <RotateCcw className="h-5 cursor-pointer" onClick={handleAPI} />
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
            <DialogTitle className="text-white">Add GitHub User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              className="bg-black text-white border-white"
              type="text"
              placeholder="Enter github user  name"
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
  );
}
