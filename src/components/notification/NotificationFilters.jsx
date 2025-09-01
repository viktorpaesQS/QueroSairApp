import React from "react";
import { filterOptions } from "@/utils/notificationUtils";

export default function NotificationFilters({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(opt => {
        const active = filter === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={[
              "rounded-full px-3 py-1.5 text-xs transition",
              active
                ? "bg-[var(--brand-yellow)]/20 text-white ring-1 ring-[var(--brand-yellow)]/35"
                : "bg-white/5 text-text-secondary hover:bg-white/10"
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
