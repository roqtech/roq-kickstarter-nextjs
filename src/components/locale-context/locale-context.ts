import { useEffect } from "react";
import { useLocale } from "hooks";
import { useSession } from "@roq/nextjs";

export default function LocaleContext(): null {
  const { session } = useSession();
  const { changeLocale } = useLocale();

  useEffect(() => {
    const userLocale = session?.user?.locale;
    if (userLocale) {
      changeLocale(userLocale);
    }
  }, [session?.user?.locale]);
  return null;
}
