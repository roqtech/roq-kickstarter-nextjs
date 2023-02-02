import Head from "next/head";
import styles from "layout/auth/auth.layout.module.css";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Head>
        <title>Sign in to ROQ Next.js Kickstarter</title>
        <meta name="description" content="ROQ Kickstarter with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>{children}</div>
    </>
  );
}
