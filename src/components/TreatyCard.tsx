import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function TreatyCard({
  name,
  effectiveDate,
  summary,
  source,
}: {
  name: string;
  effectiveDate: string;
  summary: string;
  source: string;
}) {
  return (
    <Card className="border-border">
      <CardContent className="space-y-2 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-navy">{name}</h4>
          <Badge variant="outline" className="text-[10px]">
            발효 {effectiveDate}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{summary}</p>
        <div className="text-[11px] text-brand">출처 · {source}</div>
      </CardContent>
    </Card>
  );
}
