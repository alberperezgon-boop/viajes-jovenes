---
tipo: instrucciones
entregable: F
fecha: 2026-11-08
---

# GoLiveIt Planner: cómo ejecutarlo

Prototipo de escritorio con **el mapa en el centro**: al entrar se ponen las edades de cada persona y lo que buscan; el motor filtra por edad con reglas con fuente, ordena los destinos para el grupo, los pinta en el mapa y enseña **toda la oferta recomendada para esa edad** (vuelos, sitios para dormir y planes, marcados en el mapa) y los papeles que hacen falta. Los textos están escritos para jóvenes de 16-17.

Pensado para **PC** (a partir de 1100 px de ancho). Por debajo se apila en una columna, pero no se ha probado en móvil.

## Tres formas de abrirlo

| Forma | Qué hacer | Qué mapa se ve |
|---|---|---|
| Enlace publicado (artefacto) | Abrir el enlace de Claude | Solo **sin conexión** (fronteras). El visor bloquea los servidores de teselas |
| Archivo para compartir | Doble clic en `GoLiveIt-Planner-para-compartir.html` (Chrome o Edge) | Sin conexión, **Calles (OSM)** y Mapbox con tu token |
| Desde el código | `node "70 Prototipo/build.mjs"` y abrir el HTML generado | Igual que el anterior |

El archivo para compartir pesa ~1,1 MB (lleva las cinco fotos dentro) y necesita internet la primera vez para cargar MapLibre desde cdnjs.

## Qué es real y qué es simulado

| Pieza | Estado | Comprobado |
|---|---|---|
| Reglas de edad de 10 aerolíneas, 7 tipos de alojamiento, transporte y actividades | **Real**, con fuente y fecha (las mismas que la demo GoLiveIt) | Sí, en Chrome con REA |
| Pestañas Vuelos, Dormir y Ocio de cada destino | **Real**: cada oferta y plan se evalúa persona a persona, con motivo, condiciones y fuente; lo que no vale se oculta en «ocultos por edad» | Sí, con 15 y 17 años |
| Ocio en espacios públicos (playas, barrios, miradores) | Marcado «Libre»: sin requisito de edad, no es una regla con fuente | Sí |
| Consejos de seguridad de noche | **Consejo GoLiveIt**, no es una norma | — |
| Documentos por país (DNI, pasaporte, ETA, permiso de viaje) | **Real**, con fuente. Portugal sigue en duda (Q-20) | Sí |
| Guía «Papeles y dificultades» | **Real**, sale de `60 Demo/data/legal.json` con fuente por punto | Ver la bitácora |
| Mapa sin conexión | **Real**: MapLibre GL JS 4.7.1 + fronteras Natural Earth (vía Datamaps) | Sí |
| Mapa con calles | **Real**: OpenFreeMap, sin clave | Sí, en Chrome abriendo el HTML |
| Mapbox (teselas y ruta a pie con Directions) | **Implementado, sin probar**: no hay token | No |
| Intérprete de la consulta | **Simulado**: expresiones regulares, no IA | Sí |
| Puntuación y agregación de grupo | **Real** (fórmula publicada en «Cómo funciona») | Sí |
| Precios, gasto diario y noches | **Estimación ilustrativa**. No son precios actuales | — |
| Ubicación de albergues | **Aproximada** («zona aproximada») | — |
| Ámsterdam, Praga, Dublín | **Sin verificar**: salen como «pendiente», nunca como viables | Sí |
| Enlaces a Booking.com (albergues, apartamentos, hoteles) | **Real**: abre la búsqueda de Booking con destino, fechas, número de personas, tipo de alojamiento y orden por precio. Solo sale el tipo que acepta vuestra edad según nuestras reglas. Las ofertas no se copian a la página (no hay API abierta ni se permite el scraping) | Sí, el 08/11/2026 (filtros 203 = albergues, 201 = apartamentos, 204 = hoteles) |
| Reservas | **Simuladas**: comparador de vuelos (horarios de ejemplo, orden por precio o duración, solo directos), elegir alojamiento, cesta, revisión de condiciones por edad y envío a la familia para que apruebe y pague. No se reserva ni se cobra nada y no se piden datos de pago ni de documentos | Sí, recorrido completo en Chrome |

## Recorrido para enseñarlo (3 minutos)

1. En la pantalla de entrada pulsa **«¡Vamos! Ver qué nos sale»** con el ejemplo (4 amigos de 17, Sevilla, 250 €, 4 días, playa y ambiente joven). Salen 3 viables y 5 pendientes: Roma y Berlín no tienen alojamiento verificado para 17 años sin un adulto.
2. **Ver lo que os sale** en Lisboa: el mapa vuela a la ciudad y marca los sitios. La pestaña **Todo** junta vuelos, dormir y planes que valen para vuestra edad; **Vuelos**, **Dormir** y **Planes** dan el detalle por persona; **Papeleo**, los documentos.
3. Cambia a **Calles (OSM)** si lo abres desde el archivo.
4. Escribe «Somos tres amigas de 15 años, salimos de Madrid con 400 euros, 5 días, museos e historia». Queda 1 viable y 2 no permitidos.
5. Pon a una de ellas **18 años**: pasan a 5 viables. Es el argumento de H-03 (el alojamiento es el cuello de botella).
6. **Cómo funciona**: la tubería de 7 pasos y la tabla de real o simulado.

## Activar Mapbox (opcional)

1. Crear cuenta en mapbox.com (lo hace una persona mayor de edad; la cuenta de prueba pide un método de pago para crear tokens).
2. Crear un token **público** (`pk.…`) con los scopes por defecto y **restringido por URL** a donde vayas a abrir la demo.
3. En el prototipo: **Cómo funciona → Conectar Mapbox**, pegar el token y **Mapbox** arriba. Se guarda solo en ese navegador (`localStorage`, clave `goliveit-mapbox-token`).
4. Nunca subas el token a Git ni lo pegues en el código. Más detalle en [[Investigación Mapbox y mapas]].

## Archivos

- `planner.src.html`: código fuente.
- `build.mjs`: incrusta las fotos de `60 Demo/fotos` y la guía `60 Demo/data/legal.json`.
- `GoLiveIt-Planner.html`: lo que se publica como artefacto.
- `GoLiveIt-Planner-para-compartir.html`: documento completo para mandar.
- `capturas/`: pruebas en Chrome (1440 × 900) hechas con REA el 08/11/2026.
