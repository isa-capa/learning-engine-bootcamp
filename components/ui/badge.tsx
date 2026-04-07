import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

function join(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700"
      : "bg-slate-900 text-white";
  return <span className={join("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", styles, className)} {...props} />;
}
