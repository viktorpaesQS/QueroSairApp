import React from "react";

function SvgBase({ children, color = "#FFC700", className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill={color} stroke="none">{children}</g>
    </svg>
  );
}

function CarSilhouette({ color, className }) {
  return (
    <SvgBase color={color} className={className}>
      <path d="M3 11h12.5l2.2-3.5c.2-.3.5-.5.9-.5H20c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1z" />
      <rect x="7.5" y="8" width="5" height="2" rx="0.5" opacity="0.35" />
    </SvgBase>
  );
}

function MotoSilhouette({ color, className }) {
  return (
    <SvgBase color={color} className={className}>
      <circle cx="6" cy="15.5" r="2.2"/><circle cx="17" cy="15.5" r="2.4"/>
      <path d="M5 15.5h6l3-3 2 .5 1.5-1.5-2-2-2 .5-1-1H9l1.5 2-2 2H5c-.6 0-1 .4-1 1s.4 1 1 1z"/>
    </SvgBase>
  );
}

function VanSilhouette({ color, className }) {
  return (
    <SvgBase color={color} className={className}>
      <path d="M3 9c0-.6.4-1 1-1h10c.4 0 .7.2.9.5l2.5 3.5H21c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4c-.6 0-1-.4-1-1V9z"/>
      <rect x="5" y="9.5" width="6" height="2.2" rx="0.4" opacity="0.35" />
    </SvgBase>
  );
}

function TruckSilhouette({ color, className }) {
  return (
    <SvgBase color={color} className={className}>
      <path d="M3 9h9c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1z"/>
      <rect x="12.5" y="10" width="7.5" height="4.5" rx="0.8"/>
      <circle cx="6.5" cy="16.5" r="2.2" />
      <circle cx="14.5" cy="16.5" r="2.2" />
      <circle cx="19.5" cy="16.5" r="2.2" />
    </SvgBase>
  );
}

export default function VehicleSilhouette({ type = "car", color = "#FFC700", className = "h-6 w-6" }) {
  switch (type) {
    case "moto":  return <MotoSilhouette  color={color} className={className} />;
    case "van":   return <VanSilhouette   color={color} className={className} />;
    case "truck": return <TruckSilhouette color={color} className={className} />;
    default:      return <CarSilhouette   color={color} className={className} />;
  }
}
