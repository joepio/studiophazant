import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SimpleLayout } from "@/components/layout/simple-layout";

// Duplicated for now, should be shared
const SAMPLE_ITEMS = [
  {
    id: "1",
    title: "Grafische Posters",
    category: "Print Design",
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad602110a5c5?w=800&q=80",
    description: "A collection of graphic posters exploring typography and color.",
  },
  {
    id: "2",
    title: "Design Verpakking",
    category: "Packaging",
    imageUrl: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=800&q=80",
    description: "Sustainable packaging design for a modern lifestyle brand.",
  },
  {
    id: "3",
    title: "Fotografie Inspiratie",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1554048612-387768052bf7?w=800&q=80",
    description: "Exploring light and shadow through analog photography.",
  },
  {
    id: "4",
    title: "Muted Black",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    description: "Minimalist branding identity for a boutique architecture firm.",
  },
  {
    id: "5",
    title: "Slowtide X Old Pal",
    category: "Collaboration",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    description: "A collaborative project merging surf culture with vintage aesthetics.",
  },
  {
    id: "6",
    title: "May Palette",
    category: "Color Study",
    imageUrl: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80",
    description: "An exploration of spring color palettes and textures.",
  },
  {
    id: "7",
    title: "Guadachi",
    category: "Identity",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    description: "Brand identity for a Mexican fusion restaurant.",
  },
];

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = SAMPLE_ITEMS.find((item) => item.id === id);

  if (!project) {
    return (
      <SimpleLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </SimpleLayout>
    );
  }

  return (
    <SimpleLayout>
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
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
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </article>
    </SimpleLayout>
  );
}
