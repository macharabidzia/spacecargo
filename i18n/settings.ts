// lib/settings.ts
import { i18n } from "../i18n.config"; // Adjust path based on your setup

export const defaultNS = "common"; // The default namespace for your translations (e.g., common.json)

// Provides the base i18next options for initialization
export const getOptions = (lang = i18n.defaultLocale) => ({
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
  supportedLngs: i18n.locales, // All supported locales
  fallbackLng: i18n.defaultLocale, // Fallback language
  lng: lang, // The current language
  ns: defaultNS, // Default namespace to load
  defaultNS: defaultNS, // Explicitly set default namespace
});

// Provides initial namespaces if you need to preload specific ones
export const getInitialNs = () => {
  return [defaultNS];
};
