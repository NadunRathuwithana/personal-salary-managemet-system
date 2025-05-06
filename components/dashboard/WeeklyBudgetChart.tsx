"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface WeeklyBudgetChartProps {
  data?: {
    day: string;
    actual: number;
    budget: number;
  }[];
  isLoading?: boolean;
}

export function WeeklyBudgetChart({
  data = [],
  isLoading = false,
}: WeeklyBudgetChartProps) {
  // If loading or no data, show placeholder
  if (isLoading || data.length === 0) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <p className="text-sm font-medium">Weekly Spend vs Budget</p>
          <p className="text-xs text-muted-foreground">
            Comparing your daily expenses with budget
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[245px] w-full flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-muted-foreground">
              {isLoading
                ? "Loading chart data..."
                : "No data available for this week"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm">
          <p className="font-medium">{payload[0].payload.day}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Actual:</span>{" "}
            {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-[#10B981]">Budget:</span>{" "}
            {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <p className="text-sm font-medium">Weekly Spend vs Budget</p>
        <p className="text-xs text-muted-foreground">
          Comparing your daily expenses with budget
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[245px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(value) => `$${value}`} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="actual"
                name="Actual"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="budget"
                name="Budget"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
