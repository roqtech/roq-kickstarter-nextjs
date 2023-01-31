import AppLayout from "layout/app/app.layout";
import Card from "components/card/card";
import Posts from "components/post/posts";
import { withAuth } from "components/hocs/auth/with-auth";
import styles from "pages/dashboard/dashboard.module.css";

function DashboardPage() {
  return (
    <AppLayout>
      <Posts />
      <div className={styles.container}></div>
    </AppLayout>
  );
}

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
