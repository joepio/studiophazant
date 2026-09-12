import React from "react";
import { SimpleLayout } from "@/components/layout/simple-layout";
import { notFound } from "next/navigation";
import { ProjectPageClient } from "./client-page";
import { getProjectFiles, getProject } from "@/lib/project-loader";

export async function generateStaticParams() {
  const files = getProjectFiles();
  return files.map((file) => ({
    id: file.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getProjectFiles().includes(`${id}.mdx`)) return {};
  const project = getProject(`${id}.mdx`);
  return { title: project.title, description: project.description, openGraph: { images: [project.imageUrl] } };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // For visual editing to work, we still need to pass the query and variables
  // But for the initial render, we use the filesystem data
  const variables = { relativePath: `${id}.mdx` };
  const query = `
    query Project($relativePath: String!) {
      project(relativePath: $relativePath) {
        title
        category
        description
        imageUrl
        color
        span
        featured
        gallery
        materials
        availability
        enquiry
        galleryLayout
      }
    }
  `;

  try {
    // Read from filesystem instead of client.queries.project(variables)
    const projectData = getProject(`${id}.mdx`);

    // Mock the response structure Tina expects
    const tinaData = {
      project: projectData
    };

    return (
      <SimpleLayout editorial showSalesCta={false}>
        <ProjectPageClient
          data={tinaData}
          query={query}
          variables={variables}
        />
      </SimpleLayout>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
