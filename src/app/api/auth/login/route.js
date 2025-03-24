import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await dbConnect();

  try {
    const { adminId, password } = await req.json();

    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ adminId: admin.adminId }, JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );

    // ✅ Set cookie properly
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Error during login" },
      { status: 500 }
    );
  }
}
