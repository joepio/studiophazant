import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { Hero } from "@/components/portfolio/hero";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";

export const revalidate = 300;

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <Hero />
      <PortfolioGrid />
    </Layout>
  );
}
