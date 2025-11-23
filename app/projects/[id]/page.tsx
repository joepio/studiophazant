import React from "react";
import { SimpleLayout } from "@/components/layout/simple-layout";
import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";
import { ProjectPageClient } from "./client-page";

export async function generateStaticParams() {
  const projectsResponse = await client.queries.projectConnection();
  const projects = projectsResponse.data.projectConnection.edges || [];

  return projects.map((edge) => ({
    id: edge?.node?._sys.filename || "",
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

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
      }
    }
  `;

  try {
    const projectResponse = await client.queries.project(variables);

    return (
      <SimpleLayout>
        <ProjectPageClient
          data={projectResponse.data}
          query={query}
          variables={variables}
        />
      </SimpleLayout>
    );
  } catch (error) {
    notFound();
  }
}
