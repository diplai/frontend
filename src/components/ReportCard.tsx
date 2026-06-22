import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportCard({
  title,
  children,
  accent,
}: {
  title: string;
  children: ReactNode;
  accent?: "navy" | "rose" | "emerald";
}) {
  const color =
    accent === "rose"
      ? "border-l-rose-500"
      : accent === "emerald"
        ? "border-l-emerald-500"
        : "border-l-navy";
  return (
    <Card className={`border-l-4 ${color} border-border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-navy">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm leading-relaxed text-foreground">
        {children}
      </CardContent>
    </Card>
  );
}
