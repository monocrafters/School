"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { SCHOOL_FULL_NAME } from "@/lib/constants";
import { saveAdminToken } from "@/lib/storage";
import Button from "@/components/ui/Button";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      saveAdminToken(data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0d1454] via-[#1a237e] to-[#283593] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/school-logo.png"
            alt={`${SCHOOL_FULL_NAME} Logo`}
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-blue-200">{SCHOOL_FULL_NAME}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-2xl"
        >
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
                placeholder="admin@gps.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-11 outline-none transition focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e]/20"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
