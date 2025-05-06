"use client";

import { WalletCard, WalletType } from "@/components/wallets/WalletCard";

interface WalletCardGroupProps {
  wallets?: {
    type: WalletType;
    title?: string;
    balance?: number;
    previousBalance?: number;
    updatedAt?: Date;
  }[];
  isLoading?: boolean;
}

export function WalletCardGroup({
  wallets,
  isLoading = false,
}: WalletCardGroupProps) {
  // If loading, show skeleton cards for all wallet types
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard type="base" isLoading={true} />
        <WalletCard type="saving" isLoading={true} />
        <WalletCard type="fixed" isLoading={true} />
      </div>
    );
  }

  // If no wallets data provided, show empty state cards
  if (!wallets || wallets.length === 0) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <WalletCard type="base" />
        <WalletCard type="saving" />
        <WalletCard type="fixed" />
      </div>
    );
  }

  // Find wallets of each type or default to undefined
  const baseWallet = wallets.find((wallet) => wallet.type === "base");
  const savingWallet = wallets.find((wallet) => wallet.type === "saving");
  const fixedWallet = wallets.find((wallet) => wallet.type === "fixed");

  // Ensure we render all three types, whether they exist in the data or not
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <WalletCard
        type="base"
        title={baseWallet?.title}
        balance={baseWallet?.balance}
        previousBalance={baseWallet?.previousBalance}
        updatedAt={baseWallet?.updatedAt}
      />
      <WalletCard
        type="saving"
        title={savingWallet?.title}
        balance={savingWallet?.balance}
        previousBalance={savingWallet?.previousBalance}
        updatedAt={savingWallet?.updatedAt}
      />
      <WalletCard
        type="fixed"
        title={fixedWallet?.title}
        balance={fixedWallet?.balance}
        previousBalance={fixedWallet?.previousBalance}
        updatedAt={fixedWallet?.updatedAt}
      />
    </div>
  );
}
