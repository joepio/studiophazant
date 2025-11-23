"use client";

import { useTina } from "tinacms/dist/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function ProjectPageClient({ data, query, variables }: any) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const project = tinaData.project;

  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      <Link
        href="/"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Link>

      <header className="mb-12">
        <span className="text-sm font-medium uppercase tracking-widest text-primary mb-4 block">
          {project.category}
        </span>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-foreground">
          {project.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {project.description}
        </p>
      </header>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted">
        <Image
          src={project.imageUrl || ""}
          alt={project.title || ""}
          fill
          className="object-cover"
          priority
        />
      </div>
    </article>
  );
}
