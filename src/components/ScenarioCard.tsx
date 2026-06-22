import { Link } from "@tanstack/react-router";
import type { Scenario } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const diffColor: Record<Scenario["difficulty"], string> = {
  초급: "bg-emerald-100 text-emerald-800",
  중급: "bg-amber-100 text-amber-800",
  고급: "bg-rose-100 text-rose-800",
};

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <Card className="flex h-full flex-col border-border transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-navy/10 text-navy">
            {scenario.field}
          </Badge>
          <Badge variant="outline">관련국 · {scenario.country}</Badge>
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${diffColor[scenario.difficulty]}`}>
            {scenario.difficulty}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground">{scenario.title}</h3>
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{scenario.summary}</p>
        <Button asChild className="mt-auto w-full bg-navy hover:bg-navy/90">
          <Link to="/scenarios/$id" params={{ id: scenario.id }}>
            시작하기
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
