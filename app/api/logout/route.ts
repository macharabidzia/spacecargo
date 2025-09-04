// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  // Clear cookie
  res.cookies.set("spacecargo_session", "", {
    maxAge: 0,
    path: "/",
  });

  return res;
}
