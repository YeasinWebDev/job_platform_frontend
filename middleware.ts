import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./app/services/auth/tokenHandler";

export async function middleware(request: NextRequest) {
  const token = await getCookie("authToken");

  // Current path
  const { pathname } = request.nextUrl;

  // If user already logged in and tries to visit auth pages
  if (token && ["/auth"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
