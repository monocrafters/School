import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "user" || !payload.applicationId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    await connectDB();
    const application = await Application.findById(payload.applicationId).lean();

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({
      application: {
        _id: application._id.toString(),
        name: application.name,
        phone: application.phone,
        qualification: application.qualification,
        subjects: application.subjects,
        cvFileName: application.cvFileName,
        status: application.status,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    console.error("Fetch application error:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}
