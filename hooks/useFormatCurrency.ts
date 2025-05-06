"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { formatCurrency as formatCurrencyUtil } from "@/lib/formatters";

/**
 * A hook that provides a currency formatter that automatically
 * uses the current currency from context
 */
export function useFormatCurrency() {
  const { currency } = useCurrency();

  return (value: number) => formatCurrencyUtil(value, currency);
}
