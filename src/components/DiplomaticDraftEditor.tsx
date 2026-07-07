/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DiplomaticDraftEditor({
  drafts,
}: {
  drafts: { protest: string; consultation: string; jointStatement: string };
}) {
  const [protest, setProtest] = useState(drafts.protest);
  const [consult, setConsult] = useState(drafts.consultation);
  const [joint, setJoint] = useState(drafts.jointStatement);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success("초안이 복사되었습니다.");
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-navy">외교문</h3>
        <p className="text-xs text-muted-foreground">
          초안을 바탕으로 직접 작성해 보세요.
        </p>
      </div>
      <Tabs defaultValue="protest" className="p-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="protest">항의문</TabsTrigger>
          <TabsTrigger value="consult">협의 요청서</TabsTrigger>
          <TabsTrigger value="joint">공동성명 초안</TabsTrigger>
        </TabsList>
        <TabsContent value="protest" className="mt-4 space-y-2">
          <Textarea value={protest} onChange={(e) => setProtest(e.target.value)} className="min-h-[180px]" />
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => copy(protest)}>
              <Copy className="h-3.5 w-3.5" /> 복사
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="consult" className="mt-4 space-y-2">
          <Textarea value={consult} onChange={(e) => setConsult(e.target.value)} className="min-h-[180px]" />
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => copy(consult)}>
              <Copy className="h-3.5 w-3.5" /> 복사
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="joint" className="mt-4 space-y-2">
          <Textarea value={joint} onChange={(e) => setJoint(e.target.value)} className="min-h-[180px]" />
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => copy(joint)}>
              <Copy className="h-3.5 w-3.5" /> 복사
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
