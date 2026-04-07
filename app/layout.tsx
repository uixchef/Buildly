import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buildly — From prompt to product fast",
  description:
    "Turn your ideas into real, working apps and websites. Describe what you need; we handle the code, design, and logic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-[100dvh] bg-buildly-bg font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
