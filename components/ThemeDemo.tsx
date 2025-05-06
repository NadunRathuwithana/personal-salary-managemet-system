"use client";

import { Button } from "@/components/ui/button";
import { Home, Settings, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function ThemeDemo() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Theme Demo</h2>
        <ThemeToggle />
      </div>
      
      <div className="space-y-2">
        <p className="text-primary">Primary Color Text (#544cba)</p>
        <div className="bg-primary text-primary-foreground p-4 rounded-md">
          Primary Background with Foreground Text
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <Button variant="default">
          <Home className="mr-2 h-4 w-4" />
          Default Button
        </Button>
        
        <Button variant="secondary">
          <Settings className="mr-2 h-4 w-4" />
          Secondary Button
        </Button>
        
        <Button variant="outline">
          <User className="mr-2 h-4 w-4" />
          Outline Button
        </Button>
        
        <Button variant="ghost">
          Ghost Button
        </Button>
        
        <Button variant="link">
          Link Button
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card text-card-foreground p-4 rounded-md border">
          Card Component
        </div>
        
        <div className="bg-muted text-muted-foreground p-4 rounded-md">
          Muted Component
        </div>
      </div>
    </div>
  );
} 