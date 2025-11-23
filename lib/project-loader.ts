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

  return {
    id: filename.replace(/\.mdx$/, ""),
    ...data,
    _body: content, // Pass raw content as _body for now, or process it if needed
    // Map frontmatter fields to match what the component expects
    title: data.title,
    category: data.category,
    description: data.description,
    imageUrl: data.imageUrl,
    color: data.color,
    span: data.span,
    featured: data.featured,
  };
}

export function getAllProjects() {
  const files = getProjectFiles();
  const projects = files.map((file) => getProject(file));
  return projects;
}
