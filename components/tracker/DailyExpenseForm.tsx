"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Car, 
  Coffee, 
  UtensilsCrossed, 
  ShoppingBag, 
  Calculator, 
  Receipt 
} from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Schema for form validation
const dailyExpenseSchema = z.object({
  date: z.string().default(() => new Date().toISOString().slice(0, 10)),
  transport: z.coerce.number().min(0).default(0),
  lunch: z.coerce.number().min(0).default(0),
  dinner: z.coerce.number().min(0).default(0),
  other: z.coerce.number().min(0).default(0),
  expectedAmount: z.coerce.number().min(0).default(0),
});

type DailyExpenseValues = z.infer<typeof dailyExpenseSchema>;

interface DailyExpenseFormProps {
  onSubmit?: (values: DailyExpenseValues & { total: number }) => void;
  initialData?: Partial<DailyExpenseValues>;
}

export function DailyExpenseForm({ onSubmit, initialData }: DailyExpenseFormProps) {
  // Initialize form with react-hook-form
  const form = useForm<DailyExpenseValues>({
    resolver: zodResolver(dailyExpenseSchema),
    defaultValues: {
      date: new Date().toISOString().slice(0, 10),
      transport: 0,
      lunch: 0,
      dinner: 0,
      other: 0,
      expectedAmount: 0,
      ...initialData,
    },
  });

  // State to track calculated total
  const [total, setTotal] = useState<number>(0);
  
  // State to track the difference between total and expected amount
  const [difference, setDifference] = useState<number>(0);
  
  // Calculate total when form values change
  useEffect(() => {
    const values = form.getValues();
    const calculatedTotal = 
      (values.transport || 0) + 
      (values.lunch || 0) + 
      (values.dinner || 0) + 
      (values.other || 0);
    
    setTotal(calculatedTotal);
    setDifference(calculatedTotal - (values.expectedAmount || 0));
  }, [form.watch()]);

  // Form submission handler
  const handleSubmit = (values: DailyExpenseValues) => {
    if (onSubmit) {
      onSubmit({ ...values, total });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Daily Expense Tracker</CardTitle>
        <CardDescription>Track your daily expenses to manage your budget better</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="transport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Transport
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lunch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Coffee className="h-4 w-4" />
                      Lunch
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dinner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <UtensilsCrossed className="h-4 w-4" />
                      Dinner
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Other Expenses
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="expectedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Expected Daily Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted/30 p-4 rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Receipt className="h-4 w-4" />
                  <span className="font-medium">Total Expenses</span>
                </span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
              
              {form.getValues().expectedAmount > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span>Difference from expected</span>
                  <span className={difference > 0 ? "text-red-500" : difference < 0 ? "text-green-500" : ""}>
                    {difference > 0 ? "+" : ""}{formatCurrency(difference)}
                  </span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">Save Daily Expenses</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 