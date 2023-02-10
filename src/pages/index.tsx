import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DashboardPage from "pages/dashboard";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default DashboardPage;
