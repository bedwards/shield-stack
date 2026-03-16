import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ScoreRebound — Student Loan Credit Score Recovery Planner",
  description:
    "Free personalized plan to recover your credit score after student loan delinquency. Get step-by-step guidance for IBR enrollment, rehabilitation, consolidation, and credit building.",
  keywords: [
    "student loan credit score",
    "credit score recovery",
    "student loan default",
    "IBR enrollment",
    "loan rehabilitation",
    "credit repair student loans",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col" data-testid="app-root">
          <Header />
          <main className="flex-1" data-testid="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
