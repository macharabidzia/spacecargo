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

  // Skip API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Detect bots (Googlebot, Bingbot, etc.)
  const userAgent = request.headers.get("user-agent") || "";
  const isBot = /Googlebot|bingbot|Slurp|DuckDuckBot/i.test(userAgent);

  // 1. i18n Logic: redirect if no locale in path
  let currentPath = pathname;
  let response = NextResponse.next();

  const pathnameHasLocale = i18n.locales.some(
    (locale) =>
      currentPath.startsWith(`/${locale}/`) || currentPath === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request) as string;
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${currentPath}`;
    response = NextResponse.redirect(newUrl);
    currentPath = newUrl.pathname;
    response.headers.set("x-language", locale);
  } else {
    const currentLocale = currentPath.split("/")[1];
    response.headers.set("x-language", currentLocale);
  }

  response.headers.set("x-pathname", currentPath);

  // 2. Authentication Logic: skip for bots
  if (!isBot) {
    const token = request.cookies.get("spacecargo_session")?.value || null;

    const protectedRoutes = [
      "/dashboard",
      "/profile",
      "/settings",
      "/vouchers",
      "/shops",
      "/notifications",
      "/terms",
    ];

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

    if (isProtectedRoute && !token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname =
        currentPath.split("/").slice(0, 2).join("/") + "/login";
      loginUrl.searchParams.set("redirect", currentPath);
      return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && token) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname =
        currentPath.split("/").slice(0, 2).join("/") + "/dashboard";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
