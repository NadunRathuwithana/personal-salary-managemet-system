"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletCardGroup } from "@/components/wallets/WalletCardGroup";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WalletType } from "@/components/wallets/WalletCard";

// Sample wallet data
const sampleWallets = [
  {
    type: "base" as WalletType,
    title: "Checking Account",
    balance: 4756.32,
    previousBalance: 4213.45,
    updatedAt: new Date("2023-04-28T14:30:00"),
  },
  {
    type: "saving" as WalletType,
    title: "Emergency Fund",
    balance: 12500.0,
    previousBalance: 10000.0,
    updatedAt: new Date("2023-04-15T09:15:00"),
  },
  // Fixed deposit wallet intentionally omitted to demonstrate empty state
];

export default function WalletsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [wallets, setWallets] = useState<typeof sampleWallets>([]);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setWallets(sampleWallets);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wallets</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Wallet
        </Button>
      </div>

      {/* Wallet Cards */}
      <WalletCardGroup wallets={wallets} isLoading={isLoading} />

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Wallet Activity</CardTitle>
          <CardDescription>View recent transactions across all wallets</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading transactions...</p>
          ) : (
            <p>Transaction history will be displayed here</p>
          )}
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Management</CardTitle>
          <CardDescription>Configure your wallet settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Wallet management options will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
}
