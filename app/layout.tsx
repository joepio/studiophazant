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
  title: {
    default: "Studio Phazant | Maatwerk meubels in Noord-Holland",
    template: "%s | Studio Phazant",
  },
  description:
    "Studio Phazant is meubelmaker in Noord-Holland voor maatwerk meubels, unieke interieurs en houten objecten — ontworpen en handgemaakt met lokaal en hergebruikt hout.",
  keywords: [
    "maatwerk meubels",
    "meubelmaker Noord-Holland",
    "meubels op maat",
    "houten meubels",
    "maatwerk interieur",
    "handgemaakte meubels",
  ],
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
