import { signIn } from "@roq/ui-react";
import Image from "next/image";
import styles from "pages/login/login.module.css";
import AuthLayout from "layout/auth/auth.layout";
import { withAuth } from "components/hocs/auth/with-auth";

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
        <button className="btn btn-block" onClick={signIn}>
          Login
        </button>
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

export default withAuth({ redirectIfAuthenticated: true, redirectTo: "/" })(
  LoginPage
);
