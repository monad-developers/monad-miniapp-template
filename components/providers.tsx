'use client'

import { FrameProvider } from '@/components/farcaster-provider'
import { WalletProvider } from '@/components/wallet-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <FrameProvider>{children}</FrameProvider>
    </WalletProvider>
  )
}
