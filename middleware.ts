// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n/settings";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object
  const headers: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const languages = new Negotiator({ headers }).languages();
  const locales = i18n.locales as unknown as string[]; // Cast for match function
  const defaultLocale = i18n.defaultLocale;

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already contains a locale prefix (e.g., /en/, /ka/, /ru/)
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If a locale is already in the pathname, or it's a file/API route, let it pass
  if (pathnameHasLocale) return;

  // If no locale is in the pathname, redirect to the detected locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
