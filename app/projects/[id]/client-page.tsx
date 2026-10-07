"use client";
import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import styles from "@/components/portfolio/editorial.module.css";

export function ProjectPageClient({ data, query, variables }: any) {
  const { data: tinaData } = useTina({ query, variables, data });
  const project = tinaData.project;
  const gallery: string[] = project.gallery?.length ? project.gallery : [project.imageUrl].filter(Boolean);
  const isKube = variables.relativePath === 'bijzettafel.mdx';
  const isPatchwork = variables.relativePath === 'blokstoel.mdx';
  const isCocktail = variables.relativePath === 'bloktafel.mdx';
  const isPrimo = variables.relativePath === 'loungestoelen.mdx';
  const isCoffee = variables.relativePath === 'eettafel.mdx';
  const isFrames = variables.relativePath === 'lijst-klein.mdx';
  const isLykt = variables.relativePath === 'staande-lamp.mdx';
  const isKubeLamp = variables.relativePath === 'kubuslamp.mdx';
  const kubeAlts = [
    'KUBE table with its removable yellow tray in the garden',
    'KUBE stool with its yellow upholstered seat, viewed from the side',
    'Close-up of the yellow tray, handle and elm joinery',
    'KUBE stool with its yellow upholstered seat on the lawn',
    'Overhead view of the KUBE table with its yellow tray',
    'Close-up of the KUBE table tray handle and elm grain',
  ];
  const patchworkAlts = [
    'Full Patchwork Chair with white upholstery on the lawn',
    'Detail of the chair backrest, seat and pine frame',
    'Close-up of the bouclé backrest and pine joinery',
    'Detail of the patchwork pine panels below the seat',
    'Detail of the geometric patchwork wood on the chair side',
    'Full side view of the Patchwork Chair among ferns',
    'Close-up of the upholstered seat and pine frame',
  ];
  const info = (
    <div className={styles.projectInfo}>
      <h1>{project.title}</h1>
      {project.description && <p>{project.description}</p>}
      <a href={`mailto:info@studiophazant.nl?subject=${encodeURIComponent(project.title)}`}>
        {variables.relativePath === 'lijst-klein.mdx' ? 'get in touch about a custom frame to fit your favourite artwork' : project.enquiry || "Get in touch about a custom piece or the different possibilities in wood and finish."}
      </a>
    </div>
  );
  const image = (src: string, index: number, className = styles.galleryImage, sizes = '(max-width: 640px) 90vw, 48vw') => (
    <div key={`${src}-${index}`} className={`${className} ${isKubeLamp && index === 2 ? styles.lampWideDetail : isKubeLamp && index === 3 ? styles.lampBesideDetail : ''}`}>
      {isLykt && src === '/uploads/work-lykt-floor-lamp.jpg' ? <svg viewBox="0 0 1467 1458" width="100%" height="100%" role="img" aria-label="LYKT Floor Lamp">
        <image href={src} y={40} width="1467" height="1458" preserveAspectRatio="xMidYMin slice" />
      </svg> : <>
      <Image src={src} alt={isKube ? kubeAlts[index] || `${project.title} — detail ${index}` : isPatchwork ? patchworkAlts[index] || `${project.title} — detail ${index}` : `${project.title} — ${index === 0 ? 'overview' : `detail ${index}`}`} fill
        sizes={sizes} quality={isKube || isPatchwork || isCocktail ? 85 : undefined} className="object-cover" style={isKubeLamp && src === '/uploads/lamp9.jpg' ? { objectPosition: 'center 75%', filter: 'brightness(1.2)' } : isPatchwork ? { transform: src === '/uploads/patchwork-chair-p1010036.webp' ? 'scaleX(-1)' : ['/uploads/patchwork-chair-p1010016.webp', '/uploads/patchwork-chair-p1010011.webp'].includes(src) ? 'scale(1.08)' : undefined } : isCocktail && index < 2 ? { objectPosition: index === 0 ? 'center 95%' : 'center 65%', transform: index === 0 ? 'scale(1.15)' : undefined } : undefined} priority={index < 2} />
      </>}
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
    <article className={`${styles.projectGallery} ${project.galleryLayout === 'wide-left' ? styles.wideLeft : ''} ${isPatchwork ? styles.patchworkGallery : ''} ${isCocktail ? styles.cocktailGallery : ''} ${isLykt ? styles.lyktGallery : ''}`}>
      {info}
      {gallery.map((src, index) => image(src, index, `${styles.galleryImage} ${isFrames ? styles.frameImage : ''} ${isPrimo ? styles.primoImage : ''} ${isCoffee ? (src === '/uploads/coffee-table-p1010002.webp' ? styles.coffeeWide : src === '/uploads/coffee-table-p1010046.webp' ? styles.coffeeLandscape : styles.coffeePortrait) : ''}`))}
    </article>
  );
}
