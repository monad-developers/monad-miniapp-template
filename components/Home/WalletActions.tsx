import { useFrame } from '@/components/farcaster-provider'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { parseEther } from 'viem'
import { monadTestnet } from 'viem/chains'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from 'wagmi'

export function WalletActions() {
  const { isEthProviderAvailable } = useFrame()
  const { isConnected, address, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: hash, sendTransaction } = useSendTransaction()
  const { switchChain } = useSwitchChain()
  const { connect } = useConnect()

  async function sendTransactionHandler() {
    sendTransaction({
      to: '0x7f748f154B6D180D35fA12460C7E4C631e28A9d7',
      value: parseEther('1'),
    })
  }

  if (isConnected) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
        <div className="flex flex-row space-x-4 justify-start items-start">
          <div className="flex flex-col space-y-4 justify-start">
            <p className="text-sm text-left">
              Connected to wallet:{' '}
              <span className="bg-white font-mono text-black rounded-md p-[4px]">
                {address}
              </span>
            </p>
            <p className="text-sm text-left">
              Chain Id:{' '}
              <span className="bg-white font-mono text-black rounded-md p-[4px]">
                {chainId}
              </span>
            </p>
            {chainId === monadTestnet.id ? (
              <div className="flex flex-col space-y-2 border border-[#333] p-4 rounded-md">
                <h2 className="text-lg font-semibold text-left">
                  Send Transaction Example
                </h2>
                <button
                  type="button"
                  className="bg-white text-black rounded-md p-2 text-sm"
                  onClick={sendTransactionHandler}
                >
                  Send Transaction
                </button>
                {hash && (
                  <button
                    type="button"
                    className="bg-white text-black rounded-md p-2 text-sm"
                    onClick={() =>
                      window.open(
                        `https://testnet.monadexplorer.com/tx/${hash}`,
                        '_blank',
                      )
                    }
                  >
                    View Transaction
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="bg-white text-black rounded-md p-2 text-sm"
                onClick={() => switchChain({ chainId: monadTestnet.id })}
              >
                Switch to Monad Testnet
              </button>
            )}

            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isEthProviderAvailable) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
        <div className="flex flex-row space-x-4 justify-start items-start">
          <button
            type="button"
            className="bg-white text-black w-full rounded-md p-2 text-sm"
            onClick={() => connect({ connector: miniAppConnector() })}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
      <div className="flex flex-row space-x-4 justify-start items-start">
        <p className="text-sm text-left">Wallet connection only via Warpcast</p>
      </div>
    </div>
  )
}
