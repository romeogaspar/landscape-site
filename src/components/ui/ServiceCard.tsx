import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import type { Service } from "@/sanity/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-forest-900/10 bg-white transition-shadow hover:shadow-lg"
    >
      {service.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={urlForImage(service.image).width(600).height(450).url()}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-serif text-xl text-forest-950">{service.title}</h3>
        <p className="text-sm leading-relaxed text-charcoal/70">{service.summary}</p>
        <span className="mt-2 text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
          Learn more
        </span>
      </div>
    </Link>
  );
}
