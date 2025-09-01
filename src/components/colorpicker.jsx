import React from "react";

const PALETTE = [
  "#FFC700", "#FFDD55", "#FFE69C",
  "#FFFFFF", "#E5E7EB", "#9CA3AF",
  "#111827", "#1F2937", "#374151",
  "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"
];

const NAMED = [
  { name: "Preto",  hex: "#000000" },
  { name: "Branco", hex: "#FFFFFF" },
  { name: "Prata",  hex: "#C0C0C0" },
  { name: "Cinza",  hex: "#808080" },
  { name: "Vermelho", hex: "#EF4444" },
  { name: "Laranja", hex: "#F59E0B" },
  { name: "Amarelo", hex: "#FFC700" },
  { name: "Verde", hex: "#10B981" },
  { name: "Azul",  hex: "#3B82F6" },
  { name: "Roxo",  hex: "#8B5CF6" },
];

export default function ColorPicker({ valueHex, onChange }) {
  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {PALETTE.map(hex => (
          <button
            key={hex}
            type="button"
            aria-label={hex}
            onClick={() => onChange({ hex })}
            className="h-6 w-6 rounded-md ring-1 ring-white/15"
            style={{ backgroundColor: hex, outline: valueHex === hex ? '2px solid #ffc700' : 'none' }}
            title={hex}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          className="h-9 w-12 rounded-md bg-transparent"
          value={valueHex || "#FFC700"}
          onChange={(e) => onChange({ hex: e.target.value })}
        />
        <select
          className="w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-sm"
          onChange={(e) => {
            const found = NAMED.find(n => n.name === e.target.value);
            if (found) onChange({ hex: found.hex });
          }}
          defaultValue=""
        >
          <option value="" disabled>Cor por nome…</option>
          {NAMED.map(n => <option key={n.name} value={n.name}>{n.name}</option>)}
        </select>
      </div>
    </div>
  );
}
