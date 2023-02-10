import { useRouter } from "next/router";
import { useSession } from "@roq/nextjs";

import React, { ComponentType, useEffect, useMemo } from "react";
import AppLoader from "components/loader";

export interface WithAuthHocParamsInterface {
  redirect?: boolean;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export function withAuth<P extends object>({
  redirect = true,
  redirectTo,
  redirectIfAuthenticated = false,
}: WithAuthHocParamsInterface = {}): (
  WrappedComponent: ComponentType<P>
) => ComponentType<P> {
  return (WrappedComponent: ComponentType<P>): ComponentType<P> => {
    const WithAuth = (props: P) => {
      const router = useRouter();
      const { session, status } = useSession();
      const isLoading = status === "loading";
      const shouldRedirect = useMemo(
        // we need both access token and user to consider current session as authenticated
        () =>
          (!isLoading || session === undefined) &&
          Boolean(redirectIfAuthenticated) === Boolean(session?.id),
        [isLoading, session]
      );
      useEffect(() => {
        // redirect only after first session load
        if (redirect && shouldRedirect && redirectTo) {
          void router.replace(redirectTo, undefined, { locale: router.locale });
        }
      }, [shouldRedirect, router]);

      // only show loader when initializing session (first time)
      if (isLoading || shouldRedirect) {
        return <AppLoader />;
      }

      return <WrappedComponent {...(props as P)} />;
    };
    return WithAuth;
  };
}
