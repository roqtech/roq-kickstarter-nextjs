/*
  This component showcases the NotificationBell, and ChatMessageBell from ROQ 
*/

import Head from "next/head";
import styles from "layout/app/app.layout.module.css";
import Image from "next/image";
import { NotificationBell, ChatMessageBell, signOut, useSession } from "@roq/nextjs";
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
        <title>ROQ Next.js Kickstarter</title>
        <meta name="description" content="ROQ Kickstarter with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Link href={"/"} role="presentation" className={styles.brand}>
            <Image
              src="/brand.svg"
              alt="ROQ Logo"
              width={80}
              height={40}
              priority
            />
          </Link>
          <nav className={styles.globalNavigation}>
            <ul className={styles.globalNavigationList}>
              <li className="strong"><Link href={routes.frontend.invites}>Invites</Link></li>
              {/* ROQ Notification and Chat bell */}
              <li><NotificationBell /></li>
              <li><ChatMessageBell onClick={() => router.push('/chat')} /></li>
              <li><button className="btn btn-sm" onClick={signOut}>Logout</button></li>
            </ul>
          </nav>
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  );
}
