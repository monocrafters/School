import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ensureAdminExists, signAdminToken } from "@/lib/auth";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureAdminExists();

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid && password === ADMIN_PASSWORD) {
      admin.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await admin.save();
    } else if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = signAdminToken(admin._id.toString());

    return NextResponse.json({
      token,
      admin: {
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
