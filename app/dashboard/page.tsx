"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  CreditCard,
  TrendingUp,
  DollarSign,
  PiggyBank,
  BarChart4,
  ArrowRight,
  PieChart,
  Target,
  ArrowUp,
  ArrowDown,
  Landmark,
} from "lucide-react";
import { WalletCardGroup } from "@/components/wallets/WalletCardGroup";
import { WeeklyBudgetChart } from "@/components/dashboard/WeeklyBudgetChart";
import { MonthlySpendChart } from "@/components/dashboard/MonthlySpendChart";
import { SalaryStatusCard } from "@/components/dashboard/SalaryStatusCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";
import { format, subDays, addMonths } from "date-fns";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import {
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// New component for financial health score
function FinancialHealthScore({ score = 78 }) {
  const formatCurrency = useFormatCurrency();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="h-full">
        <CardHeader className="p-3 pb-1.5">
          <CardTitle className="text-xs font-medium">
            Financial Health
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <p className={`text-xl font-bold ${getScoreColor(score)}`}>
                {score}/100
              </p>
              <p className="text-xs text-muted-foreground">Good Standing</p>
            </div>
            <div className="p-1.5 rounded-full bg-green-100">
              <BarChart4 className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="mt-3 space-y-0.5">
            <div className="flex justify-between text-[10px]">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full">
              <div
                className={`h-1 rounded-full ${
                  score >= 80
                    ? "bg-green-500"
                    : score >= 60
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}

// Component for monthly summary
function MonthlySummary() {
  const formatCurrency = useFormatCurrency();

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="h-full">
        <CardHeader className="p-3 pb-1.5">
          <CardTitle className="text-xs font-medium">Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2">
          <div className="flex justify-between">
            <div className="text-xs">Income</div>
            <div className="font-medium text-green-600 text-xs">
              {formatCurrency(5500)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs">Expenses</div>
            <div className="font-medium text-red-600 text-xs">
              {formatCurrency(3240)}
            </div>
          </div>
          <div className="flex justify-between border-t pt-1">
            <div className="text-xs font-medium">Net Savings</div>
            <div className="font-medium text-xs">{formatCurrency(2260)}</div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground border rounded p-1">
            <div className="flex items-center">
              <ArrowUp className="h-2.5 w-2.5 text-green-500 mr-1" />
              <span>Saving 41% of income</span>
            </div>
            <Badge
              variant="outline"
              className="text-[9px] h-3.5 px-1 font-normal"
            >
              Good
            </Badge>
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}

// Component for income categories - converted to radial bar chart
function IncomeSourcesCard() {
  const formatCurrency = useFormatCurrency();

  const incomeData = [
    { name: "Salary", value: 5000, percentage: 91, color: "#0081CB" },
    { name: "Freelance", value: 350, percentage: 6, color: "#6DB9EF" },
    { name: "Investments", value: 150, percentage: 3, color: "#99D8FF" },
  ];

  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);

  // For stacked radial chart format
  const chartData = [
    {
      name: "Total",
      Salary: 5000,
      Freelance: 350,
      Investments: 150,
    },
  ];

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="h-[325px]">
        <CardHeader className="p-3 pb-1.5">
          <CardTitle className="text-xs font-medium">Income Sources</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 h-[calc(100%-40px)] flex flex-col justify-between">
          <div className="flex justify-center items-center h-36">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius={30}
                outerRadius={80}
                barSize={12}
                data={chartData}
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="80%"
              >
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (
                        viewBox &&
                        "cx" in viewBox &&
                        "cy" in viewBox &&
                        viewBox.cy !== undefined
                      ) {
                        const cx = viewBox.cx || 0;
                        const cy = viewBox.cy;
                        return (
                          <text x={cx} y={cy - 30} textAnchor="middle">
                            <tspan
                              x={cx}
                              y={cy - 35}
                              className="fill-foreground text-xs font-medium"
                            >
                              Total
                            </tspan>
                            <tspan
                              x={cx}
                              y={cy - 15}
                              className="fill-foreground text-sm font-bold"
                            >
                              {formatCurrency(totalIncome)}
                            </tspan>
                          </text>
                        );
                      }
                      return null;
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="Salary"
                  stackId="a"
                  fill={incomeData[0].color}
                  cornerRadius={5}
                  className="stroke-transparent stroke-[1.5]"
                />
                <RadialBar
                  dataKey="Freelance"
                  stackId="a"
                  fill={incomeData[1].color}
                  cornerRadius={5}
                  className="stroke-transparent stroke-[1.5]"
                />
                <RadialBar
                  dataKey="Investments"
                  stackId="a"
                  fill={incomeData[2].color}
                  cornerRadius={5}
                  className="stroke-transparent stroke-[1.5]"
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1 mt-auto">
            {incomeData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="h-1.5 w-1.5 rounded-full mr-1.5"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-[10px]">{item.name}</span>
                </div>
                <span className="text-[10px] font-medium">
                  {formatCurrency(item.value)} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}

// Component for expense categories - converted to list view
function ExpenseCategoriesCard() {
  const formatCurrency = useFormatCurrency();

  const expenseData = [
    { name: "Rent", value: 1200, percentage: 37, color: "#FF4757" },
    { name: "Food", value: 650, percentage: 20, color: "#FFA502" },
    { name: "Transport", value: 320, percentage: 10, color: "#2196F3" },
    { name: "Utilities", value: 280, percentage: 9, color: "#9C27B0" },
    { name: "Others", value: 790, percentage: 24, color: "#26de81" },
  ];

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="h-[325px]">
        <CardHeader className="p-3 pb-1.5">
          <CardTitle className="text-xs font-medium">
            Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 h-[calc(100%-40px)] flex flex-col justify-between">
          <div className="space-y-2 flex-grow overflow-auto">
            {expenseData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className="h-2 w-2 rounded-full mr-1.5"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-xs">{item.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-medium">
                    {formatCurrency(item.value)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-1 bg-gray-100 rounded-full mt-3">
            {expenseData.map((item, index) => {
              // Calculate where this segment starts from (sum of previous percentages)
              const previousPercentage = expenseData
                .slice(0, index)
                .reduce((sum, curr) => sum + curr.percentage, 0);

              return (
                <div
                  key={`bar-${index}`}
                  className="h-1 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                    marginLeft: index === 0 ? "0" : `${previousPercentage}%`,
                    position: index === 0 ? "relative" : "absolute",
                    top: 0,
                  }}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}

// Last Spends component
function LastSpends() {
  const formatCurrency = useFormatCurrency();

  const recentTransactions = [
    {
      date: "Today",
      description: "Grocery Shopping",
      amount: 45.7,
      category: "Food",
    },
    {
      date: "Yesterday",
      description: "Taxi Ride",
      amount: 12.5,
      category: "Transport",
    },
    {
      date: "Sep 21",
      description: "Phone Bill",
      amount: 35.0,
      category: "Utilities",
    },
    {
      date: "Sep 20",
      description: "Restaurant",
      amount: 28.75,
      category: "Food",
    },
    {
      date: "Sep 20",
      description: "Restaurant",
      amount: 28.75,
      category: "Food",
    },
    {
      date: "Sep 20",
      description: "Restaurant",
      amount: 28.75,
      category: "Food",
    },
  ];

  return (
    <AnimatedWrapper type="subtle" hoverEffect="lift">
      <Card className="h-[325px]">
        <CardHeader className="p-3 pb-1.5">
          <CardTitle className="text-xs font-medium">Last Spends</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 h-[calc(100%-40px)] overflow-auto">
          <div className="space-y-2">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-1 border-b border-dashed last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium">
                    {transaction.description}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">
                      {transaction.date}
                    </span>
                    <span className="text-[10px] px-1 bg-secondary rounded-sm">
                      {transaction.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-red-500">
                  -{formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedWrapper>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [walletData, setWalletData] = useState<any[]>([]);
  const [weeklyChartData, setWeeklyChartData] = useState<any[]>([]);
  const [monthlyChartData, setMonthlyChartData] = useState<any[]>([]);
  const formatCurrency = useFormatCurrency();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const [salaryStatus, setSalaryStatus] = useState({
    expectedDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      5
    ),
    expectedAmount: 5500,
    isDelayed: false,
    isProcessing: true,
    actualDate: undefined as Date | undefined,
    delayReason: undefined as string | undefined,
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = () => {
      // Simulate loading delay
      setTimeout(() => {
        // Sample wallet data
        setWalletData([
          {
            type: "base",
            title: "Main Account",
            balance: 3245.7,
            previousBalance: 2980.45,
            updatedAt: new Date(),
          },
          {
            type: "saving",
            title: "Savings",
            balance: 12560.3,
            previousBalance: 11200.0,
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            type: "fixed",
            title: "Investments",
            balance: 8750.0,
            previousBalance: 8750.0,
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        ]);

        // Sample weekly chart data
        const weekData = [];
        for (let i = 6; i >= 0; i--) {
          const date = subDays(new Date(), i);
          const dayName = format(date, "EEE");
          const budget = 50; // Daily budget
          const actual = i < 5 ? Math.round(Math.random() * 70) + 10 : 0; // Only show data for past days

          if (i < 5) {
            // Only add data for past days
            weekData.push({
              day: dayName,
              actual,
              budget,
            });
          }
        }
        setWeeklyChartData(weekData);

        // Sample monthly chart data
        const monthData = [];
        for (let i = 29; i >= 0; i--) {
          const date = subDays(new Date(), i);
          const dayStr = format(date, "MMM dd");
          // Generate random amounts but with a pattern: higher in beginning of month, lower at end
          const dayOfMonth = date.getDate();
          const baseAmount = 150 - dayOfMonth * 3;
          const randomFactor = Math.random() * 30 - 15;
          const amount = Math.max(0, baseAmount + randomFactor);

          if (i < 28) {
            // Only add data for past days
            monthData.push({
              date: dayStr,
              amount: Math.round(amount),
            });
          }
        }
        setMonthlyChartData(monthData);

        // Simulate different salary states based on the day of month
        const today = new Date();
        const dayOfMonth = today.getDate();

        // Change salary status based on day of month for demo purposes
        if (dayOfMonth < 10) {
          setSalaryStatus({
            expectedDate: new Date(today.getFullYear(), today.getMonth(), 25),
            expectedAmount: 5500,
            isDelayed: false,
            isProcessing: false,
            actualDate: undefined,
            delayReason: undefined,
          });
        } else if (dayOfMonth < 20) {
          setSalaryStatus({
            expectedDate: new Date(today.getFullYear(), today.getMonth(), 25),
            expectedAmount: 5500,
            isDelayed: true,
            isProcessing: false,
            delayReason: "Pending approval from finance department",
            actualDate: undefined,
          });
        } else if (dayOfMonth < 25) {
          setSalaryStatus({
            expectedDate: new Date(today.getFullYear(), today.getMonth(), 25),
            expectedAmount: 5500,
            isDelayed: false,
            isProcessing: true,
            actualDate: undefined,
            delayReason: undefined,
          });
        } else {
          setSalaryStatus({
            expectedDate: new Date(today.getFullYear(), today.getMonth(), 25),
            actualDate: new Date(today.getFullYear(), today.getMonth(), 25),
            expectedAmount: 5500,
            isDelayed: false,
            isProcessing: false,
            delayReason: undefined,
          });
        }

        setIsLoading(false);
      }, 1500);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-3">
      <AnimatedWrapper type="fadeIn">
        <h1 className="text-lg font-bold">Dashboard</h1>
      </AnimatedWrapper>

      {/* Wallet Cards */}
      <AnimatedWrapper type="slideUp" delay={0.1}>
        <h2 className="text-xs font-medium mb-1.5 pl-1">My Wallets</h2>
        <WalletCardGroup wallets={walletData} isLoading={isLoading} />
      </AnimatedWrapper>

      {/* Salary Status */}
      <AnimatedWrapper type="slideUp" delay={0.2}>
        <SalaryStatusCard
          expectedDate={salaryStatus.expectedDate}
          actualDate={salaryStatus.actualDate}
          expectedAmount={salaryStatus.expectedAmount}
          isDelayed={salaryStatus.isDelayed}
          isProcessing={salaryStatus.isProcessing}
          delayReason={salaryStatus.delayReason}
        />
      </AnimatedWrapper>

      {/* First row */}
      <div className="grid grid-cols-12 gap-3">
        {/* Financial Health and Monthly Summary in one card */}
        <div className="col-span-3">
          <AnimatedWrapper type="subtle" hoverEffect="lift">
            <Card className="h-[325px]">
              <div className="flex flex-col divide-y h-full">
                <div className="h-[162.5px]">
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium">
                      Financial Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 h-[calc(100%-40px)] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <p className={`text-xl font-bold ${getScoreColor(78)}`}>
                          78/100
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Good Standing
                        </p>
                      </div>
                      <div className="p-1.5 rounded-full bg-green-100">
                        <BarChart4 className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-1 rounded-full bg-amber-500"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </div>
                <div className="h-[162.5px]">
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium">
                      Monthly Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 h-[calc(100%-40px)] flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground">
                          Income
                        </span>
                        <span className="text-xs font-medium text-green-600">
                          {formatCurrency(5500)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground">
                          Expenses
                        </span>
                        <span className="text-xs font-medium text-red-600">
                          {formatCurrency(3240)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-medium">Net Savings</span>
                      <span className="text-xs font-medium">
                        {formatCurrency(2260)}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </AnimatedWrapper>
        </div>

        {/* Weekly Budget */}
        <div className="col-span-6">
          <AnimatedWrapper type="slideUp" delay={0.3}>
            <Card className="h-[325px]">
              <CardContent className="p-0">
                <WeeklyBudgetChart
                  data={weeklyChartData}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>

        {/* Last Spends - First instance */}
        <div className="col-span-3">
          <LastSpends />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-12 gap-3">
        {/* Monthly Spend */}
        <div className="col-span-6">
          <AnimatedWrapper type="slideUp" delay={0.4}>
            <Card className="h-[325px]">
              <CardContent className="p-0">
                <MonthlySpendChart
                  data={monthlyChartData}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </AnimatedWrapper>
        </div>

        {/* Income Sources */}
        <div className="col-span-3">
          <IncomeSourcesCard />
        </div>

        {/* Expense Breakdown */}
        <div className="col-span-3">
          <ExpenseCategoriesCard />
        </div>
      </div>
    </div>
  );
}
