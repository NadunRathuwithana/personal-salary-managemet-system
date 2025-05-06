"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { PlusCircle } from "lucide-react";

import { IncomeForm } from "@/components/income/IncomeForm";
import { IncomeList, IncomeEntry } from "@/components/income/IncomeList";
import { IncomeSummary } from "@/components/income/IncomeSummary";
import { ExpenseCalendar } from "@/components/tracker/ExpenseCalendar";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { useFetch } from "@/hooks/useFetch";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { api } from "@/services/api";

// When connecting to backend, this would be:
// const fetchIncomes = () => api.income.getAll();

// Temporary mock function - replace with actual API call
const fetchIncomes = async (): Promise<IncomeEntry[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In production, this will be removed and replaced with actual API call
  if (process.env.NODE_ENV === "development") {
    // Return empty array for now - no dummy data
    return [];
  }

  // In production code:
  // return api.income.getAll();
  return [];
};

export default function IncomePage() {
  const router = useRouter();
  const formatCurrency = useFormatCurrency();
  const {
    data: incomes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFetch<IncomeEntry[]>(fetchIncomes);

  // Add new income
  const handleAddIncome = async (data: Omit<IncomeEntry, "id">) => {
    try {
      // In production, this would be:
      // await api.income.create(data);
      // await refetch();

      // For development, manually add to state
      const newIncome: IncomeEntry = {
        ...data,
        id: uuidv4(),
      };

      // Refetch after adding
      await refetch();
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  // Delete income
  const handleDeleteIncome = async (id: string) => {
    try {
      // In production, this would be:
      // await api.income.delete(id);
      // await refetch();

      // Refetch after deleting
      await refetch();
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  // Navigate to date when calendar day is clicked
  const handleDateSelect = (date: Date) => {
    router.push(`/income?date=${format(date, "yyyy-MM-dd")}`);
  };

  // Format income data for calendar display (for development only)
  const calendarData = incomes.map((income) => ({
    date: income.date,
    amount: income.amount,
  }));

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Extra Income</h1>
        <LoadingState text="Loading income data..." fullPage />
      </div>
    );
  }

  // If error, show error state
  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Extra Income</h1>
        <ErrorState
          description={error || "Failed to load income data"}
          actionFn={refetch}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatedWrapper type="fadeIn">
        <h1 className="text-2xl font-bold">Extra Income</h1>
      </AnimatedWrapper>

      {/* Income Summary */}
      <AnimatedWrapper type="slideUp" delay={0.1}>
        <IncomeSummary incomes={incomes} />
      </AnimatedWrapper>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          {/* Income Form */}
          <AnimatedWrapper type="slideUp" delay={0.2}>
            <IncomeForm onAddIncome={handleAddIncome} />
          </AnimatedWrapper>

          {/* Income Calendar */}
          <AnimatedWrapper type="slideUp" delay={0.3}>
            <ExpenseCalendar
              expenses={calendarData}
              onDateSelect={handleDateSelect}
            />
          </AnimatedWrapper>
        </div>

        {/* Income List */}
        <div className="lg:col-span-2">
          <AnimatedWrapper type="slideUp" delay={0.4}>
            {incomes.length === 0 ? (
              <EmptyState
                icon={PlusCircle}
                title="No income entries yet"
                description="Your income entries will appear here after you add them using the form."
              />
            ) : (
              <IncomeList
                incomes={incomes}
                onDeleteIncome={handleDeleteIncome}
                formatCurrency={formatCurrency}
              />
            )}
          </AnimatedWrapper>
        </div>
      </div>
    </div>
  );
}
