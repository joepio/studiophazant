import React from "react";
import Image from "next/image";
import { SHOW_ABOUT } from "@/lib/site-config";

const images = [
  {
    src: "/uploads/bloktafel_4.jpg",
    alt: "Handmade wooden furniture",
    className: "tagline-strip__image tagline-strip__image--one",
  },
  {
    src: "/uploads/hout_1.jpg",
    alt: "Woodworking tools and prepared boards in the studio",
    className: "tagline-strip__image tagline-strip__image--two",
  },
  {
    src: "/uploads/hout_2.jpg",
    alt: "Locally sourced live-edge boards",
    className: "tagline-strip__image tagline-strip__image--three",
  },
  {
    src: "/uploads/about_stoel.jpg",
    alt: "Kristian Kodde sitting on his wooden chair",
    className: "tagline-strip__image tagline-strip__image--four",
  },
];

export function TaglineStrip({
  imageSources,
  title = "Custom\nFurniture,\nInterior,\nObjects.",
  firstCopy = "Designed and handmade with a focus on craftsmanship and sustainability.",
  secondCopy = "Every piece is unique and made to last using reclaimed and locally sourced wood.",
}: {
  imageSources?: string[];
  title?: string;
  firstCopy?: string;
  secondCopy?: string;
}) {
  const sectionImages = images.map((image, index) => ({
    ...image,
    src: imageSources?.[index] || image.src,
  }));
  const titleLines = title.split("\n").filter(Boolean);

  return (
    <section id="interiors" className="tagline-strip">
      <div className="tagline-strip__canvas tagline-strip__desktop">
        <div className="tagline-strip__band tagline-strip__band--blue" />
        <div className="tagline-strip__band tagline-strip__band--yellow" />

        {sectionImages.map((image) => (
          <div className={image.className} key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 26rem, 70vw"
              className="object-cover"
            />
          </div>
        ))}

        <h2 className="tagline-strip__title">
          {titleLines.map((line, index) => (
            <React.Fragment key={`${line}-${index}`}>
              {index > 0 && <br />}
              <span className={index === 0 ? "tagline-strip__title-custom" : undefined}>{line}</span>
            </React.Fragment>
          ))}
        </h2>

        <p className="tagline-strip__copy">
          <span className="tagline-strip__copy-first">
            {firstCopy}
          </span>
          <br />
          <span className="tagline-strip__copy-second">
            {secondCopy}
          </span>
        </p>

        {SHOW_ABOUT && (
          <a href="/about" className="tagline-strip__link">
            More about Studio Phazant
          </a>
        )}
      </div>

      <div className="tagline-strip__mobile">
        <div className="tagline-strip__mobile-identity">
          <div className="tagline-strip__mobile-image">
            <Image
              src={sectionImages[0].src}
              alt={sectionImages[0].alt}
              fill
              sizes="48vw"
              className="object-cover"
            />
          </div>
          <h2 className="tagline-strip__mobile-title">
            {titleLines.map((line, index) => (
              <React.Fragment key={`${line}-mobile-${index}`}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h2>
        </div>

        <div className="tagline-strip__mobile-feature">
          <div className="tagline-strip__mobile-color tagline-strip__mobile-color--yellow" />
          <div className="tagline-strip__mobile-image">
            <Image
              src={sectionImages[1].src}
              alt={sectionImages[1].alt}
              fill
              sizes="58vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="tagline-strip__mobile-copy">
          {firstCopy}
        </p>

        <div className="tagline-strip__mobile-materials">
          <div className="tagline-strip__mobile-image">
            <Image
              src={sectionImages[2].src}
              alt={sectionImages[2].alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
          <div className="tagline-strip__mobile-color tagline-strip__mobile-color--blue" />
          <div className="tagline-strip__mobile-image">
            <Image
              src={sectionImages[3].src}
              alt={sectionImages[3].alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </div>

        <p className="tagline-strip__mobile-copy">
          {secondCopy}
        </p>

        {SHOW_ABOUT && (
          <a href="/about" className="tagline-strip__mobile-link">
            More about Studio Phazant
          </a>
        )}
      </div>
    </section>
  );
}
