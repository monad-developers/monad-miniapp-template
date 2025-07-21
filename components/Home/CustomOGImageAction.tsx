import { useFrame } from "@/components/farcaster-provider";
import { APP_URL } from "@/lib/constants";

export default function CustomOGImageAction() {
  const { context, actions } = useFrame();

  const fid = context?.user?.fid;
  const username = context?.user?.username;
  const pfpUrl = context?.user?.pfpUrl;

  const handleGenerateCustomOGImage = () => {
    const ogImageUrl = `${APP_URL}/api/og?username=${username}&image=${pfpUrl}`;
    actions?.composeCast({
      text: "I generated a custom OG image using Monad Mini App template",
      embeds: [ogImageUrl],
    });
  };

  return (
    <div className="border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left mb-2">
        Generate Custom Image
      </h2>
      <div className="flex flex-col space-y-2">
        {fid ? (
          <button
            type="button"
            className="bg-white text-black rounded-md p-2 text-sm"
            onClick={() => handleGenerateCustomOGImage()}
            disabled={!fid}
          >
            Generate Custom Image
          </button>
        ) : (
          <p className="text-xs text-red-600">
            Please login to generate a custom image
          </p>
        )}
      </div>
    </div>
  );
}
