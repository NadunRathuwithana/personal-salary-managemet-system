import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedWrapper } from "@/components/ui/animated-wrapper";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionFn?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionFn,
  className,
}: EmptyStateProps) {
  return (
    <AnimatedWrapper
      type="fadeIn"
      className={cn(
        "flex flex-col items-center justify-center py-8 text-center text-muted-foreground",
        className
      )}
    >
      {Icon && (
        <div className="mb-3 rounded-full bg-primary/10 p-3">
          <Icon className="h-8 w-8 text-primary/60" />
        </div>
      )}
      <p className="mb-1 font-medium">{title}</p>
      {description && <p className="text-sm max-w-md">{description}</p>}
      {actionLabel && actionFn && (
        <Button variant="outline" size="sm" onClick={actionFn} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </AnimatedWrapper>
  );
}
