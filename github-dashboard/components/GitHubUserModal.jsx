"use client";

import { Github, Settings, Trash2 } from "lucide-react";
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
import React, { useEffect, useState, useCallback, useRef } from "react";

export default function GitHubUserModal() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});
  const [isManageUsersDialogOpen, setIsManageUsersDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeoutRef = useRef(null);

  const defaultUsers = [
    "deiondz",
    "Nash504",
    "srijankulal",
    "VinshMachado",
    "shadow1951",
    "TheJonathanC",
  ];

  const fetchContributions = useCallback(async (username) => {
    try {
      const response = await fetch(`/api/github/?user=${username}`);
      if (!response.ok) return [];
      const userData = await response.json();
      return userData.contributions || [];
    } catch (err) {
      console.error(`Error fetching contributions for ${username}:`, err);
      return [];
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsers = localStorage.getItem("github_users");
      let initialUsers = storedUsers ? JSON.parse(storedUsers) : defaultUsers;
      if (!storedUsers)
        localStorage.setItem("github_users", JSON.stringify(initialUsers));
      setUsers(initialUsers);
    }
  }, []);

  useEffect(() => {
    const fetchAllUserData = async () => {
      const contributionsMap = {};
      for (const user of users) {
        contributionsMap[user] = await fetchContributions(user);
      }
      setData(contributionsMap);
    };

    if (users.length > 0) fetchAllUserData();
  }, [users, fetchContributions]);

  const fetchUserSuggestions = useCallback(
    async (query) => {
      if (query.length < 2) {
        setUserSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`/api/github/search-users?q=${query}`);
        if (!response.ok) throw new Error("Failed to fetch user suggestions");

        const data = await response.json();
        const suggestions = data.items.map((user) => ({
          login: user.login,
          avatar_url: user.avatar_url,
        }));
        setUserSuggestions(suggestions.filter((s) => !users.includes(s.login)));
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setUserSuggestions([]);
      }
    },
    [users]
  );

  const handleNewUserNameChange = (e) => {
    const value = e.target.value;
    setNewUserName(value);
    setShowSuggestions(true);

    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(
      () => fetchUserSuggestions(value),
      300
    );
  };

  const handleSelectSuggestion = (suggestedUser) => {
    setNewUserName(suggestedUser.login);
    setUserSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddUser = () => {
    const trimmedUserName = newUserName.trim();
    if (!trimmedUserName) return;

    if (users.includes(trimmedUserName)) {
      alert("This user is already in your list.");
      return;
    }

    const updatedUsers = [...users, trimmedUserName];
    setUsers(updatedUsers);
    localStorage.setItem("github_users", JSON.stringify(updatedUsers));
    setNewUserName("");
    setUserSuggestions([]);
  };

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
          <Settings
            className="h-5 text-gray-400 cursor-pointer"
            onClick={() => setIsManageUsersDialogOpen(true)}
          />
        </CardHeader>{" "}
        {/* Closing CardHeader tag added */}
        <CardContent className="pt-0">
          {" "}
          {/* Corrected CardContent opening tag */}
          <div className="overflow-x-auto">
            <ExampleChart data={data} />
          </div>
        </CardContent>
      </Card>

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

          <div className="space-y-4 pt-4">
            <div className="flex gap-2 relative">
              <Input
                className="flex-grow bg-black text-white border-gray-600 focus:border-cyan-400"
                placeholder="Enter GitHub user name to add"
                value={newUserName}
                onChange={handleNewUserNameChange}
                onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
                onFocus={() =>
                  newUserName.length > 1 &&
                  userSuggestions.length > 0 &&
                  setShowSuggestions(true)
                }
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              />
              <Button
                className="text-black min-w-[80px]"
                style={{ backgroundColor: "#c2f245" }}
                onClick={handleAddUser}
              >
                Add
              </Button>

              {showSuggestions && userSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-black border border-gray-700 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg top-full">
                  {userSuggestions.map((user) => (
                    <li
                      key={user.login}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 text-sm text-white"
                      onClick={() => handleSelectSuggestion(user)}
                    >
                      <img
                        src={user.avatar_url}
                        alt={`${user.login} avatar`}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{user.login}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user}
                  className="flex items-center justify-between p-2 rounded-md bg-black transition-all duration-200 border border-white/10"
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
        </DialogContent>
      </Dialog>
    </div>
  );
}
