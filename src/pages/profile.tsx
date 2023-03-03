import AppLayout from "layout/app/app.layout";
import { UserInvitesTable, requireNextAuth, UserProfileAvatar } from "@roq/nextjs";
import { routes } from "routes";

function ProfilePage() {
  return (
    <AppLayout>
      <UserProfileAvatar open withAvatar={false} />
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: routes.frontend.login,
})(ProfilePage);
