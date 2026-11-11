---
tipo: demo-equipo
fecha: 2026-11-11
archivo: ProyectoMinor.1.html (Descargas, 11/11/2026, 33 MB)
base: GoLiveIt Planner del 08/11/2026 (versión «calles por defecto»), modificada con Codex y guardada desde el navegador
---

# Demo avanzada del compañero (ProyectoMinor)

Es una copia del Planner con muchos más datos. Se ha integrado en nuestra versión actual, que tiene funciones más nuevas («Mi viaje», bus, calendario, destinos verificados). Ver D-16 en [[Decisiones]].

## Qué aportaba

| Aporte | Cantidad | Integrado | Cómo |
|---|---|---|---|
| Destinos nuevos | 19: Turín, Florencia, Como, Nápoles, Oporto, Rotterdam, Utrecht, La Haya, Luxemburgo, Echternach, Vianden, Esch-sur-Alzette, Marsella, Niza, Sevilla, Marbella, Huelva, Jerez y Córdoba | **Sí** | `70 Prototipo/data/datos-equipo.json` |
| Albergues consultados **por correo** (Inturjoven, Ostello Bello, Stayokay, HI France, Youth Hostels Luxembourg, Sant Jordi, Park Villa, Pousada do Porto, a&o, Combo) | 25 | **Sí**, con etiqueta EQUIPO y enlace directo al albergue | Ver la tabla de abajo |
| Planes con su web | 31 | **Sí**, sin duplicar los que ya teníamos | |
| Fotos de Wikimedia Commons con autor y licencia | 22 | **Sí** | `70 Prototipo/fotos/` y `data/creditos-fotos.json` |
| Coordenadas de los albergues | 25 | **Sí**, como puntos en el mapa | `data/ubicaciones-alojamientos.json` |
| Buscador de ciudad de salida (172.000 ciudades del mundo, 27 MB) | — | **En parte**: solo las 3.146 localidades de España con más de 1.000 habitantes (110 KB). Se usa el aeropuerto más cercano | `data/ciudades-es.json` |
| Salidas desde fuera de España | — | **No**: la guía legal es para salir de España | Pendiente |
| Créditos de foto en las tarjetas, etiqueta «Ojo, por confirmar», planes pendientes en otro bloque, puntos naranjas en el mapa | — | **Sí** | |
| Norma de HI France (habitación privada, autorización y copia del documento de un progenitor) | — | **Sí** | Comunicada por la central de HI France al compañero (9/11/2026) |

## Criterio al integrarlo (regla del proyecto: lo dudoso es «pendiente», nunca «permitido»)

- **«17; 16 por confirmar»:** con 17 sale «sí, pero ojo»; con 16, «pendiente».
- **Pousada de Juventude do Porto:** la red dice desde 16 en sus condiciones, pero el albergue respondió 17 por correo. Se queda **la más prudente (17)**.
- **España:** la copia ponía vuelos de ejemplo (Ryanair, Vueling e Iberia) incluso de Sevilla a Sevilla. Ahora se va en **bus (FlixBus nacional: desde 15 sin restricciones, verificado)**, calculado desde la ciudad real; tu propia ciudad no sale. Además, **dentro de España no se pide el permiso de viaje**.
- **Luxemburgo** (4 destinos) queda **pendiente**: los albergues están documentados, pero no tenemos verificado qué piden en la frontera a menores de la UE sin adultos.
- **Turín:** Combo pide un adulto en cada habitación, así que con 16-17 sin adulto sale «no».
- **Planes:** la copia ponía todos «por confirmar». Si el reglamento da una edad («exige acompañante a menores de 14»), con 16-17 sale «sí» citando el reglamento.
- **Vuelos a los destinos nuevos de fuera de España:** son **rutas de ejemplo** y se avisa en la pestaña de Vuelos.

## Lo que dicen los albergues (resumen)

| Ciudad | Albergue | Edad mínima sin adulto | Fuente |
|---|---|---|---|
| Sevilla, Marbella, Huelva, Jerez, Córdoba | Inturjoven | 17 (16 por aclarar en Sevilla) | Correo 7/11/2026; condiciones generales |
| Roma, Florencia | Ostello Bello | 16 | Correo 7/11/2026 |
| Como, Nápoles | Ostello Bello | 17 (16 por confirmar) | Correo 7/11/2026 |
| Lisboa | Sant Jordi Hostels | 17 (16 por confirmar) | Correo 7/11/2026 |
| Oporto | Pousada de Juventude | 17 (16 por confirmar) | Correo 7/11/2026 |
| Londres | Park Villa Boutique Hostel | 16 | Correo 7/11/2026 |
| Ámsterdam, La Haya | Stayokay | 16 | Correo 7/11/2026 |
| Rotterdam, Utrecht | Stayokay | 17 (16 por confirmar) | Correo 7/11/2026 |
| Luxemburgo (4) | Youth Hostels Luxembourg | 16 según la norma de la red; 17 por correo | Correo 7-8/11/2026 |
| Marsella, Niza | HI France | 17 (16 sin confirmar; Niza con condiciones en conflicto) | Correo 8-9/11/2026 |
| París | HI Paris Yves Robert | 16 | Central de HI France, 9/11/2026 |
| Berlín | a&o Berlin Mitte | 16 (norma de la cadena) | Web de a&o |
| Turín | Combo Torino | Solo con un adulto en cada habitación | Correo 10/11/2026 |

## Pendiente

- Guardar los correos originales (sin datos personales) en la bóveda como prueba: ahora solo consta su resumen.
- Confirmar los «16 por confirmar» y la entrada a Luxemburgo.
- Salidas desde fuera de España (la copia las permitía, pero sin normas verificadas).
