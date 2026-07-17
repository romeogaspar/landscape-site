import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-gold text-forest-950 hover:bg-gold-dark hover:text-cream border border-transparent",
  secondary:
    "bg-forest-900 text-cream hover:bg-forest-800 border border-transparent",
  ghost:
    "bg-transparent text-forest-900 hover:bg-forest-100 border border-forest-900/30",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
