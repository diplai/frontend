// 백엔드 연결
const API_BASE = "https://diplai.onrender.com";

/* 시나리오 목록
export async function fetchScenario(id: string) {
  const res = await fetch(`${API_BASE}/scenarios/${id}`);

  console.log("status:", res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch scenario");
  }

  return res.json();
}
*/

//시나리오 목록
import type { Scenario } from "@/types";

export async function fetchScenario(id: string) {
  console.log("API CALL START", id);

  const res = await fetch(`${API_BASE}/scenarios/${id}`);

  console.log("status:", res.status);

  return res.json();
}

//시나리오
import { scenarios } from "@/data/scenarios";

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

export async function fetchScenarios(): Promise<Scenario[]> {
  await delay();
  return scenarios;
}

// 채팅
export async function sendNegotiationMessage(
  scenarioId: string,
  round: number,
  message: string,
) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: scenarioId,
      message,
      round,
    }),
  });

  if (!res.ok) {
    throw new Error("Chat request failed");
  }

  return res.json();
}

/*
//시나리오 목록
export async function fetchScenario(id: string): Promise<Scenario | undefined> {
  await delay();
  return scenarios.find((s) => s.id === id);
}
*/

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

