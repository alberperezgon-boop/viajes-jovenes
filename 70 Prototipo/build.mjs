// Construye el prototipo GoLiveIt Planner incrustando las fotos (Wikimedia Commons) y la guía legal.
// Uso: node "70 Prototipo/build.mjs"
// Salidas:
//   GoLiveIt-Planner.html                 -> página que se publica como artefacto (sin <html>/<head>)
//   GoLiveIt-Planner-para-compartir.html  -> documento completo para abrir en el navegador (mapa con calles y Mapbox)
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, "..");
const src = readFileSync(join(dir, "planner.src.html"), "utf8");
const keys = ["lisboa", "paris", "roma", "berlin", "londres"];
const photos = Object.fromEntries(keys.map(k => [k, "data:image/jpeg;base64," + readFileSync(join(root, "60 Demo", "fotos", `${k}.jpg`)).toString("base64")]));

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
console.log(`Guía legal: ${legal.items.length} puntos · GoLiveIt-Planner.html: ${(page.length / 1024).toFixed(0)} KB`);
