import AppLayout from "layout/app/app.layout";
import { withAuth } from "components/hocs/auth/with-auth";
import { UserInvitesTable } from "@roq/nextjs";
import { routes } from "routes";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function InvitesPage() {
  return (
    <AppLayout>
      <UserInvitesTable style={{ background: "#FFF" }} />
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
  redirectTo: routes.frontend.login,
})(InvitesPage);
