import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Database, MessagesSquare, FileText, ExternalLink } from "lucide-react";
import { fetchScenarios } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScenarioCard } from "@/components/ScenarioCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DIPLAI · 외교 협상 시뮬레이터" },
      {
        name: "description",
        content:
          "외교부 공공데이터 기반 조약·외교 협상 시뮬레이터. AI 상대국 대표와 협상하고 결과 리포트를 확인하세요.",
      },
    ],
  }),
  component: Home,
});

const values = [
  {
    icon: Database,
    title: "공공데이터 기반",
    desc: "외교부 양자조약 정보와 MOFA OPEN DATA를 바탕으로 실제 사건 맥락을 재현합니다.",
  },
  {
    icon: MessagesSquare,
    title: "AI 상대국 대표",
    desc: "각국 입장과 외교적 어법을 학습한 AI와 10라운드의 협상을 진행할 수 있습니다.",
  },
  {
    icon: FileText,
    title: "협상 결과 리포트",
    desc: "근거 활용·표현·전략·상대국 입장 고려를 평가한 협상 리포트를 제공합니다.",
  },
];

const dataLinks = [
  { name: "외교부 양자조약 데이터", desc: "국가별 조약 체결·발효 현황" },
  { name: "국가·지역별 주요협정 정보", desc: "주요 협력 및 합의 사례" },
  { name: "MOFA OPEN DATA", desc: "외교 통계·국제 협정 정보" },
];

function Home() {
  const { data: scenarios = [] } = useQuery({
    queryKey: ["scenarios"],
    queryFn: fetchScenarios,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-[oklch(0.28_0.1_260)] text-navy-foreground">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              외교부 공공데이터 기반 시뮬레이터
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl">DIPLAI</h1>
            <p className="text-xl font-medium text-white/90 sm:text-2xl">
              조약과 외교 데이터를 기반으로 외교 협상을 체험하는 AI 시뮬레이터
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-white/70">
              외교부 공공데이터를 바탕으로 구성된 협상 시나리오를 선택하고, AI 상대국 대표와 외교 협상을 진행해보세요.
              브리핑부터 결과 리포트까지 한 흐름으로 체험할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-white text-navy hover:bg-white/90">
                <Link to="/scenarios">
                  시나리오 시작하기 <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/scenarios">시나리오 둘러보기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <div className="text-xs font-semibold tracking-[0.2em] text-brand">SERVICE VALUE</div>
          <h2 className="mt-2 text-3xl font-bold text-navy">서비스 핵심 가치</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="border-border">
              <CardContent className="space-y-3 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy/10 text-navy">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Data sources */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] text-brand">DATA SOURCE</div>
              <h2 className="mt-2 text-3xl font-bold text-navy">외교부 공공데이터</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                본 시뮬레이터는 외교부 공공데이터를 활용하여 협상 시나리오를 구성합니다.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {dataLinks.map((d) => (
              <Card key={d.name} className="border-border">
                <CardContent className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <div className="font-semibold text-navy">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.desc}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-brand" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-brand">SCENARIOS</div>
            <h2 className="mt-2 text-3xl font-bold text-navy">추천 시나리오</h2>
          </div>
          <Button asChild variant="ghost" className="text-navy">
            <Link to="/scenarios">
              전체 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.slice(0, 6).map((s) => (
            <ScenarioCard key={s.id} scenario={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
