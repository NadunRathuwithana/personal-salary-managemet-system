"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { IncomeEntry } from "./IncomeList";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useCurrency } from "@/contexts/CurrencyContext";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

interface IncomeSummaryProps {
  incomes: IncomeEntry[];
  isLoading?: boolean;
  error?: string;
}

export function IncomeSummary({
  incomes,
  isLoading = false,
  error,
}: IncomeSummaryProps) {
  const { currency } = useCurrency();

  // Render loading state
  if (isLoading) {
    return (
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-primary-foreground/30" />
              <Skeleton className="h-7 w-20 bg-primary-foreground/30" />
              <Skeleton className="h-3 w-40 bg-primary-foreground/30" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full bg-primary-foreground/30" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-4">
          <Alert
            variant="destructive"
            className="border-none bg-transparent p-0"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-sm">
              Error Loading Income Summary
            </AlertTitle>
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Calculate total income
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  // Get current month and year
  const now = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const currentYear = now.getFullYear();

  // Count sources
  const uniqueSources = new Set(incomes.map((income) => income.source)).size;

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium">Total Extra Income</p>
              <h2 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(totalIncome, currency)}
              </h2>
              <p className="text-xs opacity-90">
                {currentMonth} {currentYear} • {incomes.length} entries from{" "}
                {uniqueSources} sources
              </p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}
