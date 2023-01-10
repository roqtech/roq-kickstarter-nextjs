import "styles/globals.css";
import type { AppProps } from "next/app";
import { RoqProvider, ChatProvider } from "@roq/ui-react";
import { clientConfig } from "config";
import { Session } from "next-auth";
import { SessionContext, SessionProvider } from "next-auth/react";
import "@roq/ui-react/dist/index.css";
import { roqThemeLight } from "styles/roq-theme";

interface UserSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roqAccessToken?: string | null;
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SessionContext.Consumer>
        {({ data }: { data: UserSession }) => (
          <RoqProvider
            config={{
              host: clientConfig.roq.platformUrl,
              token: data?.user?.roqAccessToken,
              socket: true,
            }}
            theme={roqThemeLight}
          >
            <ChatProvider>
              <Component {...pageProps} />
            </ChatProvider>
          </RoqProvider>
        )}
      </SessionContext.Consumer>
    </SessionProvider>
  );
}
