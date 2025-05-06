"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  BanknoteIcon,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { useState, useEffect } from "react";

interface SidebarProps {
  className?: string;
  onCollapse?: (collapsed: boolean) => void;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({
  href,
  icon,
  label,
  isActive,
  isCollapsed,
}: NavItemProps) => {
  return (
    <AnimatedWrapper type="subtle" hoverEffect={isActive ? "none" : "lift"}>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-sm",
          isCollapsed ? "justify-center" : "",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {React.isValidElement(icon) &&
          React.cloneElement(icon, {
            size: 16,
            className: cn(
              "shrink-0",
              isActive ? "text-primary" : "text-muted-foreground"
            ),
          })}
        {!isCollapsed && <span className="truncate">{label}</span>}
      </Link>
    </AnimatedWrapper>
  );
};

export function Sidebar({ className, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notify parent component when sidebar collapse state changes
  useEffect(() => {
    if (onCollapse) {
      onCollapse(isCollapsed);
    }
  }, [isCollapsed, onCollapse]);

  const navigationItems = [
    {
      href: "/dashboard",
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
    {
      href: "/wallets",
      icon: <Wallet />,
      label: "Wallets",
    },
    {
      href: "/wallet-demo",
      icon: <Wallet />,
      label: "Wallet Demo",
    },
    {
      href: "/tracker",
      icon: <LineChart />,
      label: "Tracker",
    },
    {
      href: "/income",
      icon: <BanknoteIcon />,
      label: "Income",
    },
    {
      href: "/settings",
      icon: <Settings />,
      label: "Settings",
    },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card text-card-foreground border-r transition-all duration-300",
        isCollapsed ? "w-12" : "w-48",
        className
      )}
    >
      <div className="flex items-center justify-between p-2 border-b">
        {!isCollapsed && (
          <h2 className="font-medium text-primary text-sm">Salary Manager</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn("ml-auto h-7 w-7", isCollapsed ? "mx-auto" : "")}
          onClick={toggleCollapse}
        >
          {isCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
        </Button>
      </div>

      <nav className="flex-1 px-1 py-2 space-y-1">
        {navigationItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </div>
  );
}
