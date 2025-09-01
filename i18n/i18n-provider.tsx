"use client";

import { I18nextProvider } from "react-i18next";
import { useTranslation as useTranslationOrg } from "react-i18next";
import { createI18nClient } from "./i18nClient";
import { Lang, Ns } from "./settings";

interface Props {
  lang: Lang;
  dictionaries: Record<Ns, any>;
  children: React.ReactNode;
}

export function I18nProvider({ lang, dictionaries, children }: Props) {
  // Create an i18next instance on the client for every render.
  const i18n = createI18nClient(lang, dictionaries);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export const useClientTranslation = (
  ns?: Ns | Ns[],
  options?: Parameters<typeof useTranslationOrg>[1]
) => {
  const { t, i18n } = useTranslationOrg(ns, options);
  return { t, i18n, lang: i18n.language as Lang };
};
