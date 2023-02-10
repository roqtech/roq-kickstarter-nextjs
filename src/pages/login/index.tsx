import { signIn, signUp } from "@roq/nextjs";
import Image from "next/image";
import styles from "pages/login/login.module.css";
import AuthLayout from "layout/auth/auth.layout";
import { withAuth } from "components/hocs/auth/with-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LoginPage = function () {
  return (
    <AuthLayout>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/roq.svg"
          alt="ROQ Logo"
          width={300}
          height={200}
          priority
        />
        <button className="btn btn-block" onClick={signUp}>
          Register
        </button>
        <div onClick={signIn}>
          <a href="#">Login</a>
        </div>
      </div>

      <a
        href="https://docs.roq.tech"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>Docs</h2>
        <div>https://docs.roq.tech</div>
      </a>
    </AuthLayout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default withAuth({ redirectIfAuthenticated: true, redirectTo: "/" })(
  LoginPage
);
