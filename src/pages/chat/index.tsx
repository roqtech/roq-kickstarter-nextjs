import { useEffect } from "react";
import { useSession } from "@roq/ui-react";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { Chat } from "@roq/ui-react";

export default function ChatPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session]);

  return (
    <AppLayout>
      <Chat />
    </AppLayout>
  );
}
