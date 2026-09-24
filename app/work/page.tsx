import { SimpleLayout } from '@/components/layout/simple-layout';
import { WorkGrid } from '@/components/portfolio/work-grid';
import { getAllProjects } from '@/lib/project-loader';

export default async function WorkPage() {
  // The work overview follows the eight-piece arrangement in the studio design.
  // Other projects remain available on their individual pages and elsewhere on the site.
  const overview = [
    { id: 'bijzettafel', title: 'KUBE STOOL' },
    { id: 'blokstoel', imageUrl: '/uploads/blokstoel_7.jpg', imagePosition: 'center 56%' },
    { id: 'bloktafel', imageUrl: '/uploads/bloktafel_4.jpg' },
    { id: 'loungestoelen', imageUrl: '/uploads/stoelen_6.jpg', imagePosition: 'center bottom', imageScale: 1.4 },
    { id: 'eettafel', imageUrl: '/uploads/tafel_1.jpg' },
    { id: 'lijst-klein', imageUrl: '/uploads/work-custom-frames-selected.jpg' },
    { id: 'staande-lamp', imageUrl: '/uploads/lamp_hoog_1.jpg' },
    { id: 'kubuslamp', imageUrl: '/uploads/work-kube-table-lamp.jpg', imagePosition: '40% center' },
  ];
  const allProjects = new Map(getAllProjects().map((project) => [project.id, project]));
  const projects = overview.flatMap(({ id, ...overrides }) => {
    const project = allProjects.get(id);
    return project ? [{ ...project, ...overrides }] : [];
  });

  return (
    <SimpleLayout editorial showSalesCta={false}>
      <h1 className="sr-only">Handmade furniture, interiors and objects</h1>
      <WorkGrid projects={projects} />
    </SimpleLayout>
  );
}
