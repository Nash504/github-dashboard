"use client"

import { Github, Globe, GitBranch, Sparkle,  Volleyball, Figma,Link } from "lucide-react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
]

const openTab = (url) => {
  if (url !== "#") {
    window.open(url, "_blank")
  }
}

export default function QuickLinks() {
  return (
    <div className="space-y-6">
      <Card className="bg-black border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">
        <CardHeader className='text-white flex'>
             <Link/> 
          <CardTitle className="text-lg text-white">
         Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {defaultQuickLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                onClick={() => openTab(link.url)}
                className={`h-20 flex flex-col items-center justify-center gap-2 bg-black hover:bg-black hover:text-white text-white  ${link.borderColor}  duration-200 hover:scale-105`}
              >
                <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                <span className="text-xs font-medium">{link.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
