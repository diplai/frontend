// DIPLAI API layer
// 현재는 mock data를 반환합니다. 나중에 fetch 호출로 교체하면 됩니다.
// 예: const res = await fetch(`${API_BASE}/scenarios`); return res.json();

const API_BASE = "https://diplai.onrender.com";

// mock data
import { scenarios } from "@/data/scenarios";
import type { Scenario } from "@/types";

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

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

// 협상 메시지 전송 (mock) -> 백 api로 교체 예정
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


/*
const API_BASE = "https://diplai.onrender.com";

import type { Scenario } from "@/types";

// 공통 fetch wrapper
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(errorText || `API Error: ${res.status}`);
  }

  return res.json();
}

// 전체 시나리오 조회 - 리스트 화면?
export function fetchScenarios(): Promise<Scenario[]> {
  return request<Scenario[]>("/scenarios");
}


// 시나리오 상세
export function fetchScenario(id: string): Promise<Scenario> {
  return request<Scenario>(`/scenarios/${id}`);
}

// 협상 메시지 전송 (AI 응답)
export function sendNegotiationMessage(
  scenarioId: string,
  message: string,
): Promise<{ reply: string }> {
  return request<{ reply: string }>("/chat", {
    method: "POST",
    body: JSON.stringify({
      scenarioId,
      message,
    }),
  });
}

//리포트 조회
export function fetchReport(id: string): Promise<any> {
  return request(`/report/${id}`);
}
*/