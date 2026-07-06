/* eslint-disable prettier/prettier */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TreatyCard } from "./TreatyCard";
import type { Scenario } from "@/types";

export function EvidencePanel({
  scenario,
  onInsert,
}: {
  scenario: Scenario;
  onInsert: (text: string) => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-navy">근거 자료</h3>
        <p className="text-xs text-muted-foreground">협상 중 참고 가능한 자료입니다.</p>
      </div>
      <Tabs defaultValue="treaties" className="p-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="treaties">조약·협정</TabsTrigger>
          <TabsTrigger value="sentences">협상 문장</TabsTrigger>
        </TabsList>
        <TabsContent value="treaties" className="mt-4 space-y-3">
          {scenario.treaties.map((t) => (
            <TreatyCard key={t.name} {...t} />
          ))}
        </TabsContent>
        <TabsContent value="sentences" className="mt-4 space-y-2">
          {scenario.suggestedSentences.map((s, i) => (
            <div key={i} className="rounded-md border border-border bg-surface p-3 text-sm">
              <p className="text-foreground">{s}</p>
              <div className="mt-2 flex justify-end">
                <Button size="sm" variant="outline" onClick={() => onInsert(s)}>
                  근거 삽입
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
