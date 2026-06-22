import type { ReactNode } from "react";
import { Header } from "./Header";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-surface py-6">
        <div className="mx-auto max-w-7xl px-4 text-xs text-muted-foreground sm:px-6">
          © DIPLAI · 본 서비스는 외교부 공공데이터를 기반으로 한 교육용 시뮬레이터입니다.
        </div>
      </footer>
    </div>
  );
}
