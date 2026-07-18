import { SimpleLayout } from '@/components/layout/simple-layout';
import { PortfolioSection } from '@/components/portfolio/portfolio-grid';
import { getAllProjects } from '@/lib/project-loader';

export default async function WorkPage() {
  const projects = getAllProjects();

  return (
    <SimpleLayout>
      <PortfolioSection title='' projects={projects} compact fullBleed />
    </SimpleLayout>
  );
}
