import { SimpleLayout } from '@/components/layout/simple-layout';
import { WorkGrid } from '@/components/portfolio/work-grid';
import { getWorkProjects } from '@/lib/project-loader';

export default async function WorkPage() {
  // The work overview follows the eight-piece arrangement in the studio design.
  // Other projects remain available on their individual pages and elsewhere on the site.
  const projects = getWorkProjects();

  return (
    <SimpleLayout editorial showSalesCta={false}>
      <h1 className="sr-only">Handmade furniture, interiors and objects</h1>
      <WorkGrid projects={projects} />
    </SimpleLayout>
  );
}
