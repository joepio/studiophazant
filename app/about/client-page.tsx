"use client";
import { useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import Image from 'next/image';
import { Monogram } from '@/components/portfolio/monogram';
import styles from '@/components/portfolio/editorial.module.css';

export function AboutPageClient({data, query, variables}: any) {
  const {data: tinaData} = useTina({data, query, variables});
  const [language, setLanguage] = useState<'en' | 'nl'>('en');
  const page = tinaData.page;
  const copy = language === 'en' ? page.aboutEnglish : page.aboutDutch;
  return <article className={styles.about} lang={language}>
    <h1 className="sr-only">{language === 'en' ? 'About Studio Phazant' : 'Over Studio Phazant'}</h1>
    <div className={styles.aboutHero}><Image src={page.aboutImage || '/uploads/about_stoel.jpg'} alt="Kristian, founder of Studio Phazant, sitting on his handmade chair" fill priority sizes="86vw" className="object-cover" /></div>
    <div className={styles.language} role="group" aria-label="Language">
      <button type="button" lang="en" onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>English</button>
      <button type="button" lang="nl" onClick={() => setLanguage('nl')} aria-pressed={language === 'nl'}>Nederlands</button>
    </div>
    <div className={styles.aboutCopy}>
      {(copy || '').split('\n\n').filter(Boolean).map((paragraph: string, i: number) => <p key={i}>{paragraph}</p>)}
      <a className="underline underline-offset-4" href="mailto:info@studiophazant.nl">{language === 'en' ? 'Get in touch' : 'Neem contact op'}</a>
    </div>
    <div className={styles.aboutBadge}><Monogram withText={false} size="xl" color="#55874a" /></div>
  </article>;
}
