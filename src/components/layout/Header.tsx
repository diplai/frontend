import { Link } from "@tanstack/react-router";

export function Header() {
  const nav = [
    { to: "/", label: "홈" },
    { to: "/scenarios", label: "시나리오" },
    { to: "/simulation", label: "시뮬레이션" },
    { to: "/report", label: "리포트" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 font-display text-lg font-bold">
            D
          </span>
          <div className="leading-tight">
            <div className="text-base font-bold tracking-wide">DIPLAI</div>
            <div className="text-[10px] text-white/60">외교 협상 시뮬레이터</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "bg-white/15 text-white" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="text-xs text-white/60">공공데이터 기반</div>
      </div>
    </header>
  );
}
