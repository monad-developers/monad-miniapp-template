import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFrame } from "@/components/farcaster-provider";
import { sendFrameNotification } from "@/lib/notifs";
import { getUserNotificationDetails } from "@/lib/kv";

export function NotificationActions() {
  const { context, actions } = useFrame();
  const [result, setResult] = useState<string | null>(null);

  const fid = context?.user?.fid;
  const {
    data: notificationDetails,
    isLoading: notificationLoading,
  } = useQuery({
    queryKey: ["notification-details", fid],
    queryFn: async () => {
      if (!fid) return null;
      return await getUserNotificationDetails(fid);
    },
    enabled: !!fid,
  });

  const { mutate: sendNotification, isPending: isSendingNotification } = useMutation({
    mutationFn: async () => {
      if (!fid) throw new Error("No fid");
      return await sendFrameNotification({
        fid,
        title: "Test Notification",
        body: "This is a test notification from the Monad MiniApp Template!",
      });
    },
    onSuccess: (res) => {
      if (res.state === "success") setResult("Notification sent!");
      else if (res.state === "rate_limit") setResult("Rate limited. Try again later.");
      else if (res.state === "no_token") setResult("No notification token found.");
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
          <button
            type="button"
            className="bg-white text-black rounded-md p-2 text-sm"
            onClick={() => actions?.addMiniApp()}
            disabled={notificationLoading}
          >
            {notificationLoading ? "Checking..." : "Add this Mini App to receive notifications"}
          </button>
        )}
        {!notificationDetails && !notificationLoading && (
          <p className="text-xs text-red-600">
            You must add this Mini App and enable notifications to send a test
            notification.
          </p>
        )}
        {result && <p className="mt-2 text-sm">{result}</p>}
      </div>
    </div>
  );
}
