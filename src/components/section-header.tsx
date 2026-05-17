import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  href,
  dark,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className={cn("text-sm uppercase tracking-[0.22em]", dark ? "text-white/60" : "text-muted-foreground")}>{eyebrow}</p>
        <h2 className={cn("mt-3 max-w-3xl text-3xl leading-tight md:text-5xl", dark ? "text-white" : "text-foreground")}>{title}</h2>
      </div>
      {href ? (
        <Link className={cn("inline-flex items-center gap-2 text-sm font-semibold", dark ? "text-white" : "text-foreground")} href={href}>
          View all <ArrowRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
