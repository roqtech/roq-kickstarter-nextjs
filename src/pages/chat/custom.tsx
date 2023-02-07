import { ChatSidebar, ChatWindow, requireNextAuth } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import styles from "pages/chat/chat.module.css";

function ChatPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <section className={styles.customChat}>
        <ChatSidebar className={styles.sidebar} />
        <ChatWindow conversationId={router.query.cid as string} />
      </section>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
