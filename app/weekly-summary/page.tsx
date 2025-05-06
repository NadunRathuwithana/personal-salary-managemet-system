"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WeeklySummary } from "@/components/tracker/WeeklySummary";
import { WeeklyStats } from "@/components/tracker/WeeklyStats";
import { ExpenseEntry } from "@/components/tracker/ExpenseHistory";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";

// Sample data for demonstration
const generateSampleExpensesForWeek = (
  startDate: Date,
  daysCount: number = 5,
  overBudget: boolean = false
): ExpenseEntry[] => {
  const expenses: ExpenseEntry[] = [];
  const expectedDaily = 45;

  for (let i = 0; i < daysCount; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Skip weekends (Saturday and Sunday)
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }

    const transport = Number((Math.random() * 15).toFixed(2));
    const lunch = Number((Math.random() * 20).toFixed(2));
    const dinner = i % 2 === 0 ? Number((Math.random() * 25).toFixed(2)) : 0;
    const other = i % 3 === 0 ? Number((Math.random() * 20).toFixed(2)) : 0;

    // Increase values for over budget scenario
    const budgetMultiplier = overBudget ? 1.3 : 0.9;

    expenses.push({
      id: uuidv4(),
      date: date.toISOString().split("T")[0],
      transport: transport * budgetMultiplier,
      lunch: lunch * budgetMultiplier,
      dinner: dinner * budgetMultiplier,
      other: other * budgetMultiplier,
      expectedAmount: expectedDaily,
      total: (transport + lunch + dinner + other) * budgetMultiplier,
    });
  }

  return expenses;
};

export default function WeeklySummaryPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [previousWeekExpenses, setPreviousWeekExpenses] = useState<
    ExpenseEntry[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Calculate week range
  const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const dateRangeText = `${format(currentWeekStart, "MMM d")} - ${format(
    weekEnd,
    "MMM d, yyyy"
  )}`;

  // Handle week navigation
  const goToPreviousWeek = () => {
    setCurrentWeekStart((prevDate) => subWeeks(prevDate, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prevDate) => addWeeks(prevDate, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // Load sample data when week changes
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      // Generate sample data based on whether we're in the current week, previous weeks, or future weeks
      const today = new Date();
      const currentWeekStartDate = startOfWeek(today, { weekStartsOn: 1 });
      const isCurrentWeek =
        currentWeekStart.getTime() === currentWeekStartDate.getTime();
      const isPastWeek =
        currentWeekStart.getTime() < currentWeekStartDate.getTime();

      // Current week data is based on day of week
      if (isCurrentWeek) {
        const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay(); // Adjust Sunday to be 7
        const daysToShow = Math.min(dayOfWeek - 1, 5); // Monday = 1, show up to 5 days
        setExpenses(
          generateSampleExpensesForWeek(currentWeekStart, daysToShow, false)
        );
      }
      // Past weeks have complete data
      else if (isPastWeek) {
        // Alternate between over/under budget for past weeks
        const weekDiff = Math.round(
          (currentWeekStartDate.getTime() - currentWeekStart.getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        );
        setExpenses(
          generateSampleExpensesForWeek(currentWeekStart, 5, weekDiff % 2 === 0)
        );
      }
      // Future weeks have no data
      else {
        setExpenses([]);
      }

      // Set previous week data for comparison
      const previousWeekStart = subWeeks(currentWeekStart, 1);
      setPreviousWeekExpenses(
        generateSampleExpensesForWeek(previousWeekStart, 5, Math.random() > 0.5)
      );

      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentWeekStart]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weekly Summary</h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
            <CalendarIcon className="h-4 w-4 mr-1" /> Current
          </Button>

          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            Next <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="bg-muted/20 p-4 rounded-md text-center">
        <h2 className="text-lg font-medium">{dateRangeText}</h2>
      </div>

      {/* Stats Overview */}
      <WeeklyStats
        expenses={expenses}
        previousWeekExpenses={previousWeekExpenses}
      />

      {/* Weekly Summary with Daily Breakdown */}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        <WeeklySummary expenses={expenses} weekStartDate={currentWeekStart} />
      </div>
    </div>
  );
}
