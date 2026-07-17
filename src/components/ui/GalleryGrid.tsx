"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import type { GalleryProject } from "@/sanity/types";

const CATEGORY_LABELS: Record<string, string> = {
  "garden-design": "Garden Design",
  "lawn-care": "Lawn Care",
  hardscaping: "Hardscaping",
  planting: "Planting",
  irrigation: "Irrigation",
  "outdoor-lighting": "Outdoor Lighting",
};

export function GalleryGrid({ projects }: { projects: GalleryProject[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c))),
  );

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <div className="flex flex-col gap-10">
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
              activeCategory === null
                ? "border-forest-900 bg-forest-900 text-cream"
                : "border-forest-900/20 text-charcoal/70 hover:border-forest-900/50"
            }`}
          >
            All Projects
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
                activeCategory === category
                  ? "border-forest-900 bg-forest-900 text-cream"
                  : "border-forest-900/20 text-charcoal/70 hover:border-forest-900/50"
              }`}
            >
              {CATEGORY_LABELS[category] ?? category}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-2">
        {filtered.map((project) => (
          <div key={project._id} className="flex flex-col gap-4">
            <BeforeAfterSlider
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
              title={project.title}
            />
            <div>
              <h3 className="font-serif text-lg text-forest-950">{project.title}</h3>
              <div className="flex flex-wrap items-center gap-x-3 text-sm text-charcoal/60">
                {project.location && <span>{project.location}</span>}
                {project.category && (
                  <span className="text-gold-dark">{CATEGORY_LABELS[project.category] ?? project.category}</span>
                )}
              </div>
              {project.description && (
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{project.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-charcoal/60">No projects in this category yet.</p>
      )}
    </div>
  );
}
