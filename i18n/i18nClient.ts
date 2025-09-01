import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getI18nOptions, Lang } from "./settings";

export function createI18nClient(lang: Lang, resources: Record<string, any>) {
  const i18n = i18next.createInstance();
  i18n.use(initReactI18next).init(getI18nOptions(lang, resources));
  return i18n;
}
