"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SCHOOL_FULL_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const links = [
    { id: "about", label: "About" },
    { id: "why-us", label: "Why Us" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[60px] border-b border-white/10 bg-[#0d1454]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/school-logo.png"
            alt={`${SCHOOL_FULL_NAME} Logo`}
            width={44}
            height={44}
            className="shrink-0"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-bold leading-tight text-white">
              Ghazali Public High School
            </p>
            <p className="text-[10px] text-blue-200">Dhamthal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={sectionHref(l.id)}
              className="text-sm font-medium text-slate-200 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-200 transition hover:text-white"
          >
            My Application
          </Link>
          <Link href="/apply">
            <Button
              size="sm"
              variant="secondary"
              className={cn(pathname === "/apply" && "ring-2 ring-white/40")}
            >
              Apply Now
            </Button>
          </Link>
        </nav>

        <button
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-[60px] border-t border-white/10 bg-[#0d1454] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.id}
                href={sectionHref(l.id)}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-slate-200"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-slate-200"
            >
              My Application
            </Link>
            <Link href="/apply" onClick={() => setMobileOpen(false)} className="pt-2">
              <Button variant="secondary" className="w-full">
                Apply Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
