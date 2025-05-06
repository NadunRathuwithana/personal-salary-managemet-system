"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency, CurrencyCode } from "@/contexts/CurrencyContext";
import { ChevronDown } from "lucide-react";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const currencies: { code: CurrencyCode; label: string }[] = [
    { code: "USD", label: "USD" },
    { code: "LKR", label: "LKR" },
    { code: "EUR", label: "EUR" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 gap-0.5 text-xs"
        >
          <span>{currency}</span>
          <ChevronDown className="h-3 w-3 ml-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-1.5 min-w-[8rem]">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className={`text-xs px-2 py-1.5 rounded-md ${
              currency === curr.code ? "bg-accent" : ""
            }`}
          >
            <span>{curr.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
