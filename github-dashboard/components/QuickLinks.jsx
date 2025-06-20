"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Github,
  Globe,
  GitBranch,
  Sparkle,
  Volleyball,
  Figma,
  Link,
  Plus,
  Trash,
  Settings2,
  Settings,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import allLucideIcons from "@/lib/lucide-icons";
const defaultQuickLinks = [
  {
    id: "1",
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    borderColor: "border-white/20 hover:border-white/40",
    glowColor: "shadow-[0_0_8px_rgba(255,255,255,0.2)]",
    iconColor: "text-white",
  },
  {
    id: "2",
    name: "Localhost",
    icon: Globe,
    url: "http://localhost:3000",
    borderColor: "border-orange-500 hover:border-orange-400",
    glowColor: "shadow-[0_0_8px_rgba(249,115,22,0.4)]",
    iconColor: "text-orange-400",
  },
  {
    id: "3",
    name: "Figma",
    icon: Figma,
    url: "https://www.figma.com/",
    borderColor: "border-purple-500 hover:border-purple-400",
    glowColor: "shadow-[0_0_8px_rgba(168,85,247,0.4)]",
    iconColor: "text-purple-400",
  },
  {
    id: "4",
    name: "Gemini",
    icon: Sparkle,
    url: "https://gemini.google.com/app",
    borderColor: "border-blue-500 hover:border-blue-400",
    glowColor: "shadow-[0_0_8px_rgba(59,130,246,0.4)]",
    iconColor: "text-blue-400",
  },
  {
    id: "5",
    name: "Git Branches",
    icon: GitBranch,
    url: "#",
    borderColor: "border-cyan-500 hover:border-cyan-400",
    glowColor: "shadow-[0_0_8px_rgba(34,211,238,0.4)]",
    iconColor: "text-cyan-400",
  },
  {
    id: "6",
    name: "ChatGPT",
    icon: Volleyball,
    url: "https://chat.openai.com/",
    borderColor: "border-green-500 hover:border-green-400",
    glowColor: "shadow-[0_0_8px_rgba(74,222,128,0.4)]",
    iconColor: "text-green-400",
  },
];

export default function QuickLinks() {
  // Move useState and openTab inside the component
  const [isIconViewerOpen, setIsIconViewerOpen] = useState(false);
  console.log("Loaded icons:", Object.keys(allLucideIcons));
  const openTab = (url) => {
    if (url !== "#") {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 hover:">
        <CardHeader className="text-white flex">
          <Link />
          <CardTitle className="text-lg text-white">Quick Access</CardTitle>
          <Settings
            className="ml-auto h-5 text-white/60 cursor-pointer hover:text-gray-300"
            // You had onClick={() => isLinkOpen} which just evaluates the variable.
            // It should be onClick={() => setIsLinkOpen(true)} to open the dialog.
            onClick={() => setIsIconViewerOpen(true)}
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {defaultQuickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                onClick={() => openTab(link.url)}
                className={`h-20 flex flex-col items-center justify-center gap-2 bg-black hover:bg-black hover:text-white text-white  ${link.borderColor}  duration-200 hover:scale-105`}
              >
                <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                <span className="text-xs font-medium">{link.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={isIconViewerOpen} onOpenChange={setIsIconViewerOpen}>
        <DialogContent className="bg-black text-white">
          <div className="p-4 overflow-y-auto grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 custom-scrollbar">
            {/*
              This is where the "API call" to display logos happens.
              1. `Object.keys(allLucideIcons)` gets an array of all icon names (e.g., "Github", "Figma").
              2. `.map()` iterates over each icon name.
              3. `allLucideIcons[iconName]` retrieves the actual React component for that name.
              4. `<IconComponent ... />` renders the icon.
            */}

            {Object.keys(allLucideIcons).map((iconName) => {
              const IconComponent = allLucideIcons[iconName]; // Get the component from your "API"

              return (
                <Card
                  key={iconName} // React requires a unique key for each item in a list
                  className="flex flex-col items-center justify-center p-2 border border-zinc-800 rounded-md hover:bg-zinc-700 cursor-pointer transition-colors duration-200"
                  // We're just displaying them for now; no click action for selection yet.
                >
                  <IconComponent className="w-8 h-8 text-white mb-1" />{" "}
                  {/* Render the icon */}
                  <span className="text-xs text-zinc-300 text-center break-words max-w-full">
                    {iconName} {/* Display the name of the icon */}
                  </span>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
