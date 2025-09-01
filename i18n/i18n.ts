import { NextRequest } from "next/server";

const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = ["en", "ka"];

export function getLanguageFromUrl(req: NextRequest): string {
  // Example URL: /en/api/orders
  const pathname = req.nextUrl.pathname; // e.g., "/en/api/orders"
  const parts = pathname.split("/").filter(Boolean); // ["en", "api", "orders"]
  const firstSegment = parts[0];

  if (SUPPORTED_LANGS.includes(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LANG;
}
