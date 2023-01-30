import "styles/globals.css";
import type { AppProps } from "next/app";
import { RoqProvider, ChatProvider } from "@roq/ui-react";
import { clientConfig } from "config";
import "@roq/ui-react/dist/index.css";
import { roqThemeLight } from "styles/roq-theme";

export default function App({ Component, pageProps }: AppProps) {
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
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </RoqProvider>
  );
}
