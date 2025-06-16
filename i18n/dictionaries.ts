// lib/dictionaries.ts
import "server-only"; // Ensures this file is only ever run on the server

// CORRECTED LINE: Change 'import type' to 'import'
import { i18n } from "../i18n.config"; // Adjust path based on your setup

import { CommonDictionary } from "@/types/dictionary";

// Define the available dictionaries by locale.
// Each function imports a specific common.json file.
const dictionaries = {
  en: () =>
    import("../public/locales/en/common.json").then(
      (module) => module.default as CommonDictionary
    ),
  ka: () =>
    import("../public/locales/ka/common.json").then(
      (module) => module.default as CommonDictionary
    ),
};

// Type for the keys of the dictionaries object (e.g., 'en', 'ka', 'ru')
type DictionaryKeys = keyof typeof dictionaries;

// Main function to get the dictionary for a given locale
export const getDictionary = async (
  locale: DictionaryKeys
): Promise<CommonDictionary> => {
  if (!dictionaries[locale]) {
    // Fallback to defaultLocale if the requested locale is not found
    console.warn(
      `Locale "${locale}" not found, falling back to default locale "${i18n.defaultLocale}".`
    );
    // Now i18n.defaultLocale will correctly reference the runtime value
    return dictionaries[i18n.defaultLocale]();
  }
  return dictionaries[locale]();
};
