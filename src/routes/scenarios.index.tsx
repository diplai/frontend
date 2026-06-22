import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchScenarios } from "@/lib/api";
import { ScenarioCard } from "@/components/ScenarioCard";
import { StepProgress } from "@/components/StepProgress";

export const Route = createFileRoute("/scenarios/")({
  head: () => ({
    meta: [
      { title: "시나리오 선택 · DIPLAI" },
      { name: "description", content: "6개의 외교 협상 시나리오 중 하나를 선택하세요." },
    ],
  }),
  component: ScenariosPage,
});

function ScenariosPage() {
  const { data: scenarios = [] } = useQuery({
    queryKey: ["scenarios"],
    queryFn: fetchScenarios,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={1} />
      <div className="mt-8 mb-8">
        <h1 className="text-3xl font-bold text-navy">외교 협상 시나리오 선택</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          분야 구분 없이 선별된 6개의 외교 협상 시나리오 중 하나를 선택하세요.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((s) => (
          <ScenarioCard key={s.id} scenario={s} />
        ))}
      </div>
    </div>
  );
}
