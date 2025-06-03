import {
    Github,
    Globe,
    Terminal,
    Code,
    GitBranch,
    Clock,
    Users,
    Star,
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
  } from "lucide-react";

import {Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const defaultQuickLinks = [
  { id: "1", name: "GitHub", icon: Github, url: "https://github.com", bgColor: "bg-gradient-to-br from-gray-800 to-gray-900" },
  { id: "2", name: "Localhost", icon: Globe, url: "http://localhost:3000", bgColor: "bg-gradient-to-br from-blue-600 to-blue-700" },
  { id: "3", name: "Terminal", icon: Terminal, url: "#", bgColor: "bg-gradient-to-br from-green-600 to-green-700" },
  { id: "4", name: "VSCode", icon: Code, url: "#", bgColor: "bg-gradient-to-br from-purple-600 to-purple-700" },
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
        <Card className="relative overflow-hidden bg-gray-800 text-white border-gray-700">
          {/* Background Icon */}
          <div className="absolute -right-6 -top-6 opacity-5">
            <Settings size={140} strokeWidth={1} />
          </div>
          
          <CardHeader className="relative z-10 flex flex-row items-start justify-between pb-4">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Links
            </CardTitle>
            <button className="opacity-60 hover:opacity-100 transition-opacity">
              <MoreVertical size={16} />
            </button>
          </CardHeader>
          
          <CardContent className="space-y-3 relative z-10">
            {defaultQuickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="w-full justify-start gap-3 bg-black border-gray-700 hover:bg-[#c2f245] text-white hover:border-[#c2f245] hover:text-black transition-colors"
                onClick={() => openTab(link.url)}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
              </Button>
            ))}
          </CardContent>
        </Card>

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