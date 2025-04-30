import { useMiniAppContext } from "@/hooks/use-miniapp-context";
import { APP_URL } from "@/lib/constants";

export function FarcasterActions() {
  const { actions } = useMiniAppContext();

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.actions</h2>
      <div className="flex flex-row space-x-4 justify-start items-start">
        {actions ? (
          <div className="flex flex-col space-y-4 justify-start">
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.addFrame()}
            >
              addFrame
            </button>
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.close()}
            >
              close
            </button>
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() =>
                actions?.composeCast({
                  text: "Check out this Monad Farcaster MiniApp Template!",
                  embeds: [`${APP_URL}`],
                })
              }
            >
              composeCast
            </button>
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.openUrl("https://docs.monad.xyz")}
            >
              openUrl
            </button>
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.signIn({ nonce: "1201" })}
            >
              signIn
            </button>
            <button
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.viewProfile({ fid: 17979 })}
            >
              viewProfile
            </button>
          </div>
        ) : (
          <p className="text-sm text-left">Actions not available</p>
        )}
      </div>
    </div>
  );
}
