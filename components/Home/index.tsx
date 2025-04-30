"use client";

import { FarcasterActions } from "@/components/Home/FarcasterActions";
import { User } from "@/components/Home/User";
import { WalletActions } from "@/components/Home/WalletActions";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Monad Farcaster MiniApp Template
      </h1>
      <div className="w-full max-w-4xl space-y-6">
        <User />
        <FarcasterActions />
        <WalletActions />
      </div>
    </div>
  );
}
