'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectUrl } from '@/lib/project-urls';
import { tinaField } from 'tinacms/dist/react';
import styles from './home-showcase.module.css';
import { Monogram } from './monogram';

type Project = { id: string; title: string; imageUrl: string; imagePosition?: string; imageScale?: number; imageOffsetY?: number; imageAlignment?: string };
type HomeContent = {
  carouselItems?: { image?: string; alt?: string; project?: { title?: string; _sys?: { filename?: string } } | null }[];
  spotlightImage?: string;
  spotlightAlt?: string;
  spotlightVideo?: string;
  carouselTitle?: string;
  contactImage?: string;
  contactPortrait?: string;
  contactText?: string;
  contactLabel?: string;
  studioImage?: string;
  studioCopy?: string;
};

export function HomeShowcase({ home, projects }: { home: HomeContent; projects: Project[] }) {
  const projectStripRef = useRef<HTMLDivElement>(null);
  const spotlight = home.spotlightImage || '/uploads/home-cabinet-blue-pot-rug.png';
  const carousel = projects.map(project => ({ ...project, image: project.imageUrl, alt: project.title, project: { title: project.title, _sys: { filename: project.id } } }));

  useEffect(() => {
    const strip = projectStripRef.current;
    if (!strip) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    let frame = 0;
    let previousTime = 0;
    let pointerPosition = 0.5;
    let hovering = false;
    let pressed = false;
    let dragging = false;
    let pressX = 0;
    let pressScroll = 0;
    let suppressClick = false;
    let clickTimer = 0;

    const drift = (time: number) => {
      if (!hovering || pressed || reducedMotion.matches || !canHover.matches) return;

      const maxScroll = strip.scrollWidth - strip.clientWidth;
      if (maxScroll <= 0) return;

      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      const speed = 18 + (pointerPosition - 0.5) * 180;
      strip.scrollLeft = Math.max(0, Math.min(maxScroll, strip.scrollLeft + speed * elapsed / 1000));
      frame = window.requestAnimationFrame(drift);
    };

    const updatePointerPosition = (event: MouseEvent | PointerEvent) => {
      const bounds = strip.getBoundingClientRect();
      pointerPosition = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    };
    const start = (event: MouseEvent) => {
      if (reducedMotion.matches || !canHover.matches) return;
      updatePointerPosition(event);
      hovering = true;
      strip.style.scrollSnapType = 'none';
      previousTime = 0;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(drift);
    };
    const stop = () => {
      hovering = false;
      window.cancelAnimationFrame(frame);
      if (!dragging) {
        pressed = false;
        strip.style.scrollSnapType = '';
      }
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      pressed = true;
      dragging = false;
      pressX = event.clientX;
      pressScroll = strip.scrollLeft;
      strip.style.scrollSnapType = 'none';
      window.cancelAnimationFrame(frame);
    };
    const pointerMove = (event: PointerEvent) => {
      updatePointerPosition(event);
      if (!pressed) return;
      const distance = event.clientX - pressX;
      if (!dragging && Math.abs(distance) > 5) {
        dragging = true;
        strip.dataset.dragging = 'true';
        strip.setPointerCapture(event.pointerId);
      }
      if (dragging) {
        strip.scrollLeft = pressScroll - distance;
        event.preventDefault();
      }
    };
    const pointerUp = (event: PointerEvent) => {
      if (!pressed) return;
      pressed = false;
      if (dragging) {
        suppressClick = true;
        window.clearTimeout(clickTimer);
        clickTimer = window.setTimeout(() => { suppressClick = false; }, 0);
        dragging = false;
        delete strip.dataset.dragging;
        if (strip.hasPointerCapture(event.pointerId)) strip.releasePointerCapture(event.pointerId);
      }
      if (!hovering) strip.style.scrollSnapType = '';
      if (hovering) {
        previousTime = 0;
        frame = window.requestAnimationFrame(drift);
      }
    };
    const preventDraggedClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };

    strip.addEventListener('mouseenter', start);
    strip.addEventListener('mouseleave', stop);
    strip.addEventListener('pointerdown', pointerDown);
    strip.addEventListener('pointermove', pointerMove);
    strip.addEventListener('pointerup', pointerUp);
    strip.addEventListener('pointercancel', pointerUp);
    strip.addEventListener('click', preventDraggedClick, true);
    return () => {
      stop();
      window.clearTimeout(clickTimer);
      delete strip.dataset.dragging;
      strip.removeEventListener('mouseenter', start);
      strip.removeEventListener('mouseleave', stop);
      strip.removeEventListener('pointerdown', pointerDown);
      strip.removeEventListener('pointermove', pointerMove);
      strip.removeEventListener('pointerup', pointerUp);
      strip.removeEventListener('pointercancel', pointerUp);
      strip.removeEventListener('click', preventDraggedClick, true);
    };
  }, [carousel.length]);

  return (
    <div className={styles.showcase}>
      <section className={styles.feature} aria-label='Recently made at Studio Phazant'>
        <div className={styles.featurePanel}>
          <div className={styles.spotlight}>
            {home.spotlightVideo ? (
              <video
                className={styles.video}
                controls
                playsInline
                preload='none'
                poster={spotlight}
                src={home.spotlightVideo}
                aria-label={home.spotlightAlt || 'Highlighted project'}
              />
            ) : (
              <Image
                src={spotlight}
                alt={home.spotlightAlt || 'Custom wooden record cabinet by Studio Phazant'}
                fill
                sizes='(max-width: 600px) 90vw, 55vw'
                className={styles.cover}
              />
            )}
            <h2 className={`${styles.featureTitle} font-script`}>
              <Link href='/work' className={styles.featureTitleLink} aria-label='Custom furniture, interiors, and objects — view our work'>
                <span aria-hidden='true'>"Custom</span>
                <span aria-hidden='true'>Furniture,</span>
                <span aria-hidden='true'>Interiors,</span>
                <span aria-hidden='true'>Objects"</span>
              </Link>
            </h2>
          </div>
        </div>
      </section>

      {carousel.length > 0 && (
        <section className={styles.projects} aria-label='Project slider'>
          <div ref={projectStripRef} className={styles.projectStrip} tabIndex={0} aria-label='Project slider — scroll or drag to explore'>
            {carousel.map((item, index) =>
              item.image ? (
                <Link
                  href={item.project?._sys?.filename ? getProjectUrl(item.project._sys.filename) : '/work'}
                  className={styles.project}
                  key={index}
                  aria-label={item.alt || item.project?.title}
                  data-tina-field={tinaField(item, 'image')}
                  draggable={false}
                >
                  {item.imageAlignment ? <svg viewBox="0 0 1467 1458" width="100%" height="100%" role="img" aria-label={item.alt}>
                    <image href={item.image} y={item.imageOffsetY ?? 0} width="1467" height="1458" preserveAspectRatio={item.imageAlignment} />
                  </svg> : <Image
                    src={item.image}
                    alt={item.alt || item.project?.title || 'Studio Phazant project'}
                    fill
                    sizes='(max-width: 700px) 28vw, 18vw'
                    className={styles.cover}
                    style={{ objectPosition: item.imagePosition, transform: `scale(${item.imageScale ?? 1})`, transformOrigin: item.imageScale ? 'center bottom' : 'center' }}
                    draggable={false}
                  />}
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}

      <section id='contact' className={styles.contact} aria-label='Discuss your custom furniture project'>
        <Image src={home.contactImage || '/uploads/achtergrond_1.jpg'} alt='' fill sizes='100vw' className={styles.cover} />
        <div className={styles.contactInner}>
          <div className={`${styles.invitation} font-script`}>
            <h2>
              {(home.contactText || 'Have an idea, a question\nor a project in mind?').split('\n').map((line, index) => (
                <span className={styles.invitationLine} key={`${index}-${line}`}>{line}</span>
              ))}
            </h2>
            <a href='mailto:info@studiophazant.nl'>{home.contactLabel || "Let's talk"}</a>
          </div>
          <Link href='/about' className={styles.portrait}>
            <Image
              src={home.contactPortrait || '/uploads/about_stoel.jpg'}
              alt='Kristian Kodde of Studio Phazant'
              fill
              sizes='(max-width: 600px) 30vw, 28vw'
              className={styles.cover}
            />
          </Link>
        </div>
      </section>

      <footer className={styles.studio}>
        <div className={styles.workshop}>
          <Image
            src={home.studioImage || '/uploads/hout_1.jpg'}
            alt='Woodworking tools and boards in the Studio Phazant workshop'
            fill
            sizes='(max-width: 600px) 80vw, 40vw'
            className={styles.cover}
          />
        </div>
        <div className={styles.studioIdentity}>
          <Link href='/' aria-label='Studio Phazant home'>
            <Monogram className={styles.studioLogo} size='xl' withText={false} color='#ffe28a' />
          </Link>
          <p className='font-ui-sans'>
            {(home.studioCopy || 'Meubelmaker in Noord-Holland. Maatwerk meubels, interieurs en objecten, met aandacht voor vakmanschap en duurzaam hout.').split('\n').map((line, index) => (
              <span key={index}>{index > 0 && '\n'}{line.trim() === 'Studio Phazant' ? <span className={`font-script ${styles.studioName}`}>{line}</span> : line.includes('info@studiophazant.nl') ? <>{line.split('info@studiophazant.nl')[0]}<a className={styles.studioEmail} href='mailto:info@studiophazant.nl'>info@studiophazant.nl</a>{line.split('info@studiophazant.nl')[1]}</> : line.includes('@studiophazant') ? <>{line.split('@studiophazant')[0]}<a className={styles.studioEmail} href='https://www.instagram.com/studiophazant/' target='_blank' rel='noopener noreferrer'>@studiophazant</a>{line.split('@studiophazant')[1]}</> : line}</span>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
