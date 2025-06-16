import { createI18nClient } from "next-i18n/client";

export const { useI18n, useScopedI18n } = createI18nClient({
  locales: ["en", "ka", "ru"],
  defaultLocale: "en",
  ns: ["common"], // Match the namespaces from your server config
});
