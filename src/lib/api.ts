// DIPLAI API layer

const API_BASE = "https://diplai.onrender.com";

// mock data
// import { scenarios } from "@/data/scenarios"; 지워 주석 처리 다 지울 것
import type { Scenario } from "@/types";

// const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

/* 시나리오 조회
export async function fetchScenarios(): Promise<Scenario[]> {
  await delay();
  return scenarios;
}
*/

export async function fetchScenarios(): Promise<Scenario[]> {

  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error("Failed to fetch scenarios");
  return res.json();
}

/* 시나리오 상세
export async function fetchScenario(id: string): Promise<Scenario | undefined> {
  await delay();
  return scenarios.find((s) => s.id === id);
}
  */

export async function fetchScenario(id: string): Promise<Scenario> {
  const res = await fetch(`${API_BASE}/scenarios/${id}`);
  if (!res.ok) throw new Error("Failed to fetch scenario");
  return res.json();
}

/* 협상 메시지 전송 (mock) -> 백 api로 교체 예정
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
}*/

export async function sendNegotiationMessage(
  scenarioId: string,
  round: number,
  message: string,
): Promise<{ reply: string }> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: scenarioId,
      message,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}


/*리포트 조회
export async function fetchReport(id: string) {
  await delay();
  return scenarios.find((s) => s.id === id)?.report;
}
*/
export async function fetchReport(id: string): Promise<Scenario["report"]> {
  const res = await fetch(`${API_BASE}/report/${id}`);
  if (!res.ok) throw new Error("Failed to fetch report");

  return res.json();
}
