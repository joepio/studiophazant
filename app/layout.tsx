import React from "react";
import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import "@/styles.css";

const brandSerif = localFont({
  src: [
    { path: '../public/fonts/HV Fitzgerald Bold.woff2', weight: '400 700', style: 'normal' },
    { path: '../public/fonts/HV Fitzgerald Bold Italic.woff2', weight: '400 700', style: 'italic' },
  ],
  variable: "--font-serif",
  display: 'block',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'block',
});

const brandScript = localFont({
  src: [
    { path: '../public/fonts/TheEditorialMethod.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/TheEditorialMethodBold.otf', weight: '700', style: 'normal' },
  ],
  variable: "--font-script",
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studiophazant.nl"),
  icons: { icon: '/icon.svg', shortcut: '/icon.svg' },
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
      className={cn(dmSans.variable, brandSerif.variable, brandScript.variable)}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
