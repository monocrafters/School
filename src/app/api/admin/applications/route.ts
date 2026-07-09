import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { verifyToken } from "@/lib/auth";
import { apiErrorMessage } from "@/lib/api-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();
    const applications = await Application.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      applications: applications.map((app) => ({
        _id: app._id.toString(),
        name: app.name,
        phone: app.phone,
        qualification: app.qualification,
        subjects: app.subjects,
        cvFileName: app.cvFileName,
        status: app.status,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: apiErrorMessage(error, "Failed to fetch applications") },
      { status: 500 }
    );
  }
}
