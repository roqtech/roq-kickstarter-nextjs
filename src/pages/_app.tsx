import "styles/globals.css";
import type { AppProps } from "next/app";
import { RoqProvider, ChatProvider } from "@roq/nextjs";
import { clientConfig } from "config";
import "@roq/nextjs/index.css";
import { roqThemeLight } from "styles/roq-theme";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  /*
    The ROQ provider sets the context for inner ROQ components to consume variables such as the session
  */

  const router = useRouter();

  const navigateToConversationRoute = useCallback((cid: string) => {
    if (router.query.cid === cid) {
      return;
    }

    router.push(`/chat/custom?cid=${cid}`, `/chat/custom?cid=${cid}`, { shallow: true })
  }, [router])

  const generateConversationLink = useCallback(({ id }: { id: string }) => `/chat/${id}`, [])

  const customChatConfig = useMemo(() => ({
    onConversationChanged: navigateToConversationRoute,
    generateConversationLink
  }), [navigateToConversationRoute, generateConversationLink]);


  const chatConfig = useMemo(() => router.route === "/chat/custom" ? customChatConfig : {}, [router.route, customChatConfig]);

  return (
    <RoqProvider
      config={{
        host: clientConfig.roq.platformURL,
        auth: {
          useRoqAuth: true,
        },
      }}
      theme={roqThemeLight}
    >
      <ChatProvider {...chatConfig}>
        <Component {...pageProps} />
      </ChatProvider>
    </RoqProvider>
  );
}
