import styles from "layout/app/app.layout.module.css";
import AppLayout from "layout/app/app.layout";
import { getServerSession, requireNextAuth, UserProfile } from "@roq/nextjs";
import { routes } from "routes";
import { NextApiRequest } from "next";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const session = getServerSession(req);
  console.log(session)
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  }
}

function ProfilePage() {
  return (
    <AppLayout>
      <UserProfile className={styles.userProfile} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ProfilePage);
