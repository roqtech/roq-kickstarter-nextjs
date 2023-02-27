import styles from "layout/app/app.layout.module.css";
import AppLayout from "layout/app/app.layout";
import { requireNextAuth, UserProfileAvatar } from "@roq/nextjs";
import { routes } from "routes";

function ProfilePage() {
  return (
    <AppLayout>
      <UserProfileAvatar open withAvatar={false} className={styles.userProfile} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ProfilePage);
