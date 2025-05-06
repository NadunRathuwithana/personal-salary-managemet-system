"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameDay,
  isSameMonth,
} from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Loading,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";

interface ExpenseData {
  date: string; // ISO format: "YYYY-MM-DD"
  amount: number;
}

interface ExpenseCalendarProps {
  expenses?: ExpenseData[];
  isLoading?: boolean;
  error?: string;
  onDateSelect?: (date: Date) => void;
}

export function ExpenseCalendar({
  expenses = [],
  isLoading = false,
  error,
  onDateSelect,
}: ExpenseCalendarProps) {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get the days in the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Get day names for header row
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Find max expense amount for scaling the heatmap
  const maxAmount = Math.max(...expenses.map((exp) => exp.amount), 100);

  // Get expense for a specific day
  const getExpenseForDay = (day: Date) => {
    const dateString = format(day, "yyyy-MM-dd");
    return expenses.find((expense) => expense.date === dateString);
  };

  // Get color intensity for an expense
  const getColorIntensity = (amount: number) => {
    const intensity = Math.min(Math.floor((amount / maxAmount) * 5), 4);
    return intensity;
  };

  // Helper function to navigate to the expense detail for a specific day
  const handleDayClick = (day: Date) => {
    const expense = getExpenseForDay(day);
    if (onDateSelect) {
      onDateSelect(day);
    } else {
      // If no callback provided, navigate to the expense tracker with the selected date
      const dateParam = format(day, "yyyy-MM-dd");
      router.push(`/tracker?date=${dateParam}`);
    }
  };

  // Change month handlers
  const nextMonth = () => {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() - 1, 1)
    );
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-36" />
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={`header-${i}`} className="h-7 w-full" />
              ))}
            {Array(35)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={`day-${i}`} className="h-12 w-full rounded-md" />
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Error Loading Calendar
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={goToCurrentMonth} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToCurrentMonth}>
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Expense heatmap for the month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {day}
            </div>
          ))}

          {/* Calendar grid */}
          {daysInMonth.map((day, i) => {
            const expense = getExpenseForDay(day);
            const intensity = expense ? getColorIntensity(expense.amount) : -1;
            const isSelected = false; // Could be controlled by a state if needed

            return (
              <Button
                key={i}
                variant="ghost"
                className={cn(
                  "h-12 p-0 font-normal rounded-md relative",
                  intensity >= 0 && `bg-primary/10 hover:bg-primary/20`,
                  intensity === 1 && `bg-primary/20 hover:bg-primary/30`,
                  intensity === 2 && `bg-primary/30 hover:bg-primary/40`,
                  intensity === 3 && `bg-primary/50 hover:bg-primary/60`,
                  intensity === 4 &&
                    `bg-primary/70 hover:bg-primary/80 text-primary-foreground`,
                  isToday(day) && "border-2 border-primary",
                  isSelected && "ring-2 ring-primary",
                  !isSameMonth(day, currentMonth) && "opacity-30"
                )}
                onClick={() => handleDayClick(day)}
              >
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <span
                    className={cn(
                      "text-sm",
                      intensity === 4 && "text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  {expense && (
                    <span
                      className={cn(
                        "text-xs",
                        intensity >= 3
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatCurrency(expense.amount)}
                    </span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
