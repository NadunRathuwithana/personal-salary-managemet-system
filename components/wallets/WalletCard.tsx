"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Wallet,
  PiggyBank,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/formatters";

export type WalletType = "base" | "saving" | "fixed";

interface WalletCardProps {
  type: WalletType;
  title?: string;
  balance?: number;
  previousBalance?: number;
  updatedAt?: Date;
  isLoading?: boolean;
}

export function WalletCard({
  type,
  title,
  balance,
  previousBalance,
  updatedAt,
  isLoading = false,
}: WalletCardProps) {
  // Return skeleton loader if loading
  if (isLoading) {
    return <WalletCardSkeleton />;
  }

  // Return empty state if no balance is provided
  if (balance === undefined) {
    return <WalletCardEmpty type={type} />;
  }

  // Determine wallet icon based on type
  const WalletIcon = getWalletIcon(type);

  // Calculate percentage change if previous balance exists
  const percentageChange = previousBalance
    ? ((balance - previousBalance) / previousBalance) * 100
    : 0;
  const isPositiveChange = percentageChange >= 0;

  // Determine display title based on provided title or default by type
  const displayTitle = title || getDefaultTitle(type);

  return (
    <Card className={cn("overflow-hidden", getWalletCardStyle(type))}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div
              className={cn("p-2 rounded-full", getWalletIconBackground(type))}
            >
              <WalletIcon className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-medium">
              {displayTitle}
            </CardTitle>
          </div>
          {previousBalance && (
            <div
              className={cn(
                "text-xs flex items-center gap-1",
                isPositiveChange ? "text-green-500" : "text-red-500"
              )}
            >
              {isPositiveChange ? (
                <ArrowUpRight className="h-3 w-3" />
              ) : (
                <ArrowDownRight className="h-3 w-3" />
              )}
              {Math.abs(percentageChange).toFixed(2)}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          {updatedAt && (
            <div className="text-xs text-muted-foreground">
              Last updated: {formatDate(updatedAt)}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton loader component
function WalletCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}

// Empty state component
function WalletCardEmpty({ type }: { type: WalletType }) {
  const WalletIcon = getWalletIcon(type);
  const displayTitle = getDefaultTitle(type);

  return (
    <Card className={cn("overflow-hidden bg-muted/30")}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
        <div className={cn("p-3 rounded-full", getWalletIconBackground(type))}>
          <WalletIcon className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-1">
          <p className="font-medium">{displayTitle} Not Set Up</p>
          <p className="text-sm text-muted-foreground">
            Add a {displayTitle.toLowerCase()} to track your finances
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper functions
function getWalletIcon(type: WalletType) {
  switch (type) {
    case "saving":
      return PiggyBank;
    case "fixed":
      return BarChart3;
    case "base":
    default:
      return Wallet;
  }
}

function getDefaultTitle(type: WalletType) {
  switch (type) {
    case "saving":
      return "Savings Account";
    case "fixed":
      return "Fixed Deposit";
    case "base":
    default:
      return "Primary Account";
  }
}

function getWalletCardStyle(type: WalletType) {
  switch (type) {
    case "saving":
      return "border-l-4 border-l-blue-500";
    case "fixed":
      return "border-l-4 border-l-amber-500";
    case "base":
    default:
      return "border-l-4 border-l-primary";
  }
}

function getWalletIconBackground(type: WalletType) {
  switch (type) {
    case "saving":
      return "bg-blue-500";
    case "fixed":
      return "bg-amber-500";
    case "base":
    default:
      return "bg-primary";
  }
}
