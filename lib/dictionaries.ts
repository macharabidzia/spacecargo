// lib/dictionaries.ts
import "server-only"; // Ensure this file is only used on the server

import type { i18n } from "../i18n.config"; // Adjust path if needed

// Define the shape of your dictionary data
interface CommonDictionary {
  greeting: string;
  welcome: string;
  aboutUs: string;
  aboutText: string;
}

// Map of all available dictionaries by locale
const dictionaries = {
  en: () =>
    import("../public/locales/en/common.json").then((module) => module.default),
  ka: () =>
    import("../public/locales/ka/common.json").then((module) => module.default),
};

// Type for the dictionaries object values
type DictionaryFn = () => Promise<CommonDictionary>;

// Type for the keys of the dictionaries object
type DictionaryKeys = keyof typeof dictionaries;

// Get the dictionary for a given locale
export const getDictionary = async (
  locale: DictionaryKeys
): Promise<CommonDictionary> => {
  if (!dictionaries[locale]) {
    // Fallback to defaultLocale or throw error
    console.warn(`Locale "${locale}" not found, falling back to default.`);
    return dictionaries[i18n.defaultLocale]();
  }
  return dictionaries[locale]();
};
