// DIPLAI API layer

const API_BASE = "https://diplai.onrender.com";
//const API_BASE = "http://127.0.0.1:8000"; -> 로컬 사용 시 사용할 코드

// mock data
import type { Scenario } from "@/types";

export async function fetchScenarios(): Promise<Scenario[]> {

  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error("Failed to fetch scenarios");
  return res.json();
}

export async function fetchScenario(id: string): Promise<Scenario> {
  const res = await fetch(`${API_BASE}/scenarios/${id}`);
  if (!res.ok) throw new Error("Failed to fetch scenario");
  return res.json();
}

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

export async function fetchReport(id: string): Promise<Scenario["report"]> {
  const res = await fetch(`${API_BASE}/report/${id}`);
  if (!res.ok) throw new Error("Failed to fetch report");

  return res.json();
}
