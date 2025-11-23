import { getAllProjects } from "@/lib/project-loader";
import { SimpleLayout } from "@/components/layout/simple-layout";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";

export default async function Home() {
  const projects = getAllProjects();

  return (
    <SimpleLayout>
      <Hero />
      <PortfolioGrid projects={projects} />
    </SimpleLayout>
  );
}
