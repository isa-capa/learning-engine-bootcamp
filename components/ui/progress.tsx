import React from "react";

type ProgressProps = {
  value?: number;
  className?: string;
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function join(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Progress({ value = 0, className }: ProgressProps) {
  const safe = clamp(value);
  return (
    <div className={join("h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div className="h-full bg-slate-900 transition-all duration-300" style={{ width: `${safe}%` }} />
    </div>
  );
}
