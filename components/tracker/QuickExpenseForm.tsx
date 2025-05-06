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
  Receipt,
  Plus,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Schema for quick form validation
const quickExpenseSchema = z.object({
  transport: z.coerce.number().min(0).default(0),
  lunch: z.coerce.number().min(0).default(0),
  dinner: z.coerce.number().min(0).default(0),
  other: z.coerce.number().min(0).default(0),
});

type QuickExpenseValues = z.infer<typeof quickExpenseSchema>;

interface QuickExpenseFormProps {
  onSubmit?: (
    values: QuickExpenseValues & { total: number; date: string }
  ) => void;
  expectedAmount?: number;
}

export function QuickExpenseForm({
  onSubmit,
  expectedAmount = 0,
}: QuickExpenseFormProps) {
  // Initialize form with react-hook-form
  const form = useForm<QuickExpenseValues>({
    resolver: zodResolver(quickExpenseSchema),
    defaultValues: {
      transport: 0,
      lunch: 0,
      dinner: 0,
      other: 0,
    },
  });

  // State to track calculated total
  const [total, setTotal] = useState<number>(0);

  // Calculate total when form values change
  useEffect(() => {
    const values = form.getValues();
    const calculatedTotal =
      (values.transport || 0) +
      (values.lunch || 0) +
      (values.dinner || 0) +
      (values.other || 0);

    setTotal(calculatedTotal);
  }, [form.watch()]);

  // Form submission handler
  const handleSubmit = (values: QuickExpenseValues) => {
    if (onSubmit) {
      onSubmit({
        ...values,
        total,
        date: new Date().toISOString().slice(0, 10),
      });

      // Reset form after submission
      form.reset({
        transport: 0,
        lunch: 0,
        dinner: 0,
        other: 0,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Quick Expense Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ExpenseInput
                form={form}
                name="transport"
                label="Transport"
                icon={<Car className="h-4 w-4" />}
              />
              <ExpenseInput
                form={form}
                name="lunch"
                label="Lunch"
                icon={<Coffee className="h-4 w-4" />}
              />
              <ExpenseInput
                form={form}
                name="dinner"
                label="Dinner"
                icon={<UtensilsCrossed className="h-4 w-4" />}
              />
              <ExpenseInput
                form={form}
                name="other"
                label="Other"
                icon={<ShoppingBag className="h-4 w-4" />}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm flex items-center gap-2">
                <Receipt className="h-4 w-4 text-muted-foreground" />
                <div>
                  <span className="font-medium">Total:</span>{" "}
                  {formatCurrency(total)}
                  {expectedAmount > 0 && (
                    <span className="text-xs text-muted-foreground ml-2">
                      {total > expectedAmount
                        ? `${formatCurrency(
                            total - expectedAmount
                          )} over budget`
                        : `${formatCurrency(expectedAmount - total)} remaining`}
                    </span>
                  )}
                </div>
              </div>
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Helper component for expense inputs
function ExpenseInput({
  form,
  name,
  label,
  icon,
}: {
  form: any;
  name: "transport" | "lunch" | "dinner" | "other";
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1 text-xs">
            {icon}
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className="text-sm"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
