import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { fetchScenario } from "@/lib/api";
import { StepProgress } from "@/components/StepProgress";
import { ReportCard } from "@/components/ReportCard";
import { ScoreCard } from "@/components/ScoreCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/$id")({
  head: () => ({ meta: [{ title: "협상 결과 리포트 · DIPLAI" }] }),
  component: ReportPage,
});

function ReportPage() {
  const { id } = useParams({ from: "/report/$id" });
  const { data: scenario } = useQuery({ queryKey: ["scenario", id], queryFn: () => fetchScenario(id) });

  if (!scenario) {
    return <div className="mx-auto max-w-7xl p-10 text-sm text-muted-foreground">불러오는 중…</div>;
  }
  const r = scenario.report;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={4} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge className="mb-2 bg-navy text-navy-foreground">{scenario.field}</Badge>
          <h1 className="text-3xl font-bold text-navy">협상 결과 리포트</h1>
          <p className="mt-1 text-sm text-muted-foreground">{scenario.title}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("PDF 다운로드 기능은 준비 중입니다.")}>
            <Download className="h-4 w-4" /> PDF 다운로드
          </Button>
          <Button asChild className="bg-navy hover:bg-navy/90">
            <Link to="/scenarios">
              <RefreshCw className="h-4 w-4" /> 다른 시나리오 체험하기
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <ReportCard title="총평 — 협상 결과 요약" accent="navy">
            <p>{r.summary}</p>
          </ReportCard>

          <div className="grid gap-5 md:grid-cols-2">
            <ReportCard title="사용자의 주요 주장" accent="navy">
              <ul className="list-inside list-disc space-y-1">
                {r.koreaClaims.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
            <ReportCard title="AI 상대국 대표의 주요 반박" accent="rose">
              <ul className="list-inside list-disc space-y-1">
                {r.aiRebuttals.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
          </div>

          <ReportCard title="최종 협상 흐름">
            <p>{r.flow}</p>
          </ReportCard>

          <ReportCard title="실제 조약·협정 결과 설명" accent="emerald">
            <p>{r.actualResult}</p>
            <div className="mt-3 space-y-2">
              {r.references.map((ref) => (
                <div key={ref.name} className="rounded-md border border-border bg-surface p-3 text-xs">
                  <div className="font-semibold text-navy">{ref.name}</div>
                  <div className="text-muted-foreground">{ref.description}</div>
                  <div className="mt-1 text-brand">출처 · {ref.source}</div>
                </div>
              ))}
            </div>
          </ReportCard>

          <div className="grid gap-5 md:grid-cols-2">
            <ReportCard title="놓친 쟁점" accent="rose">
              <ul className="list-inside list-disc space-y-1">
                {r.missed.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
            <ReportCard title="부족했던 근거" accent="rose">
              <ul className="list-inside list-disc space-y-1">
                {r.insufficient.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
            <ReportCard title="고려하지 못한 상대국 입장" accent="rose">
              <ul className="list-inside list-disc space-y-1">
                {r.overlooked.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
            <ReportCard title="외교적 표현 리스크" accent="rose">
              <ul className="list-inside list-disc space-y-1">
                {r.expressionRisk.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </ReportCard>
          </div>

          <ReportCard title="더 나은 협상 방향" accent="emerald">
            <ul className="list-inside list-disc space-y-1">
              {r.betterDirection.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </ReportCard>
        </div>

        <div className="space-y-5">
          <ScoreCard scores={r.scores} />
        </div>
      </div>
    </div>
  );
}
