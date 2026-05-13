import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

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
