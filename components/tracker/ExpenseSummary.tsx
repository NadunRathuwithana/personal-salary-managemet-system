"use client";

import { formatCurrency } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp, Calendar, Target } from "lucide-react";
import { ExpenseEntry } from "./ExpenseHistory";

interface ExpenseSummaryProps {
  expenses: ExpenseEntry[];
  period?: "week" | "month";
}

export function ExpenseSummary({
  expenses,
  period = "week",
}: ExpenseSummaryProps) {
  // If no expenses, show empty state
  if (!expenses || expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
          <CardDescription>Summary of your recent expenses</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40 text-muted-foreground">
          No expense data available to generate summary.
        </CardContent>
      </Card>
    );
  }

  // Calculate summary statistics
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.total, 0);
  const totalExpected = expenses.reduce(
    (sum, expense) => sum + expense.expectedAmount,
    0
  );
  const difference = totalSpent - totalExpected;
  const isOverBudget = difference > 0;

  // Find highest expense day
  const highestExpense = expenses.reduce(
    (highest, expense) =>
      expense.total > highest.amount
        ? { date: expense.date, amount: expense.total }
        : highest,
    { date: "", amount: 0 }
  );

  // Find lowest expense day
  const lowestExpense = expenses.reduce(
    (lowest, expense) =>
      (lowest.amount === 0 || expense.total < lowest.amount) &&
      expense.total > 0
        ? { date: expense.date, amount: expense.total }
        : lowest,
    { date: "", amount: 0 }
  );

  // Calculate average daily expense
  const averageDaily = totalSpent / expenses.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Summary</CardTitle>
        <CardDescription>
          Summary for the past {period === "week" ? "7 days" : "30 days"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <SummaryItem
            title="Total Spent"
            value={formatCurrency(totalSpent)}
            icon={<Calendar className="h-4 w-4" />}
            description={`vs ${formatCurrency(totalExpected)} expected`}
          />

          <SummaryItem
            title={isOverBudget ? "Over Budget" : "Under Budget"}
            value={formatCurrency(Math.abs(difference))}
            icon={
              isOverBudget ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )
            }
            description={`${Math.abs(
              (difference / totalExpected) * 100
            ).toFixed(1)}% ${isOverBudget ? "over" : "under"}`}
            valueClass={isOverBudget ? "text-red-500" : "text-green-500"}
          />

          <SummaryItem
            title="Highest Day"
            value={formatCurrency(highestExpense.amount)}
            icon={<TrendingUp className="h-4 w-4" />}
            description={
              highestExpense.date
                ? new Date(highestExpense.date).toLocaleDateString()
                : "N/A"
            }
          />

          <SummaryItem
            title="Average Daily"
            value={formatCurrency(averageDaily)}
            icon={<Target className="h-4 w-4" />}
            description={`For ${expenses.length} days`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Helper component for summary items
function SummaryItem({
  title,
  value,
  icon,
  description,
  valueClass,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-muted/30 p-4 rounded-md">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
