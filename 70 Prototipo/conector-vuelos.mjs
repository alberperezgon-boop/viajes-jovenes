// Conector de vuelos en tiempo real para GoLiveIt Planner (Duffel API v2).
// La clave de Duffel es secreta: se queda en este proceso (variable de entorno) y nunca va a la página.
//
// Uso:
//   Modo prueba (sin clave, datos inventados y marcados como PRUEBA):  node "70 Prototipo/conector-vuelos.mjs" --prueba
//   Con Duffel (clave de test o live en la variable DUFFEL_TOKEN):     node "70 Prototipo/conector-vuelos.mjs"
// Escucha en http://localhost:8787. La demo lo detecta sola en la pestaña Vuelos.
import { createServer } from "node:http";

const PORT = +process.env.GOLIVEIT_VUELOS_PORT || 8787;
const PRUEBA = process.argv.includes("--prueba");
const TOKEN = process.env.DUFFEL_TOKEN || "";
if (!PRUEBA && !TOKEN) { console.error("Falta DUFFEL_TOKEN. Arranca con --prueba para probar sin clave."); process.exit(1); }
const ALLOWED = /^(https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?|null)$/; // la página servida en local o abierta como archivo

const iata = s => /^[A-Z]{3}$/.test(s || "");
const isoDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || "");

function simplify(offer) {
  const sl = offer.slices.map(s => ({
    from: s.origin.iata_code, to: s.destination.iata_code, dur: s.duration,
    stops: s.segments.length - 1,
    dep: s.segments[0].departing_at, arr: s.segments[s.segments.length - 1].arriving_at,
    carriers: [...new Set(s.segments.map(g => g.marketing_carrier.iata_code))]
  }));
  return { id: offer.id, airline: offer.owner.name, iata: offer.owner.iata_code, total: +offer.total_amount, currency: offer.total_currency,
    perPerson: +(offer.total_amount / offer.passengers.length).toFixed(2), slices: sl, live: !!offer.live_mode,
    expires: offer.expires_at, paxTypes: offer.passengers.map(p => p.type || null) };
}

async function duffel(q) {
  const body = { data: {
    slices: [{ origin: q.from, destination: q.to, departure_date: q.out }, ...(q.back ? [{ origin: q.to, destination: q.from, departure_date: q.back }] : [])],
    passengers: q.ages.map(age => ({ age })), // edades reales: cada aerolínea aplica su norma
    cabin_class: "economy", max_connections: q.direct ? 0 : 1,
    include_split_ticket: false // nunca billetes separados (transbordo por cuenta propia) con menores
  } };
  const r = await fetch("https://api.duffel.com/air/offer_requests?return_offers=true&supplier_timeout=15000", {
    method: "POST", headers: { Authorization: "Bearer " + TOKEN, "Duffel-Version": "v2", "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!r.ok) throw new Error((j.errors && j.errors[0] && (j.errors[0].message || j.errors[0].title)) || "Error de Duffel " + r.status);
  return (j.data.offers || []).map(simplify).sort((a, b) => a.total - b.total).slice(0, 12);
}

function prueba(q) { // datos inventados para probar la pantalla, siempre marcados como PRUEBA
  const mk = (airline, code, pp, h) => ({ id: "prueba_" + code, airline, iata: code, total: pp * q.ages.length, currency: "EUR", perPerson: pp, live: false, prueba: true, expires: null, paxTypes: q.ages.map(() => null),
    slices: [{ from: q.from, to: q.to, dur: "PT2H25M", stops: 0, dep: q.out + "T" + h + ":00", arr: q.out + "T" + String((+h.slice(0, 2) + 2) % 24).padStart(2, "0") + h.slice(2) + ":00", carriers: [code] }, ...(q.back ? [{ from: q.to, to: q.from, dur: "PT2H30M", stops: 0, dep: q.back + "T18:10:00", arr: q.back + "T20:40:00", carriers: [code] }] : [])] });
  return [mk("Ryanair", "FR", 61, "06:40"), mk("Vueling", "VY", 84, "09:15"), mk("Transavia", "HV", 77, "12:05"), mk("Iberia", "IB", 139, "15:30")];
}

createServer(async (req, res) => {
  const origin = req.headers.origin || "null";
  if (ALLOWED.test(origin)) { res.setHeader("Access-Control-Allow-Origin", origin); res.setHeader("Vary", "Origin"); res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); res.setHeader("Access-Control-Allow-Headers", "Content-Type"); res.setHeader("Access-Control-Allow-Private-Network", "true"); }
  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
  const send = (code, obj) => { res.writeHead(code, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify(obj)); };
  if (req.method === "GET" && req.url === "/estado") return send(200, { ok: true, modo: PRUEBA ? "prueba" : (TOKEN.startsWith("duffel_test") ? "test" : "live"), proveedor: "Duffel" });
  if (req.method !== "POST" || req.url !== "/vuelos") return send(404, { error: "Ruta no encontrada" });
  let raw = ""; for await (const c of req) { raw += c; if (raw.length > 4096) return send(413, { error: "Petición demasiado grande" }); }
  let q; try { q = JSON.parse(raw); } catch { return send(400, { error: "JSON no válido" }); }
  if (!iata(q.from) || !iata(q.to) || !isoDate(q.out) || (q.back && !isoDate(q.back)) || !Array.isArray(q.ages) || !q.ages.length || q.ages.length > 9 || q.ages.some(a => !Number.isInteger(a) || a < 0 || a > 120))
    return send(400, { error: "Datos de búsqueda no válidos" });
  try { const offers = PRUEBA ? prueba(q) : await duffel(q); send(200, { modo: PRUEBA ? "prueba" : (TOKEN.startsWith("duffel_test") ? "test" : "live"), hora: new Date().toISOString(), offers }); }
  catch (e) { send(502, { error: String(e.message || e) }); }
}).listen(PORT, "127.0.0.1", () => console.log(`Conector de vuelos en http://localhost:${PORT} (${PRUEBA ? "modo PRUEBA, datos inventados" : "Duffel"})`));
