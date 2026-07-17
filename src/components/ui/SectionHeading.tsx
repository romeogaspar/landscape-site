type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs font-semibold tracking-[0.2em] text-gold-dark uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl leading-tight text-forest-950 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-charcoal/75">
          {description}
        </p>
      )}
    </div>
  );
}
