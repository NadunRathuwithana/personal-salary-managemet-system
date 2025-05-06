"use client";

import { formatCurrency, formatShortDate } from "@/lib/formatters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Coffee, UtensilsCrossed, ShoppingBag, Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Define expense entry type
export type ExpenseEntry = {
  id: string;
  date: string;
  transport: number;
  lunch: number;
  dinner: number;
  other: number;
  expectedAmount: number;
  total: number;
};

interface ExpenseHistoryProps {
  expenses: ExpenseEntry[];
}

export function ExpenseHistory({ expenses }: ExpenseHistoryProps) {
  // If no expenses, show empty state
  if (!expenses || expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
          <CardDescription>Your recent daily expenses</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40 text-muted-foreground">
          No expense records found. Start tracking your daily expenses.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense History</CardTitle>
        <CardDescription>Your recent daily expenses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {expenses.map((expense) => (
          <ExpenseHistoryItem key={expense.id} expense={expense} />
        ))}
      </CardContent>
    </Card>
  );
}

// Component for a single expense history item
function ExpenseHistoryItem({ expense }: { expense: ExpenseEntry }) {
  const date = new Date(expense.date);
  const isOverBudget = expense.total > expense.expectedAmount;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isOverBudget ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>
            <Receipt className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-sm">{formatShortDate(date)}</h4>
            <p className="text-xs text-muted-foreground">
              {isOverBudget 
                ? `${formatCurrency(expense.total - expense.expectedAmount)} over budget` 
                : `${formatCurrency(expense.expectedAmount - expense.total)} under budget`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">{formatCurrency(expense.total)}</p>
          <p className="text-xs text-muted-foreground">
            Expected: {formatCurrency(expense.expectedAmount)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Car className="h-3 w-3" /> Transport
          </span>
          <span>{formatCurrency(expense.transport)}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Coffee className="h-3 w-3" /> Lunch
          </span>
          <span>{formatCurrency(expense.lunch)}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <UtensilsCrossed className="h-3 w-3" /> Dinner
          </span>
          <span>{formatCurrency(expense.dinner)}</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <ShoppingBag className="h-3 w-3" /> Other
          </span>
          <span>{formatCurrency(expense.other)}</span>
        </div>
      </div>
      
      <Separator />
    </div>
  );
} 