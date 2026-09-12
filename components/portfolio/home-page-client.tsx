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
    { ...furniture.find((project: { id: string }) => project.id === 'blokstoel'), imageUrl: featuredImages[0] || "/uploads/blokstoel_7.jpg" },
    { ...furniture.find((project: { id: string }) => project.id === 'bloktafel'), imageUrl: featuredImages[1] || "/uploads/bloktafel_1.jpg" },
    {
      id: "bijzettafel",
      title: "Bijzettafel",
      category: "furniture",
      imageUrl: featuredImages[2] || "/uploads/bijzettafel_1.jpg",
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
