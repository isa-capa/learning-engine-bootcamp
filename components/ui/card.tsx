import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

function join(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: DivProps) {
  return <div className={join("rounded-xl border border-slate-200 bg-white", className)} {...props} />;
}

export function CardHeader({ className, ...props }: DivProps) {
  return <div className={join("p-4 md:p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: DivProps) {
  return <h3 className={join("text-xl font-semibold text-slate-900", className)} {...props} />;
}

export function CardDescription({ className, ...props }: DivProps) {
  return <p className={join("text-sm text-slate-600", className)} {...props} />;
}

export function CardContent({ className, ...props }: DivProps) {
  return <div className={join("p-4 pt-0 md:p-6 md:pt-0", className)} {...props} />;
}
