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
  // Renamed for clarity: this dialog will now handle both adding and managing
  const [isManageUsersDialogOpen, setIsManageUsersDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // Fetches GitHub contributions for a given username
  const fetchContributions = useCallback(async (username) => {
    try {
      const response = await fetch(`/api/github/?user=${username}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${username}`);
        return [];
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
      setNewUserName(""); // Clear the input field after adding
      // No need to close dialog here, as it stays open for further management
    } else if (users.includes(trimmedUserName)) {
      alert("This user is already in your list.");
    }
  };

  // Handles deleting a GitHub user
  const handleDeleteUser = (userToDelete) => {
    const updatedUsers = users.filter((user) => user !== userToDelete);
    setUsers(updatedUsers);
    localStorage.setItem("github_users", JSON.stringify(updatedUsers));
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
            {/* The Settings icon will now open the combined "Manage Users" dialog */}
            <Settings
              className="h-10 text-gray-400 cursor-pointer"
              onClick={() => setIsManageUsersDialogOpen(true)}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <ExampleChart data={data} />
          </div>
        </CardContent>
      </Card>

      {/* Combined Manage Users Dialog */}
      <Dialog
        open={isManageUsersDialogOpen}
        onOpenChange={setIsManageUsersDialogOpen}
      >
        <DialogContent className="bg-black text-white border-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              Manage GitHub Users
            </DialogTitle>
          </DialogHeader>

          {/* Input for adding new users */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-2">
              <Input
                className="flex-grow bg-black text-white border-gray-600 focus:border-cyan-400"
                type="text"
                placeholder="Enter GitHub user name to add"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
              />
              <Button
                className="text-black min-w-[80px]" // Added min-width for consistent button size
                style={{ backgroundColor: "#c2f245" }}
                onClick={handleAddUser}
              >
                Add
              </Button>
            </div>
          </div>

          {/* List of current users with delete option */}
          <div className="mt-6 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user}
                  className="flex items-center justify-between p-4 rounded-md bg-black hover:scale-105 duration-100 border border-white/10"
                >
                  <span className="text-sm text-gray-200">{user}</span>
                  <Button
                    onClick={() => handleDeleteUser(user)}
                    variant="ghost"
                    className="text-red-400 hover:bg-red-900/20 hover:text-red-300 p-1 h-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">
                No users added yet. Add some above to get started!
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end mt-4"></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
