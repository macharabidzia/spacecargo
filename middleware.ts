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

  // 1. i18n Logic: Handle locale redirection if necessary
  let currentPath = pathname; // Use a mutable variable for the path
  let response = NextResponse.next(); // Default response, will be overridden if redirect happens

  const pathnameHasLocale = i18n.locales.some(
    (locale) =>
      currentPath.startsWith(`/${locale}/`) || currentPath === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // If no locale in pathname, redirect to the detected locale
    const locale = getLocale(request);
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${currentPath}`;
    response = NextResponse.redirect(newUrl); // Set response to redirect
    currentPath = newUrl.pathname; // Update currentPath to the new, locale-prefixed path
  }

  // Ensure 'x-pathname' header is always set to the final path after i18n
  response.headers.set("x-pathname", currentPath);

  // 2. Authentication Logic: Apply auth guard *after* i18n is handled
  const token = request.cookies.get("auth_token")?.value; // Get your auth token from cookies
  // Define your protected routes (relative to the locale prefix)
  const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // e.g., /en/dashboard, /ka/profile

  // Extract the path without the locale prefix for the auth check
  const pathWithoutLocale = i18n.locales.reduce((path, locale) => {
    if (path.startsWith(`/${locale}`)) {
      return path.substring(`/${locale}`.length);
    }
    return path;
  }, currentPath);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );
  const isLoginPage = pathWithoutLocale === "/login";

  if (isProtectedRoute) {
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname =
        currentPath.split("/").slice(0, 2).join("/") + "/login";
      loginUrl.searchParams.set("redirect", currentPath);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginPage && token) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname =
      currentPath.split("/").slice(0, 2).join("/") + "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }
  return response;
}

export const config = {
  // Apply middleware to all paths except Next.js internal paths, API routes, and static assets
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
