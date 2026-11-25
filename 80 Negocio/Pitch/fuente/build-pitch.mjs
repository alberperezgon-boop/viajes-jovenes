// Convierte la presentación (deck.json + slides) en una web de pitch independiente (Netlify) y en un HTML estático para Figma.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
const D = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4], TEAMPITCH = process.argv[5];
const deck = JSON.parse(readFileSync(join(D, "project/deck.json"), "utf8"));
const css = readFileSync(join(D, "project/deck.css"), "utf8");
const IMG = { "b8fa91cdf1265dbdf24687820e684a69": "light-lista.png", "eeacfda501df91a4940ecc561bf7b0aa": "light-dormir.png", "0eeede1bcb56dcf8ee8e8a7193249f8c": "light-padres.png" };
// Fuentes Inter y Space Grotesk (OFL) incrustadas en el pitch del compañero: se reutilizan
const team = readFileSync(TEAMPITCH, "utf8");
const faces = (team.match(/@font-face\{[^}]*\}/g) || []).join("\n");
if (!faces.includes("Space Grotesk")) throw new Error("sin fuentes");
const slides = deck.order.map(id => readFileSync(join(D, "project/slides", id + ".html"), "utf8").trim());
const embed = (html, inline) => html.replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => inline ? "data:image/png;base64," + readFileSync(join(SHOTS, IMG[id])).toString("base64") : "img/" + IMG[id]);
const BASE = `*{box-sizing:border-box} html,body{margin:0}
section{position:relative;width:1920px;height:1080px;overflow:hidden;flex-shrink:0}
h1,h2,h3,p,ul,ol{margin:0} table{border-collapse:collapse} th{text-align:left;font-weight:600;font-size:26px;color:#4E4A6E;border-bottom:2px solid #DAD6F2;padding:0 0 14px} td{padding:16px 0;border-bottom:1px solid #DAD6F2;vertical-align:top}
.dark th{color:#B5B2D6;border-color:#2C3258} .dark td{border-color:#2C3258} td+td,th+th{padding-left:24px}
aside{display:none}`;
const noAnim = ".rise{animation:none!important}";
// --- Web para Netlify ---
const web = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GoLiveIt · Pitch</title><meta name="description" content="GoLiveIt (equipo Ruta16): viajes de 16-17 años sin adultos, filtrados por edad. Pitch.">
<meta name="robots" content="noindex">
<style>${faces}
${css}
${BASE}
html,body{background:#0B0D17;height:100%;overflow:hidden}
#stage{position:fixed;inset:0;display:grid;place-items:center}
#deck{width:1920px;height:1080px;position:relative;transform-origin:center center}
#deck>section{position:absolute;left:0;top:0;display:none}
#deck>section.on{display:flex}
#bar{position:fixed;left:0;right:0;bottom:0;height:4px;background:#161A33} #bar i{display:block;height:100%;background:#C6F432;transition:width .3s}
#hint{position:fixed;right:16px;bottom:12px;font:600 13px Inter,Arial,sans-serif;color:#B5B2D6;opacity:.7}
button.nav{position:fixed;top:0;bottom:0;width:18%;background:none;border:0;cursor:pointer}
#prev{left:0} #next{right:0}
@media print{html,body{overflow:visible;height:auto;background:none} #stage{position:static;display:block} #deck{transform:none!important;width:auto;height:auto} #deck>section{position:relative;display:flex!important;page-break-after:always} #bar,#hint,button.nav{display:none} .rise{animation:none}}
</style></head><body>
<div id="stage"><div id="deck">
${slides.map(s => embed(s, false)).join("\n")}
</div></div>
<button class="nav" id="prev" aria-label="Anterior"></button><button class="nav" id="next" aria-label="Siguiente"></button>
<div id="bar"><i></i></div><div id="hint">← → para pasar · F pantalla completa</div>
<script>
const S=[...document.querySelectorAll('#deck>section')],deck=document.getElementById('deck');let i=Math.max(0,Math.min(S.length-1,(parseInt(location.hash.slice(1))||1)-1));
function fit(){const k=Math.min(innerWidth/1920,innerHeight/1080);deck.style.transform='scale('+k+')'}
function go(n){i=Math.max(0,Math.min(S.length-1,n));S.forEach((s,j)=>{s.classList.toggle('on',j===i);if(j===i){s.querySelectorAll('.rise').forEach(e=>{e.style.animation='none';e.offsetHeight;e.style.animation=''})}});document.querySelector('#bar i').style.width=((i+1)/S.length*100)+'%';history.replaceState(null,'','#'+(i+1))}
addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();go(i+1)}else if(['ArrowLeft','PageUp','Backspace'].includes(e.key)){e.preventDefault();go(i-1)}else if(e.key==='Home')go(0);else if(e.key==='End')go(S.length-1);else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}});
document.getElementById('prev').onclick=()=>go(i-1);document.getElementById('next').onclick=()=>go(i+1);
let x0=null;addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});addEventListener('touchend',e=>{if(x0==null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1));x0=null});
addEventListener('resize',fit);fit();go(i);
</script></body></html>`;
mkdirSync(join(OUT, "web/img"), { recursive: true });
writeFileSync(join(OUT, "web/index.html"), web);
for (const f of Object.values(IMG)) writeFileSync(join(OUT, "web/img", f), readFileSync(join(SHOTS, f)));
writeFileSync(join(OUT, "web/_headers"), "/*\n  X-Robots-Tag: noindex\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n");
// --- HTML para Figma: todas las diapositivas en columna, sin animación ---
const fig = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>GoLiveIt · Pitch (Figma)</title><style>${faces}
${css}
${BASE}
${noAnim}
body{background:#2A2D3E;width:1920px} section::after{content:none}
#col{display:flex;flex-direction:column;gap:80px;padding:0}
</style></head><body><div id="col">
${slides.map((s, k) => embed(s, true).replace(/<aside>[\s\S]*?<\/aside>/, "").replace(/<section /, `<section data-n="${k + 1}" `).replace(/(<\/section>)$/, `<p style="position:absolute;right:128px;bottom:64px;font-size:24px;font-weight:600;color:${/class="dark"/.test(s) ? "#B5B2D6" : "#4E4A6E"}">${k + 1}</p>$1`)).join("\n")}
</div></body></html>`;
writeFileSync(join(OUT, "figma.html"), fig);
console.log("web", (web.length / 1024).toFixed(0) + " KB", "· figma", (fig.length / 1048576).toFixed(1) + " MB", "· diapositivas", slides.length);
