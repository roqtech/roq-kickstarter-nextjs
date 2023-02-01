import Head from "next/head";
import styles from "layout/app/app.layout.module.css";
import Image from "next/image";
import { NotificationBell, ChatMessageBell, signOut } from "@roq/ui-react";
import { useRouter } from "next/router";
import { routes } from "routes";

import Link from "next/link";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ROQ Next.js Prisma SaaS Template</title>
        <meta
          name="description"
          content="ROQ starter kit with Next.js, Prisma, and PSQL"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href={"/"}>
            <Image
              className={styles.logo}
              src="/roq.svg"
              alt="ROQ Logo"
              width={90}
              height={80}
              priority
            />
          </Link>
          <div className={styles.bellContainer}>
            {/* <Link href={routes.frontend.invites}>Invite users</Link> */}
            <NotificationBell />
            <ChatMessageBell onClick={() => router.push("/chat")} />
            <div className={styles.logout}>
              <button onClick={() => signOut()} className="btn btn-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
}
