import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const login = new URL("/login", req.url);
    login.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  const role = token.role as string | undefined;
  const isStaff = role === "admin" || role === "superadmin";
  if (!isStaff) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard/users") &&
    role !== "superadmin"
  ) {
    return NextResponse.redirect(new URL("/dashboard/products", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
