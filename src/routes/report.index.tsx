import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/StepProgress";

export const Route = createFileRoute("/report/")({
  head: () => ({ meta: [{ title: "리포트 · DIPLAI" }] }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={4} />
      <div className="mt-12 rounded-lg border border-border bg-surface p-10 text-center">
        <h1 className="text-2xl font-bold text-navy">아직 협상이 진행되지 않았습니다</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          시나리오를 선택하고 AI 협상을 마치면 결과 리포트를 확인할 수 있습니다.
        </p>
        <Button asChild className="mt-6 bg-navy hover:bg-navy/90">
          <Link to="/scenarios">시나리오 선택하러 가기</Link>
        </Button>
      </div>
    </div>
  ),
});
