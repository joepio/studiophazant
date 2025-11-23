import React from "react";
import { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Studio Phazant",
  description: "Portfolio of Studio Phazant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(dmSans.variable, dmSerif.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
