"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle, PlusCircle } from "lucide-react";
import { formatCurrency as defaultFormatCurrency } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

export interface IncomeEntry {
  id: string;
  source: string;
  amount: number;
  date: string;
}

interface IncomeListProps {
  incomes: IncomeEntry[];
  onDeleteIncome?: (id: string) => void;
  isLoading?: boolean;
  error?: string;
  formatCurrency?: (value: number) => string;
}

export function IncomeList({
  incomes,
  onDeleteIncome,
  isLoading = false,
  error,
  formatCurrency = defaultFormatCurrency,
}: IncomeListProps) {
  // Render loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex gap-3">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16 ml-auto" />
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            className="w-full h-8 text-sm"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Sort incomes by date (newest first)
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Render empty state
  if (incomes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
          <CardDescription>No income entries found</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
          <div className="mb-2 rounded-full bg-primary/10 p-2">
            <PlusCircle className="h-6 w-6 text-primary/60" />
          </div>
          <p className="mb-1 font-medium text-sm">No income entries yet</p>
          <p className="text-xs max-w-md">
            Your income entries will appear here after you add them using the
            form.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <AnimatedWrapper type="subtle">
      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
          <CardDescription>Your additional income sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  {onDeleteIncome && <TableHead className="w-[50px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedIncomes.map((income) => (
                  <AnimatedWrapper key={income.id} type="hover" hoverEffect="highlight">
                    <TableRow>
                      <TableCell className="text-xs">
                        {new Date(income.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{income.source}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(income.amount)}
                      </TableCell>
                      {onDeleteIncome && (
                        <TableCell className="p-0 pr-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDeleteIncome(income.id)}
                            className="h-7 w-7 ml-auto"
                          >
                            <span className="sr-only">Delete</span>
                            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  </AnimatedWrapper>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}
