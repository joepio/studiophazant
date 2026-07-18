"use client";

import { useTina } from "tinacms/dist/react";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioSection } from "@/components/portfolio/portfolio-grid";
import { TaglineStrip } from "@/components/portfolio/tagline-strip";

export function HomePageClient({ data, query, variables, furniture }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const home = tinaData.page || {};
  const featuredImages = home.featuredImages || [];
  const taglineImages = home.taglineImages || [];

  const furnitureFeature = [
    { ...furniture[0], imageUrl: featuredImages[0] || "/uploads/blokstoel_7.jpg" },
    { ...furniture[2], imageUrl: featuredImages[1] || "/uploads/bloktafel_1.jpg" },
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
      <TaglineStrip
        imageSources={taglineImages}
        title={home.taglineTitle}
        firstCopy={home.taglineFirst}
        secondCopy={home.taglineSecond}
      />
    </>
  );
}
