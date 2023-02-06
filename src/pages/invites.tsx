import AppLayout from "layout/app/app.layout";
import { UserInvitesTable, requireNextAuth } from "@roq/nextjs";
import { routes } from "routes";

function InvitesPage() {
  return (
    <AppLayout>
      <UserInvitesTable style={{ background: "#FFF" }} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(InvitesPage);
