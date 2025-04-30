"use client";

import { FrameContext } from "@farcaster/frame-core/dist/context";
import sdk from "@farcaster/frame-sdk";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import FrameWalletProvider from "./frame-wallet-provider";

interface FrameContextValue {
  context: FrameContext | null;
  isSDKLoaded: boolean;
  isEthProviderAvailable: boolean;
  error: string | null;
  actions: typeof sdk.actions | null;
}

const FrameProviderContext = createContext<FrameContextValue | undefined>(
  undefined
);

export function useFrame() {
  const context = useContext(FrameProviderContext);
  if (context === undefined) {
    throw new Error("useFrame must be used within a FrameProvider");
  }
  return context;
}

interface FrameProviderProps {
  children: ReactNode;
}

export function FrameProvider({ children }: FrameProviderProps) {
  const [context, setContext] = useState<FrameContext | null>(null);
  const [actions, setActions] = useState<typeof sdk.actions | null>(null);
  const [isEthProviderAvailable, setIsEthProviderAvailable] =
    useState<boolean>(false);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const context = await sdk.context;
        if (context) {
          setContext(context as FrameContext);
          setActions(sdk.actions);
          setIsEthProviderAvailable(sdk.wallet.ethProvider ? true : false);
        } else {
          setError("Failed to load Farcaster context");
        }
        await sdk.actions.ready();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to initialize SDK"
        );
        console.error("SDK initialization error:", err);
      }
    };

    if (sdk && !isSDKLoaded) {
      load().then(() => {
        setIsSDKLoaded(true);
        console.log("SDK loaded");
      });
    }
  }, [isSDKLoaded]);

  return (
    <FrameProviderContext.Provider
      value={{
        context,
        actions,
        isSDKLoaded,
        isEthProviderAvailable,
        error,
      }}
    >
      <FrameWalletProvider>{children}</FrameWalletProvider>
    </FrameProviderContext.Provider>
  );
}
