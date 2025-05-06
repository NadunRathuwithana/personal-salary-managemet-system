"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { useState, useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on initial load
    checkIsMobile();

    // Listen for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Handle sidebar collapse state changes
  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - fixed on desktop, absolute on mobile when open */}
      <div
        className={cn(
          "fixed top-0 bottom-0 z-50 transition-transform duration-300 lg:translate-x-0 lg:z-auto",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar onCollapse={handleSidebarCollapse} />
      </div>

      {/* Main content area - adjust padding based on sidebar state */}
      <div
        className={cn(
          "transition-all duration-300",
          isSidebarCollapsed ? "lg:pl-12" : "lg:pl-48"
        )}
      >
        {/* Header with mobile menu button */}
        <div className="sticky top-0 z-30">
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-2 z-50 h-8 w-8"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <Menu size={16} />
            </Button>
          </div>
          <Header />
        </div>

        {/* Main content */}
        <AnimatedWrapper type="fadeIn" duration={0.4}>
          <main className="p-3 md:p-4 max-w-[1600px] mx-auto">{children}</main>
        </AnimatedWrapper>
      </div>
    </div>
  );
}
