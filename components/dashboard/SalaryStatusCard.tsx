"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { CalendarCheck, CalendarClock, Clock, AlertCircle } from "lucide-react";

interface SalaryStatusCardProps {
  expectedDate?: Date;
  expectedAmount?: number;
  actualDate?: Date;
  isProcessing?: boolean;
  isDelayed?: boolean;
  delayReason?: string;
}

export function SalaryStatusCard({
  expectedDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  ),
  expectedAmount = 5000,
  actualDate,
  isProcessing = false,
  isDelayed = false,
  delayReason,
}: SalaryStatusCardProps) {
  // Calculate days until expected date
  const today = new Date();
  const daysUntil = Math.ceil(
    (expectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Determine status
  let statusBadge;
  let statusIcon;

  if (actualDate) {
    // Salary has arrived
    statusBadge = <Badge className="bg-green-500">Received</Badge>;
    statusIcon = <CalendarCheck className="h-6 w-6 text-green-500" />;
  } else if (isDelayed) {
    // Salary is delayed
    statusBadge = <Badge variant="destructive">Delayed</Badge>;
    statusIcon = <AlertCircle className="h-6 w-6 text-destructive" />;
  } else if (isProcessing) {
    // Salary is being processed
    statusBadge = (
      <Badge
        variant="outline"
        className="bg-yellow-100 text-yellow-800 border-yellow-300"
      >
        Processing
      </Badge>
    );
    statusIcon = <Clock className="h-6 w-6 text-yellow-600" />;
  } else {
    // Salary is scheduled
    statusBadge = <Badge variant="outline">Scheduled</Badge>;
    statusIcon = <CalendarClock className="h-6 w-6 text-muted-foreground" />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>Salary Status</CardTitle>
          {statusBadge}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10">{statusIcon}</div>
          <div className="space-y-2">
            <p className="text-2xl font-bold">
              {formatCurrency(expectedAmount)}
            </p>

            {actualDate ? (
              <p className="text-sm text-muted-foreground">
                Received on {formatDate(actualDate)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Expected on {formatDate(expectedDate)}
                {daysUntil > 0 && ` (in ${daysUntil} days)`}
              </p>
            )}

            {isDelayed && delayReason && (
              <div className="mt-2 text-sm p-2 bg-red-50 border border-red-100 rounded text-red-600">
                <p className="font-medium">Delay Reason:</p>
                <p>{delayReason}</p>
              </div>
            )}

            {isProcessing && (
              <div className="mt-2 text-sm p-2 bg-yellow-50 border border-yellow-100 rounded text-yellow-700">
                Your salary is being processed and should arrive shortly.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
