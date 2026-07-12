import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { verifyToken } from "@/lib/auth";
import { apiErrorMessage } from "@/lib/api-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    await connectDB();
    const application = await Application.findById(id).lean();

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({
      application: {
        _id: application._id.toString(),
        name: application.name,
        phone: application.phone,
        qualification: application.qualification,
        professionalQualification: application.professionalQualification,
        subjects: application.subjects,
        cvFileName: application.cvFileName,
        cvData: application.cvData,
        status: application.status,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: apiErrorMessage(error, "Failed to fetch application") },
      { status: 500 }
    );
  }
}
