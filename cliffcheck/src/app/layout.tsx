import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "CliffCheck — Benefits Cliff Calculator",
  description:
    "See how a raise affects ALL your government benefits at once. Free benefits cliff calculator for SNAP, Medicaid, EITC, childcare subsidies, and more across all 50 states.",
  keywords: [
    "benefits cliff calculator",
    "will I lose my benefits if I get a raise",
    "SNAP income limit",
    "Medicaid income limit",
    "benefits cliff",
    "government benefits calculator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
