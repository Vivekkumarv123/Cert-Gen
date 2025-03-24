import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // ✅ Allow access to the home page
  if (req.nextUrl.pathname === "/home") {
    return NextResponse.next();
  }

  // ✅ Protect only /admin-panel routes
  if (req.nextUrl.pathname.startsWith("/admin-panel")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-panel/:path*"], // ✅ Protect only /admin-panel
};
