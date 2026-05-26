import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/early-access", "/beta-apply", "/dashboard"];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/login" || pathname === "/register") && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/early-access/:path*",
    "/beta-apply/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
