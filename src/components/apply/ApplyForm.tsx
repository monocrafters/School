"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { QUALIFICATIONS, PROFESSIONAL_QUALIFICATIONS, SUBJECTS } from "@/lib/constants";
import {
  saveDraft,
  loadDraft,
  clearDraft,
  fileToBase64,
  saveUserToken,
} from "@/lib/storage";
import { ApplicationFormData } from "@/types";
import Button from "@/components/ui/Button";
import Navbar from "@/components/home/Navbar";
import { cn } from "@/lib/cn";

const emptyForm: ApplicationFormData = {
  name: "",
  phone: "",
  qualification: "",
  professionalQualification: "",
  subjects: [],
};

export default function ApplyForm() {
  const router = useRouter();
  const [form, setForm] = useState<ApplicationFormData>(emptyForm);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setForm({
        name: draft.name || "",
        phone: draft.phone || "",
        qualification: draft.qualification || "",
        professionalQualification: draft.professionalQualification || "",
        subjects: draft.subjects || [],
        cvFileName: draft.cvFileName,
        cvData: draft.cvData,
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => saveDraft(form), 600);
    return () => clearTimeout(timer);
  }, [form]);

  const toggleSubject = (subject: string) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleCvChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("CV file must be under 5MB");
      return;
    }
    setCvFile(file);
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, cvFileName: file.name, cvData: base64 }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.qualification ||
      !form.subjects.length ||
      !form.cvFileName ||
      !form.cvData
    ) {
      setError("Please fill all required fields, upload your CV, and select at least one subject.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      saveUserToken(data.token);
      clearDraft();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-2xl px-4 pb-10 pt-[76px] sm:px-6 sm:pt-[84px]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Teacher Application
          </h1>
          <p className="mt-1 text-slate-500">
            Fill in your details below to apply.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
              placeholder="03XX XXXXXXX"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Qualification <span className="text-red-500">*</span>
            </label>
            <select
              value={form.qualification}
              onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
            >
              <option value="">Select qualification</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Professional Qualification
            </label>
            <select
              value={form.professionalQualification || ""}
              onChange={(e) =>
                setForm({ ...form, professionalQualification: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
            >
              <option value="">Select professional qualification</option>
              {PROFESSIONAL_QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Subjects <span className="text-red-500">*</span>
              <span className="ml-1 font-normal text-slate-400">(select multiple)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                    form.subjects.includes(subject)
                      ? "border-[#1a237e] bg-[#1a237e] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#1a237e]/50"
                  )}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Upload CV <span className="text-red-500">*</span>
            </label>
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 transition hover:border-[#1a237e]/50 hover:bg-slate-50">
              <Upload className="h-8 w-8 text-slate-400" />
              <span className="text-center text-sm text-slate-500">
                {form.cvFileName || cvFile?.name || "Click to upload PDF or DOC (max 5MB)"}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleCvChange}
              />
            </label>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}
