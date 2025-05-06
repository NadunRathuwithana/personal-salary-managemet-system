"use client";

import { CurrencyCode } from "@/contexts/CurrencyContext";

// Currency settings for different currencies
const currencySettings: Record<
  CurrencyCode,
  { locale: string; symbol: string }
> = {
  USD: { locale: "en-US", symbol: "USD" },
  LKR: { locale: "si-LK", symbol: "LKR" },
  EUR: { locale: "de-DE", symbol: "EUR" },
};

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  currencyCode: CurrencyCode = "LKR"
): string {
  const { locale, symbol } = currencySettings[currencyCode];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: symbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Format a date to a short date string (without time)
 */
export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format a number as percentage
 */
export function formatPercentage(value: number, fractionDigits = 2): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/**
 * Format a large number with abbreviations (K, M, B)
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}
