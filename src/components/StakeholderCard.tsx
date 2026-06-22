import { BriefingCard } from "./BriefingCard";

export function StakeholderCard({
  korea,
  counterpart,
  others,
}: {
  korea: string;
  counterpart: string;
  others: string;
}) {
  return (
    <BriefingCard title="이해관계자">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-md border border-border bg-surface p-3">
          <div className="mb-1 text-xs font-semibold text-brand">한국 측 입장</div>
          <p className="text-sm text-foreground">{korea}</p>
        </div>
        <div className="rounded-md border border-border bg-surface p-3">
          <div className="mb-1 text-xs font-semibold text-rose-700">상대국 입장</div>
          <p className="text-sm text-foreground">{counterpart}</p>
        </div>
        <div className="rounded-md border border-border bg-surface p-3">
          <div className="mb-1 text-xs font-semibold text-muted-foreground">기타 이해관계자</div>
          <p className="text-sm text-foreground">{others}</p>
        </div>
      </div>
    </BriefingCard>
  );
}
