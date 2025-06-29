import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/unauthorized"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const role = request.cookies.get("mdl-role")?.value;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedRoutes: Record<string, string> = {
    VIEWER: "/viewer",
    REVIEWER: "/reviewer",
    APPROVER: "/approver",
    ADMIN: "/admin",
  };

  const expectedRoute = allowedRoutes[role as keyof typeof allowedRoutes];

  if (!pathname.startsWith(expectedRoute)) {
    return NextResponse.redirect(new URL(expectedRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/viewer/:path*",
    "/reviewer/:path*",
    "/approver/:path*",
    "/admin/:path*",
  ],
};
