"use client";

import Image from "next/image";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { Monogram } from "./monogram";
import styles from "./home-showcase.module.css";

type Project = { id: string; title: string; imageUrl: string };
type HomeContent = {
  carouselItems?: { image?: string; alt?: string; project?: { title?: string; _sys?: { filename?: string } } | null }[];
  spotlightImage?: string; spotlightAlt?: string; spotlightVideo?: string;
  carouselTitle?: string; contactImage?: string; contactPortrait?: string;
  contactText?: string; contactLabel?: string; studioImage?: string; studioCopy?: string;
};

export function HomeShowcase({ home, projects }: { home: HomeContent; projects: Project[] }) {
  const spotlight = home.spotlightImage || "/uploads/tafel_2.jpg";
  const carousel = home.carouselItems == null
    ? projects.map(project => ({image: project.imageUrl, alt: project.title, project: {title: project.title, _sys: {filename: project.id}}}))
    : home.carouselItems;
  return (
    <div className={styles.showcase}>
      <section className={styles.spotlight} aria-label="Recently made at Studio Phazant">
        {home.spotlightVideo ? (
          <video className={styles.video} controls playsInline preload="none" poster={spotlight}
            src={home.spotlightVideo} aria-label={home.spotlightAlt || "Highlighted project"} />
        ) : (
          <Image src={spotlight} alt={home.spotlightAlt || "Handmade wooden table by Studio Phazant"}
            fill sizes="(min-width: 1440px) 1100px, 78vw" className={styles.cover} />
        )}
      </section>

      {carousel.length > 0 && <section className={styles.projects} aria-label="All projects">
        <div id="home-project-carousel" className={styles.track} tabIndex={0}
          aria-label="Project carousel — scroll to explore">
          {carousel.map((item, index) => (
            <div className={styles.projectPair} key={index}>
              {index === Math.min(3, carousel.length - 1) && (
                <h2 className={`${styles.carouselTitle} font-script`}>
                  {home.carouselTitle || "Custom\nFurniture,\nInteriors,\nObjects."}
                </h2>
              )}
              {item.image && <Link href={item.project?._sys?.filename ? `/projects/${item.project._sys.filename}` : '/work'} className={styles.project} aria-label={item.alt || item.project?.title} data-tina-field={tinaField(item, 'image')}>
                <Image src={item.image} alt={item.alt || item.project?.title || 'Studio Phazant project'} fill
                  sizes="(max-width: 600px) 30vw, 19vw" className={styles.cover} />
              </Link>}
            </div>
          ))}
        </div>
      </section>}

      <section id="contact" className={styles.contact} aria-label="Discuss your custom furniture project">
        <Image src={home.contactImage || "/uploads/achtergrond_1.jpg"} alt="" fill sizes="100vw" className={styles.cover} />
        <div className={styles.contactInner}>
          <div className={`${styles.invitation} font-script`}>
            <h2>{home.contactText || "Have an idea, a question\nor a project in mind?"}</h2>
            <a href="mailto:info@studiophazant.nl">{home.contactLabel || "Let's talk"}</a>
          </div>
          <div className={styles.portrait}>
            <Image src={home.contactPortrait || "/uploads/about_stoel.jpg"} alt="Kristian Kodde of Studio Phazant" fill sizes="(max-width: 600px) 30vw, 28vw" className={styles.cover} />
          </div>
        </div>
      </section>

      <footer className={styles.studio}>
        <div className={styles.studioIdentity}>
          <Link href="/" aria-label="Studio Phazant home"><Monogram size="xl" withText={false} /></Link>
          <p className="font-ui-sans">{home.studioCopy || "Meubelmaker in Noord-Holland. Maatwerk meubels, interieurs en objecten, met aandacht voor vakmanschap en duurzaam hout."}</p>
          <a className="font-ui-sans" href="mailto:info@studiophazant.nl">Get in touch</a>
        </div>
        <div className={styles.workshop}>
          <Image src={home.studioImage || "/uploads/hout_1.jpg"} alt="Woodworking tools and boards in the Studio Phazant workshop" fill sizes="(max-width: 600px) 50vw, 40vw" className={styles.cover} />
        </div>
      </footer>
    </div>
  );
}
