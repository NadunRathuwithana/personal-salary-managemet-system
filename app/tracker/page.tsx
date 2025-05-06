"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DailyExpenseForm } from "@/components/tracker/DailyExpenseForm";
import { QuickExpenseForm } from "@/components/tracker/QuickExpenseForm";
import {
  ExpenseHistory,
  ExpenseEntry,
} from "@/components/tracker/ExpenseHistory";
import { ExpenseSummary } from "@/components/tracker/ExpenseSummary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for demonstration
const sampleExpenses: ExpenseEntry[] = [
  {
    id: "1",
    date: "2023-04-25",
    transport: 5.75,
    lunch: 12.5,
    dinner: 18.25,
    other: 3.5,
    expectedAmount: 45.0,
    total: 40.0,
  },
  {
    id: "2",
    date: "2023-04-26",
    transport: 8.25,
    lunch: 15.0,
    dinner: 0,
    other: 7.5,
    expectedAmount: 45.0,
    total: 30.75,
  },
  {
    id: "3",
    date: "2023-04-27",
    transport: 6.0,
    lunch: 10.5,
    dinner: 22.75,
    other: 15.0,
    expectedAmount: 45.0,
    total: 54.25,
  },
];

export default function TrackerPage() {
  const [expenses, setExpenses] = useState<ExpenseEntry[]>(sampleExpenses);
  const [activeTab, setActiveTab] = useState("quick");

  // Default expected amount (could be stored in user settings)
  const defaultExpectedAmount = 45.0;

  // Handle quick form submission
  const handleQuickSubmit = (data: Omit<ExpenseEntry, "id">) => {
    // Add expected amount if not provided
    const expenseData = {
      ...data,
      expectedAmount: defaultExpectedAmount,
    };

    // Create new expense entry with a unique ID
    const newExpense: ExpenseEntry = {
      ...expenseData,
      id: uuidv4(),
    };

    // Add to expenses array
    setExpenses([newExpense, ...expenses]);
  };

  // Handle detailed form submission
  const handleDetailedSubmit = (data: Omit<ExpenseEntry, "id">) => {
    // Create new expense entry with a unique ID
    const newExpense: ExpenseEntry = {
      ...data,
      id: uuidv4(),
    };

    // Add to expenses array
    setExpenses([newExpense, ...expenses]);

    // Switch to the history tab to show the new entry
    setActiveTab("history");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expense Tracker</h1>

      {/* Quick Entry Form - Always visible at the top */}
      <div className="lg:hidden">
        <QuickExpenseForm
          onSubmit={handleQuickSubmit}
          expectedAmount={defaultExpectedAmount}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left column: Form on mobile, Form + Summary on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="quick">Quick Entry</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Entry</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-6">
              {/* Quick form in desktop view */}
              <div className="hidden lg:block">
                <QuickExpenseForm
                  onSubmit={handleQuickSubmit}
                  expectedAmount={defaultExpectedAmount}
                />
              </div>

              <div className="lg:mt-6">
                <ExpenseHistory expenses={expenses.slice(0, 5)} />
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-6">
              <DailyExpenseForm onSubmit={handleDetailedSubmit} />
            </TabsContent>

            <TabsContent value="history">
              <ExpenseHistory expenses={expenses} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column: Summary on desktop only */}
        <div className="hidden lg:block">
          <ExpenseSummary expenses={expenses} />
        </div>
      </div>

      {/* Mobile summary - only show when on history tab */}
      <div
        className={`lg:hidden ${activeTab === "history" ? "block" : "hidden"}`}
      >
        <ExpenseSummary expenses={expenses} />
      </div>
    </div>
  );
}
