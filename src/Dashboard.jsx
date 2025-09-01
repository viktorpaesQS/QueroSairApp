import React from "react";
import { QrCode, Bell, Car, ArrowRight, ScanLine, MessageSquare, MapPin, Navigation } from "lucide-react";

function formatWhen(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${d.toLocaleDateString()} • ${hh}:${mm}`;
}

export default function Dashboard({
  vehicles = [],
  notifications = [],
  chats = [],
  setActiveTab,
  lastParking,
  onSaveParking,
  onClearParking,
}) {
  const stats = [
    { label: "Vehicles", icon: Car, value: vehicles.length || 0 },
    { label: "New Alerts", icon: Bell, value: notifications.filter(n => !n.read).length || 0 },
    { label: "QR Codes", icon: QrCode, value: vehicles.length || 0 },
  ];

  const Card = ({ children }) => (
    <div className="relative card card-hover p-4 sm:p-5">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-yellow-400/70 via-yellow-400/20 to-transparent" />
      {children}
    </div>
  );

  const mapsLink =
    lastParking?.lat && lastParking?.lon
      ? `https://www.google.com/maps?q=${lastParking.lat},${lastParking.lon}`
      : null;

  return (
    <div className="space-y-6">
      {/* Hero com gradiente radial sutil */}
      <div className="hero-radial relative">
        <div className="relative z-10 flex items-baseline justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold">Good to see you 👋</h1>
          <button
            onClick={() => setActiveTab?.("profile")}
            className="text-sm text-text-secondary hover:text-white transition"
          >
            Profile <ArrowRight className="inline-block h-4 w-4 -mb-1" />
          </button>
        </div>
      </div>

      {/* Parking Card */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400/10 ring-1 ring-yellow-400/25">
            <MapPin className="h-5 w-5 text-brand-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium">Parking</div>
            {lastParking ? (
              <>
                <div className="text-sm text-text-secondary truncate">
                  {lastParking.address || `${lastParking.lat.toFixed(5)}, ${lastParking.lon.toFixed(5)}`}
                </div>
                <div className="text-xs text-text-secondary">{formatWhen(lastParking.ts)}</div>
              </>
            ) : (
              <div className="text-sm text-text-secondary">No location saved yet.</div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onSaveParking}
              className="rounded-xl bg-[var(--brand-yellow)] px-3 py-1.5 text-xs font-medium text-black hover:brightness-95 active:brightness-90"
            >
              {lastParking ? "Update" : "Save"} location
            </button>
            {lastParking && (
              <>
                {mapsLink && (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5 inline-flex items-center gap-1"
                  >
                    <Navigation className="h-3.5 w-3.5" /> Maps
                  </a>
                )}
                <button
                  onClick={onClearParking}
                  className="rounded-xl border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ label, icon: Icon, value }) => (
          <Card key={label}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                <Icon className="h-5 w-5 text-brand-yellow" />
              </div>
              <div>
                <div className="text-2xl font-semibold leading-none">{value}</div>
                <div className="text-xs text-text-secondary">{label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400/10 ring-1 ring-yellow-400/25">
                  <ScanLine className="h-5 w-5 text-brand-yellow" />
                </div>
                <div>
                  <div className="font-medium">Scan QR Code</div>
                  <div className="text-xs text-text-secondary">Report issue or contact owner</div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab?.("qr")}
                className="self-start rounded-xl bg-[var(--brand-yellow)] px-3 py-1.5 text-xs font-medium text-black hover:brightness-95 active:brightness-90"
              >
                Open Scanner
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">My Vehicles</div>
                  <div className="text-xs text-text-secondary">{vehicles.length || 0} vehicles registered</div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab?.("vehicles")}
                className="self-start rounded-xl border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
              >
                Manage
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Alerts</div>
                  <div className="text-xs text-text-secondary">
                    {notifications.filter(n => !n.read).length || 0} new alerts
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab?.("notifications")}
                className="self-start rounded-xl border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
              >
                View alerts
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Chat</div>
                  <div className="text-xs text-text-secondary">{chats?.length || 0} conversations</div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab?.("chat")}
                className="self-start rounded-xl border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
              >
                Open chat
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
