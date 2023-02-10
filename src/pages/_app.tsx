import "styles/globals.css";
import type { AppProps } from "next/app";
import { RoqProvider, ChatProvider, useSession, withAuth } from "@roq/nextjs";
import { clientConfig } from "config";
import "@roq/nextjs/index.css";
import { roqThemeLight } from "styles/roq-theme";
import { appWithTranslation } from "next-i18next";
import LocaleContext from "components/locale-context/locale-context";

function App({ Component, pageProps }: AppProps) {
  /*
    The ROQ provider sets the context for inner ROQ components to consume variables such as the session
  */
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
        <LocaleContext />
        <Component {...pageProps} />
      </ChatProvider>
    </RoqProvider>
  );
}

export default appWithTranslation(App);
