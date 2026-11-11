// Construye el prototipo GoLiveIt Planner incrustando las fotos (Wikimedia Commons) y la guía legal.
// Uso: node "70 Prototipo/build.mjs"
// Salidas:
//   GoLiveIt-Planner.html                 -> página que se publica como artefacto (sin <html>/<head>)
//   GoLiveIt-Planner-para-compartir.html  -> documento completo para abrir en el navegador (mapa con calles y Mapbox)
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, "..");
const src = readFileSync(join(dir, "planner.src.html"), "utf8");
// Fotos: las cinco de la demo y las que trajo el compañero (70 Prototipo/fotos), todas de Wikimedia Commons con crédito
const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const photos = {};
for (const folder of [join(root, "60 Demo", "fotos"), join(dir, "fotos")]) {
  if (!existsSync(folder)) continue;
  for (const f of readdirSync(folder)) { const m = MIME[extname(f).toLowerCase()]; if (m) photos[basename(f, extname(f))] = `data:${m};base64,` + readFileSync(join(folder, f)).toString("base64"); }
}
const readJson = (p, fallback) => existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback;
const safe = o => JSON.stringify(o).replace(/</g, "\\u003c");

const legalPath = join(root, "60 Demo", "data", "legal.json");
let legal = { actualizado: null, items: [] };
if (existsSync(legalPath)) {
  legal = JSON.parse(readFileSync(legalPath, "utf8"));
  const bad = legal.items.filter(i => !i.id || !i.titulo || !i.url || !i.fuente || !Array.isArray(i.paises));
  if (bad.length) throw new Error("legal.json: puntos sin id, título, fuente, url o países: " + bad.map(i => i.id).join(", "));
}

const swap = (s, mark, value) => { if (!s.includes(mark)) throw new Error("Falta el marcador " + mark); return s.replace(mark, () => value); };
let page = swap(src, "/*__PHOTOS__*/{}", JSON.stringify(photos));
page = swap(page, '/*__LEGAL__*/{ "actualizado": null, "items": [] }', JSON.stringify(legal).replace(/</g, "\\u003c"));
const dnPath = join(dir, "data", "destinos-nuevos.json");
const destNew = existsSync(dnPath) ? JSON.parse(readFileSync(dnPath, "utf8")) : { destinos: [] };
page = swap(page, '/*__DESTNEW__*/{ "destinos": [] }', JSON.stringify(destNew).replace(/</g, "\\u003c"));
// Datos del compañero (demo avanzada, 07-10/11/2026): destinos, albergues consultados por correo, planes, coordenadas y créditos de fotos
const team = readJson(join(dir, "data", "datos-equipo.json"), { dest: {}, stays: [], plans: [] });
page = swap(page, '/*__TEAM__*/{ "dest": {}, "stays": [], "plans": [] }', safe(team));
page = swap(page, "/*__UBIC__*/{}", safe(readJson(join(dir, "data", "ubicaciones-alojamientos.json"), {})));
page = swap(page, "/*__CRED__*/{}", safe(readJson(join(dir, "data", "creditos-fotos.json"), {})));
page = swap(page, "/*__CITIES__*/[]", safe(readJson(join(dir, "data", "ciudades-es.json"), [])));
writeFileSync(join(dir, "GoLiveIt-Planner.html"), page);

const body = page
  .replace(/^<meta charset="utf-8">\s*/, "")
  .replace(/<title>[^<]*<\/title>\s*/, "")
  .replace(/<meta name="claude:viewport-fit-sides"[^>]*>\s*/, "");
const standalone = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GoLiveIt Planner · prototipo</title>
</head>
<body>
${body}
</body>
</html>
`;
writeFileSync(join(dir, "GoLiveIt-Planner-para-compartir.html"), standalone);
console.log(`Fotos: ${Object.keys(photos).length} · Destinos del equipo: ${Object.keys(team.dest).length} · Albergues: ${team.stays.length} · Planes: ${team.plans.length} · Guía legal: ${legal.items.length} · GoLiveIt-Planner.html: ${(page.length / 1024).toFixed(0)} KB`);
