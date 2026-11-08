---
tipo: benchmark
entregable: D
fecha: 2026-11-08
metodo: capturas reales hechas con REA (Chrome, sin sesión) de páginas públicas; ninguna captura simulada
---

# Benchmark UX/UI: Corner, Ruta16, GoLiveIt (demo) y GoLiveIt Planner

Cada captura indica de dónde sale. Las de Corner son de páginas públicas de corner.inc (detalle de procedencia e ID de evidencia REA en [[Corner - ingeniería inversa v2]], sección 4). La app de Corner no se ha usado: no hay cuenta.

## 1. Capturas

| Producto | Pantalla | Captura | Procedencia |
|---|---|---|---|
| Corner | Portada web | ![[corner-01-portada.png]] | corner.inc, 08/11/2026 |
| Corner | Guías por ciudad | ![[corner-02-guias.png]] | corner.inc/guides, 08/11/2026 |
| Corner | Lista pública | ![[corner-03-lista-publica.png]] | Lista de la cofundadora, 08/11/2026 |
| Corner | Ficha de lugar | ![[corner-05-ficha-lugar-no-disponible.png]] | Error «are you lost?», 08/11/2026 |
| Ruta16 (compañero) | Planificador | ![[ruta16-01-planificador.png]] | ruta16.netlify.app, 07/11/2026 |
| GoLiveIt demo v4 | Explorar (escritorio, oscuro) | ![[goliveit-demo-01-explorar.png]] | Demo propia, 08/11/2026 |
| GoLiveIt Planner | Itinerario sin conexión | ![[planner-01-itinerario-sin-conexion.png]] | Prototipo, 08/11/2026 |
| GoLiveIt Planner | Itinerario con calles | ![[planner-02-itinerario-calles-osm.png]] | Prototipo, 08/11/2026 |
| GoLiveIt Planner | Elegibilidad por persona | ![[planner-03-elegibilidad.png]] | Prototipo, 08/11/2026 |
| GoLiveIt Planner | 15 años desde Madrid | ![[planner-04-quince-anos-madrid.png]] | Prototipo, 08/11/2026 |
| GoLiveIt Planner | Con una persona de 18 | ![[planner-05-con-un-mayor-de-edad.png]] | Prototipo, 08/11/2026 |

## 2. Comparación por criterio

| Criterio | Corner | Ruta16 | GoLiveIt demo | GoLiveIt Planner |
|---|---|---|---|---|
| Primer contacto | Prueba social (cifras, fundadora) y app | Formulario: viajeros, país, edades | Selector de edad y destinos con foto | Texto libre o formulario y mapa |
| Papel del mapa | Central en la app (Mapbox, CONFIRMADO por su oferta de empleo) | No tiene | Esquema SVG decorativo | **Central**: destinos, arcos de vuelo y paradas |
| Cómo decide qué enseñar | Lo que guardan los usuarios (mundo cerrado de visibilidad) | Persona más restrictiva del grupo | Peor estado del grupo | Filtro duro por persona y puntuación de grupo |
| Explicación | Sin estrellas, notas libres | Lista con fuente oficial | Fichas con fuente | «Por qué» con satisfacción media y mínima, presupuesto y servicio elegido |
| Grupo | Social (seguir, listas), sin plan conjunto observado | Edad de cada viajero | Edad, compañía, guardados | Edad y gustos por persona; conflicto visible |
| Fuentes y fechas | No aplica | Muy completas | En cada regla | En cada regla y en la guía legal |
| Padres | No | Sección para familias | Vista para la familia | Papeles filtrados por «la familia» |
| Contenido adulto | Guías de bares y discotecas | Controlado por edad | Controlado por edad | Paradas omitidas con el motivo |
| Dispositivo | Móvil | Web adaptable | Móvil primero | Escritorio primero |

## 3. Qué copiar y qué no

**Copiar (adaptado):**
- La separación entre **catálogo** y **lo visible** de Corner: nosotros solo enseñamos como viable lo verificado.
- Las **listas compartibles** como forma de crecer sin app.
- La **lista de comprobación imprimible** de Ruta16 para las familias.

**No copiar:**
- Las guías de Corner centradas en bares y alcohol.
- Las cifras de usuarios como prueba social: Corner da cinco cifras distintas (ver [[Corner - ingeniería inversa v2]], AU-5).
- Cualquier rasgo de su identidad visual: GoLiveIt tiene paleta y tipografía propias (D-12).

## 4. Problemas de UX encontrados en nuestro prototipo

| # | Problema | Estado |
|---|---|---|
| 1 | El mapa sin conexión no tiene calles al acercarse a una ciudad | Aviso al volar a la ciudad; con el HTML abierto, «Calles (OSM)» |
| 2 | El marcador del destino tapaba las paradas | Corregido: se oculta al ver el itinerario |
| 3 | La tabla de elegibilidad repetía el icono | Corregido |
| 4 | Las fotos no aparecían en las tarjetas por la especificidad del CSS | Corregido |
| 5 | Pasarse del presupuesto apenas restaba | Corregido: penaliza el triple |
| 6 | Las paradas lejanas (Carcavelos) alargan las líneas del itinerario | Pendiente: agrupar por zonas en el motor real |
| 7 | En el visor de Claude solo hay mapa sin conexión | Limitación del visor; documentado |
