// src/lib/geo.js
export function getCurrentPosition(opts = { enableHighAccuracy: true, timeout: 10000 }) {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      return reject(new Error('Geolocalização não suportada'));
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        acc: pos.coords.accuracy,
        ts: Date.now(),
      }),
      err => reject(err),
      opts
    );
  });
}

// Reverse geocoding via Nominatim (OSM) – uso leve e com rate-limit.
// Em produção, considere um provedor com SLA (Google, Mapbox, etc).
export async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'pt' } });
  if (!res.ok) throw new Error('Reverse geocoding falhou');
  const data = await res.json();
  return data.display_name || '';
}

export async function getLocationWithAddress() {
  const p = await getCurrentPosition();
  let address = '';
  try { address = await reverseGeocode(p.lat, p.lon); } catch {}
  return { ...p, address };
}
