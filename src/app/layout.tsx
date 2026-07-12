import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SCHOOL_FULL_NAME, SCHOOL_MOTTO } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SCHOOL_FULL_NAME} | ${SCHOOL_MOTTO}`,
  description: `${SCHOOL_FULL_NAME} — Quality education in Dhamthal. ${SCHOOL_MOTTO}`,
  icons: {
    icon: [{ url: "/school-logo.png", type: "image/png" }],
    apple: [{ url: "/school-logo.png", type: "image/png" }],
    shortcut: ["/school-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
