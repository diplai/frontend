// DIPLAI API layer
// 현재는 mock data를 반환합니다. 나중에 fetch 호출로 교체하면 됩니다.
// 예: const res = await fetch(`${API_BASE}/scenarios`); return res.json();

import { scenarios } from "@/data/scenarios";
import type { Scenario } from "@/types";

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

export async function fetchScenarios(): Promise<Scenario[]> {
  await delay();
  return scenarios;
}

export async function fetchScenario(id: string): Promise<Scenario | undefined> {
  await delay();
  return scenarios.find((s) => s.id === id);
}

// 협상 메시지 전송 (mock)
export async function sendNegotiationMessage(
  scenarioId: string,
  round: number,
  _message: string,
): Promise<{ reply: string; round: number }> {
  await delay(400);
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const reply =
    scenario?.aiResponses[Math.min(round, (scenario?.aiResponses.length ?? 1) - 1)] ??
    "추가 협의가 필요합니다.";
  return { reply, round: round + 1 };
}

export async function fetchReport(id: string) {
  await delay();
  return scenarios.find((s) => s.id === id)?.report;
}
