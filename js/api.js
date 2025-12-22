// js/api.js
// ==========================
// API: Fechas ocupadas (Google Sheets vía Apps Script)
// ==========================

export const OCCUPIED_API_URL = "https://script.google.com/macros/s/AKfycbzi1H___5DCypbx1HSMsicbQxG6nSxysKHfUU8IEWMxHz2zYeWMWsf19-3pomoAi68p/exec";

/**
 * Devuelve un Set con fechas ocupadas en formato YYYY-MM-DD
 * Espera un JSON así: { "dates": ["2025-12-20", "2025-12-21"] }
 */
export async function fetchOccupiedDatesSet() {
  try {
    const res = await fetch(OCCUPIED_API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const list = Array.isArray(data?.dates) ? data.dates : [];

    // Normaliza strings
    const cleaned = list
      .map(v => String(v || "").trim())
      .filter(Boolean);

    return new Set(cleaned);
  } catch (err) {
    console.warn("No se pudieron cargar fechas ocupadas:", err);
    return new Set(); // si falla, no bloquea nada
  }
}

