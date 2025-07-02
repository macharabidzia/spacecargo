// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n/settings";

function getLocale(request: NextRequest): string | undefined {
  const headers: { [key: string]: string } = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const languages = new Negotiator({ headers }).languages();
  const locales = i18n.locales as unknown as string[];
  const defaultLocale = i18n.defaultLocale;

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // IMPORTANT: The x-pathname header should reflect the *final* URL path
  // that the request is resolving to after middleware logic.

  // Check if the pathname already contains a locale prefix
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If locale is present, just proceed, but ensure x-pathname is set.
    // request.nextUrl.pathname already contains the locale in this case.
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // If no locale is in the pathname, redirect to the detected locale
  const locale = getLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname}`; // This is the new, locale-prefixed path

  const response = NextResponse.redirect(newUrl);
  response.headers.set('x-pathname', newUrl.pathname); // Set x-pathname to the new path
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};