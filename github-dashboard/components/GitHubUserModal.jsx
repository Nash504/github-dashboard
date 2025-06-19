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
import React, { useEffect, useState, useCallback, useRef } from "react"; // Import useRef

export default function GitHubUserModal() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [isManageUsersDialogOpen, setIsManageUsersDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // Autosuggestion states
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeoutRef = useRef(null); // Ref for debouncing API calls

  // Fetches GitHub contributions for a given username
  const fetchContributions = useCallback(async (username) => {
    try {
      const response = await fetch(`/api/github/?user=${username}`);
      if (!response.ok) {
        // If response is not ok, log error and return an empty array
        console.error(
          `Network response was not ok for ${username}: ${response.statusText}`
        );
        return []; // Important: Always return an array here
      }
      const userData = await response.json();
      return userData.contributions || [];
    } catch (err) {
      console.error(`Error fetching contributions for ${username}:`, err);
      return []; // Important: Always return an array on any error
    }
  }, []);

  // Effect to initialize users from localStorage or a default list
  useEffect(() => {
    // IMPORTANT: Guard localStorage access for SSR
    if (typeof window !== "undefined") {
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
    }
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

  // --- Autosuggestion Logic ---
  // Function to fetch user suggestions from a backend API route
  const fetchUserSuggestions = useCallback(
    async (query) => {
      if (query.length < 2) {
        // Only search if query is at least 2 characters
        setUserSuggestions([]);
        return;
      }
      try {
        // You will need to create a new API route: /api/github/search-users
        const response = await fetch(`/api/github/search-users?q=${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user suggestions");
        }
        const data = await response.json();
        // Assuming data.items is an array of user objects with a 'login' property
        const logins = data.items.map((user) => user.login);
        // Filter out users already in the main 'users' list
        setUserSuggestions(logins.filter((login) => !users.includes(login)));
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setUserSuggestions([]);
      }
    },
    [users]
  ); // Dependency on 'users' to filter out existing ones

  // Handle input change with debouncing for suggestions
  const handleNewUserNameChange = (e) => {
    const value = e.target.value;
    setNewUserName(value);
    setShowSuggestions(true); // Show suggestions as soon as user types

    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to fetch suggestions after a delay
    debounceTimeoutRef.current = setTimeout(() => {
      fetchUserSuggestions(value);
    }, 300); // 300ms debounce delay
  };

  // Handle selection from suggestions dropdown
  const handleSelectSuggestion = (suggestedUser) => {
    setNewUserName(suggestedUser);
    setUserSuggestions([]); // Clear suggestions after selection
    setShowSuggestions(false); // Hide the suggestion dropdown
  };
  // --- End Autosuggestion Logic ---

  // Handles adding a new GitHub user
  const handleAddUser = () => {
    const trimmedUserName = newUserName.trim();
    if (trimmedUserName && !users.includes(trimmedUserName)) {
      const updatedUsers = [...users, trimmedUserName];
      setUsers(updatedUsers);
      // IMPORTANT: Guard localStorage access for SSR
      if (typeof window !== "undefined") {
        localStorage.setItem("github_users", JSON.stringify(updatedUsers));
      }
      setNewUserName(""); // Clear the input field after adding
      setUserSuggestions([]); // Clear any lingering suggestions
    } else if (users.includes(trimmedUserName)) {
      alert("This user is already in your list.");
    }
  };

  // Handles deleting a GitHub user
  const handleDeleteUser = (userToDelete) => {
    const updatedUsers = users.filter((user) => user !== userToDelete);
    setUsers(updatedUsers);
    // IMPORTANT: Guard localStorage access for SSR
    if (typeof window !== "undefined") {
      localStorage.setItem("github_users", JSON.stringify(updatedUsers));
    }
  };

  // Handles refreshing all GitHub user data
  const handleRefreshData = () => {
    // This trick re-renders the component and triggers the useEffect to re-fetch data
    setUsers([...users]);
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
            {/* Settings icon to open the user management dialog */}
            <Settings
              className="h-5 text-gray-400 cursor-pointer" // Adjusted height to h-5 for consistency
              onClick={() => setIsManageUsersDialogOpen(true)}
            />
            {/* Plus icon to quickly add user (also opens management dialog) */}
            <Plus
              onClick={() => setIsManageUsersDialogOpen(true)}
              className="h-5 text-gray-400 cursor-pointer"
            />
            {/* Refresh icon */}
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

          {/* Input for adding new users with Autosuggestion */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-2 relative">
              {" "}
              {/* Added 'relative' for positioning dropdown */}
              <Input
                className="flex-grow bg-black text-white border-gray-600 focus:border-cyan-400"
                type="text"
                placeholder="Enter GitHub user name to add"
                value={newUserName}
                onChange={handleNewUserNameChange} // Use autosuggestion handler
                onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
                onFocus={() => {
                  // Only show suggestions if there's input and suggestions available
                  if (newUserName.length > 1 && userSuggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                // Small delay to allow click on a suggestion before hiding dropdown
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              />
              <Button
                className="text-black min-w-[80px]" // Added min-width for consistent button size
                style={{ backgroundColor: "#c2f245" }}
                onClick={handleAddUser}
              >
                Add
              </Button>
              {/* Suggestions Dropdown */}
              {showSuggestions && userSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-900 border border-gray-700 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg top-full">
                  {userSuggestions.map((user) => (
                    <li
                      key={user}
                      className="p-2 cursor-pointer hover:bg-gray-700 text-sm text-white"
                      onClick={() => handleSelectSuggestion(user)}
                    >
                      {user}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* List of current users with delete option */}
          <div className="mt-6 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user}
                  className="flex items-center justify-between p-2 rounded-md bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-all duration-200 border border-white/10"
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

          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="outline"
              className="border-white text-white bg-black hover:bg-gray-800"
              onClick={() => setIsManageUsersDialogOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
