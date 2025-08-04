import { useFrame } from '@/components/farcaster-provider'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export function Haptics() {
  const { haptics } = useFrame()
  const [result, setResult] = useState<string | null>(null)

  const { mutate: triggerHaptic, isPending } = useMutation({
    mutationFn: async (hapticType: string) => {
      if (!haptics) throw new Error('Haptics not available')

      switch (hapticType) {
        case 'impact-light':
          return await haptics.impactOccurred('light')
        case 'impact-medium':
          return await haptics.impactOccurred('medium')
        case 'impact-heavy':
          return await haptics.impactOccurred('heavy')
        case 'impact-soft':
          return await haptics.impactOccurred('soft')
        case 'impact-rigid':
          return await haptics.impactOccurred('rigid')
        case 'notification-success':
          return await haptics.notificationOccurred('success')
        case 'notification-warning':
          return await haptics.notificationOccurred('warning')
        case 'notification-error':
          return await haptics.notificationOccurred('error')
        case 'selection':
          return await haptics.selectionChanged()
        default:
          throw new Error('Invalid haptic type')
      }
    },
    onSuccess: (_, hapticType) => {
      setResult(`${hapticType} triggered successfully!`)
      // Clear result after 2 seconds
      setTimeout(() => setResult(null), 2000)
    },
    onError: (error) => {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      // Clear result after 3 seconds
      setTimeout(() => setResult(null), 3000)
    },
  })

  const hapticButtons = [
    { type: 'impact-light', label: 'Light Impact', category: 'Impact' },
    { type: 'impact-medium', label: 'Medium Impact', category: 'Impact' },
    { type: 'impact-heavy', label: 'Heavy Impact', category: 'Impact' },
    { type: 'impact-soft', label: 'Soft Impact', category: 'Impact' },
    { type: 'impact-rigid', label: 'Rigid Impact', category: 'Impact' },
    { type: 'notification-success', label: 'Success Notification', category: 'Notification' },
    { type: 'notification-warning', label: 'Warning Notification', category: 'Notification' },
    { type: 'notification-error', label: 'Error Notification', category: 'Notification' },
    { type: 'selection', label: 'Selection Changed', category: 'Selection' },
  ]

  const groupedButtons = hapticButtons.reduce((acc, button) => {
    if (!acc[button.category]) {
      acc[button.category] = []
    }
    acc[button.category].push(button)
    return acc
  }, {} as Record<string, typeof hapticButtons>)

  return (
    <div className="border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left mb-4">Haptics</h2>
      <div className="space-y-6">
        {haptics ? (
          Object.entries(groupedButtons).map(([category, buttons]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {buttons.map((button) => (
                  <button
                    key={button.type}
                    type="button"
                    className="bg-white text-black rounded-md p-2 text-sm hover:bg-gray-100 transition-colors"
                    onClick={() => triggerHaptic(button.type)}
                    disabled={isPending}
                  >
                    {isPending ? 'Triggering...' : button.label}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">
            Haptics not available on this device
          </p>
        )}
        {result && (
          <p className="mt-4 text-sm p-2 bg-gray-800 rounded">
            {result}
          </p>
        )}
      </div>
    </div>
  )
} 