import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    // TODO: Add your own account association
    accountAssociation: {
      header:
        "eyJmaWQiOjE3OTc5LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4N2Y3NDhmMTU0QjZEMTgwRDM1ZkExMjQ2MEM3RTRDNjMxZTI4QTlkNyJ9",
      payload:
        "eyJkb21haW4iOiJtb25hZC1taW5pYXBwLXRlbXBsYXRlLWVudi1zdGFnaW5nLW1vbmFkLXh5ei52ZXJjZWwuYXBwIn0",
      signature:
        "qWVx3t0XwZH3ljS4wXJH8pxPKDE4har3wy5r9xzKXA5oahOUeSlCxLNHEQDc5/PVi2QOOKxldihRUrowzHypwhs=",
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
