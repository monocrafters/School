"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import {
  SCHOOL_FULL_NAME,
  SCHOOL_MOTTO,
  SCHOOL_ADDRESS,
  SCHOOL_EMAIL,
  SCHOOL_WHATSAPP_DISPLAY,
  SCHOOL_WEBSITE,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#0d1454] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/school-logo.png"
              alt={`${SCHOOL_FULL_NAME} Logo`}
              width={90}
              height={90}
              className="mb-4"
            />
            <p className="text-base font-bold">{SCHOOL_FULL_NAME}</p>
            <p className="text-sm italic text-blue-200">&ldquo;{SCHOOL_MOTTO}&rdquo;</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2 text-sm text-slate-300">
              <a href="#about" className="transition hover:text-white">About Us</a>
              <a href="#why-us" className="transition hover:text-white">Why Choose Us</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
              <Link href="/dashboard" className="transition hover:text-white">
                My Application
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-200">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
                {SCHOOL_ADDRESS}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-blue-300" />
                {SCHOOL_WHATSAPP_DISPLAY}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-blue-300" />
                {SCHOOL_EMAIL}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-blue-300" />
                <a
                  href={SCHOOL_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  gps-dhamthal.vercel.app
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} {SCHOOL_FULL_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
