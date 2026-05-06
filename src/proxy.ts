import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  try {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const { pathname } = req.nextUrl;

    const publicPaths = ["/landing", "/demo", "/login", "/register", "/"];
    const isPublic =
      publicPaths.includes(pathname) ||
      pathname.startsWith("/api/auth") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/favicon");

    if (!isLoggedIn && !isPublic) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
