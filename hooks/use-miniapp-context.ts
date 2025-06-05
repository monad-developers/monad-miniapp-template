import type sdk from '@farcaster/frame-sdk'
import type { Context } from '@farcaster/frame-sdk'
import { useFrame } from '../components/farcaster-provider'

interface MiniAppContext {
  context: Context.FrameContext | undefined
  actions: typeof sdk.actions | undefined
  isEthProviderAvailable: boolean
}

export const useMiniAppContext = (): MiniAppContext => {
  const farcasterContext = useFrame()
  if (farcasterContext.context) {
    return {
      context: farcasterContext.context,
      actions: farcasterContext.actions,
      isEthProviderAvailable: farcasterContext.isEthProviderAvailable,
    }
  }

  return {
    context: undefined,
    actions: undefined,
    isEthProviderAvailable: false,
  }
}
