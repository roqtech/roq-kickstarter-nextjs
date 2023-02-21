import { useCallback, useEffect } from 'react'
import { ChatSidebar, ChatWindow, requireNextAuth } from "@roq/nextjs";
import { useRouter } from "next/router";
import AppLayout from "layout/app/app.layout";
import { routes } from "routes";
import styles from "pages/chat/chat.module.css";

function ChatPage() {
  const router = useRouter();

  const navigateToConversationRoute = useCallback((cid: string | null) => {
    if (!cid) {
      return;
    }

    if (router.query.cid === cid) {
      return;
    }

    router.push(`/chat/custom?cid=${cid}`, `/chat/custom?cid=${cid}`, { shallow: true })
  }, [router])

  const generateConversationLink = useCallback(({ id }: { id: string }) => `/chat/${id}`, [])

  return (
    <AppLayout>
      <section className={styles.customChat}>
        <ChatSidebar
          onCurrentConversationIdChanged={navigateToConversationRoute} generateConversationLink={generateConversationLink}
          className={styles.sidebar}
        />
        <ChatWindow conversationId={router.query.cid as string} flushOnUnmount={false} />
      </section>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ChatPage);
