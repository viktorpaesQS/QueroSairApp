import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 select-none rounded-xl px-4 py-2 text-sm font-medium transition " +
  "disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const variants = {
  primary: "bg-[var(--brand-yellow)] text-black hover:brightness-95 active:brightness-90 shadow-sm",
  secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10",
  ghost: "bg-transparent text-white hover:bg-white/5",
  outline: "bg-transparent text-white border border-white/15 hover:bg-white/5",
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
};

export const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export default Button;
