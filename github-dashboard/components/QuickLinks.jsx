import {
    Github,
    Globe,
    Terminal,
    Code,
    GitBranch,
    Clock,
    Users,
    Star,
    Sparkle,
    ExternalLink,
    Plus,
    Settings,
    Zap,
    Coffee,
    BookOpen,
    MessageSquare,
    Play,
    Pause,
    RotateCcw,
    Trash2,
    MoreVertical,
    Figma
  } from "lucide-react";

import {Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const defaultQuickLinks = [
  { id: "1", name: "GitHub", icon: Github, url: "https://github.com", bgColor: "bg-gradient-to-br from-gray-900 to-black" },
  { id: "2", name: "Localhost", icon: Globe, url: "http://localhost:3000", bgColor: "bg-gradient-to-br from-orange-500 to-red-600" },
  { id: "3", name: "Figma", icon: Figma, url: "https://www.figma.com/", bgColor: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { id: "4", name: "Gemini", icon: Sparkle, url: "https://gemini.google.com/app", bgColor: "bg-gradient-to-br from-blue-600 to-blue-800" },
  { id: "5", name: "Git Branches", icon: GitBranch, url: "#", bgColor: "bg-gradient-to-br from-green-500 to-green-700" },
];

const openTab = (url) => {
  if (url !== "#") {
    window.open(url, '_blank');
  }
};

export default function QuickLinks() {
    return(
      <div className="space-y-6">
        {/* Main Quick Links Card */}
       
          
          

        {/* Individual Link Cards with Background Icons */}
        <div className="grid grid-cols-2 gap-4">
          {defaultQuickLinks.map((link) => (
            <Card 
              key={`card-${link.id}`}
              className={`relative overflow-hidden ${link.bgColor} text-white border-none shadow-lg cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => openTab(link.url)}
            >
              {/* Background Icon */}
              <div className="absolute -right-4 -top-4 opacity-15">
                <link.icon size={80} strokeWidth={1} />
              </div>
              
              <CardHeader className="flex flex-row items-start justify-between pb-2 relative z-10">
                <CardTitle className="text-sm font-medium opacity-90">{link.name}</CardTitle>
                <ExternalLink size={14} className="opacity-60" />
              </CardHeader>
              
              <CardContent className="relative z-10 pt-0">
                <div className="flex items-center gap-2">
                  <link.icon className="h-5 w-5" />
                  <span className="text-xs opacity-75">Quick Access</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    );
}