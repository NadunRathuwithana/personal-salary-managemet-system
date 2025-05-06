"use client";

import { formatCurrency } from "@/lib/formatters";
import { ExpenseEntry } from "./ExpenseHistory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  TrendingUp,
  Calendar,
  Activity,
  DollarSign,
  BadgePercent,
} from "lucide-react";

interface WeeklyStatsProps {
  expenses: ExpenseEntry[];
  previousWeekExpenses?: ExpenseEntry[];
}

export function WeeklyStats({
  expenses,
  previousWeekExpenses = [],
}: WeeklyStatsProps) {
  // Return empty state if no expenses
  if (!expenses || expenses.length === 0) {
    return null;
  }

  // Calculate current week totals
  const currentTotal = expenses.reduce(
    (sum, expense) => sum + expense.total,
    0
  );
  const currentExpected = expenses.reduce(
    (sum, expense) => sum + expense.expectedAmount,
    0
  );

  // Calculate previous week totals if available
  const previousTotal = previousWeekExpenses.reduce(
    (sum, expense) => sum + expense.total,
    0
  );

  // Calculate change percentages
  const hasPreviousData = previousWeekExpenses.length > 0 && previousTotal > 0;
  const weeklyChange = hasPreviousData
    ? ((currentTotal - previousTotal) / previousTotal) * 100
    : 0;

  // Calculate budget difference
  const budgetDifference = currentTotal - currentExpected;
  const budgetPercentage =
    currentExpected > 0 ? (budgetDifference / currentExpected) * 100 : 0;

  // Determine highest expense category
  const categories = expenses.reduce(
    (acc, expense) => {
      acc.transport += expense.transport;
      acc.lunch += expense.lunch;
      acc.dinner += expense.dinner;
      acc.other += expense.other;
      return acc;
    },
    { transport: 0, lunch: 0, dinner: 0, other: 0 }
  );

  const highestCategory = Object.entries(categories).reduce(
    (highest, [category, amount]) =>
      amount > highest.amount ? { category, amount } : highest,
    { category: "", amount: 0 }
  );

  const categoryNames: Record<string, string> = {
    transport: "Transport",
    lunch: "Lunch",
    dinner: "Dinner",
    other: "Other Expenses",
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Weekly Total"
        value={formatCurrency(currentTotal)}
        description={`From ${expenses.length} days`}
        icon={<Calendar className="h-4 w-4" />}
      />

      <StatCard
        title="Budget Status"
        value={formatCurrency(Math.abs(budgetDifference))}
        description={`${budgetDifference >= 0 ? "Over" : "Under"} by ${Math.abs(
          budgetPercentage
        ).toFixed(1)}%`}
        icon={
          budgetDifference >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )
        }
        trend={budgetDifference >= 0 ? "negative" : "positive"}
      />

      {hasPreviousData && (
        <StatCard
          title="Weekly Change"
          value={`${Math.abs(weeklyChange).toFixed(1)}%`}
          description={`${
            weeklyChange >= 0 ? "Increased" : "Decreased"
          } from last week`}
          icon={<Activity className="h-4 w-4" />}
          trend={weeklyChange > 0 ? "negative" : "positive"}
        />
      )}

      <StatCard
        title="Highest Category"
        value={formatCurrency(highestCategory.amount)}
        description={categoryNames[highestCategory.category] || "None"}
        icon={<DollarSign className="h-4 w-4" />}
      />

      {!hasPreviousData && (
        <StatCard
          title="Budget Efficiency"
          value={`${
            currentExpected > 0
              ? (
                  ((currentExpected - currentTotal) / currentExpected) *
                  100
                ).toFixed(1)
              : 0
          }%`}
          description={
            currentTotal <= currentExpected ? "Budget saved" : "Budget exceeded"
          }
          icon={<BadgePercent className="h-4 w-4" />}
          trend={currentTotal <= currentExpected ? "positive" : "negative"}
        />
      )}
    </div>
  );
}

// Helper component for stat cards
function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "positive" | "negative" | "neutral";
}) {
  const getBadge = () => {
    if (!trend) return null;

    if (trend === "positive") {
      return (
        <Badge variant="default" className="bg-green-500 gap-1">
          <TrendingDown className="h-3 w-3" />
          Good
        </Badge>
      );
    }

    if (trend === "negative") {
      return (
        <Badge variant="destructive" className="gap-1">
          <TrendingUp className="h-3 w-3" />
          Warning
        </Badge>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">{icon}</div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
          </div>
          {getBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p
            className={`text-2xl font-bold ${
              trend === "positive"
                ? "text-green-500"
                : trend === "negative"
                ? "text-red-500"
                : ""
            }`}
          >
            {value}
          </p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
