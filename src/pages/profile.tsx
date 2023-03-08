import styles from "layout/app/app.layout.module.css";
import AppLayout from "layout/app/app.layout";
import { requireNextAuth, UserProfile } from "@roq/nextjs";
import { routes } from "routes";

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
