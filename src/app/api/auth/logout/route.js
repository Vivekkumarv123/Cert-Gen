import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req) {
  const response = NextResponse.json(
    { success: true, message: "Logged out" },
    { status: 200 }
  );

  // ✅ Clear the cookie by setting expiration in the past
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );

  return response;
}
