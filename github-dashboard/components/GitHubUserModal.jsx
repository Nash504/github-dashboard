"use client";

import { Github, RotateCcw, Plus, Settings, Trash2 } from "lucide-react";
import ExampleChart from "@/components/ExampleChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useCallback } from "react";

export default function GitHubUserModal() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false); // State for Add User Dialog
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false); // New state for Settings Dialog
  const [newUserName, setNewUserName] = useState("");

  // Fetches GitHub contributions for a given username
  const fetchContributions = useCallback(async (username) => {
    try {
      const response = await fetch(`/api/github/?user=${username}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${username}`);
      }
      const userData = await response.json();
      return userData.contributions || [];
    } catch (err) {
      console.error(`Error fetching contributions for ${username}:`, err);
      return { error: err.message };
    }
  }, []);

  // Effect to initialize users from localStorage or a default list
  useEffect(() => {
    const storedUsers = localStorage.getItem("github_users");
    let initialUsers = [];

    if (storedUsers) {
      try {
        initialUsers = JSON.parse(storedUsers);
      } catch (e) {
        console.error("Error parsing stored users from localStorage:", e);
        initialUsers = [
          "deiondz",
          "Nash504",
          "srijankulal",
          "VinshMachado",
          "shadow1951",
          "TheJonathanC",
        ];
      }
    } else {
      initialUsers = [
        "deiondz",
        "Nash504",
        "srijankulal",
        "VinshMachado",
        "shadow1951",
        "TheJonathanC",
      ];
      localStorage.setItem("github_users", JSON.stringify(initialUsers));
    }
    setUsers(initialUsers);
  }, []);

  // Effect to fetch contribution data whenever the 'users' state changes
  useEffect(() => {
    const fetchAllUserData = async () => {
      const contributionsMap = {};
      for (const user of users) {
        contributionsMap[user] = await fetchContributions(user);
      }
      setData(contributionsMap);
    };

    if (users.length > 0) {
      fetchAllUserData();
    }
  }, [users, fetchContributions]);

  // Handles adding a new GitHub user
  const handleAddUser = () => {
    const trimmedUserName = newUserName.trim();
    if (trimmedUserName && !users.includes(trimmedUserName)) {
      const updatedUsers = [...users, trimmedUserName];
      setUsers(updatedUsers);
      localStorage.setItem("github_users", JSON.stringify(updatedUsers));
      setNewUserName("");
      setIsAddUserDialogOpen(false); // Close the Add User dialog
    } else if (users.includes(trimmedUserName)) {
      alert("This user is already in your list.");
    }
  };

  // Handles refreshing all GitHub user data
  const handleRefreshData = () => {
    setUsers([...users]); // Triggers re-fetch via useEffect
  };

  return (
    <div className="lg:col-span-2">
      <Card className="bg-black text-white border-gray-700">
        <CardHeader className="pb-4 justify-between flex items-center">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Github className="h-5 w-5" />
            GitHub Contributions
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* Settings Icon to open the new Settings Dialog */}
            <Settings
              className="h-5 text-gray-400 cursor-pointer"
              onClick={() => setIsSettingsDialogOpen(true)}
            />
            <Plus
              onClick={() => setIsAddUserDialogOpen(true)} // Opens the Add User dialog
              className="h-5 text-gray-400 cursor-pointer"
            />
            <RotateCcw
              className="h-5 cursor-pointer"
              onClick={handleRefreshData}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <ExampleChart data={data} />
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="bg-black text-white border-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add GitHub User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              className="bg-black text-white border-white"
              type="text"
              placeholder="Enter GitHub user name"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                className="border-white text-white bg-black"
                onClick={() => setIsAddUserDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="text-black"
                style={{ backgroundColor: "#c2f245" }}
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NEW: Settings Dialog */}
      <Dialog
        open={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
      >
        <DialogContent className="bg-black text-white border-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Settings</DialogTitle>
          </DialogHeader>

          <div className="flex gap-2">
            <p className="text-sm text-gray-400 flex flex-col">
              {users.map((user, index) => (
                <span key={index} className="text-sm text-gray-400">
                  {user}
                  <Button
                    onClick={() => {
                      const updatedUsers = users.filter((u) => u !== user);
                      setUsers(updatedUsers);
                      localStorage.setItem(
                        "github_users",
                        JSON.stringify(updatedUsers)
                      );
                    }}
                    className="ml-2 p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </Button>
                </span>
              ))}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
