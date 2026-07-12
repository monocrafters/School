export const SCHOOL_NAME = "Ghazali Public High School";
export const SCHOOL_LOCATION = "Dhamthal";
export const SCHOOL_FULL_NAME = "Ghazali Public High School Dhamthal";
export const SCHOOL_MOTTO = "Let's Serve The Nation";
export const SCHOOL_TAGLINE = "Excellence in Education & Character Building";
export const SCHOOL_ADDRESS =
  "Chandni Chowk Dhamthal, near Chohan Petrol Pump";
export const SCHOOL_WHATSAPP = process.env.SCHOOL_WHATSAPP || "03338702916";
export const SCHOOL_WHATSAPP_DISPLAY = "0333 8702916";
export const SCHOOL_EMAIL = process.env.SCHOOL_EMAIL || "gpsdhamthal@mail.com";
export const SCHOOL_WEBSITE =
  process.env.SCHOOL_WEBSITE || "https://gps-dhamthal.vercel.app";

export const BRAND = {
  navy: "#1a237e",
  navyDark: "#0d1454",
  navyLight: "#283593",
  white: "#ffffff",
} as const;

export const HERO_SUBJECTS = [
  "Math",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "Urdu",
  "Computer",
] as const;

export const HERO_QUALIFICATIONS = ["MSC", "BSC", "BS"] as const;

export const PROFESSIONAL_QUALIFICATIONS = ["PTC", "B.Ed", "M.Ed"] as const;

export const SUBJECTS = [...HERO_SUBJECTS] as const;

export const QUALIFICATIONS = [...HERO_QUALIFICATIONS] as const;

export const APPLICATION_STATUSES = [
  "pending",
  "under_review",
  "approved",
  "rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  under_review: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  under_review: "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "sagheerahmadshahzad@gps.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

export const DRAFT_STORAGE_KEY = "gps-apply-draft";
export const USER_TOKEN_KEY = "gps-user-token";
export const ADMIN_TOKEN_KEY = "gps-admin-token";
