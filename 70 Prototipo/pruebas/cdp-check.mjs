// Recorre la demo en Chrome sin ventana y recoge TODAS las excepciones con su pila (vía CDP).
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const CHROME = process.env.CHROME || (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : process.platform === "win32" ? "C:/Program Files/Google/Chrome/Application/chrome.exe" : "google-chrome");
const URL = process.argv[2] || "http://localhost:8765/70%20Prototipo/GoLiveIt-Planner-para-compartir.html";
const prof = mkdtempSync(join(tmpdir(), "cdp-"));
const ch = spawn(CHROME, ["--headless=new", "--remote-debugging-port=9333", "--user-data-dir=" + prof, "--window-size=1440,900", "--no-first-run", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch("http://127.0.0.1:9333/json")).json(); if (targets.length) break; } catch {} await sleep(250); }
const page = targets.find(t => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const errors = []; const logs = [];
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
  if (m.method === "Runtime.exceptionThrown") { const d = m.params.exceptionDetails; errors.push({ step: cur, text: (d.exception && d.exception.description || d.text || "").split("\n").slice(0, 6).join(" | "), url: d.url, line: d.lineNumber }); }
  if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error" || m.params.type === "warning")) logs.push({ step: cur, type: m.params.type, text: m.params.args.map(a => a.value || a.description || "").join(" ").slice(0, 200) });
  if (m.method === "Log.entryAdded" && m.params.entry.level === "error") logs.push({ step: cur, type: "log", text: (m.params.entry.text + " " + (m.params.entry.url || "")).slice(0, 200) }); };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send("Runtime.evaluate", { expression: `(async()=>{${expr}})()`, awaitPromise: true, returnByValue: true }); return r.result && r.result.result ? r.result.result.value : r; };
let cur = "carga";
await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
await send("Page.navigate", { url: URL }); await sleep(6000);
const W = "const w=ms=>new Promise(r=>setTimeout(r,ms)); const q=s=>document.querySelector(s); const click=s=>{const e=q(s); if(e){e.click(); return true;} return false;};";
const steps = [
  ["portada", "click('#cover-demo'); await w(3000);"],
  ["zoom", "click('#zin'); await w(800); click('#zout'); await w(800);"],
  ["mapa simple", "click(\"button[data-mode='offline']\"); await w(3000);"],
  ["calles", "click(\"button[data-mode='osm']\"); await w(4000);"],
  ["roma", "click(\"#results button[data-dest='roma']\"); await w(3500);"],
  ["pestañas", "for (const t of ['vuelos','dormir','ocio','papeles','presupuesto','todo']) { click(`.tabs button[data-tab='${t}']`); await w(500); }"],
  ["inicio", "click('#zeu'); await w(2500);"],
  ["comparar", "for (const k of ['lisboa','berlin']) { const c=q(`#results input[data-cmp='${k}']`); if(c){c.checked=true; c.dispatchEvent(new Event('change',{bubbles:true}));} await w(300);} click(\"button[data-open='compare']\"); await w(800); click('#sheet-in button[data-close]'); await w(300);"],
  ["praga (pendiente)", "click(\"#results button[data-dest='praga']\"); await w(3000); click('#results button[data-back]'); await w(1500);"],
  ["marcadores", "const ms=[...document.querySelectorAll('.maplibregl-marker [data-dest]')].slice(0,6); for (const m of ms){ m.click(); await w(1800); click('#results button[data-back]'); await w(600);} return ms.length;"],
  ["las palmas", "const e=q('#origin-city'); e.value='Las Palmas de Gran Canaria'; e.dispatchEvent(new Event('change',{bubbles:true})); await w(2500); click(\"#results button[data-dest='marbella']\"); await w(3000);"],
  ["modo padres", "click(\"#results button[data-open='family']\"); await w(800); click('#fam-price'); await w(2500); click('#sheet-in button[data-close]'); await w(500);"],
  ["mi viaje", "click('#mytrip'); await w(800); click('#sheet-in button[data-close]'); await w(300);"],
  ["todos los destinos", "click('#results button[data-back]'); await w(800); const ks=[...new Set([...document.querySelectorAll('#results [data-dest]')].map(b=>b.dataset.dest))]; for (const k of ks){ click('#results button[data-back]'); await w(250); click(`#results button[data-dest='${k}']`); await w(900);} return ks.length;"]
];
for (const [name, code] of steps) { cur = name; const r = await ev(W + code); if (r && r.exceptionDetails) errors.push({ step: name, text: "fallo del paso: " + r.exceptionDetails.text }); await sleep(300); }
cur = "final"; await sleep(1500);
console.log(JSON.stringify({ errors, logs: logs.filter(l => !/favicon/.test(l.text)) }, null, 1));
ws.close(); ch.kill();
