"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users } from "lucide-react";
import {
  HERO_QUALIFICATIONS,
  HERO_SUBJECTS,
  SCHOOL_FULL_NAME,
} from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-60px)] w-full flex-col overflow-hidden bg-gradient-to-br from-[#0d1454] via-[#1a237e] to-[#283593] pt-[60px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-60px)] w-full max-w-7xl flex-1 flex-col justify-center gap-4 px-4 py-6 pb-8 sm:gap-5 sm:px-6 sm:py-8 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-12">
        {/* Image first on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="order-1 flex w-full shrink-0 justify-center lg:order-2 lg:h-full lg:w-[42%] lg:items-end lg:justify-end"
        >
          <div className="relative h-[260px] w-full max-w-[220px] sm:h-[320px] sm:max-w-[280px] lg:h-[min(calc(100svh-160px),560px)] lg:max-w-[400px] lg:flex-1">
            <Image
              src="/hero-teacher.png"
              alt="Teacher at Ghazali Public High School"
              fill
              priority
              unoptimized
              className="hero-teacher-img object-contain object-bottom"
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 400px"
            />
          </div>
        </motion.div>

        {/* Content below image on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="order-2 w-full flex-1 text-center lg:order-1 lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-100 sm:text-xs">
            We&apos;re Hiring
          </span>

          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white sm:mt-3 sm:text-4xl lg:mt-5 lg:text-5xl xl:text-6xl">
            Teachers Required
          </h1>

          <p className="mx-auto mt-1.5 max-w-xl text-xs leading-snug text-blue-100/90 sm:mt-2 sm:text-base lg:mx-0 lg:text-lg">
            Join {SCHOOL_FULL_NAME} and help shape the next generation.
          </p>

          <div className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-4 lg:mt-7 lg:space-y-5">
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-blue-200/80 sm:text-xs">
                Subjects
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-start">
                {HERO_SUBJECTS.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-2 sm:gap-x-8 sm:gap-y-3 lg:justify-start">
              <div>
                <p className="mb-1.5 flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-blue-200/80 sm:text-xs lg:justify-start">
                  <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Qualification
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-start">
                  {HERO_QUALIFICATIONS.map((qual) => (
                    <span
                      key={qual}
                      className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-[#1a237e] sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1.5 flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-blue-200/80 sm:text-xs lg:justify-start">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Gender
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:justify-start">
                  {["Male", "Female"].map((gender) => (
                    <span
                      key={gender}
                      className="rounded-md border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-100 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-sm"
                    >
                      {gender}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center sm:mt-6 lg:mt-8 lg:justify-start">
            <Link href="/apply">
              <Button
                size="sm"
                variant="secondary"
                className="group shadow-lg shadow-black/20 sm:px-8 sm:py-4 sm:text-lg"
              >
                Apply Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
