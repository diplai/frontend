import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const STRATEGIES = [
  {
    name: "강경 항의",
    effect: "상대국에 강한 입장 전달, 국내 여론 결집",
    risk: "양국 관계 경색, 보복 조치 가능성",
  },
  {
    name: "실무협의 요청",
    effect: "차분한 협의 분위기 조성, 실무선 합의 도출",
    risk: "결정 지연, 사안 장기화",
  },
  {
    name: "공동조사 제안",
    effect: "객관적 사실 확인, 신뢰 회복",
    risk: "조사 결과에 따른 입장 변경 불가피",
  },
  {
    name: "제3자 중재 요청",
    effect: "국제 규범 활용, 절차적 정당성 확보",
    risk: "주권 사항 양보 우려, 시간 소요",
  },
  {
    name: "협력 유지",
    effect: "장기적 양국 관계 보호, 후속 협상 여지",
    risk: "현안 해결 지연, 국내 비판",
  },
] as const;

export function StrategyModal({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSelect: (name: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>전략 선택</DialogTitle>
          <DialogDescription>
            현 협상 국면에서 취할 외교 전략을 선택하세요. 선택은 채팅 흐름에 기록됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          {STRATEGIES.map((s) => (
            <Card key={s.name} className="border-border transition-colors hover:border-brand/40">
              <CardContent className="space-y-2 py-4">
                <div className="text-sm font-semibold text-navy">{s.name}</div>
                <div className="text-xs">
                  <span className="font-semibold text-emerald-700">기대효과 · </span>
                  <span className="text-muted-foreground">{s.effect}</span>
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-rose-700">리스크 · </span>
                  <span className="text-muted-foreground">{s.risk}</span>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-navy hover:bg-navy/90"
                  onClick={() => onSelect(s.name)}
                >
                  이 전략 선택
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
