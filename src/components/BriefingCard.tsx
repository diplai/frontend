/* eslint-disable prettier/prettier */
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BriefingCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-navy">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-foreground">
        {children}
      </CardContent>
    </Card>
  );
}