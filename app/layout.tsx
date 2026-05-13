import React from "react";
import { Metadata } from "next";
import { Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Studio Phazant",
  description:
    "Custom furniture, objects and interior projects by Kristian Kodde — handmade with a sustainable approach using locally sourced, reclaimed and eco-friendly materials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(dmSans.variable, playfair.variable, caveat.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
