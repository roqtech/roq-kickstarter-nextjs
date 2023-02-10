import styles from "components/locale/locale-switcher.module.css";
import { useLocale } from "hooks";
import { ChangeEvent, useCallback } from "react";

export default function LocaleSwitcher() {
  const { locale, locales, changeLocale } = useLocale();
  const labels: Record<string, string> = {
    "en-US": "🇺🇸 English",
    "de-DE": "🇩🇪 German",
  };

  const localeChangeCB = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const locale = e.target.value;
      changeLocale(locale);
    },
    [changeLocale]
  );

  return (
    <div className={`${styles.selectBasic} ${styles.selectWrapper}`}>
      <select
        id="languages"
        name="languages"
        onChange={localeChangeCB}
        value={locale}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {labels[locale] || locale}
          </option>
        ))}
      </select>
    </div>
  );
}
