import React from "react";
import { SimpleLayout } from "@/components/layout/simple-layout";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import client from "@/tina/__generated__/client";

export default async function Home() {
  // Fetch all projects from TinaCMS
  const projectsResponse = await client.queries.projectConnection();

  const projects = projectsResponse.data.projectConnection.edges?.map((edge) => ({
    id: edge?.node?._sys.filename || "",
    title: edge?.node?.title || "",
    category: edge?.node?.category || "",
    imageUrl: edge?.node?.imageUrl || "",
    color: edge?.node?.color || "bg-primary",
    span: edge?.node?.span || "col-span-1",
  })) || [];

  return (
    <SimpleLayout>
      <Hero />
      <PortfolioGrid projects={projects} />
    </SimpleLayout>
  );
}
