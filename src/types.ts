export type Difficulty = "초급" | "중급" | "고급";

export interface Scenario {
  id: string;
  title: string;
  field: string;
  country: string;
  difficulty: Difficulty;
  summary: string;
  briefing: {
    background: string;
    currentSituation: string;
    goal: string;
  };
  stakeholders: {
    korea: string;
    counterpart: string;
    others: string;
  };
  timeline: { date: string; title: string; description: string }[];
  treaties: { name: string; effectiveDate: string; summary: string; source: string }[];
  issues: {
    applicability: string;
    counterpartClaim: string;
    koreaLogic: string;
    risk: string;
    negotiable: string;
  };
  suggestedSentences: string[];
  drafts: { protest: string; consultation: string; jointStatement: string };
  report: {
    summary: string;
    koreaClaims: string[];
    aiRebuttals: string[];
    flow: string;
    actualResult: string;
    references: { name: string; description: string; source: string }[];
    missed: string[];
    insufficient: string[];
    overlooked: string[];
    expressionRisk: string[];
    betterDirection: string[];
    scores: { evidence: number; expression: number; strategy: number; perspective: number };
  };
}
