'use client';
import { useEffect, useState } from 'react';
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
} from "lucide-react"
import ExampleChart from '@/components/ExampleChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [users] = useState(['deiondz', 'Nash504', 'srijankulal','VinshMachado','shadow1951']);
  const [data, setData] = useState({});
  
  const defaultQuickLinks = [
    { id: "1", name: "GitHub", icon: Github, url: "https://github.com", color: "bg-black" },
    { id: "2", name: "Localhost", icon: Globe, url: "http://localhost:3000", color: "bg-black" },
  ];

  const openTab = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    users.forEach(user => {
      fetch(`/api/github/?user=${user}`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((userData) => {
          setData(prev => ({ ...prev, [user]: userData.contributions || [] }));
        })
        .catch((err) => {
          console.error(err);
          setData(prev => ({ ...prev, [user]: { error: err.message } }));
        });
    });
  }, []);

  return (
    <div className="grid grid-cols-2 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 gap-6">
      {/* Quick Links Section */}
      <div className="space-y-6">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {defaultQuickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="w-full bg-black justify-start gap-3 border-gray-700 text-white hover:bg-black hover:border-[#c2f245] hover:text-white transition-colors"
                onClick={() => openTab(link.url)}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
                <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* GitHub Contributions Section */}
      <div className="space-y-6">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExampleChart users={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}