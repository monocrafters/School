import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants";
import Admin from "@/models/Admin";

const JWT_SECRET = process.env.JWT_SECRET || "gps-school-secret-key-change-in-production";

export function signUserToken(applicationId: string) {
  return jwt.sign({ applicationId, role: "user" }, JWT_SECRET);
}

export function signAdminToken(adminId: string) {
  return jwt.sign({ adminId, role: "admin" }, JWT_SECRET);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      applicationId?: string;
      adminId?: string;
      role: "user" | "admin";
    };
  } catch {
    return null;
  }
}

export async function ensureAdminExists() {
  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) return existing;

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  return Admin.create({
    email: ADMIN_EMAIL,
    password: hashedPassword,
    name: "Admin",
  });
}
