// lib/i18n-client.ts
"use client"; // This file must be a client component

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOriginal,
} from "react-i18next";
import { getOptions, defaultNS } from "./settings"; // Adjust path as necessary

// Initialize i18next only once on the client side
// It loads resources via HTTP (handled by i18next-http-backend if configured,
// or by Next.js's built-in file serving).
if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    ...getOptions(),
    lng: undefined, // Let the detector or the server-provided lang determine the initial language
    detection: {
      order: ["path", "htmlTag", "cookie", "localStorage", "navigator"],
    },
    resources: {}, // No initial resources here, they are loaded dynamically
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    // If you're using Suspense for data loading, you might need to enable useSuspense: true
    // However, for typical translation use, false is often fine.
    react: {
      useSuspense: false,
    },
  });
}

// Custom hook to provide client-side translation capabilities
// It automatically changes the language of the i18next instance if the lang prop changes,
// ensuring components re-render with the correct translations.
export function useTranslation(lang: string, ns = defaultNS) {
  // Only change language if it's different from the currently resolved language
  if (i18next.resolvedLanguage !== lang) {
    i18next.changeLanguage(lang);
  }
  return useTranslationOriginal(ns);
}
