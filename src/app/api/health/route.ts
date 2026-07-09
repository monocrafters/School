import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiErrorMessage } from "@/lib/api-route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const hasMongoUri = Boolean(process.env.MONGODB_URI?.trim());
  const hasJwtSecret = Boolean(process.env.JWT_SECRET?.trim());

  if (!hasMongoUri || !hasJwtSecret) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required environment variables on server.",
        checks: {
          mongodb: hasMongoUri,
          jwt: hasJwtSecret,
        },
      },
      { status: 503 }
    );
  }

  try {
    await connectDB();
    return NextResponse.json({
      ok: true,
      checks: {
        mongodb: true,
        jwt: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: apiErrorMessage(error, "Database connection failed."),
        checks: {
          mongodb: false,
          jwt: hasJwtSecret,
        },
      },
      { status: 503 }
    );
  }
}
