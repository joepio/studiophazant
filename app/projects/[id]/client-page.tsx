"use client";
import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import styles from "@/components/portfolio/editorial.module.css";

export function ProjectPageClient({ data, query, variables }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const project = tinaData.project;
  const gallery: string[] = project.gallery?.length ? project.gallery : [project.imageUrl].filter(Boolean);
  return (
    <article className={`${styles.projectGallery} ${project.galleryLayout === 'wide-left' ? styles.wideLeft : ''}`}>
      <div className={styles.projectInfo}>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <a href={`mailto:info@studiophazant.nl?subject=${encodeURIComponent(project.title)}`}>
          {project.enquiry || "Get in touch about a custom piece or the different possibilities in wood and finish."}
        </a>
      </div>
      {gallery.map((src, index) => (
        <div key={`${src}-${index}`} className={styles.galleryImage}>
          <Image src={src} alt={`${project.title} — ${index === 0 ? 'overview' : `detail ${index}`}`} fill
            sizes="(max-width: 640px) 90vw, 48vw" className="object-cover" priority={index < 2} />
        </div>
      ))}
    </article>
  );
}
