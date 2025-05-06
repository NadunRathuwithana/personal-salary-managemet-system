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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlySpendChartProps {
  data?: {
    date: string;
    amount: number;
  }[];
  isLoading?: boolean;
}

export function MonthlySpendChart({
  data = [],
  isLoading = false,
}: MonthlySpendChartProps) {
  // If loading or no data, show placeholder
  if (isLoading || data.length === 0) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader>
          <p className="text-sm font-medium">Monthly Spending</p>
          <p className="text-xs text-muted-foreground">
            Your spending pattern over the last month
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[245px] w-full flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-muted-foreground">
              {isLoading
                ? "Loading chart data..."
                : "No data available for this month"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-2 rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">Spent:</span>{" "}
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <p className="text-sm font-medium">Monthly Spending</p>
        <p className="text-xs text-muted-foreground">
          Your spending pattern over the last month
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[245px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="date" tickMargin={10} />
              <YAxis tickFormatter={(value) => `$${value}`} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorSpend)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
