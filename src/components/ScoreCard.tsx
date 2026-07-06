/* eslint-disable prettier/prettier */
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type LegacyScores = {
  evidence?: number;
  expression?: number;
  strategy?: number;
  perspective?: number;
};

type NewDetailedScores = {
  national_interest?: {
    score: number;
    reason: string;
  };
  reciprocity_compromise?: {
    score: number;
    reason: string;
  };
  logic_data?: {
    score: number;
    reason: string;
  };
  diplomatic_etiquette?: {
    score: number;
    reason: string;
  };
};

type ScoreItem = {
  label: string;
  value: number;
  max: number;
  reason?: string;
};

function toNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function hasNewDetailedScores(detailedScores?: NewDetailedScores) {
  if (!detailedScores) return false;

  return Object.values(detailedScores).some(
    (item) => typeof item?.score === "number",
  );
}

function normalizeLegacyScore(value: unknown) {
  const score = toNumber(value);

  if (score <= 5) return clamp(score * 20, 0, 100);
  if (score <= 10) return clamp(score * 10, 0, 100);

  return clamp(score, 0, 100);
}

export function ScoreCard({
  totalScore,
  detailedScores,
  scores,
}: {
  totalScore?: number;
  detailedScores?: NewDetailedScores;
  scores?: LegacyScores;
}) {
  const isNewScoreType = hasNewDetailedScores(detailedScores);

  const items: ScoreItem[] = isNewScoreType
    ? [
        {
          label: "국익 및 목적 달성도",
          value: clamp(toNumber(detailedScores?.national_interest?.score), 0, 25),
          max: 25,
          reason: detailedScores?.national_interest?.reason,
        },
        {
          label: "상호 호혜성 및 타협 능력",
          value: clamp(
            toNumber(detailedScores?.reciprocity_compromise?.score),
            0,
            25,
          ),
          max: 25,
          reason: detailedScores?.reciprocity_compromise?.reason,
        },
        {
          label: "논리성 및 데이터 활용도",
          value: clamp(toNumber(detailedScores?.logic_data?.score), 0, 25),
          max: 25,
          reason: detailedScores?.logic_data?.reason,
        },
        {
          label: "외교적 태도 및 실현 가능성",
          value: clamp(
            toNumber(detailedScores?.diplomatic_etiquette?.score),
            0,
            25,
          ),
          max: 25,
          reason: detailedScores?.diplomatic_etiquette?.reason,
        },
      ]
    : [
        {
          label: "근거 활용도",
          value: normalizeLegacyScore(scores?.evidence),
          max: 100,
        },
        {
          label: "외교적 표현",
          value: normalizeLegacyScore(scores?.expression),
          max: 100,
        },
        {
          label: "전략 선택",
          value: normalizeLegacyScore(scores?.strategy),
          max: 100,
        },
        {
          label: "상대국 입장 고려",
          value: normalizeLegacyScore(scores?.perspective),
          max: 100,
        },
      ];

  const calculatedTotal = isNewScoreType
    ? items.reduce((sum, item) => sum + item.value, 0)
    : Math.round(
        items.reduce((sum, item) => sum + item.value, 0) / items.length,
      );

  const finalTotal = clamp(toNumber(totalScore, calculatedTotal), 0, 100);

  return (
    <Card className="border-border">
      <CardContent className="space-y-4 py-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground">종합 점수</div>
            <div className="font-display text-4xl font-bold text-navy">
              {Math.round(finalTotal)}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const progressValue = (item.value / item.max) * 100;

            return (
              <div key={item.label}>
                <div className="mb-1 flex justify-between gap-3 text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="shrink-0 font-semibold text-navy">
                    {Math.round(item.value)} / {item.max}
                  </span>
                </div>

                <Progress value={progressValue} className="h-2" />

                {item.reason && (
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.reason}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}