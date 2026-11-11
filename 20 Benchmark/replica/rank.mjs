// Port a Node de reviews.py (skill replica-entrepreneur): misma lógica de pesos, temas finos y citas literales con enlace.
// Uso: node rank.mjs <reviews.csv> [<más.csv>...] --themes themes-viajes.json --out feedback.md [--today 2026-11-11]
import { readFileSync, writeFileSync } from "node:fs";
const args = process.argv.slice(2), opt = k => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
const themesPath = opt("--themes") || "themes-viajes.json", out = opt("--out"), todayArg = opt("--today"), months = +(opt("--months") || 18);
const today = todayArg ? new Date(todayArg) : new Date();
const T = JSON.parse(readFileSync(themesPath, "utf8"));
const themes = T.themes.map(t => ({ ...t, re: t.patterns.map(p => new RegExp(p, "i")) }));
const reqs = T.request_patterns.map(p => new RegExp(p, "i"));
function parseCsv(s) { const rows = []; let row = [], f = "", q = false; for (let i = 0; i < s.length; i++) { const c = s[i]; if (q) { if (c === '"') { if (s[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; } else if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n") { row.push(f); rows.push(row); row = []; f = ""; } else if (c !== "\r") f += c; } if (f || row.length) { row.push(f); rows.push(row); } return rows; }
// Fuera de tema: en HN solo cuentan los comentarios que hablan de viajes
const TRAVEL = /(flight|hostel|hotel|booking|airline|travel|trip|train|interrail|eurail|skyscanner|hostelworld|kiwi\.com|omio|ryanair|easyjet|airbnb)/i;
let reviews = [], dropped = 0, dupes = 0, offtopic = 0; const seen = new Set();
for (const f of args) {
  const [head, ...rows] = parseCsv(readFileSync(f, "utf8").replace(/^﻿/, "")); const h = head.map(x => x.trim().toLowerCase());
  for (const r of rows) {
    const o = Object.fromEntries(h.map((k, i) => [k, (r[i] || "").trim()]));
    if (!o.url || !o.text || !/^https?:\/\//.test(o.url)) { dropped++; continue; }
    if (o.source === "hacker-news" && !TRAVEL.test(o.text)) { offtopic++; continue; }
    const key = o.text.toLowerCase().replace(/\W+/g, " ").trim(); if (seen.has(key)) { dupes++; continue; } seen.add(key);
    const rating = /^\d/.test(o.rating) ? +o.rating : null;
    reviews.push({ source: o.app ? `${o.source}:${o.app}` : o.source, platform: o.source, url: o.url, date: o.date ? new Date(o.date) : null, rating: rating >= 1 && rating <= 5 ? rating : null, text: o.text });
  }
}
const weight = r => { let w = r.rating == null ? 0.6 : (6 - r.rating) / 5; if (r.date && (today - r.date) / 864e5 > months * 30.4) w *= 0.5; return w; };
const SENT = /(?<=[.!?])\s+|\n+/;
function snippet(text, re, limit = 220) { for (const s0 of text.split(SENT)) if (re.test(s0)) { let s = s0.trim(); if (s.length > limit) { const m = s.search(re), st = Math.max(0, m - limit / 2); s = (st > 0 ? "..." : "") + s.slice(st, st + limit).trim() + "..."; } return s; } const s = text.trim(); return s.length <= limit ? s : s.slice(0, limit).trimEnd() + "..."; }
const res = Object.fromEntries(themes.map(t => [t.id, { ...t, items: [], score: 0 }])); const requests = [], unthemed = [];
for (const rv of reviews) {
  const w = weight(rv); let matched = false;
  for (const t of themes) { const hit = t.re.find(p => p.test(rv.text)); if (!hit) continue; matched = true; res[t.id].score += w; res[t.id].items.push({ rv, quote: snippet(rv.text, hit) }); }
  const rq = reqs.find(p => p.test(rv.text)); if (rq) requests.push({ quote: snippet(rv.text, rq), url: rv.url, source: rv.source, rating: rv.rating });
  if (!matched && rv.rating != null && rv.rating <= 2) unthemed.push(rv);
}
const total = reviews.length || 1;
const ranked = Object.values(res).filter(r => r.items.length).map(r => {
  const rated = r.items.map(x => x.rv.rating).filter(x => x != null), sources = [...new Set(r.items.map(x => x.rv.source))].sort(), platforms = [...new Set(r.items.map(x => x.rv.platform))];
  r.items.sort((a, b) => ((a.rv.rating ?? 3) - (b.rv.rating ?? 3)) || (a.quote.length - b.quote.length));
  return { id: r.id, label: r.label, kind: r.kind, score: +r.score.toFixed(2), count: r.items.length, share: +(100 * r.items.length / total).toFixed(1), avg: rated.length ? +(rated.reduce((a, b) => a + b, 0) / rated.length).toFixed(2) : null, sources, platforms, thin: r.items.length < 3 || sources.length < 2, quotes: r.items.slice(0, 4).map(x => ({ quote: x.quote, url: x.rv.url, source: x.rv.source, rating: x.rv.rating })) };
}).sort((a, b) => b.score - a.score || b.count - a.count);
const stars = r => r == null ? "-" : r + "*";
const L = ["# Qué odian y qué piden los usuarios de la competencia", ""];
const plats = [...new Set(reviews.map(r => r.platform))];
L.push(`${reviews.length} reseñas de ${plats.length} plataformas (${plats.join(", ")}) y ${new Set(reviews.map(r => r.source)).size} fuentes (app y plataforma). ${reviews.filter(r => r.rating != null).length} con estrellas.`);
if (dropped) L.push(`${dropped} filas descartadas: sin enlace o sin texto.`); if (dupes) L.push(`${dupes} duplicadas quitadas.`); if (offtopic) L.push(`${offtopic} comentarios de Hacker News fuera de tema (no hablan de viajes) quitados.`);
for (const [kind, title] of [["complaint", "Lo que odian"], ["request", "Lo que piden"]]) {
  const rows = ranked.filter(t => t.kind === kind); L.push("", `## ${title}`, "", "| # | tema | peso | reseñas | % | media ★ | fuentes |", "| --- | --- | --- | --- | --- | --- | --- |");
  rows.forEach((t, i) => L.push(`| ${i + 1} | ${t.label}${t.thin ? " (fino)" : ""} | ${t.score.toFixed(1)} | ${t.count} | ${t.share}% | ${t.avg ?? "-"} | ${t.sources.length} |`));
  for (const t of rows) { L.push("", `**${t.label}**`); t.quotes.forEach(q => L.push(`- "${q.quote}" (${q.source}, ${stars(q.rating)}) ${q.url}`)); }
}
if (requests.length) { L.push("", "## Pedido con sus palabras", ""); requests.filter(q => (q.rating ?? 3) <= 4).slice(0, 40).forEach(q => L.push(`- "${q.quote}" (${q.source}, ${stars(q.rating)}) ${q.url}`)); }
if (unthemed.length) { L.push("", "## Leer a mano", "", "Notas bajas que no encajan en ningún tema.", ""); unthemed.slice(0, 20).forEach(r => L.push(`- (${r.source}, ${stars(r.rating)}) ${r.url}: "${r.text.slice(0, 220)}"`)); }
const md = L.join("\n") + "\n";
if (out) { writeFileSync(out, md); writeFileSync(out.replace(/\.md$/, ".json"), JSON.stringify({ reviews: reviews.length, ranked, requests: requests.length, unthemed: unthemed.length }, null, 1)); console.log("escrito", out, reviews.length, "reseñas"); } else process.stdout.write(md);
