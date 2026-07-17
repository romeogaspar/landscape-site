"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { Image as SanityImage } from "sanity";

type BeforeAfterSliderProps = {
  beforeImage: SanityImage;
  afterImage: SanityImage;
  title: string;
};

export function BeforeAfterSlider({ beforeImage, afterImage, title }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const id = useId();

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm bg-forest-100">
      <Image
        src={urlForImage(afterImage).width(900).height(675).url()}
        alt={`${title} — after`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={urlForImage(beforeImage).width(900).height(675).url()}
          alt={`${title} — before`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-cream"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream shadow-md">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-forest-900">
            <path d="M8 6L2 12l6 6M16 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      <span className="absolute top-3 left-3 z-10 rounded-sm bg-forest-950/80 px-2.5 py-1 text-xs font-semibold tracking-wide text-cream uppercase">
        Before
      </span>
      <span className="absolute top-3 right-3 z-10 rounded-sm bg-gold/90 px-2.5 py-1 text-xs font-semibold tracking-wide text-forest-950 uppercase">
        After
      </span>

      <label htmlFor={id} className="sr-only">
        Slide to compare before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        aria-label="Slide to compare before and after"
      />
    </div>
  );
}
