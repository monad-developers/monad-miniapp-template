import { useFrame } from '@/components/farcaster-provider'

export function User() {
  const { context } = useFrame()

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.context</h2>
      <div className="flex flex-row space-x-4 justify-start items-start">
        {context?.user ? (
          <>
            {context?.user?.pfpUrl && (
              <img
                src={context?.user?.pfpUrl}
                className="w-14 h-14 rounded-full"
                alt="User Profile"
                width={56}
                height={56}
              />
            )}
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-sm text-left">
                user.displayName:{' '}
                <span className="bg-white font-mono text-black rounded-md p-[4px]">
                  {context?.user?.displayName}
                </span>
              </p>
              <p className="text-sm text-left">
                user.username:{' '}
                <span className="bg-white font-mono text-black rounded-md p-[4px]">
                  {context?.user?.username}
                </span>
              </p>
              <p className="text-sm text-left">
                user.fid:{' '}
                <span className="bg-white font-mono text-black rounded-md p-[4px]">
                  {context?.user?.fid}
                </span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-left">User context not available</p>
        )}
      </div>
    </div>
  )
}
