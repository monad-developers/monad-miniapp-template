import type { Context } from '@farcaster/frame-sdk'
import type sdk from '@farcaster/frame-sdk'
import { useFrame } from '../components/farcaster-provider'

// Define specific types for each context
interface FarcasterContextResult {
  context: Context.FrameContext
  actions: typeof sdk.actions | null
  isEthProviderAvailable: boolean
}

interface NoContextResult {
  type: null
  context: null
  actions: null
  isEthProviderAvailable: boolean
}

// Union type of all possible results
type ContextResult = FarcasterContextResult | NoContextResult

export const useMiniAppContext = (): ContextResult => {
  // Try to get Farcaster context
  try {
    const farcasterContext = useFrame()
    if (farcasterContext.context) {
      return {
        context: farcasterContext.context,
        actions: farcasterContext.actions,
        isEthProviderAvailable: farcasterContext.isEthProviderAvailable,
      } as FarcasterContextResult
    }
  } catch (e) {
    // Ignore error if not in Farcaster context
  }

  // No context found
  return {
    context: null,
    actions: null,
  } as NoContextResult
}
