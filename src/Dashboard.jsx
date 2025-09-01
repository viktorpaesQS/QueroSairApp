import React from "react";
import { QrCode, Bell, Car, ArrowRight, ScanLine, MessageSquare } from "lucide-react";

export default function Dashboard({ vehicles = [], notifications = [], chats = [], setActiveTab }) {
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

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">Good to see you 👋</h1>
        <button
          onClick={() => setActiveTab?.("profile")}
          className="text-sm text-text-secondary hover:text-white transition"
        >
          Profile <ArrowRight className="inline-block h-4 w-4 -mb-1" />
        </button>
      </div>

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
