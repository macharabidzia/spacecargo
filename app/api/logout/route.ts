import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "Cookie cleared" });
  res.cookies.set("spacecargo_session", "", { maxAge: 0, path: "/" });
  return res;
}