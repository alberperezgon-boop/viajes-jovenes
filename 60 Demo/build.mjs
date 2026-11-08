// Construye la demo de GoLiveIt incrustando las fotos (Wikimedia Commons) en base64.
// Uso: node "60 Demo/build.mjs"
// Salidas:
//   GoLiveIt.html                 -> página que se publica como artefacto (sin <html>/<head>)
//   GoLiveIt-para-compartir.html  -> documento completo para mandar por WhatsApp o correo
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(dir, "goliveit.src.html"), "utf8");
const keys = ["lisboa", "paris", "roma", "berlin", "londres"];
const photos = Object.fromEntries(keys.map(k => [k, "data:image/jpeg;base64," + readFileSync(join(dir, "fotos", `${k}.jpg`)).toString("base64")]));

const MARK = "/*__PHOTOS__*/{}";
const LMARK = '/*__LEGAL__*/{ "actualizado": null, "items": [] }';
if (!src.includes(MARK) || !src.includes(LMARK)) throw new Error("Faltan los marcadores de fotos o de guía legal en goliveit.src.html");
const legal = JSON.parse(readFileSync(join(dir, "data", "legal.json"), "utf8"));
const page = src.replace(MARK, () => JSON.stringify(photos)).replace(LMARK, () => JSON.stringify(legal).replace(/</g, "\\u003c"));
writeFileSync(join(dir, "GoLiveIt.html"), page);

const body = page
  .replace(/^<meta charset="utf-8">\s*/, "")
  .replace(/<title>[^<]*<\/title>\s*/, "")
  .replace(/<meta name="claude:viewport-fit-sides"[^>]*>\s*/, "");
const standalone = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>GoLiveIt · demo</title>
</head>
<body>
${body}
</body>
</html>
`;
writeFileSync(join(dir, "GoLiveIt-para-compartir.html"), standalone);
console.log(`GoLiveIt.html: ${(page.length / 1024).toFixed(0)} KB · GoLiveIt-para-compartir.html: ${(standalone.length / 1024).toFixed(0)} KB`);
