import React, { useMemo, useState } from "react";
import { Car, Bike, Truck, BusFront, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ColorPicker";
import { brands, getModelsByBrand } from "@/data/brands";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/components/ui/use-toast";

const VEHICLE_TYPES = [
  { value: "car", label: "Car", icon: Car },
  { value: "moto", label: "Motorcycle", icon: Bike },
  { value: "van", label: "Van", icon: BusFront },
  { value: "truck", label: "Truck", icon: Truck },
];

export default function VehicleManagement({
  vehicles = [],
  onAddVehicle,
  onRemoveVehicle,
  garages = [],
  onAddGarage,
  onRemoveGarage,
}) {
  const [tab, setTab] = useState("vehicles");
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("vehicles")}
          className={`rounded-full px-3 py-1.5 text-sm ${tab === "vehicles" ? "bg-[var(--brand-yellow)]/20 ring-1 ring-[var(--brand-yellow)]/35" : "bg-white/5 text-text-secondary hover:bg-white/10"}`}
        >
          {t("vehicles.title")}
        </button>
        <button
          onClick={() => setTab("garages")}
          className={`rounded-full px-3 py-1.5 text-sm ${tab === "garages" ? "bg-[var(--brand-yellow)]/20 ring-1 ring-[var(--brand-yellow)]/35" : "bg-white/5 text-text-secondary hover:bg-white/10"}`}
        >
          {t("garages.title")}
        </button>
      </div>

      {tab === "vehicles" ? (
        <VehicleTab vehicles={vehicles} onAdd={onAddVehicle} onRemove={onRemoveVehicle} />
      ) : (
        <GarageTab garages={garages} onAdd={onAddGarage} onRemove={onRemoveGarage} />
      )}
    </div>
  );
}

function VehicleTab({ vehicles, onAdd, onRemove }) {
  const { t } = useI18n();
  const { toast } = useToast();

  const [form, setForm] = useState({
    type: "car",
    brand: "",
    model: "",
    plate: "",
    color: "#FFC700",
    year: new Date().getFullYear(),
  });

  const models = useMemo(() => getModelsByBrand(form.brand), [form.brand]);

  const grouped = useMemo(() => {
    const g = { car: [], moto: [], van: [], truck: [] };
    vehicles.forEach(v => g[v.type || "car"].push(v));
    return g;
  }, [vehicles]);

  const submit = (e) => {
    e.preventDefault();
    // obrigatórios: tipo, marca, modelo, cor
    if (!form.type || !form.brand || !form.model || !form.color) {
      toast({ title: t("required.all") });
      return;
    }
    onAdd(form);
    setForm({ type: "car", brand: "", model: "", plate: "", color: "#FFC700", year: new Date().getFullYear() });
  };

  return (
    <div className="grid gap-6">
      {/* Form */}
      <form onSubmit={submit} className="card p-4 sm:p-5 grid gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <Label>{t("form.type")}</Label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="mt-1 w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-sm"
              required
            >
              {VEHICLE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <Label>{t("form.brand")}</Label>
            <select
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value, model: "" })}
              className="mt-1 w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-sm"
              required
            >
              <option value="" disabled>—</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>

          <div>
            <Label>{t("form.model")}</Label>
            <select
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
              disabled={!form.brand}
              className="mt-1 w-full rounded-xl bg-zinc-900 border border-white/10 px-3 py-2 text-sm disabled:opacity-50"
              required
            >
              <option value="" disabled>—</option>
              {models.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>

          <div>
            <Label>{t("form.plate")}</Label>
            <Input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value.toUpperCase() })} placeholder="ABC-1234" />
          </div>

          <div>
            <Label>{t("form.color")}</Label>
            <ColorPicker valueHex={form.color} onChange={({ hex }) => setForm({ ...form, color: hex })} />
          </div>

          <div>
            <Label>{t("form.year")}</Label>
            <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
          </div>
        </div>

        <div>
          <Button type="submit">{t("form.addVehicle")}</Button>
        </div>
      </form>

      {/* Lists por tipo */}
      {Object.entries(grouped).map(([type, list]) => (
        <section key={type} className="grid gap-3">
          <h3 className="text-sm uppercase text-text-secondary">{type}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {list.length === 0 ? (
              <div className="text-sm text-text-secondary">—</div>
            ) : (
              list.map(v => <VehicleCard key={v.id} v={v} onRemove={() => onRemove(v.id)} />)
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function VehicleCard({ v, onRemove }) {
  const Icon = (v.type === "moto" ? Bike : v.type === "truck" ? Truck : v.type === "van" ? BusFront : Car);

  return (
    <div className="relative card p-4">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-yellow-400/70 via-yellow-400/20 to-transparent" />
      <div className="flex items-center gap-3">
        <div
          className="grid h-12 w-12 place-items-center rounded-xl ring-1"
          style={{ background: `${v.color}22`, color: v.color, borderColor: `${v.color}44` }}
        >
          <Icon className="h-6 w-6" />
          <VehicleSilhouette type={v.type} color={v.color} className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <div className="font-medium truncate">{v.brand || "—"} {v.model || ""}</div>
          <div className="text-xs text-text-secondary">{v.plate || "—"} • {v.year || "—"}</div>
        </div>
        <button onClick={onRemove} className="ml-auto rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function GarageTab({ garages, onAdd, onRemove }) {
  const { t } = useI18n();
  const [g, setG] = useState({ name: "", address: "", notes: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!g.name && !g.address) return;
    onAdd(g);
    setG({ name: "", address: "", notes: "" });
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="card p-4 sm:p-5 grid gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label>{t("garage.name")}</Label>
            <Input value={g.name} onChange={(e) => setG({ ...g, name: e.target.value })} placeholder="Ex.: Garagem Casa" />
          </div>
          <div>
            <Label>{t("garage.address")}</Label>
            <Input value={g.address} onChange={(e) => setG({ ...g, address: e.target.value })} placeholder="Rua, nº, bairro" />
          </div>
        </div>
        <div>
          <Label>{t("garage.notes")}</Label>
          <Input value={g.notes} onChange={(e) => setG({ ...g, notes: e.target.value })} placeholder="Ex.: portão azul, vaga 12…" />
        </div>
        <div>
          <Button type="submit">{t("form.addGarage")}</Button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {garages.length === 0 ? (
          <div className="text-sm text-text-secondary">—</div>
        ) : (
          garages.map((x) => (
            <div key={x.id} className="card p-4 flex items-center gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{x.name || "—"}</div>
                <div className="text-xs text-text-secondary truncate">{x.address || "—"}</div>
                {x.notes ? <div className="text-xs text-text-secondary truncate">{x.notes}</div> : null}
              </div>
              <button onClick={() => onRemove(x.id)} className="ml-auto rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-white/5">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
