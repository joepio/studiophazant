import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");
const pagesDirectory = path.join(process.cwd(), "content/pages");

export function getPage(slug: string) {
  const filepath = path.join(pagesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return {};
  const { data, content } = matter(fs.readFileSync(filepath, "utf8"));
  return { ...data, _body: content };
}

export function getProjectFiles() {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getProject(filename: string) {
  const fullPath = path.join(projectsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const gallery: string[] =
    Array.isArray(data.gallery) && data.gallery.length > 0
      ? data.gallery
      : data.imageUrl
        ? [data.imageUrl]
        : [];

  return {
    id: filename.replace(/\.mdx$/, ""),
    ...data,
    _body: content,
    title: data.title,
    workOrder: data.workOrder,
    materials: data.materials,
    availability: data.availability,
    enquiry: data.enquiry,
    galleryLayout: data.galleryLayout,
    category: data.category,
    description: data.description,
    imageUrl: data.imageUrl,
    color: data.color,
    span: data.span,
    featured: data.featured,
    gallery,
  };
}

export function getAllProjects() {
  const files = getProjectFiles();
  const projects = files.map((file) => getProject(file));
  // featured first, then alphabetical by title
  return projects.sort((a: any, b: any) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return String(a.title).localeCompare(String(b.title));
  });
}

export function getProjectsByCategory(category: string) {
  return getAllProjects().filter(
    (p: any) => String(p.category).toLowerCase() === category.toLowerCase(),
  );
}

export function getWorkProjects() {
  const overview = [
    { id: 'bijzettafel', title: 'KUBE STOOL' },
    { id: 'blokstoel', imageUrl: '/uploads/blokstoel_7.jpg', imagePosition: 'center 56%' },
    { id: 'bloktafel', imageUrl: '/uploads/bloktafel_4.jpg' },
    { id: 'loungestoelen', imageUrl: '/uploads/stoelen_6.jpg', imagePosition: 'center bottom', imageScale: 1.4 },
    { id: 'eettafel', imageUrl: '/uploads/tafel_1.jpg' },
    { id: 'lijst-klein', imageUrl: '/uploads/work-custom-frames-selected.jpg' },
    { id: 'staande-lamp', imageUrl: '/uploads/work-lykt-floor-lamp.jpg', imageOffsetY: 40, imageAlignment: 'xMidYMin slice' },
    { id: 'kubuslamp', imageUrl: '/uploads/work-kube-table-lamp.jpg', imagePosition: '40% center' },
  ];
  const allProjects = new Map(getAllProjects().map(project => [project.id, project]));
  return overview.flatMap(({ id, ...overrides }) => {
    const project = allProjects.get(id);
    return project ? [{ ...project, ...overrides }] : [];
  });
}
