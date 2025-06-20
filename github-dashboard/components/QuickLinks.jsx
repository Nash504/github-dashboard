"use client";
import React, { useState } from "react";
import {
  Dialog,
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
  X,
  Settings,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const colorOptions = [
  {
    name: "White",
    value: "white",
    border: "border-white/20 hover:border-white/40",
    icon: "text-white",
  },
  {
    name: "Orange",
    value: "orange",
    border: "border-orange-500 hover:border-orange-400",
    icon: "text-orange-400",
  },
  {
    name: "Purple",
    value: "purple",
    border: "border-purple-500 hover:border-purple-400",
    icon: "text-purple-400",
  },
  {
    name: "Blue",
    value: "blue",
    border: "border-blue-500 hover:border-blue-400",
    icon: "text-blue-400",
  },
  {
    name: "Cyan",
    value: "cyan",
    border: "border-cyan-500 hover:border-cyan-400",
    icon: "text-cyan-400",
  },
  {
    name: "Green",
    value: "green",
    border: "border-green-500 hover:border-green-400",
    icon: "text-green-400",
  },
  {
    name: "Red",
    value: "red",
    border: "border-red-500 hover:border-red-400",
    icon: "text-red-400",
  },
  {
    name: "Yellow",
    value: "yellow",
    border: "border-yellow-500 hover:border-yellow-400",
    icon: "text-yellow-400",
  },
  {
    name: "Pink",
    value: "pink",
    border: "border-pink-500 hover:border-pink-400",
    icon: "text-pink-400",
  },
];

const defaultQuickLinks = [
  {
    id: "1",
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "white",
  },
  {
    id: "2",
    name: "Localhost",
    icon: Globe,
    url: "http://localhost:3000",
    color: "orange",
  },
  {
    id: "3",
    name: "Figma",
    icon: Figma,
    url: "https://www.figma.com/",
    color: "purple",
  },
  {
    id: "4",
    name: "Gemini",
    icon: Sparkle,
    url: "https://gemini.google.com/app",
    color: "blue",
  },
  { id: "5", name: "Git Branches", icon: GitBranch, url: "#", color: "cyan" },
  {
    id: "6",
    name: "ChatGPT",
    icon: Volleyball,
    url: "https://chat.openai.com/",
    color: "green",
  },
];

export default function QuickLinks() {
  const [isIconViewerOpen, setIsIconViewerOpen] = useState(false);

  const getColorStyles = (colorValue) => {
    const color =
      colorOptions.find((c) => c.value === colorValue) || colorOptions[3];
    return {
      border: color.border,
      icon: color.icon,
      glow: `shadow-[0_0_8px_rgba(59,130,246,0.4)]`,
    };
  };

  const [quickLinks, setQuickLinks] = useState(
    defaultQuickLinks.map((link) => ({
      ...link,
      borderColor: getColorStyles(link.color).border,
      glowColor: getColorStyles(link.color).glow,
      iconColor: getColorStyles(link.color).icon,
    }))
  );

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    color: "blue",
    icon: Link,
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addNewLink = () => {
    if (formData.name.trim() && formData.url.trim()) {
      const colorStyle = getColorStyles(formData.color);
      const newLink = {
        id: Date.now().toString(),
        name: formData.name,
        icon: formData.icon,
        url: formData.url,
        borderColor: colorStyle.border,
        glowColor: colorStyle.glow,
        iconColor: colorStyle.icon,
      };
      setQuickLinks((prev) => [...prev, newLink]);
      setFormData({ name: "", url: "", color: "blue", icon: Link });
      setIsIconViewerOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
        <CardHeader className="text-white flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            <CardTitle className="text-lg text-white">Quick Access</CardTitle>
          </div>
          <Settings
            className="h-5 text-white/60 cursor-pointer hover:text-gray-300 transition-colors duration-200"
            onClick={() => setIsIconViewerOpen(true)}
          />
        </CardHeader>
        <CardContent className="max-h-[300px] overflow-y-auto pr-2">
          {" "}
          {/* Added max-h and overflow-y-auto */}
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <div key={link.id} className="relative group">
                <Button
                  variant="outline"
                  onClick={() =>
                    link.url !== "#" && window.open(link.url, "_blank")
                  }
                  className={`h-20 w-full flex flex-col items-center justify-center gap-2 bg-black hover:bg-black hover:text-white text-white ${link.borderColor} duration-200 hover:scale-105 transition-all`}
                >
                  <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                  <span className="text-xs font-medium">{link.name}</span>
                </Button>
                {quickLinks.length > 6 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setQuickLinks((prev) =>
                        prev.filter((l) => l.id !== link.id)
                      )
                    }
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isIconViewerOpen} onOpenChange={setIsIconViewerOpen}>
        <DialogContent className="bg-black text-white border-zinc-800 max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader className="px-6 py-4 border-b border-zinc-800 bg-black/50 backdrop-blur-sm flex-shrink-0">
            <DialogTitle className="text-xl font-semibold text-white">
              Add New Quick Link
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4 overflow-y-auto flex-grow">
            <div className="space-y-2">
              <label
                htmlFor="link-name"
                className="text-sm font-medium text-zinc-300"
              >
                Link Name
              </label>
              <Input
                id="link-name"
                placeholder="Enter link name (e.g., GitHub, Portfolio)"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="link-url"
                className="text-sm font-medium text-zinc-300"
              >
                URL
              </label>
              <Input
                id="link-url"
                placeholder="Enter URL (e.g., https://github.com)"
                value={formData.url}
                onChange={(e) => handleFormChange("url", e.target.value)}
                className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Border Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    variant="outline"
                    onClick={() => handleFormChange("color", color.value)}
                    className={`h-12 flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white ${
                      formData.color === color.value
                        ? `${color.border} ring-2 ring-offset-2 ring-offset-black ring-white/20`
                        : "border-zinc-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full ${color.icon.replace(
                        "text-",
                        "bg-"
                      )}`}
                    ></div>
                    <span className="text-xs">{color.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Preview
              </label>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  disabled
                  className={`h-20 w-32 flex flex-col items-center justify-center gap-2 bg-black text-white ${
                    getColorStyles(formData.color).border
                  }`}
                >
                  {formData.icon && (
                    <formData.icon
                      className={`w-6 h-6 ${
                        getColorStyles(formData.color).icon
                      }`}
                    />
                  )}
                  <span className="text-xs font-medium">
                    {formData.name || "Preview"}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-zinc-800 bg-black/30 backdrop-blur-sm flex justify-between items-center flex-shrink-0">
            <Button
              variant="ghost"
              onClick={() => setIsIconViewerOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={addNewLink}
              disabled={!formData.name.trim() || !formData.url.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
            >
              Add Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
