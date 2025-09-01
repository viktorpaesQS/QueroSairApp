import React from "react";
import { useI18n } from "@/lib/i18n";

const LABELS = {
  "pt":"PT", "pt-BR":"PT-BR", "en":"EN", "es":"ES", "fr":"FR", "zh":"中文", "ar":"العربية", "de":"DE"
};

export default function LanguagePicker() {
  const { locale, setLocale, SUPPORTED } = useI18n();

  return (
    <div className="rounded-xl border border-white/15 bg-black/50 backdrop-blur px-2 py-1">
      <select
        className="bg-transparent text-sm"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        {SUPPORTED.map(l => (
          <option key={l} value={l}>{LABELS[l] || l}</option>
        ))}
      </select>
    </div>
  );
}
