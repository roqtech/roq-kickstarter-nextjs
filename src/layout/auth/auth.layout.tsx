import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "layout/auth/auth.layout.module.css";

const inter = Inter({ subsets: ["latin"] });

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Head>
        <title>ROQ Next.js Prisma</title>
        <meta
          name="description"
          content="ROQ starter kit with Next.js, Prisma, and PSQL"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>{children}</div>
    </>
  );
}
