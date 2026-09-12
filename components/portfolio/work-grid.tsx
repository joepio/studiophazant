import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { organicShapes } from "./portfolio-grid";
import styles from "./editorial.module.css";

type WorkProject = { id: string; title: string; imageUrl: string; description?: string; materials?: string; availability?: string };
const positions = [[0, 3], [2, 1], [4, 5], [6, 7], [8, 11], [10, 9]];
const colors = ["#55874a", "#ffe187", "#c1dee2"];
export function WorkGrid({ projects }: { projects: WorkProject[] }) {
  return <div className={styles.workGrid}>
    {projects.map((project, index) => {
      const [imageCell, textCell] = positions[index % 6];
      const rowOffset = Math.floor(index / 6) * 4;
      const placement = (cell: number): CSSProperties => ({'--column': cell % 3 + 1, '--row': rowOffset + Math.floor(cell / 3) + 1} as CSSProperties);
      const organic = [0, 4, 6].includes(index) || (index > 7 && index % 4 === 0);
      const shapeIndex = index === 6 ? 2 : Math.floor(index / 4) % 3;
      const arrow = textCell - imageCell === 3 ? 'up' : imageCell < textCell ? 'left' : 'right';
      return <article className={styles.workPair} key={project.id}>
        <Link href={`/projects/${project.id}`} className={`${styles.workImage} portfolio-tile`} style={{...placement(imageCell), backgroundColor: organic ? colors[shapeIndex] : undefined}} aria-label={project.title}>
          {organic ? <svg viewBox="0 0 1467 1458" role="img" aria-label={project.title}>
            <defs><clipPath id={`work-${project.id}`}><path className="portfolio-tile__shape" d={organicShapes[shapeIndex]} style={{'--shape-base': `path("${organicShapes[shapeIndex]}")`, '--shape-hover': `path("${organicShapes[(shapeIndex + 1) % 3]}")`} as CSSProperties} /></clipPath></defs>
            <image href={project.imageUrl} width="1467" height="1458" preserveAspectRatio="xMidYMid slice" clipPath={`url(#work-${project.id})`} />
          </svg> : <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 640px) 45vw, 30vw" className="object-cover" />}
        </Link>
        <Link href={`/projects/${project.id}`} className={`${styles.workInfo} ${styles[arrow]}`} style={placement(textCell)}>
          <h2>{project.title}</h2><span className={styles.arrow} aria-hidden="true" />
          <p>{project.materials || project.description}</p>
          {project.availability && <p>{project.availability}</p>}
        </Link>
      </article>;
    })}
  </div>;
}
