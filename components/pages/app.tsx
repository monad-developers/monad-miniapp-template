'use client'

import { Demo } from '@/components/Home'
import { SafeAreaContainer } from '@/components/safe-area-container'
import { useMiniAppContext } from '@/hooks/use-miniapp-context'

export default function Home() {
  const { context } = useMiniAppContext()
  return (
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      <Demo />
    </SafeAreaContainer>
  )
}
