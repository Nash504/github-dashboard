"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Search,
  X,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [isIconViewerOpen, setIsIconViewerOpen] = useState(false);
  const [LinkName, setLinkName] = useState("");

  const openTab = (url) => {
    if (url !== "#") {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
        <CardHeader className="text-white flex">
          <Link />
          <CardTitle className="text-lg text-white">Quick Access</CardTitle>
          <Settings
            className="ml-auto h-5 text-white/60 cursor-pointer hover:text-gray-300 transition-colors duration-200"
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
                className={`h-20 flex flex-col items-center justify-center gap-2 bg-black hover:bg-black hover:text-white text-white ${link.borderColor} duration-200 hover:scale-105 transition-all`}
              >
                <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                <span className="text-xs font-medium">{link.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isIconViewerOpen} onOpenChange={setIsIconViewerOpen}>
        <DialogContent className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white border-zinc-800 max-w-6xl max-h-[80vh] p-0 overflow-hidden">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b border-zinc-800 bg-black/50 backdrop-blur-sm">
            <div className="relative mt-4">
              <Input
                placeholder="Link Name"
                value={LinkName}
                onChange={(e) => setLinkName(e.target.value)}
                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
            <div className="relative mt-4">
              <Input
                placeholder="URL"
                value={LinkName}
                onChange={(e) => setLinkName(e.target.value)}
                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              />
              <div className="relative mt-4">
                <Input
                  placeholder="color"
                  value={LinkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  className="pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>
          </DialogHeader>

          {/* Icon Grid */}

          {/* Footer */}
          <div className="px-6 py-3 border-t border-zinc-800 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Click an icon to select it</span>
              <span className="flex items-center gap-1">
                Powered by <span className="text-blue-400">Lucide Icons</span>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
