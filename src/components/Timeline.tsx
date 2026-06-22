import { BriefingCard } from "./BriefingCard";

export function Timeline({
  items,
}: {
  items: { date: string; title: string; description: string }[];
}) {
  return (
    <BriefingCard title="타임라인">
      <ol className="relative space-y-4 border-l-2 border-navy/20 pl-5">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[26px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-navy bg-background">
              <span className="h-1.5 w-1.5 rounded-full bg-navy" />
            </span>
            <div className="text-xs font-semibold text-brand">{it.date}</div>
            <div className="text-sm font-semibold text-foreground">{it.title}</div>
            <p className="text-sm text-muted-foreground">{it.description}</p>
          </li>
        ))}
      </ol>
    </BriefingCard>
  );
}
