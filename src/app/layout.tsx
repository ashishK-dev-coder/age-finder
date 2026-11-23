import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Age Finder & Calculator - Next.js",
  description:
    "Accurate age calculator with auto-jumping date segment inputs, exact years/months/days breakdown, next birthday countdown, and astrology insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
