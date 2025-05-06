import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

interface ErrorStateProps {
  title?: string;
  description: string;
  actionLabel?: string;
  actionFn?: () => void;
}

export function ErrorState({
  title = "Error",
  description,
  actionLabel = "Try Again",
  actionFn = () => window.location.reload(),
}: ErrorStateProps) {
  return (
    <AnimatedWrapper type="fadeIn">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
      {actionFn && (
        <Button className="w-full" variant="outline" onClick={actionFn}>
          {actionLabel}
        </Button>
      )}
    </AnimatedWrapper>
  );
}
