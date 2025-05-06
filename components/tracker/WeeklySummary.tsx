"use client";

import { useState } from "react";
import { formatCurrency, formatShortDate } from "@/lib/formatters";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Car,
  Coffee,
  UtensilsCrossed,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeeklySummaryProps {
  expenses: ExpenseEntry[];
  weekStartDate?: Date;
}

// Helper function to group expenses by day
function groupExpensesByDay(
  expenses: ExpenseEntry[]
): Record<string, ExpenseEntry[]> {
  return expenses.reduce<Record<string, ExpenseEntry[]>>((groups, expense) => {
    const date = expense.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {});
}

// Helper function to sum all expenses for a day
function sumDailyExpense(expenses: ExpenseEntry[]): {
  transport: number;
  lunch: number;
  dinner: number;
  other: number;
  total: number;
  expectedAmount: number;
} {
  return expenses.reduce(
    (sum, expense) => ({
      transport: sum.transport + expense.transport,
      lunch: sum.lunch + expense.lunch,
      dinner: sum.dinner + expense.dinner,
      other: sum.other + expense.other,
      total: sum.total + expense.total,
      expectedAmount: sum.expectedAmount + expense.expectedAmount,
    }),
    { transport: 0, lunch: 0, dinner: 0, other: 0, total: 0, expectedAmount: 0 }
  );
}

function getBudgetStatus(actual: number, expected: number) {
  const difference = actual - expected;
  const percentage = expected > 0 ? (difference / expected) * 100 : 0;

  if (actual === 0) return "empty";
  if (Math.abs(difference) < 0.01) return "on-budget";
  if (difference > 0) return percentage > 15 ? "over-budget" : "slightly-over";
  return percentage < -15 ? "under-budget" : "slightly-under";
}

export function WeeklySummary({ expenses, weekStartDate }: WeeklySummaryProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // If no expenses, show empty state
  if (!expenses || expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
          <CardDescription>Your expense summary for the week</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40 text-muted-foreground">
          No expense data available for the week.
        </CardContent>
      </Card>
    );
  }

  // Group expenses by day
  const expensesByDay = groupExpensesByDay(expenses);

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(expensesByDay).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  // Calculate weekly totals
  const weeklyTotals = {
    transport: 0,
    lunch: 0,
    dinner: 0,
    other: 0,
    total: 0,
    expectedAmount: 0,
  };

  sortedDates.forEach((date) => {
    const dailySum = sumDailyExpense(expensesByDay[date]);
    weeklyTotals.transport += dailySum.transport;
    weeklyTotals.lunch += dailySum.lunch;
    weeklyTotals.dinner += dailySum.dinner;
    weeklyTotals.other += dailySum.other;
    weeklyTotals.total += dailySum.total;
    weeklyTotals.expectedAmount += dailySum.expectedAmount;
  });

  // Determine weekly budget status
  const weeklyStatus = getBudgetStatus(
    weeklyTotals.total,
    weeklyTotals.expectedAmount
  );

  // Helper function to get status badge
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "over-budget":
        return (
          <Badge variant="destructive" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            Over Budget
          </Badge>
        );
      case "slightly-over":
        return (
          <Badge variant="destructive" className="gap-1 bg-orange-500">
            <TrendingUp className="h-3 w-3" />
            Slightly Over
          </Badge>
        );
      case "under-budget":
        return (
          <Badge variant="default" className="gap-1 bg-green-500">
            <TrendingDown className="h-3 w-3" />
            Under Budget
          </Badge>
        );
      case "slightly-under":
        return (
          <Badge variant="default" className="gap-1 bg-green-400">
            <TrendingDown className="h-3 w-3" />
            Slightly Under
          </Badge>
        );
      case "on-budget":
        return (
          <Badge variant="outline" className="gap-1">
            On Budget
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            No Data
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>Your expense summary for the week</CardDescription>
          </div>
          <StatusBadge status={weeklyStatus} />
        </div>
      </CardHeader>
      <CardContent>
        {/* Weekly Overview */}
        <div className="bg-muted/20 p-4 rounded-md mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </h3>
              <p className="text-2xl font-bold">
                {formatCurrency(weeklyTotals.total)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Expected
              </h3>
              <p className="text-2xl font-bold">
                {formatCurrency(weeklyTotals.expectedAmount)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <ExpenseCategory
              icon={<Car className="h-3 w-3" />}
              label="Transport"
              amount={weeklyTotals.transport}
            />
            <ExpenseCategory
              icon={<Coffee className="h-3 w-3" />}
              label="Lunch"
              amount={weeklyTotals.lunch}
            />
            <ExpenseCategory
              icon={<UtensilsCrossed className="h-3 w-3" />}
              label="Dinner"
              amount={weeklyTotals.dinner}
            />
            <ExpenseCategory
              icon={<ShoppingBag className="h-3 w-3" />}
              label="Other"
              amount={weeklyTotals.other}
            />
          </div>
        </div>

        {/* Daily Breakdown Table */}
        <Table>
          <TableCaption>Daily expenses breakdown for the week</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDates.map((date) => {
              const dailyExpenses = expensesByDay[date];
              const dailySum = sumDailyExpense(dailyExpenses);
              const status = getBudgetStatus(
                dailySum.total,
                dailySum.expectedAmount
              );
              const isExpanded = expandedDay === date;
              const formattedDate = formatShortDate(new Date(date));

              return (
                <React.Fragment key={date}>
                  <TableRow
                    className={cn(
                      "cursor-pointer hover:bg-muted/50",
                      isExpanded && "bg-muted/30"
                    )}
                    onClick={() => setExpandedDay(isExpanded ? null : date)}
                  >
                    <TableCell className="font-medium flex items-center gap-1">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      {formattedDate}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(dailySum.expectedAmount)}
                    </TableCell>
                    <TableCell>{formatCurrency(dailySum.total)}</TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={status} />
                    </TableCell>
                  </TableRow>

                  {isExpanded && (
                    <TableRow className="bg-muted/10">
                      <TableCell colSpan={4} className="p-0">
                        <div className="grid grid-cols-4 gap-2 p-4">
                          <ExpenseCategory
                            icon={<Car className="h-3 w-3" />}
                            label="Transport"
                            amount={dailySum.transport}
                          />
                          <ExpenseCategory
                            icon={<Coffee className="h-3 w-3" />}
                            label="Lunch"
                            amount={dailySum.lunch}
                          />
                          <ExpenseCategory
                            icon={<UtensilsCrossed className="h-3 w-3" />}
                            label="Dinner"
                            amount={dailySum.dinner}
                          />
                          <ExpenseCategory
                            icon={<ShoppingBag className="h-3 w-3" />}
                            label="Other"
                            amount={dailySum.other}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Helper component for expense categories
function ExpenseCategory({
  icon,
  label,
  amount,
}: {
  icon: React.ReactNode;
  label: string;
  amount: number;
}) {
  return (
    <div className="flex flex-col">
      <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
        {icon} {label}
      </span>
      <span className="font-medium">{formatCurrency(amount)}</span>
    </div>
  );
}
