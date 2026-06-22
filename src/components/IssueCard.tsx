import { BriefingCard } from "./BriefingCard";

export function IssueCard({
  applicability,
  counterpartClaim,
  koreaLogic,
  risk,
  negotiable,
}: {
  applicability: string;
  counterpartClaim: string;
  koreaLogic: string;
  risk: string;
  negotiable: string;
}) {
  const rows = [
    { label: "조약 적용 가능성", value: applicability },
    { label: "상대국 주장", value: counterpartClaim },
    { label: "한국 측 대응 논리", value: koreaLogic },
    { label: "외교적 리스크", value: risk },
    { label: "협상 가능 지점", value: negotiable },
  ];
  return (
    <BriefingCard title="핵심 쟁점">
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
            <div className="text-xs font-semibold text-brand">{r.label}</div>
            <div className="text-sm text-foreground">{r.value}</div>
          </div>
        ))}
      </div>
    </BriefingCard>
  );
}
