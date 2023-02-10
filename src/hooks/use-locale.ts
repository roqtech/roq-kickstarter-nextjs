import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localeMapping } from "config";
import { useLocale as useRoqLocale, useUpdateUserLocale } from "@roq/nextjs";
import invert from "lodash/invert";

interface UseLocaleProps {
  locale: string;
  locales: string[];
  changeLocale: (locale: string) => Promise<void>;
}

export const useLocale = (): UseLocaleProps => {
  const { i18n } = useTranslation();
  const localesMap = invert(localeMapping);
  const { locale, onLocaleChange, locales } = useRoqLocale();
  const { updateUserLocale } = useUpdateUserLocale();
  const router = useRouter();

  const changeLocale = useCallback(
    async (locale: string) => {
      await i18n.changeLanguage(localesMap[locale]);
      onLocaleChange(locale);
      updateUserLocale({ locale });
      router.push(
        {
          pathname: router.route,
          query: router.query,
        },
        router.asPath,
        { locale: localesMap[locale] }
      );
    },
    [i18n, router, onLocaleChange, localesMap, updateUserLocale]
  );

  return {
    locale,
    changeLocale,
    locales,
  };
};
