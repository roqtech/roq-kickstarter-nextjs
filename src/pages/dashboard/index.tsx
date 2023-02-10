import AppLayout from "layout/app/app.layout";
import Files from "components/file/files";
import { withAuth } from "components/hocs/auth/with-auth";
import styles from "pages/dashboard/dashboard.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function DashboardPage() {
  return (
    <AppLayout>
      <div className={styles.container}>
        <Files />
      </div>
    </AppLayout>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
