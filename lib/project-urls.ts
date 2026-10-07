// Preserve content IDs for CMS references and gallery styling.
export const projectSlugs: Record<string, string> = {
  bijzettafel: 'kube-stool', blokstoel: 'patchwork-chair',
  bloktafel: 'cocktail-cabinet', loungestoelen: 'primo-chair',
  eettafel: 'coffee-table', 'lijst-klein': 'custom-frames',
  'staande-lamp': 'lykt-floor-lamp', kubuslamp: 'kube-table-lamp',
};
export function getProjectUrl(id: string) { return `/projects/${projectSlugs[id] || id}`; }
export function getProjectId(slug: string) { return Object.keys(projectSlugs).find(id => projectSlugs[id] === slug) || slug; }
