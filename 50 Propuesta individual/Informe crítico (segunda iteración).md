---
tipo: informe
entregable: G
fecha: 2026-11-08
base: "[[Corner - ingeniería inversa v2]], [[Arquitectura del recomendador]], [[Investigación Mapbox y mapas]], [[Integración de proveedores y marketplace]], [[Guía legal y práctica del viaje de menores]], [[Benchmark UX-UI]]"
---

# Informe crítico de la segunda iteración

> Etiquetas: **VERIFICADO**, **SECUNDARIA**, **INFERIDO**, **HIPÓTESIS** y **PROPUESTA**, igual que en [[Evidencias]]. Lo que hicieron los agentes de investigación se ha revisado por encima; sus fuentes están en cada documento.

## 0. Qué se ha hecho y qué no

| Fase | Hecho | No hecho y por qué |
|---|---|---|
| I. Corner | v2 con auditoría de la v1, 6 capturas públicas y protocolo de experimentos | Ninguna prueba dentro de la app: no hay cuenta y sus condiciones prohíben la ingeniería inversa del software (E-20) |
| II. Recomendador | Reconstrucción con CONFIRMADO, INFERIDO y PROPUESTO | Experimentos de caja negra: necesitan la cuenta de un mayor de edad (protocolo en la v2, sección 6) |
| III. Mapas | Mapbox, alternativas, PostGIS, comandos del MCP | El MCP de Mapbox no está instalado: requiere OAuth o token del usuario |
| IV. Motor | Arquitectura, agregación de grupo, explicaciones y proveedores | Validación con usuarios reales |
| V. Prototipo | Planner con mapa central, probado en Chrome a 1440 px | Pruebas en móvil (descartadas por ti) y Mapbox real (sin token) |

## 1. Cinco aprendizajes

1. **Corner cierra lo que enseña, no sus datos.** Sus lugares usan identificadores con formato de Google Places y una oferta habla de *scraping* (INFERIDO + SECUNDARIA). Para nosotros: catálogo amplio, pero solo es visible y viable lo verificado para 16-17.
2. **Ninguna API dice si un grupo de 16-17 años sin adultos puede alojarse.** Booking y Expedia tienen una edad mínima de check-in, pero con contrato; Viator tiene `requiresAdultForBooking` (VERIFICADO en su documentación por el agente). **La base de reglas propia es el activo**, y cuesta unas 45-55 h de alta y 15-20 h por trimestre (INFERIDO).
3. **El LLM no decide.** Extrae datos de la consulta y redacta, pero la elegibilidad sale de reglas deterministas con fuente. Corner usa IA para buscar y resumir (Claude según Business Insider, SECUNDARIA), no para permisos.
4. **El mapa no necesita Mapbox para el MVP.** MapLibre + OpenFreeMap funciona sin clave y está probado en el prototipo. Mapbox aporta acabado y rutas a pie, pero su licencia es propietaria y Directions no tiene transporte público (VERIFICADO por el agente).
5. **La afiliación no paga el proyecto.** Unos 5-6 € por viajero (INFERIDO); hace falta una cuota a familias o a centros, y los enlaces de compra deben ir al adulto.

## 2. Cinco funciones que proponemos (por orden)

| # | Función | Por qué | Estado en el prototipo |
|---|---|---|---|
| 1 | Filtro de elegibilidad por persona con fuente y fecha | Es lo que nadie tiene | **Implementado** |
| 2 | Papeles y dificultades por país, edad y quién lo hace | La barrera de los padres | **Implementado** (guía legal) |
| 3 | Plan de grupo con gustos y conflicto visible | El viaje es de grupo | **Implementado** (agregación 60/40) |
| 4 | Plan compartible con la familia y aprobación | El pagador es el adulto | En la demo v4 (vista familia); **pendiente** en el Planner |
| 5 | Feedback binario verificable («¿te dejaron con 17? qué te pidieron») | Mantiene la base al día | **Pendiente** |

## 3. Cinco riesgos

