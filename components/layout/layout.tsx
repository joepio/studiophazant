import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default function Layout({ children, rawPageData }: LayoutProps) {
  // Hardcoded global settings for build stability
  const globalData = {
    global: {
      header: {
        name: "Studio Phazant",
        color: "orange",
        icon: {
          name: "Aperture",
          color: "orange",
          style: "float",
        },
        nav: [
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ],
      },
      footer: {
        color: "default",
        social: {
          facebook: "#",
          twitter: "#",
          instagram: "#",
          github: "#",
        },
      },
      theme: {
        color: "orange",
        font: "sans",
        darkMode: "system",
      },
    },
  };

  return (
    <LayoutProvider globalSettings={globalData.global as any} pageData={rawPageData}>
      <Header />
      <main className="overflow-x-hidden pt-20">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
