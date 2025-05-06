"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { DatePicker } from "@/components/ui/datepicker";

// Define the validation schema
const settingsSchema = z.object({
  monthlySalary: z.coerce.number().positive("Salary must be positive"),
  salaryDay: z.date({
    required_error: "Salary day is required",
  }),
  autoSave: z.boolean(),
  weeklyBudget: z.coerce.number().positive("Budget must be positive"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      monthlySalary: 0,
      salaryDay: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      autoSave: false,
      weeklyBudget: 0,
    },
  });

  // Load saved settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, you would fetch from an API or localStorage
        // For demo purposes, we're using mock data with a slight delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const savedSettings = {
          monthlySalary: 5500,
          salaryDay: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            25
          ),
          autoSave: true,
          weeklyBudget: 350,
        };

        // Set form values
        Object.entries(savedSettings).forEach(([key, value]) => {
          setValue(key as keyof SettingsFormValues, value as any);
        });
      } catch (err) {
        setError("Failed to load settings. Please try again.");
        console.error("Error loading settings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [setValue]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsSaving(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Get the day of month from the date object
      const formattedData = {
        ...data,
        salaryDay: data.salaryDay.getDate(),
      };

      // In a real app, you would save to an API or localStorage
      console.log("Settings saved:", formattedData);

      reset(data); // Reset form with new values (to reset isDirty state)

      // Show success message
      toast.success("Settings saved successfully");
    } catch (err) {
      toast.error("Failed to save settings");
      console.error("Error saving settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-56 mb-1" />
            <Skeleton className="h-5 w-80" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-center justify-between space-x-2">
                <div>
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-64 mt-1" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full mt-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Personal Finance Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Finance Settings</CardTitle>
          <CardDescription>
            Configure your salary and budget preferences
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Income Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Income</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monthlySalary">Monthly Salary</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="monthlySalary"
                      type="number"
                      className="pl-8"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      {...register("monthlySalary")}
                    />
                  </div>
                  {errors.monthlySalary && (
                    <p className="text-sm text-destructive">
                      {errors.monthlySalary.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryDay">Salary Day</Label>
                  <Controller
                    control={control}
                    name="salaryDay"
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        placeholder="Select salary date"
                      />
                    )}
                  />
                  {errors.salaryDay && (
                    <p className="text-sm text-destructive">
                      {errors.salaryDay.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Day of month when salary is received
                  </p>
                </div>
              </div>
            </div>

            {/* Saving Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Savings</h3>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Auto-save to Fixed Saving</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically transfer a portion of your salary to fixed
                    savings
                  </p>
                </div>
                <Switch id="autoSave" {...register("autoSave")} />
              </div>
            </div>

            {/* Budget Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Budget</h3>

              <div className="space-y-2">
                <Label htmlFor="weeklyBudget">Weekly Budget Amount</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="weeklyBudget"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    {...register("weeklyBudget")}
                  />
                </div>
                {errors.weeklyBudget && (
                  <p className="text-sm text-destructive">
                    {errors.weeklyBudget.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Your target spending limit for each week
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSaving || !isDirty}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
