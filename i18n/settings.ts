// i18n/settings.ts
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ka"],
  ns: ["common"],
  defaultNS: "common",
};
export type Lang = (typeof i18n)["locales"][number];

export const defaultNS = "common";
export const namespaces = [defaultNS, "home"] as const; // <--- Add 'as const' here!

export type Ns = (typeof namespaces)[number]; // "common" | "home"
export type NsArray = ReadonlyArray<Ns>; // ReadonlyArray<"common" | "home">

export function getI18nOptions(lang: Lang, resources: Record<string, any>) {
  return {
    lng: lang,
    fallbackLng: i18n.defaultLocale,
    debug: process.env.NODE_ENV === "development",
    resources: { [lang]: resources },
    ns: i18n.ns,
    defaultNS: i18n.defaultNS,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  };
}
