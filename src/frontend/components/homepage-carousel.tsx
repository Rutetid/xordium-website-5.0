"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";

type CarouselImage = {
  id: string;
  altText: string;
};

// Seconds of travel per image — keeps the glide slow no matter how many
// photos are in the carousel.
const SECONDS_PER_IMAGE = 6;

export default function HomepageCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([]);

  // Fetch images from local public folder
  useEffect(() => {
    fetch("/api/carousel")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: CarouselImage[]) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  // Rendered twice so the -50% marquee loop is seamless.
  const renderedImages = images.length > 1 ? [...images, ...images] : images;

  return (
    <section className="border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          kicker="Archives // Xordium 4.0"
          title="Quick peeks to Xordium 4.0"
        />
        <div className="glass-panel min-h-[300px] overflow-hidden">
          {images.length > 0 ? (
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
                  className="h-[300px] w-[420px] shrink-0 border-r border-white/10 bg-black/50 last:border-r-0 sm:w-[533px]"
                >
                  <img
                    src={`/carousel/${image.id}`}
                    alt={image.altText}
                    draggable={false}
                    loading={index < images.length ? "eager" : "lazy"}
                    className="pointer-events-none h-full w-full select-none object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="w-full h-full" />
            </div>
          )}
        </div>
        <p className="mt-4 text-center font-mono text-[13px] tracking-[0.25em] text-white uppercase">
          Courtesy of Megapixels
        </p>
      </div>
    </section>
  );
}
