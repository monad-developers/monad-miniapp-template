import { useEffect, useState } from "react";
import { useFrame } from "@/components/farcaster-provider";
import { sendFrameNotification } from "@/lib/notifs";
import { getUserNotificationDetails } from "@/lib/kv";

export function NotificationActions() {
  const { context, actions } = useFrame();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [canSendNotification, setCanSendNotification] = useState(false);

  async function getNotificationDetails() {
    if (context && context.user?.fid) {
      const notificationDetails = await getUserNotificationDetails(
        context.user.fid
      );
      setCanSendNotification(Boolean(notificationDetails));
    }
  }

  useEffect(() => {
    getNotificationDetails();
  }, [context]);

  async function handleSendNotification() {
    if (!context?.user?.fid || !canSendNotification) return;
    setSending(true);
    setResult(null);
    try {
      const res = await sendFrameNotification({
        fid: context.user.fid,
        title: "Test Notification",
        body: "This is a test notification from the Monad MiniApp Template!",
      });
      if (res.state === "success") setResult("Notification sent!");
      else if (res.state === "rate_limit")
        setResult("Rate limited. Try again later.");
      else if (res.state === "no_token")
        setResult("No notification token found.");
      else setResult("Error sending notification.");
    } catch (e) {
      setResult("Error sending notification.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left mb-2">Notifications</h2>
      <div className="flex flex-col space-y-2">
        {canSendNotification ? (
          <button
            type="button"
            className="bg-white text-black rounded-md p-2 text-sm"
            onClick={handleSendNotification}
            disabled={sending || !canSendNotification}
          >
            {sending ? "Sending..." : "Send Test Notification"}
          </button>
        ) : (
          <button
            type="button"
            className="bg-white text-black rounded-md p-2 text-sm"
            onClick={() => actions?.addFrame()}
          >
            Add this Mini App to receive notifications
          </button>
        )}
        {!canSendNotification && (
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
