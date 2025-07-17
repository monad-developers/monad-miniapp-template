import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFrame } from "@/components/farcaster-provider";
import { MiniAppNotificationDetails } from "@farcaster/miniapp-core";

export function NotificationActions() {
  const { context, actions } = useFrame();
  const [result, setResult] = useState<string | null>(null);
  const [notificationDetails, setNotificationDetails] =
    useState<MiniAppNotificationDetails | null>(null);

  const fid = context?.user?.fid;

  useEffect(() => {
    if (context?.user?.fid) {
      setNotificationDetails(context?.client.notificationDetails ?? null);
    }
  }, [context]);

  const { mutate: sendNotification, isPending: isSendingNotification } =
    useMutation({
      mutationFn: async () => {
        if (!fid) throw new Error("No fid");

        return await fetch("/api/send-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fid,
            notificationDetails,
          }),
        });
      },
      onSuccess: (response) => {
        if (response.status === 200) setResult("Notification sent!");
        else if (response.status === 429)
          setResult("Rate limited. Try again later.");
        else setResult("Error sending notification.");
      },
      onError: () => {
        setResult("Error sending notification.");
      },
    });

  return (
    <div className="border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left mb-2">Notifications</h2>
      <div className="flex flex-col space-y-2">
        {notificationDetails ? (
          <button
            type="button"
            className="bg-white text-black rounded-md p-2 text-sm"
            onClick={() => sendNotification()}
            disabled={isSendingNotification || !notificationDetails}
          >
            {isSendingNotification ? "Sending..." : "Send Test Notification"}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="bg-white text-black rounded-md p-2 text-sm"
              onClick={() => actions?.addMiniApp()}
            >
              Add this Mini App to receive notifications
            </button>
            <p className="text-xs text-red-600">
              You must add this Mini App and enable notifications to send a test
              notification.
            </p>
          </>
        )}
        {result && <p className="mt-2 text-sm">{result}</p>}
      </div>
    </div>
  );
}
