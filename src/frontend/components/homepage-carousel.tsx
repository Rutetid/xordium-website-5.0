"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import { FALLBACK_CAROUSEL } from "@/data/site-config";

type CarouselImage = {
  id: string;
  altText: string;
};

// Seconds of travel per image — keeps the glide slow no matter how many
// photos are in the carousel.
const SECONDS_PER_IMAGE = 6;

function fallbackImages(): CarouselImage[] {
  return FALLBACK_CAROUSEL.map((id) => ({
    id,
    altText: "Xordium archive frame",
  }));
}

// Archive marquee inside a CRT bezel: REC dot, fake timestamp and
// scanline overlay. Known public/carousel frames show immediately;
// the filesystem API replaces them when it answers.
export default function HomepageCarousel() {
  const [images, setImages] = useState<CarouselImage[]>(fallbackImages);

  useEffect(() => {
    fetch("/api/carousel")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: CarouselImage[]) => {
        if (Array.isArray(data) && data.length > 0) setImages(data);
      })
      .catch(() => {
        // Keep the hardcoded frames.
      });
  }, []);

  // Rendered twice so the -50% marquee loop is seamless.
  const renderedImages = images.length > 1 ? [...images, ...images] : images;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Archives // Xordium 4.0"
        title="Recovered footage"
        blurb="Field recordings from the last campaign. Sound off, memory on."
      />
      <div className="cx-arch cx-corners">
        <div className="cx-arch-bar">
          <span className="cx-rec" aria-hidden="true" />
          <span>REC</span>
          <span aria-hidden="true">//</span>
          <span>ARCHIVE-04</span>
          <span className="cx-arch-time">04:00:00:00</span>
        </div>
        <div className="cx-arch-viewport">
          <div
            className="carousel-marquee-track flex w-max"
            style={{
              animationDuration: `${Math.max(images.length, 1) * SECONDS_PER_IMAGE}s`,
            }}
          >
            {renderedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                aria-hidden={index >= images.length}
                className="cx-arch-slide"
              >
                <img
                  src={`/carousel/${image.id}`}
                  alt={image.altText}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="pointer-events-none h-full w-full select-none"
                />
              </div>
            ))}
          </div>
          <div className="cx-arch-scan" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[13px] tracking-[0.25em] text-white uppercase">
        Courtesy of Megapixels
      </p>
    </section>
  );
}
