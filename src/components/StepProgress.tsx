/* eslint-disable prettier/prettier */
import { cn } from "@/lib/utils";

const STEPS = [
  "시나리오 선택",
  "사건 브리핑",
  "AI 협상",
  "결과 리포트",
] as const;

export function StepProgress({ current }: { current: 1 | 2 | 3 | 4 }) {
  return (
    <div className="w-full">
      <ol className="flex w-full items-center gap-2">
        {STEPS.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div className="flex flex-1 items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                    active && "border-brand bg-brand text-brand-foreground",
                    done && "border-navy bg-navy text-navy-foreground",
                    !active &&
                      !done &&
                      "border-border bg-card text-muted-foreground",
                  )}
                >
                  {step}
                </div>
                <span
                  className={cn(
                    "hidden text-sm sm:inline",
                    active
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {step < STEPS.length && (
                <div
                  className={cn("h-px flex-1", done ? "bg-navy" : "bg-border")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}