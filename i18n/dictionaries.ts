import "server-only";
import type {
  CommonDictionary,
  HomeDictionary,
  AppDictionary,
} from "@/types/dictionary";
import { cache } from "react";
import { i18n } from "./settings";

const loadCombinedDictionary = async (
  locale: (typeof i18n)["locales"][number]
): Promise<AppDictionary> => {
  const common = await import(`../public/locales/${locale}/common.json`).then(
    (m) => m.default as CommonDictionary
  );
  const home = await import(`../public/locales/${locale}/home.json`).then(
    (m) => m.default as HomeDictionary
  );
  return {
    common,
    home,
  } as AppDictionary;
};
const dictionaries = {
  en: () => loadCombinedDictionary("en"),
  ka: () => loadCombinedDictionary("ka"),
};

type DictionaryKeys = keyof typeof dictionaries;

export const getDictionary = cache(
  async (locale: DictionaryKeys): Promise<AppDictionary> => {
    if (!dictionaries[locale]) {
      console.warn(
        `Locale "${locale}" not found, falling back to default locale "${i18n.defaultLocale}".`
      );
      return dictionaries[i18n.defaultLocale as DictionaryKeys]();
    }
    return dictionaries[locale]();
  }
);
