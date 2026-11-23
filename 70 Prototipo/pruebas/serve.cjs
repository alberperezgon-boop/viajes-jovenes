// Servidor estático mínimo para probar el Planner (solo 127.0.0.1:8765). Sirve la carpeta raíz de la bóveda.
// Uso: node "70 Prototipo/pruebas/serve.cjs"  →  http://localhost:8765/70%20Prototipo/GoLiveIt-Planner-para-compartir.html
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(process.argv[2] || path.join(__dirname, "..", ".."));
http.createServer((req, res) => {
  const p = path.resolve(path.join(root, decodeURIComponent(req.url.split("?")[0])));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end("no"); }
  res.writeHead(200, { "Content-Type": p.endsWith(".html") ? "text/html; charset=utf-8" : p.endsWith(".json") ? "application/json" : "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
}).listen(8765, "127.0.0.1", () => console.log("listo en http://localhost:8765 (raíz: " + root + ")"));
