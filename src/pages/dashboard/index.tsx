import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import styles from "pages/dashboard/dashboard.module.css";
import { withNextAuth } from "@roq/nextjs";

function DashboardPage(props: unknown) {
  return (
    <AppLayout>
      <code>{JSON.stringify(props)}</code>
      <div className={styles.container}>
        <Files />
      </div>
    </AppLayout>
  );
}

export default withNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
