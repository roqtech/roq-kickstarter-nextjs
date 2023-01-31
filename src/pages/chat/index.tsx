import { useEffect } from "react";
import { useSession, Chat } from "@roq/ui-react";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { withAuth } from "components/hocs/auth/with-auth";
import { routes } from "routes";

function ChatPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Chat />
    </AppLayout>
  );
}

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
