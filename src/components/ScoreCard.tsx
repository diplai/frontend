import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ScoreCard({
  scores,
}: {
  scores: { evidence: number; expression: number; strategy: number; perspective: number };
}) {
  const items = [
    { label: "근거 활용도", value: scores.evidence },
    { label: "외교적 표현", value: scores.expression },
    { label: "전략 선택", value: scores.strategy },
    { label: "상대국 입장 고려", value: scores.perspective },
  ];
  const avg = Math.round(items.reduce((a, b) => a + b.value, 0) / items.length);

  return (
    <Card className="border-border">
      <CardContent className="space-y-4 py-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">종합 점수</div>
            <div className="font-display text-4xl font-bold text-navy">{avg}</div>
          </div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.label}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{it.label}</span>
                <span className="font-semibold text-navy">{it.value}</span>
              </div>
              <Progress value={it.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
