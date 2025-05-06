"use client";

import { useState } from "react";
import { WalletCard, WalletType } from "@/components/wallets/WalletCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function WalletDemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  // Demo data
  const walletData = {
    base: {
      type: "base" as WalletType,
      title: "Checking Account",
      balance: 4756.32,
      previousBalance: 4213.45,
      updatedAt: new Date(),
    },
    saving: {
      type: "saving" as WalletType,
      title: "Emergency Fund",
      balance: 12500.0,
      previousBalance: 10000.0,
      updatedAt: new Date(Date.now() - 3600000 * 24 * 5), // 5 days ago
    },
    fixed: {
      type: "fixed" as WalletType,
      title: "Retirement Account",
      balance: 25000.0,
      previousBalance: 23500.0,
      updatedAt: new Date(Date.now() - 3600000 * 24 * 30), // 30 days ago
    },
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Card Component Demo</CardTitle>
          <CardDescription>
            Showcase of the WalletCard component in various states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="loading-mode"
                checked={isLoading}
                onCheckedChange={toggleLoading}
              />
              <Label htmlFor="loading-mode">Show Loading State</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="balance-toggle"
                checked={showBalance}
                onCheckedChange={setShowBalance}
              />
              <Label htmlFor="balance-toggle">Show Balance</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold">Standard Cards</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard
          type="base"
          title={walletData.base.title}
          balance={showBalance ? walletData.base.balance : undefined}
          previousBalance={walletData.base.previousBalance}
          updatedAt={walletData.base.updatedAt}
          isLoading={isLoading}
        />
        <WalletCard
          type="saving"
          title={walletData.saving.title}
          balance={showBalance ? walletData.saving.balance : undefined}
          previousBalance={walletData.saving.previousBalance}
          updatedAt={walletData.saving.updatedAt}
          isLoading={isLoading}
        />
        <WalletCard
          type="fixed"
          title={walletData.fixed.title}
          balance={showBalance ? walletData.fixed.balance : undefined}
          previousBalance={walletData.fixed.previousBalance}
          updatedAt={walletData.fixed.updatedAt}
          isLoading={isLoading}
        />
      </div>

      <h2 className="text-xl font-bold">Default Titles</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard
          type="base"
          balance={showBalance ? walletData.base.balance : undefined}
          previousBalance={walletData.base.previousBalance}
          updatedAt={walletData.base.updatedAt}
          isLoading={isLoading}
        />
        <WalletCard
          type="saving"
          balance={showBalance ? walletData.saving.balance : undefined}
          previousBalance={walletData.saving.previousBalance}
          updatedAt={walletData.saving.updatedAt}
          isLoading={isLoading}
        />
        <WalletCard
          type="fixed"
          balance={showBalance ? walletData.fixed.balance : undefined}
          previousBalance={walletData.fixed.previousBalance}
          updatedAt={walletData.fixed.updatedAt}
          isLoading={isLoading}
        />
      </div>

      <h2 className="text-xl font-bold">Without Previous Balance</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard
          type="base"
          title={walletData.base.title}
          balance={showBalance ? walletData.base.balance : undefined}
          isLoading={isLoading}
        />
        <WalletCard
          type="saving"
          title={walletData.saving.title}
          balance={showBalance ? walletData.saving.balance : undefined}
          isLoading={isLoading}
        />
        <WalletCard
          type="fixed"
          title={walletData.fixed.title}
          balance={showBalance ? walletData.fixed.balance : undefined}
          isLoading={isLoading}
        />
      </div>

      <h2 className="text-xl font-bold">Empty States</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard type="base" />
        <WalletCard type="saving" />
        <WalletCard type="fixed" />
      </div>
    </div>
  );
}
