"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RadialProgressProps {
  value: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  thickness?: number;
  label?: React.ReactNode;
  className?: string;
}

const sizeMap = {
  sm: {
    size: 60,
    fontSize: "text-xs",
    fontWeight: "font-medium",
  },
  md: {
    size: 90,
    fontSize: "text-sm",
    fontWeight: "font-medium",
  },
  lg: {
    size: 120,
    fontSize: "text-base",
    fontWeight: "font-bold",
  },
};

export function RadialProgress({
  value,
  size = "md",
  color = "stroke-primary",
  thickness = 6,
  label,
  className,
}: RadialProgressProps) {
  const dimensions = sizeMap[size];
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = dimensions.size / 2 - thickness / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - normalizedValue / 100);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{
        width: dimensions.size,
        height: dimensions.size,
      }}
    >
      <svg
        className="absolute inset-0 transform -rotate-90"
        width={dimensions.size}
        height={dimensions.size}
        viewBox={`0 0 ${dimensions.size} ${dimensions.size}`}
      >
        <circle
          className="text-muted-foreground/20"
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={thickness}
          stroke="currentColor"
        />
        <circle
          className={color}
          cx={dimensions.size / 2}
          cy={dimensions.size / 2}
          r={radius}
          fill="transparent"
          strokeWidth={thickness}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      {label && (
        <div
          className={cn(
            "absolute flex flex-col items-center justify-center",
            dimensions.fontSize,
            dimensions.fontWeight
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

interface StackedRadialProps {
  segments: Array<{
    value: number;
    color: string;
    name?: string;
  }>;
  size?: number;
  thickness?: number;
  gap?: number;
  className?: string;
  centerContent?: React.ReactNode;
}

export function StackedRadial({
  segments,
  size = 160,
  thickness = 8,
  gap = 2,
  className,
  centerContent,
}: StackedRadialProps) {
  // Calculate total to normalize segment values
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size / 2 + 10 }}
    >
      {segments.map((segment, index) => {
        const segmentThickness = thickness;
        const offset = index * (segmentThickness + gap);
        const radius = size / 2 - (offset + segmentThickness / 2);
        const circumference = Math.PI * radius; // Half circle
        const normalizedValue = (segment.value / total) * 100;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference * (1 - normalizedValue / 100);

        return (
          <svg
            key={index}
            className="absolute bottom-0 transform -rotate-180"
            width={size}
            height={size / 2 + 10}
            viewBox={`0 0 ${size} ${size / 2 + 10}`}
          >
            <circle
              className="text-muted-foreground/10"
              cx={size / 2}
              cy={size / 2 + 10}
              r={radius}
              fill="transparent"
              strokeWidth={segmentThickness}
              stroke="currentColor"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference}
              style={{
                transformOrigin: "center",
                transform: "rotate(180deg)",
                strokeLinecap: "round",
              }}
            />
            <circle
              style={{
                stroke: segment.color,
                transition: "stroke-dashoffset 0.5s ease",
                transformOrigin: "center",
                transform: "rotate(180deg)",
                strokeLinecap: "round",
              }}
              cx={size / 2}
              cy={size / 2 + 10}
              r={radius}
              fill="transparent"
              strokeWidth={segmentThickness}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        );
      })}

      {centerContent && (
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{ bottom: "5px" }}
        >
          {centerContent}
        </div>
      )}
    </div>
  );
}
