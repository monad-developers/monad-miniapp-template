import { SafeAreaContainer } from "@/components/safe-area-container";
import { useMiniAppContext } from "@/hooks/use-miniapp-context";
import dynamic from "next/dynamic";

const Demo = dynamic(() => import("@/components/Home"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Home() {
  const { context } = useMiniAppContext();
  return (
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      <Demo />
    </SafeAreaContainer>
  );
}
