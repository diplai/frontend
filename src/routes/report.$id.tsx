/* eslint-disable prettier/prettier */
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Download, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { fetchScenario, fetchReport } from "@/lib/api";
import { StepProgress } from "@/components/StepProgress";
import { ReportCard } from "@/components/ReportCard";
import { ScoreCard } from "@/components/ScoreCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/report/$id")({
  head: () => ({ meta: [{ title: "협상 결과 리포트 · DIPLAI" }] }),
  component: ReportPage,
});

type NewDetailedScores = {
  national_interest?: {
    score: number;
    reason: string;
  };
  reciprocity_compromise?: {
    score: number;
    reason: string;
  };
  logic_data?: {
    score: number;
    reason: string;
  };
  diplomatic_etiquette?: {
    score: number;
    reason: string;
  };
};

type LegacyScores = {
  evidence?: number;
  expression?: number;
  strategy?: number;
  perspective?: number;
};

type ReportResponse = {
  summary?: string;
  koreaClaims?: string[];
  aiRebuttals?: string[];
  flow?: string;
  actualResult?: string;
  missed?: string[];
  insufficient?: string[];
  overlooked?: string[];
  expressionRisk?: string[];
  betterDirection?: string[];

  total_score?: number;
  detailed_scores?: NewDetailedScores;
  overall_feedback?: string;

  scores?: LegacyScores;
};

function toList(value?: string[]) {
  return Array.isArray(value) ? value : [];
}

function ReportLoading() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-navy">
          리포트를 생성 중입니다
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          AI가 협상 대화 내용을 분석하고 점수와 피드백을 정리하고 있습니다.
          이 작업은 약 90초 정도 소요될 수 있으니 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

function ReportPage() {
  const { id } = useParams({ from: "/report/$id" });

  const reportRef = useRef<HTMLDivElement>(null);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);

  const {
    data: scenario,
    isLoading: isScenarioLoading,
    isError: isScenarioError,
  } = useQuery({
    queryKey: ["scenario", id],
    queryFn: () => fetchScenario(id),
  });

  const {
    data: report,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReport(id),
  });

  if (isScenarioLoading || isReportLoading || !scenario || !report) {
    return <ReportLoading />;
  }

  if (isScenarioError || isReportError) {
    return (
      <div className="mx-auto max-w-7xl p-10 text-sm text-muted-foreground">
        리포트를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </div>
    );
  }

  const r = report as unknown as ReportResponse;

  const koreaClaims = toList(r.koreaClaims);
  const aiRebuttals = toList(r.aiRebuttals);
  const missed = toList(r.missed);
  const insufficient = toList(r.insufficient);
  const overlooked = toList(r.overlooked);
  const expressionRisk = toList(r.expressionRisk);
  const betterDirection = toList(r.betterDirection);

  const mainSummary =
    r.summary ||
    r.overall_feedback ||
    "협상 대화 내용을 바탕으로 결과 리포트가 생성되었습니다.";

  const handleDownloadPdf = async () => {
    if (!reportRef.current || !scenario) return;

    try {
      setIsPdfDownloading(true);

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#f8fafc",
        useCORS: true,
        ignoreElements: (element) =>
          element.classList.contains("pdf-ignore"),
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const safeTitle = scenario.title.replace(/[\\/:*?"<>|]/g, "_");
      pdf.save(`DIPLAI_${safeTitle}_협상결과리포트.pdf`);

      toast.success("PDF 다운로드가 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("PDF 다운로드 중 오류가 발생했습니다.");
    } finally {
      setIsPdfDownloading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={4} />

      <div ref={reportRef} className="rounded-xl bg-background p-4">
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge className="mb-2 bg-navy text-navy-foreground">
              {scenario.field}
            </Badge>
            <h1 className="text-3xl font-bold text-navy">협상 결과 리포트</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {scenario.title}
            </p>
          </div>

          <div className="pdf-ignore flex gap-2">
            <Button
              variant="outline"
              onClick={handleDownloadPdf}
              disabled={isPdfDownloading}
            >
              <Download className="h-4 w-4" />
              {isPdfDownloading ? "PDF 생성 중..." : "PDF 다운로드"}
            </Button>

            <Button asChild className="bg-navy hover:bg-navy/90">
              <Link to="/scenarios">
                <RefreshCw className="h-4 w-4" /> 다른 시나리오 체험하기
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <ReportCard title="총평 — 협상 결과 요약" accent="navy">
              <p>{mainSummary}</p>
            </ReportCard>

            {r.overall_feedback && r.summary && (
              <ReportCard title="종합 피드백" accent="emerald">
                <p>{r.overall_feedback}</p>
              </ReportCard>
            )}

            {(koreaClaims.length > 0 || aiRebuttals.length > 0) && (
              <div className="grid gap-5 md:grid-cols-2">
                {koreaClaims.length > 0 && (
                  <ReportCard title="사용자의 주요 주장" accent="navy">
                    <ul className="list-inside list-disc space-y-1">
                      {koreaClaims.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}

                {aiRebuttals.length > 0 && (
                  <ReportCard title="AI 상대국 대표의 주요 반박" accent="rose">
                    <ul className="list-inside list-disc space-y-1">
                      {aiRebuttals.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}
              </div>
            )}

            {r.flow && (
              <ReportCard title="최종 협상 흐름">
                <p>{r.flow}</p>
              </ReportCard>
            )}

            {r.actualResult && (
              <ReportCard title="실제 조약·협정 결과 설명" accent="emerald">
                <p>{r.actualResult}</p>
              </ReportCard>
            )}

            {(missed.length > 0 ||
              insufficient.length > 0 ||
              overlooked.length > 0 ||
              expressionRisk.length > 0) && (
              <div className="grid gap-5 md:grid-cols-2">
                {missed.length > 0 && (
                  <ReportCard title="놓친 쟁점" accent="rose">
                    <ul className="list-inside list-disc space-y-1">
                      {missed.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}

                {insufficient.length > 0 && (
                  <ReportCard title="부족했던 근거" accent="rose">
                    <ul className="list-inside list-disc space-y-1">
                      {insufficient.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}

                {overlooked.length > 0 && (
                  <ReportCard title="고려하지 못한 상대국 입장" accent="rose">
                    <ul className="list-inside list-disc space-y-1">
                      {overlooked.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}

                {expressionRisk.length > 0 && (
                  <ReportCard title="외교적 표현 리스크" accent="rose">
                    <ul className="list-inside list-disc space-y-1">
                      {expressionRisk.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </ReportCard>
                )}
              </div>
            )}

            {betterDirection.length > 0 && (
              <ReportCard title="더 나은 협상 방향" accent="emerald">
                <ul className="list-inside list-disc space-y-1">
                  {betterDirection.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </ReportCard>
            )}
          </div>

          <div className="space-y-5">
            <ScoreCard
              totalScore={r.total_score}
              detailedScores={r.detailed_scores}
              scores={r.scores}
            />
          </div>
        </div>
      </div>
    </div>
  );
}