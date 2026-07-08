"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Loader2,
  LogOut,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  Calendar,
} from "lucide-react";
import { getUserToken, clearUserToken } from "@/lib/storage";
import { ApplicationRecord } from "@/types";
import { SCHOOL_FULL_NAME } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";

export default function UserDashboard() {
  const router = useRouter();
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getUserToken();
    if (!token) {
      router.push("/");
      return;
    }

    fetch("/api/applications/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          if (data.error === "Invalid token" || data.error === "Unauthorized") {
            clearUserToken();
            router.push("/");
          }
        } else {
          setApplication(data.application);
        }
      })
      .catch(() => setError("Failed to load application"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    clearUserToken();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a237e]" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <p className="text-slate-600">{error || "No application found"}</p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/school-logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <span className="hidden font-bold text-[#1a237e] sm:block">{SCHOOL_FULL_NAME}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Application</h1>
          <p className="mt-1 text-slate-500">Track your teaching application status</p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="border-b border-slate-100 bg-[#1a237e] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{application.name}</h2>
                <p className="text-sm text-blue-200">Application submitted successfully</p>
              </div>
              <StatusBadge status={application.status} className="self-start" />
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <InfoItem icon={User} label="Full Name" value={application.name} />
            <InfoItem icon={Phone} label="Phone" value={application.phone} />
            <InfoItem icon={GraduationCap} label="Qualification" value={application.qualification} />
            <InfoItem
              icon={Calendar}
              label="Submitted On"
              value={new Date(application.createdAt).toLocaleDateString("en-PK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          </div>

          <div className="border-t border-slate-100 px-6 py-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <BookOpen className="h-4 w-4" />
              Applied Subjects
            </div>
            <div className="flex flex-wrap gap-2">
              {application.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-[#1a237e]/10 px-3 py-1 text-sm font-medium text-[#1a237e]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {application.cvFileName && (
            <div className="border-t border-slate-100 px-6 py-5">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FileText className="h-4 w-4" />
                CV: {application.cvFileName}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
          Your application is currently <strong>{application.status.replace("_", " ")}</strong>.
          We will contact you on your registered phone number for further updates.
        </div>
      </main>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-5 w-5 text-[#1a237e]" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        <p className="font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
