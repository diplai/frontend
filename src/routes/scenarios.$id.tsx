console.log("BriefingPage mounted");

//시나리오 상세 페이지
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ClipboardList, Users, Clock, Scale, AlertTriangle } from "lucide-react";
import { fetchScenario } from "@/lib/api";
import { StepProgress } from "@/components/StepProgress";
import { BriefingCard } from "@/components/BriefingCard";
import { StakeholderCard } from "@/components/StakeholderCard";
import { Timeline } from "@/components/Timeline";
import { TreatyCard } from "@/components/TreatyCard";
import { IssueCard } from "@/components/IssueCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/scenarios/$id")({
  head: () => ({
    meta: [{ title: "시나리오 브리핑 · DIPLAI" }],
  }),
  component: BriefingPage,
});

/*
function BriefingPage() {
  console.log("PAGE RENDER");

  return <div>test</div>;
}
*/

function BriefingPage() {
  const { id } = useParams({ from: "/scenarios/$id" });
  const { data: scenario, isLoading } = useQuery({
    queryKey: ["scenario", id],
    //queryFn: () => fetchScenario(id),
    queryFn: async () => {
      const res = await fetchScenario(id);
      console.log("RAW RESPONSE:", res);
      return res;
    },
  });

  if (isLoading) {
    return <div className="mx-auto max-w-7xl p-10 text-sm text-muted-foreground">불러오는 중…</div>;
  }
  if (!scenario) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        <p className="text-sm text-muted-foreground">시나리오를 찾을 수 없습니다.</p>
        <Button asChild className="mt-4">
          <Link to="/scenarios">시나리오 목록으로</Link>
        </Button>
      </div>
    );
  }

  //console.log("scenario:", scenario);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={2} />

      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-navy text-navy-foreground">{scenario.field}</Badge>
          <Badge variant="outline">관련국 · {scenario.country}</Badge>
          <Badge variant="secondary">난이도 · {scenario.difficulty}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-navy">{scenario.title}</h1>
        <p className="text-sm text-muted-foreground">{scenario.summary}</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <BriefingCard title="사건 개요" icon={<ClipboardList className="h-4 w-4" />}>
          <div>
            <div className="text-xs font-semibold text-brand">분쟁 배경</div>
            <p>{scenario.briefing.background}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-brand">현재 상황</div>
            <p>{scenario.briefing.currentSituation}</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-brand">협상 목표</div>
            <p>{scenario.briefing.goal}</p>
          </div>
        </BriefingCard>

        <StakeholderCard {...scenario.stakeholders} />

        <Timeline items={scenario.timeline} />

        <BriefingCard title="관련 조약·협정" icon={<Scale className="h-4 w-4" />}>
          <div className="space-y-3">
            {scenario.treaties.map((t) => (
              <TreatyCard key={t.name} {...t} />
            ))}
          </div>
        </BriefingCard>

        <div className="lg:col-span-2">
          <IssueCard {...scenario.issues} />
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-border bg-surface p-6 text-center">
        <AlertTriangle className="h-5 w-5 text-brand" />
        <h2 className="text-lg font-bold text-navy">브리핑을 모두 확인하셨나요?</h2>
        <p className="text-sm text-muted-foreground">
          이제 AI 상대국 대표와 총 10라운드의 외교 협상을 진행합니다.
        </p>
        <Button asChild size="lg" className="bg-navy hover:bg-navy/90">
          <Link to="/simulation/$id" params={{ id: scenario.id }}>
            AI 협상 시작 <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" /> <Clock className="h-3 w-3" /> 예상 소요 5–10분
        </div>
      </div>
    </div>
  );
}
