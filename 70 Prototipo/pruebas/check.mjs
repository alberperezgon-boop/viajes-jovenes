// Comprueba en Node que el script del Planner no tiene errores de sintaxis
import { readFileSync } from "node:fs";
const h = readFileSync(process.argv[2], "utf8");
const m = [...h.matchAll(/<script>([\s\S]*?)<\/script>/g)].pop()[1];
new Function(m); console.log("sintaxis ok,", m.length, "caracteres");
