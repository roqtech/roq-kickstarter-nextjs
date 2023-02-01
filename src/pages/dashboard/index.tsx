import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import { withAuth } from "components/hocs/auth/with-auth";
import styles from "pages/dashboard/dashboard.module.css";

function DashboardPage() {
  return (
    <AppLayout>
      <div className={styles.container}>
        <Files />
      </div>
    </AppLayout>
  );
}

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
