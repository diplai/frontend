// DIPLAI API layer

const API_BASE = "https://diplai.onrender.com";
//const API_BASE = "http://127.0.0.1:8000"; //-> 로컬 사용 시 사용할 코드

// mock data
import type { Scenario } from "@/types";

export async function fetchScenarios(): Promise<Scenario[]> {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error("Failed to fetch scenarios");

  const scenarios = await res.json();

  return Promise.all(
    scenarios.map(async (scenario: Scenario) => {
      if (scenario.country) return scenario;

      try {
        const detail = await fetchScenario(scenario.id);

        return {
          ...scenario,
          country: detail.country,
          summary: scenario.summary ?? detail.summary,
        };
      } catch {
        return scenario;
      }
    }),
  );
}

export async function startNegotiation(
  scenarioId: string,
): Promise<{ reply: string }> {
  const res = await fetch(`${API_BASE}/chat/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: scenarioId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to start negotiation");
  }

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
  onChunk: (chunk: string) => void,
): Promise<void> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: scenarioId,
      round,
      message,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to send message");
  }

  if (!res.body) {
    throw new Error("Response body is empty");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    onChunk(decoder.decode(value, { stream: true }));
  }
  onChunk(decoder.decode());
}

export async function fetchReport(id: string): Promise<Scenario["report"]> {
  const res = await fetch(`${API_BASE}/report/${id}`);
  if (!res.ok) throw new Error("Failed to fetch report");

  return res.json();
}
