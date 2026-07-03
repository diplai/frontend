/* eslint-disable prettier/prettier */
import { Link } from "@tanstack/react-router";
import type { Scenario } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function getRelatedCountries(scenario: Scenario): string {
  const s = scenario as Scenario & {
    country?: string | string[];
    relatedCountry?: string | string[];
    countries?: string[];
  };

  const raw = s.country || s.relatedCountry || s.countries;

  if (!raw) return "";
  if (Array.isArray(raw)) return raw.filter(Boolean).join(", ");
  return String(raw);
}

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  console.log("ScenarioCard scenario:", scenario);

  const related = getRelatedCountries(scenario);

  return (
    <Card className="flex h-full flex-col border-border transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-navy text-navy-foreground">
            {scenario.field}
          </Badge>
          <Badge variant="outline">관련국 · {scenario.country}</Badge>{" "}
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {scenario.title}
        </h3>
      </CardHeader>
      <CardContent className="mt-auto flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {scenario.summary}
        </p>
        <Button asChild className="mt-auto w-full bg-navy hover:bg-navy/90">
          <Link to="/scenarios/$id" params={{ id: scenario.id }}>
            시작하기
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}