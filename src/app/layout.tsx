import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaung Set Hein | Portfolio",
  description:
    "Portfolio of Kaung Set Hein, a Full-Stack Software Engineer in Yangon experienced in scalable web applications, business systems, and automation.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[#050816] font-sans text-white">{children}</body>
    </html>
  );
}
