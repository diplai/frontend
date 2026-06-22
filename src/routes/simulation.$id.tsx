import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Target } from "lucide-react";
import { fetchScenario, sendNegotiationMessage } from "@/lib/api";
import { StepProgress } from "@/components/StepProgress";
import { ChatPanel, type ChatMessage } from "@/components/ChatPanel";
import { EvidencePanel } from "@/components/EvidencePanel";
import { StrategyModal } from "@/components/StrategyModal";
import { DiplomaticDraftEditor } from "@/components/DiplomaticDraftEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const TOTAL_ROUNDS = 10;

export const Route = createFileRoute("/simulation/$id")({
  head: () => ({ meta: [{ title: "AI 협상 시뮬레이션 · DIPLAI" }] }),
  component: SimulationPage,
});

function SimulationPage() {
  const { id } = useParams({ from: "/simulation/$id" });
  const { data: scenario } = useQuery({ queryKey: ["scenario", id], queryFn: () => fetchScenario(id) });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(0);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!scenario) {
    return <div className="mx-auto max-w-7xl p-10 text-sm text-muted-foreground">불러오는 중…</div>;
  }

  const done = round >= TOTAL_ROUNDS;

  const handleSend = async () => {
    if (!input.trim() || done || busy) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    const currentRound = round;
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setRound((r) => r + 1);
    setBusy(true);
    try {
      const { reply } = await sendNegotiationMessage(scenario.id, currentRound, userMsg.content);
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", content: reply }]);
    } finally {
      setBusy(false);
    }
  };

  const handleInsert = (text: string) => setInput((cur) => (cur ? `${cur} ${text}` : text));

  const handleStrategy = (name: string) => {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "system", content: `전략 선택: ${name}` },
    ]);
    setStrategyOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={3} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex flex-wrap gap-2">
            <Badge className="bg-navy text-navy-foreground">{scenario.field}</Badge>
            <Badge variant="outline">관련국 · {scenario.country}</Badge>
          </div>
          <h1 className="text-2xl font-bold text-navy">AI 상대국 대표와 협상하기</h1>
          <p className="text-sm text-muted-foreground">{scenario.title}</p>
        </div>
        <div className="min-w-[220px] space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">협상 라운드</span>
            <span className="font-semibold text-navy">
              {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
            </span>
          </div>
          <Progress value={(Math.min(round, TOTAL_ROUNDS) / TOTAL_ROUNDS) * 100} className="h-2" />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setStrategyOpen(true)}>
          <Target className="h-4 w-4" /> 전략 선택
        </Button>
        {done && (
          <Button asChild className="bg-navy hover:bg-navy/90">
            <Link to="/report/$id" params={{ id: scenario.id }}>
              리포트 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_400px]">
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          onSend={handleSend}
          disabled={done || busy}
          country={scenario.country}
        />
        <EvidencePanel scenario={scenario} onInsert={handleInsert} />
      </div>

      <div className="mt-6">
        <DiplomaticDraftEditor drafts={scenario.drafts} />
      </div>

      {done && (
        <div className="mt-8 rounded-lg border border-brand/30 bg-brand/5 p-6 text-center">
          <h2 className="text-lg font-bold text-navy">협상이 종료되었습니다</h2>
          <p className="mt-1 text-sm text-muted-foreground">총 10라운드의 협상 결과를 확인하세요.</p>
          <Button asChild size="lg" className="mt-4 bg-navy hover:bg-navy/90">
            <Link to="/report/$id" params={{ id: scenario.id }}>
              협상 결과 리포트 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      <StrategyModal open={strategyOpen} onOpenChange={setStrategyOpen} onSelect={handleStrategy} />
    </div>
  );
}
