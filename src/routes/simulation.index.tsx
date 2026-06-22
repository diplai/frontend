import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { StepProgress } from "@/components/StepProgress";

export const Route = createFileRoute("/simulation/")({
  head: () => ({ meta: [{ title: "시뮬레이션 · DIPLAI" }] }),
  component: () => (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={3} />
      <div className="mt-12 rounded-lg border border-border bg-surface p-10 text-center">
        <h1 className="text-2xl font-bold text-navy">시나리오를 먼저 선택해주세요</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          AI 협상 시뮬레이션은 선택된 시나리오를 바탕으로 진행됩니다.
        </p>
        <Button asChild className="mt-6 bg-navy hover:bg-navy/90">
          <Link to="/scenarios">시나리오 선택하러 가기</Link>
        </Button>
      </div>
    </div>
  ),
});