| # | Riesgo | Mitigación |
|---|---|---|
| 1 | **Información legal desactualizada o mal leída** (ejemplo: Portugal, Q-20) | Fecha y fuente en cada regla; «pendiente» por defecto; revisión trimestral; aviso de no asesoramiento |
| 2 | **Pasar a ser agencia u organizador de viaje combinado** si se vende o se enlaza mal (Directiva 2026/1024, art. 5 bis, desde 29/03/2029, según el agente) | Solo afiliación y enlaces al adulto en el MVP; asesoría antes de cobrar |
| 3 | **Datos de menores** (RGPD, LOPDGDD: consentimiento propio desde 14 en España; DSA art. 28) | Mínimos datos, sin publicidad por perfil, cumplimiento voluntario del art. 28 aunque seamos pequeños |
| 4 | **Proveedores que excluyen menores o webs para menores** (Hostelworld exige 18 para reservar; Civitatis puede cancelar afiliados «dirigidos a menores», según el agente) | Comunicar a familias, no solo a menores; buscar alternativas |
| 5 | **Seguridad real del viaje** (un incidente con un grupo de 16) | No incentivar la noche ni el alcohol; plan de incidencias en «Papeles»; contacto de la familia |

## 4. Tecnologías recomendadas

| Capa | MVP | Más adelante |
|---|---|---|
| Web | HTML + JS (o un framework sencillo) en un hosting estático | — |
| Mapa | MapLibre GL JS + OpenFreeMap (estilo configurable) | MapTiler o PMTiles propios; Mapbox si se quiere acabado |
| Datos | JSON de reglas versionado en Git, revisado a mano | Supabase con PostGIS para lugares y reglas |
| Motor | Reglas deterministas + puntuación lineal publicada | *Embeddings* (fase 2) y aprendizaje del orden (fase 3), nunca para la elegibilidad |
| Lenguaje natural | Formulario + reglas | LLM que solo rellena un esquema JSON validado |
| Rutas | Enlaces a Google Maps en modo transporte público | Valhalla + GTFS |
| Reservas | Afiliación (Hostelworld, Viator, Omio/Trainline, FlixBus) | Integraciones con contrato |

## 5. Hipótesis y dudas pendientes

- **H-03** (el alojamiento es la barrera): muy apoyada por las reglas; falta la voz de los usuarios.
- **H-05, H-08** (los padres deciden y piden información): pendiente de la encuesta de padres.
- **Disposición a pagar** de familias o centros: sin datos.
- **Q-20** Portugal: ver la resolución en [[Guía legal y práctica del viaje de menores]] y [[Dudas pendientes]].
- **Q-21** marca y dominio de GoLiveIt.
- Corner: onboarding de gustos, alcance de su búsqueda con IA y origen del catálogo (experimentos E1-E9).
- **Inconsistencia a resolver**: la fecha del artículo de Business Insider aparece como septiembre de 2025 en [[Corner - ingeniería inversa v2]] y como julio de 2026 en [[Arquitectura del recomendador]]. Ninguno de los dos agentes pudo abrir el original.
- Amadeus Self-Service cerrado el 17/07/2026: solo en prensa del sector, sin aviso oficial leído.
- *Product Terms* de Mapbox: sin leer.

## 6. MVP recomendado

**Una web, cinco destinos, reglas verificadas, para que un grupo de 16-17 y su familia decidan si el viaje es posible y qué papeles hacen falta.**

1. Formulario de grupo (edad y gustos por persona), salida, días y presupuesto.
2. Destinos con estado por persona, «por qué» y presupuesto estimado.
3. Mapa con MapLibre y OpenFreeMap.
4. Papeles y dificultades por país y edad, con lista para copiar o imprimir.
5. Plan para compartir con la familia.
6. Enlaces de afiliación al adulto, sin reservas propias.

Antes de construirlo: cerrar la encuesta y 5 entrevistas (3 jóvenes, 2 padres) enseñando el Planner. Si los padres no ven valor en «Papeles», replantear.
