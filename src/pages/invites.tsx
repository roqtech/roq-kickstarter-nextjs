import AppLayout from "layout/app/app.layout";
import { UserInvitesTable, withNextAuth } from "@roq/nextjs";
import { routes } from "routes";

function InvitesPage() {
  return (
    <AppLayout>
      <UserInvitesTable style={{ background: "#FFF" }} />
    </AppLayout>
  );
}

export default withNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(InvitesPage);
