"use client";

import { useTina } from "tinacms/dist/react";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioSection } from "@/components/portfolio/portfolio-grid";
import { HomeShowcase } from "@/components/portfolio/home-showcase";

export function HomePageClient({ data, query, variables, furniture, projects }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const home = tinaData.page || {};
  const featuredImages = home.featuredImages || [];

  const furnitureFeature = [
    {
      ...furniture.find((project: { id: string }) => project.id === 'blokstoel'),
      imageUrl: featuredImages[0] || "/uploads/blokstoel_7.jpg",
      imageFrame: { x: 70, y: -265, width: 1330, height: 1773 },
    },
    {
      ...furniture.find((project: { id: string }) => project.id === 'bloktafel'),
      imageUrl: featuredImages[1] || "/uploads/bloktafel_4.jpg",
      imageFrame: { x: -103, y: 45, width: 1773, height: 1330 },
    },
    {
      id: "bijzettafel",
      title: "Bijzettafel",
      category: "furniture",
      imageUrl: featuredImages[2] || "/uploads/bijzettafel_1.jpg",
      imageFrame: { x: 82, y: 48, width: 1313, height: 1322 },
    },
  ];

  return (
    <>
      <Hero imageSrc={home.heroImage || "/uploads/stoelen_4.jpg"} />
      <PortfolioSection id="work" title="Furniture" projects={furnitureFeature} compact />
      <HomeShowcase home={home} projects={projects} />
    </>
  );
}
