import { getProjectsByCategory } from "@/lib/project-loader";
import { SimpleLayout } from "@/components/layout/simple-layout";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioSection } from "@/components/portfolio/portfolio-grid";
import { TaglineStrip } from "@/components/portfolio/tagline-strip";
import { AboutTeaser } from "@/components/portfolio/about-teaser";

export default async function Home() {
  const furniture = getProjectsByCategory("furniture");
  const objects = getProjectsByCategory("objects");

  return (
    <SimpleLayout>
      <Hero />
      <TaglineStrip />
      <PortfolioSection id="furniture" title="Furniture" projects={furniture} />
      <PortfolioSection id="objects" title="Objects" projects={objects} />
      <AboutTeaser />
    </SimpleLayout>
  );
}
