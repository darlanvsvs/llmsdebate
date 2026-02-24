import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Deliberation System",
  description: "A collaborative reasoning platform using multiple LLMs to support human decision-making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-zinc-950 text-zinc-50 selection:bg-white/20`}
      >
        {children}
      </body>
    </html>
  );
}
