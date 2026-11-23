# Pruebas del Planner

Comprueban la demo sin abrir ventanas, con Chrome en modo «sin cabeza» controlado por el protocolo de depuración (CDP). Necesitan Node 22 o posterior y Google Chrome instalado. Si Chrome está en otro sitio, se indica con la variable `CHROME`.

1. Servir la bóveda (en otra terminal; se deja abierta):
   `node "70 Prototipo/pruebas/serve.cjs"`
2. Comprobar:
   - `node "70 Prototipo/pruebas/check.mjs" "70 Prototipo/GoLiveIt-Planner.html"`: sintaxis del script.
   - `node "70 Prototipo/pruebas/cdp-check.mjs"`: recorrido completo; avisa de cualquier error de JavaScript.
   - `node "70 Prototipo/pruebas/cdp-audit.mjs" <carpeta>`: palabras, botones, enlaces y etiquetas por pantalla, con capturas.
   - `node "70 Prototipo/pruebas/cdp-perf.mjs" <carpeta>`: CPU y tareas largas en reposo, al mover la pasta, al abrir un destino y al cambiar de pestaña.

La única línea de error que es normal ver es la del conector de vuelos (`localhost:8787`) cuando no está encendido.
