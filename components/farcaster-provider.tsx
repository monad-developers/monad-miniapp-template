import type { Context } from '@farcaster/miniapp-sdk'
import sdk from '@farcaster/miniapp-sdk'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode, createContext, useContext } from 'react'

interface FrameContextValue {
  context: Context.MiniAppContext | undefined
  isLoading: boolean
  isSDKLoaded: boolean
  isEthProviderAvailable: boolean
  actions: typeof sdk.actions | undefined
}

const FrameProviderContext = createContext<FrameContextValue | undefined>(
  undefined,
)

export function useFrame() {
  const context = useContext(FrameProviderContext)
  if (context === undefined) {
    throw new Error('useFrame must be used within a FrameProvider')
  }
  return context
}

interface FrameProviderProps {
  children: ReactNode
}

export function FrameProvider({ children }: FrameProviderProps) {
  const farcasterContextQuery = useQuery({
    queryKey: ['farcaster-context'],
    queryFn: async () => {
      const context = await sdk.context
      try {
        await sdk.actions.ready()
        return { context, isReady: true }
      } catch (err) {
        console.error('SDK initialization error:', err)
      }
      return { context, isReady: false }
    },
  })

  const isReady = farcasterContextQuery.data?.isReady ?? false

  return (
    <FrameProviderContext.Provider
      value={{
        context: farcasterContextQuery.data?.context,
        actions: sdk.actions,
        isLoading: farcasterContextQuery.isPending,
        isSDKLoaded: isReady && Boolean(farcasterContextQuery.data?.context),
        isEthProviderAvailable: Boolean(sdk.wallet.ethProvider),
      }}
    >
      {children}
    </FrameProviderContext.Provider>
  )
}
