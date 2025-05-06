"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "USD" | "LKR" | "EUR";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencySymbol: string;
}

const currencySymbols: Record<CurrencyCode, string> = {
  USD: "$",
  LKR: "Rs.",
  EUR: "€",
};

const defaultCurrency: CurrencyCode = "LKR";

const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  setCurrency: () => {},
  currencySymbol: currencySymbols[defaultCurrency],
});

export const useCurrency = () => useContext(CurrencyContext);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(defaultCurrency);

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem(
      "preferredCurrency"
    ) as CurrencyCode | null;
    if (savedCurrency && Object.keys(currencySymbols).includes(savedCurrency)) {
      setCurrency(savedCurrency);
    }
  }, []);

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredCurrency", currency);
  }, [currency]);

  const value = {
    currency,
    setCurrency,
    currencySymbol: currencySymbols[currency],
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
