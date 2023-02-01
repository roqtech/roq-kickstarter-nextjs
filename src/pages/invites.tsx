import AppLayout from "layout/app/app.layout";
import { withAuth } from "components/hocs/auth/with-auth";
import { UserInvitesTable } from "@roq/ui-react";
import { routes } from "routes";

function InvitesPage() {
  return (
    <AppLayout>
      <UserInvitesTable />
    </AppLayout>
  );
}

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(InvitesPage);
