"use client";
import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import styles from "@/components/portfolio/editorial.module.css";

export function ProjectPageClient({ data, query, variables }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const project = tinaData.project;
  const gallery: string[] = project.gallery?.length ? project.gallery : [project.imageUrl].filter(Boolean);
  const isKube = variables.relativePath === 'bijzettafel.mdx';
  const kubeAlts = [
    'KUBE table with its removable yellow tray in the garden',
    'KUBE stool with its yellow upholstered seat, viewed from the side',
    'Close-up of the yellow tray, handle and elm joinery',
    'KUBE stool with its yellow upholstered seat on the lawn',
    'Overhead view of the KUBE table with its yellow tray',
    'Close-up of the KUBE table tray handle and elm grain',
  ];
  const info = (
    <div className={styles.projectInfo}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <a href={`mailto:info@studiophazant.nl?subject=${encodeURIComponent(project.title)}`}>
        {project.enquiry || "Get in touch about a custom piece or the different possibilities in wood and finish."}
      </a>
    </div>
  );
  const image = (src: string, index: number, className = styles.galleryImage, sizes = '(max-width: 640px) 90vw, 48vw') => (
    <div key={`${src}-${index}`} className={className}>
      <Image src={src} alt={isKube ? kubeAlts[index] || `${project.title} — detail ${index}` : `${project.title} — ${index === 0 ? 'overview' : `detail ${index}`}`} fill
        sizes={sizes} quality={isKube ? 85 : undefined} className="object-cover" priority={index < 2} />
    </div>
  );

  if (isKube) {
    return (
      <article className={styles.kubeGallery}>
        <div className={styles.kubeTopRow}>
          {info}
          {gallery.slice(0, 2).map((src, index) => image(src, index, `${styles.kubeImage} ${index === 0 ? styles.kubeOverview : styles.kubePortrait}`, '(max-width: 640px) 44vw, (max-width: 900px) 30vw, 27vw'))}
        </div>
        <div className={styles.kubeBottomRow}>
          {gallery.slice(2, 4).map((src, index) => image(src, index + 2, `${styles.kubeImage} ${index === 1 ? styles.kubeUpholstered : styles.kubeDetail}`, '(max-width: 640px) 88vw, (max-width: 900px) 50vw, 43vw'))}
        </div>
        {gallery.length > 4 && (
          <div className={styles.kubeExtraRow}>
            {gallery.slice(4).map((src, index) => image(src, index + 4, `${styles.kubeImage} ${styles.kubePortrait}`, '(max-width: 640px) 88vw, (max-width: 900px) 43vw, 37vw'))}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className={`${styles.projectGallery} ${project.galleryLayout === 'wide-left' ? styles.wideLeft : ''}`}>
      {info}
      {gallery.map((src, index) => image(src, index))}
    </article>
  );
}
