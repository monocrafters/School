"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Loader2,
  LogOut,
  Users,
  Search,
  FileText,
  Download,
} from "lucide-react";
import { getAdminToken, clearAdminToken } from "@/lib/storage";
import { ApplicationRecord } from "@/types";
import { APPLICATION_STATUSES, SCHOOL_FULL_NAME, STATUS_LABELS } from "@/lib/constants";
import StatusBadge from "@/components/ui/StatusBadge";

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchApps = () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin");
      return;
    }

    fetch("/api/admin/applications", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          clearAdminToken();
          router.push("/admin");
        } else {
          setApplications(data.applications);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApps();
  }, [router]);

  const handleStatusChange = async (id: string, status: string) => {
    const token = getAdminToken();
    if (!token) return;

    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? data.application : a))
        );
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleDownloadCv = async (id: string, fileName: string) => {
    const token = getAdminToken();
    if (!token) return;

    const res = await fetch(`/api/admin/applications/${id}/cv`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.application?.cvData) {
      const link = document.createElement("a");
      link.href = data.application.cvData;
      link.download = fileName || "cv";
      link.click();
    }
  };

  const filtered = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search);
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1a237e]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/school-logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
            <div>
              <p className="font-bold text-[#1a237e]">{SCHOOL_FULL_NAME}</p>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => { clearAdminToken(); router.push("/admin"); }}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Applications", value: stats.total, color: "bg-[#1a237e]" },
            { label: "Pending", value: stats.pending, color: "bg-amber-500" },
            { label: "Approved", value: stats.approved, color: "bg-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white`}>
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#1a237e]"
          >
            <option value="all">All Statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-semibold text-slate-600">Name</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Phone</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Qualification</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Subjects</th>
                <th className="px-5 py-3 font-semibold text-slate-600">Status</th>
                <th className="px-5 py-3 font-semibold text-slate-600">CV</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                    No applications found
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-medium text-slate-900">{app.name}</td>
                    <td className="px-5 py-4 text-slate-600">{app.phone}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {app.qualification}
                      {app.professionalQualification && (
                        <span className="block text-xs text-slate-400">
                          {app.professionalQualification}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {app.subjects.slice(0, 2).map((s) => (
                          <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-xs">{s}</span>
                        ))}
                        {app.subjects.length > 2 && (
                          <span className="text-xs text-slate-400">+{app.subjects.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={app.status}
                        disabled={updating === app._id}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs outline-none focus:border-[#1a237e]"
                      >
                        {APPLICATION_STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {app.cvFileName ? (
                        <button
                          onClick={() => handleDownloadCv(app._id, app.cvFileName!)}
                          className="flex items-center gap-1 text-xs text-[#1a237e] hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-slate-400">No applications found</p>
          ) : (
            filtered.map((app) => (
              <div key={app._id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{app.name}</p>
                    <p className="text-sm text-slate-500">{app.phone}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <p className="mb-2 text-sm text-slate-600">
                  {app.qualification}
                  {app.professionalQualification && ` · ${app.professionalQualification}`}
                </p>
                <div className="mb-3 flex flex-wrap gap-1">
                  {app.subjects.map((s) => (
                    <span key={s} className="rounded bg-slate-100 px-2 py-0.5 text-xs">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <select
                    value={app.status}
                    disabled={updating === app._id}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none"
                  >
                    {APPLICATION_STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                  {app.cvFileName && (
                    <button
                      onClick={() => handleDownloadCv(app._id, app.cvFileName!)}
                      className="flex items-center gap-1 text-sm text-[#1a237e]"
                    >
                      <FileText className="h-4 w-4" />
                      CV
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
