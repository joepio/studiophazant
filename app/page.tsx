import React from "react";
import { SimpleLayout } from "@/components/layout/simple-layout";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";



export default function Home() {
  return (
    <SimpleLayout>
      <Hero />
      <PortfolioGrid />
    </SimpleLayout>
  );
}
