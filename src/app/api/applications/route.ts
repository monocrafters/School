import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { signUserToken } from "@/lib/auth";
import { apiErrorMessage } from "@/lib/api-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, qualification, professionalQualification, subjects, cvFileName, cvData } = body;

    if (!name?.trim() || !phone?.trim() || !qualification || !subjects?.length || !cvFileName || !cvData) {
      return NextResponse.json(
        { error: "Please fill all required fields, upload your CV, and select at least one subject." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Application.findOne({ phone: phone.trim() });
    if (existing) {
      return NextResponse.json(
        { error: "An application with this phone number already exists." },
        { status: 409 }
      );
    }

    const application = await Application.create({
      name: name.trim(),
      phone: phone.trim(),
      qualification,
      professionalQualification: professionalQualification || undefined,
      subjects,
      cvFileName,
      cvData,
      status: "pending",
    });

    const token = signUserToken(application._id.toString());

    return NextResponse.json({
      token,
      application: {
        _id: application._id.toString(),
        name: application.name,
        phone: application.phone,
        qualification: application.qualification,
        professionalQualification: application.professionalQualification,
        subjects: application.subjects,
        cvFileName: application.cvFileName,
        status: application.status,
        createdAt: application.createdAt,
        updatedAt: application.updatedAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: apiErrorMessage(error, "Failed to submit application. Please try again.") },
      { status: 500 }
    );
  }
}
