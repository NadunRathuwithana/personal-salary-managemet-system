import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

interface LoadingStateProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  className?: string;
}

export function LoadingState({
  text,
  size = "md",
  fullPage = false,
  className,
}: LoadingStateProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullPage && "min-h-[50vh]",
        className
      )}
    >
      <AnimatedWrapper type="scale">
        <Loader2 className={cn("animate-spin text-primary", sizes[size])} />
        {text && (
          <p className="mt-4 text-sm text-muted-foreground text-center">{text}</p>
        )}
      </AnimatedWrapper>
    </div>
  );
} 