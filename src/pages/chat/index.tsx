import { Chat, withNextAuth } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";

function ChatPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Chat />
    </AppLayout>
  );
}

export default withNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
