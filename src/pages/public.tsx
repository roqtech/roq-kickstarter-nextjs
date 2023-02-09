import { useSession } from "@roq/nextjs";
import AppLayout from "layout/app/app.layout";

function PublicPage() {
  const { session } = useSession()

  return (
    <AppLayout>
      <p>
        {'This is public page! Accessible by everyone.'}
        {"If you have a don't have session, you still have an access to it."}
      </p>
      <p>
        {"If you don't have the session, ROQ Components should be disbled (in the error state)."}
      </p>
      <code>
        {JSON.stringify({ session })}
      </code>
    </AppLayout>
  );
}

export default PublicPage;
