// Rendimiento: CPU en reposo, tareas largas al mover la pasta, abrir destino y cambiar de pestaña; perfil de CPU de las funciones más caras
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const CHROME = process.env.CHROME || (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : process.platform === "win32" ? "C:/Program Files/Google/Chrome/Application/chrome.exe" : "google-chrome");
const URL = "http://localhost:8765/70%20Prototipo/GoLiveIt-Planner-para-compartir.html";
const OUT = process.argv[2] || ".";
const prof = mkdtempSync(join(tmpdir(), "cdp-"));
const ch = spawn(CHROME, ["--headless=new", "--remote-debugging-port=9336", "--user-data-dir=" + prof, "--window-size=1440,900", "--no-first-run", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch("http://127.0.0.1:9336/json")).json(); if (targets.length) break; } catch {} await sleep(250); }
const ws = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map(); const errors = [];
ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description?.split("\n")[0]); };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await send("Runtime.evaluate", { expression: `(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const q=s=>document.querySelector(s);const click=s=>{const x=q(s);if(x)x.click();return !!x;};${e}})()`, awaitPromise: true, returnByValue: true })).result?.result?.value;
const metrics = async () => Object.fromEntries((await send("Performance.getMetrics")).result.metrics.map(m => [m.name, m.value]));
const KEYS = ["TaskDuration", "ScriptDuration", "LayoutDuration", "RecalcStyleDuration", "LayoutCount", "RecalcStyleCount", "Nodes", "JSHeapUsedSize"];
const diff = (a, b) => Object.fromEntries(KEYS.map(k => [k, k === "Nodes" || k === "JSHeapUsedSize" ? Math.round(b[k] / (k === "JSHeapUsedSize" ? 1048576 : 1)) : Math.round((b[k] - a[k]) * (k.endsWith("Duration") ? 1000 : 1))]));
const res = {};
const phase = async (name, action, profile) => {
  await ev("window.__lt=[]; window.__fr=0; (function f(){window.__fr++; window.__raf=requestAnimationFrame(f)})(); return 1;");
  if (profile) { await send("Profiler.start"); }
  const m0 = await metrics(); const t0 = Date.now();
  await ev(action);
  const m1 = await metrics(); const dt = Date.now() - t0;
  let prof;
  if (profile) prof = (await send("Profiler.stop")).result.profile;
  const lt = await ev("cancelAnimationFrame(window.__raf); return {frames: window.__fr, long: window.__lt.length, longMs: Math.round(window.__lt.reduce((s,x)=>s+x,0)), worst: Math.round(Math.max(0,...window.__lt))};");
  res[name] = { ms: dt, fps: Math.round(lt.frames / (dt / 1000)), ...lt, ...diff(m0, m1) };
  if (prof) {
    // tiempo propio por función
    const self = new Map(); const byId = new Map(prof.nodes.map(n => [n.id, n]));
    const dts = prof.timeDeltas; prof.samples.forEach((s, i) => { const n = byId.get(s); const k = (n.callFrame.functionName || "(anónima)") + ":" + n.callFrame.lineNumber; self.set(k, (self.get(k) || 0) + (dts[i] || 0)); });
    res[name].top = [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => k + " " + Math.round(v / 1000) + "ms");
  }
};
await send("Runtime.enable"); await send("Page.enable"); await send("Performance.enable"); await send("Profiler.enable"); await send("Profiler.setSamplingInterval", { interval: 200 });
await send("Page.addScriptToEvaluateOnNewDocument", { source: "window.__lt=[];try{new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__lt&&window.__lt.push(e.duration))).observe({type:'longtask',buffered:false})}catch(e){}" });
const tl = Date.now(); await send("Page.navigate", { url: URL }); await sleep(6500);
await ev("click('#cover-demo'); await w(3500); return 1;");
await phase("reposo-lista-5s", "await w(5000); return 1;", true);
await phase("slider-pasta", "const s=q('#budget'); for(let v=150; v<=450; v+=10){ s.value=v; s.dispatchEvent(new Event('input',{bubbles:true})); await w(30);} await w(800); return 1;", true);
await phase("abrir-destino", "click(\"#results button[data-dest='lisboa']\"); await w(3000); return 1;", true);
await phase("reposo-destino-5s", "await w(5000); return 1;", false);
await phase("pestañas", "for (const t of ['vuelos','dormir','ocio','papeles','presupuesto','todo']) { click(\".tabs button[data-tab='\"+t+\"']\"); await w(400);} return 1;", true);
await phase("volver-lista", "click('[data-back]'); await w(2500); return 1;", true);
await phase("escribir-plan", "const t=q('#plan')||q('textarea'); if(t){ for (const c of ' y museos baratos'){ t.value+=c; t.dispatchEvent(new Event('input',{bubbles:true})); await w(40);} } await w(500); return 1;", false);
writeFileSync(join(OUT, "perf.json"), JSON.stringify({ errors, res }, null, 1));
for (const [k, v] of Object.entries(res)) { const { top, ...r } = v; console.log(k, JSON.stringify(r)); if (top) console.log("   ", top.join(" | ")); }
console.log("errores:", errors.length, errors.slice(0, 3));
ws.close(); ch.kill();
