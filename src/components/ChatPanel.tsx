import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type ChatMessage = {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
};

export function ChatPanel({
  messages,
  input,
  setInput,
  onSend,
  disabled,
  country,
}: {
  messages: ChatMessage[];
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  country: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[600px] flex-col rounded-lg border border-border bg-card">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            첫 메시지를 입력하여 협상을 시작하세요.
          </div>
        )}
        {messages.map((m) => {
          if (m.role === "system") {
            return (
              <div key={m.id} className="mx-auto max-w-md rounded-md border border-dashed border-brand/40 bg-brand/5 px-3 py-2 text-center text-xs text-brand">
                {m.content}
              </div>
            );
          }
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}>
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
                  {country.slice(0, 1)}
                </div>
              )}
              <div className={cn("max-w-[78%] space-y-1", isUser && "text-right")}>
                <div className="text-[11px] font-medium text-muted-foreground">
                  {isUser ? "한국 측 대표" : `${country} 측 대표`}
                </div>
                <div
                  className={cn(
                    "inline-block whitespace-pre-wrap rounded-lg px-3 py-2 text-sm leading-relaxed",
                    isUser
                      ? "bg-navy text-navy-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {m.content}
                </div>
              </div>
              {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                  KR
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="한국 측 대표로서 발언을 입력하세요…"
            className="min-h-[60px] resize-none"
            disabled={disabled}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button onClick={onSend} disabled={disabled || !input.trim()} className="h-auto self-stretch bg-navy hover:bg-navy/90">
            <Send className="h-4 w-4" />
            보내기
          </Button>
        </div>
        <div className="mt-1 text-[10px] text-muted-foreground">Ctrl/⌘ + Enter 전송</div>
      </div>
    </div>
  );
}
