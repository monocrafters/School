"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Heart,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  SCHOOL_NAME,
  SCHOOL_MOTTO,
  SCHOOL_ADDRESS,
  SCHOOL_WHATSAPP_DISPLAY,
  SCHOOL_EMAIL,
  SCHOOL_WEBSITE,
} from "@/lib/constants";

const features = [
  {
    icon: Shield,
    title: "Trusted Institution",
    desc: "A legacy of quality education serving the Dhamthal community with dedication and integrity.",
  },
  {
    icon: Heart,
    title: "Character Building",
    desc: "We nurture not just academic excellence but strong moral values in every student.",
  },
  {
    icon: Lightbulb,
    title: "Modern Education",
    desc: "Well-equipped classrooms and updated curriculum to prepare students for the future.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Experienced and qualified teachers committed to every child's success.",
  },
];

const highlights = [
  { icon: Award, label: "Quality Education", value: "Since 1998" },
  { icon: BookOpen, label: "Programs", value: "Up to Matric" },
  { icon: Users, label: "Students", value: "500+" },
];

export default function HomeSections() {
  return (
    <>
      {/* About */}
      <section id="about" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1a237e]">
              About Us
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {SCHOOL_NAME}
            </h2>
            <p className="mt-2 text-lg italic text-[#1a237e]">
              &ldquo;{SCHOOL_MOTTO}&rdquo;
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Ghazali Public High School Dhamthal is committed to nurturing young
              minds from early years through Matric. We provide a supportive environment
              where students excel academically and grow into responsible citizens who
              serve the nation.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl bg-slate-50 p-6 text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a237e]/10">
                  <h.icon className="h-6 w-6 text-[#1a237e]" />
                </div>
                <p className="text-2xl font-bold text-[#1a237e]">{h.value}</p>
                <p className="text-sm text-slate-500">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why-us" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1a237e]">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Building Future Leaders
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a237e]/10">
                  <f.icon className="h-6 w-6 text-[#1a237e]" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1a237e]">
              Get In Touch
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Contact Us
            </h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Address",
                value: SCHOOL_ADDRESS,
              },
              {
                icon: Phone,
                title: "WhatsApp",
                value: SCHOOL_WHATSAPP_DISPLAY,
                href: `https://wa.me/923338702916`,
              },
              {
                icon: Mail,
                title: "Email",
                value: SCHOOL_EMAIL,
                href: `mailto:${SCHOOL_EMAIL}`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a237e] text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {item.title}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm font-medium text-[#1a237e] hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-slate-700">{item.value}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            Visit us at{" "}
            <a
              href={SCHOOL_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1a237e] hover:underline"
            >
              {SCHOOL_WEBSITE}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
