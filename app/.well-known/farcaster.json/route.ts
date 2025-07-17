import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add your own account association
    accountAssociation: {
      header:
        "eyJmaWQiOjE3OTc5LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4MGMxNWE5QkVmRTg3RjY0N0IwMDNhMjI0MTY4NDYwMzYyODQ0M2Y4YiJ9",
      payload:
        "eyJkb21haW4iOiJtb25hZC1taW5pYXBwLXRlbXBsYXRlLWVudi1zdGFnaW5nLW1vbmFkLXh5ei52ZXJjZWwuYXBwIn0",
      signature:
        "MHgwNDI1N2ZiNjE4NjkwYjBkNDc3YzhiOGVjMzRlZTc2NWJmM2NhZjQzNzMxYWFhNDkzZGM3MmEyMjYxM2FkNDY1NDgyODg0MjRkM2E3Yjc4YTE2MzViNTM0NmQxZTA2YmZiZDUzOTZkYmRkNWY5MTc0OGExZDcxYTlhNTdjMjkwNDFi",
    },
    frame: {
      version: "1",
      name: "Monad Farcaster MiniApp Template",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "template"],
      primaryCategory: "developer-tools",
      buttonTitle: "Launch Template",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
