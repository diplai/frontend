/* eslint-disable prettier/prettier */
import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Target } from "lucide-react";
import {
  fetchScenario,
  sendNegotiationMessage,
  startNegotiation,
} from "@/lib/api";
import { StepProgress } from "@/components/StepProgress";
import { ChatPanel, type ChatMessage } from "@/components/ChatPanel";
import { EvidencePanel } from "@/components/EvidencePanel";
import { StrategyModal } from "@/components/StrategyModal";
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
  const navigate = useNavigate();

  const { data: scenario } = useQuery({
    queryKey: ["scenario", id],
    queryFn: () => fetchScenario(id),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(0);
  const [strategyOpen, setStrategyOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const startedScenarioRef = useRef<string | null>(null);

  useEffect(() => {
    if (!scenario) return;
    if (startedScenarioRef.current === scenario.id) return;

    startedScenarioRef.current = scenario.id;
    setMessages([]);
    setInput("");
    setRound(0);
    setBusy(true);

    startNegotiation(scenario.id)
      .then(({ reply }) => {
        setMessages([
          {
            id: `${Date.now()}-ai-opening`,
            role: "ai",
            content: reply,
          },
        ]);
      })
      .catch((error) => {
        console.error(error);

        setMessages([
          {
            id: `${Date.now()}-ai-opening-fallback`,
            role: "ai",
            content:
              "안녕하십니까. 저는 상대국 대표입니다. 오늘 협상 의제에 대한 대한민국 측의 기본 입장을 말씀해주시기 바랍니다.",
          },
        ]);
      })
      .finally(() => {
        setBusy(false);
      });
  }, [scenario]);

  if (!scenario) {
    return (
      <div className="mx-auto max-w-7xl p-10 text-sm text-muted-foreground">
        불러오는 중…
      </div>
    );
  }

  const done = round >= TOTAL_ROUNDS;

  const handleSend = async () => {
    if (!input.trim() || done || busy) return;

    const userMsg: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: input.trim(),
    };

    const currentRound = round;

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setRound((r) => r + 1);
    setBusy(true);

    try {
      const aiId = `${Date.now()}-ai`;

      setMessages((prev) => [
        ...prev,
        {
          id: aiId,
          role: "ai",
          content: "",
        },
      ]);

      await sendNegotiationMessage(
        scenario.id,
        currentRound,
        userMsg.content,
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiId
                ? {
                    ...msg,
                    content: msg.content + chunk,
                  }
                : msg
            )
          );
        }
      );
    } finally {
      setBusy(false);
    }
  };

  const handleInsert = (text: string) =>
    setInput((cur) => (cur ? `${cur} ${text}` : text));

  const handleStrategy = (name: string) => {
    setMessages((m) => [
      ...m,
      {
        id: `${Date.now()}-system`,
        role: "system",
        content: `전략 선택: ${name}`,
      },
    ]);
    setStrategyOpen(false);
  };

  const handleEarlyEnd = () => {
    const confirmed = window.confirm(
      "이대로 대화를 종료하시겠습니까?\n현재까지의 결과로 리포트가 생성됩니다."
    );

    if (!confirmed) return;

    void navigate({
      to: "/report/$id",
      params: { id: scenario.id },
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <StepProgress current={3} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex flex-wrap gap-2">
            <Badge className="bg-navy text-navy-foreground">
              {scenario.field}
            </Badge>
            <Badge variant="outline">관련국 · {scenario.country}</Badge>
          </div>

          <h1 className="text-2xl font-bold text-navy">
            AI 상대국 대표와 협상하기
          </h1>

          <p className="text-sm text-muted-foreground">{scenario.title}</p>
        </div>

        <div className="min-w-55 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">협상 라운드</span>

            <span className="font-semibold text-navy">
              {Math.min(round, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}
            </span>
          </div>

          <Progress
            value={(Math.min(round, TOTAL_ROUNDS) / TOTAL_ROUNDS) * 100}
            className="h-2"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setStrategyOpen(true)}
          disabled={done || busy}
        >
          <Target className="h-4 w-4" />
          전략 선택
        </Button>

        {busy && (
          <div className="inline-flex items-center gap-2 rounded-md border border-brand/30 bg-brand/5 px-3 py-2 text-sm text-brand">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>AI 상대국 대표가 답변을 생성 중입니다...</span>
          </div>
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

        <EvidencePanel
          scenario={scenario}
          onInsert={handleInsert}
        />
      </div>

      <div className="mt-8 rounded-lg border border-brand/30 bg-brand/5 p-6 text-center">
        <h2 className="text-lg font-bold text-navy">
          {done ? "협상이 종료되었습니다" : "대화를 조기 종료할 수 있습니다"}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {done
            ? "총 10라운드의 협상 결과를 확인하세요."
            : `현재 ${round} / ${TOTAL_ROUNDS}라운드까지 진행되었습니다. 지금 종료하면 현재까지의 결과로 리포트가 생성됩니다.`}
        </p>

        {done ? (
          <Button
            asChild
            size="lg"
            className="mt-4 bg-navy hover:bg-navy/90"
          >
            <Link
              to="/report/$id"
              params={{ id: scenario.id }}
            >
              리포트 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            size="lg"
            className="mt-4 bg-navy hover:bg-navy/90"
            onClick={handleEarlyEnd}
            disabled={busy}
          >
            대화 조기종료하기
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <StrategyModal
        open={strategyOpen}
        onOpenChange={setStrategyOpen}
        onSelect={handleStrategy}
      />
    </div>
  );
}