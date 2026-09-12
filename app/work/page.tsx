import { SimpleLayout } from '@/components/layout/simple-layout';
import { WorkGrid } from '@/components/portfolio/work-grid';
import { getAllProjects } from '@/lib/project-loader';

export default async function WorkPage() {
  const projects = getAllProjects().sort((a, b) => (a.workOrder ?? 100) - (b.workOrder ?? 100));

  return (
    <SimpleLayout editorial showSalesCta={false}>
      <h1 className="sr-only">Handmade furniture, interiors and objects</h1>
      <WorkGrid projects={projects} />
    </SimpleLayout>
  );
}
