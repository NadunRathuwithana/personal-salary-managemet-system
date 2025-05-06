"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher } from "@/components/ui/currency-switcher";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency } from "@/lib/formatters";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { currency } = useCurrency();

  return (
    <header
      className={`flex items-center justify-between border-b p-2 md:p-3 bg-background ${className}`}
    >
      <div className="w-full flex items-center gap-2">
        <div className="relative hidden md:flex items-center w-full max-w-xs">
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-background py-1.5 pl-7 pr-3 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 h-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <AnimatedWrapper type="subtle" hoverEffect="scale">
          <CurrencySwitcher />
        </AnimatedWrapper>

        <AnimatedWrapper type="subtle" hoverEffect="scale">
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell size={16} />
            <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
          </Button>
        </AnimatedWrapper>

        <AnimatedWrapper type="subtle" hoverEffect="scale">
          <ThemeToggle />
        </AnimatedWrapper>

        <div className="flex items-center gap-2">
          <div className="hidden md:block text-right">
            <p className="text-xl font-medium text-nowrap">
              {formatCurrency(3450, currency)}
            </p>
            <p className="text-xs text-muted-foreground text-nowrap">
              Balance
            </p>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
