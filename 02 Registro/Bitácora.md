---
tipo: registro
---

# Bitácora

Una entrada por sesión de trabajo: qué se hizo, qué se aprendió y qué queda.

## 2026-11-07. Arranque

- **Hecho:** bóveda y repositorio creados; plan por fases; 20 hipótesis; primera ronda de normativa (Interior, Renfe, FlixBus, Your Europe, aerolíneas, Airbnb, albergues públicos) y del marco legal del negocio; benchmark de Corner; borradores de las dos encuestas, guion de entrevistas y plan de análisis.
- **Aprendido:** para 16-17 años **el transporte parece menos problemático de lo supuesto** (Vueling y Ryanair desde 16, FlixBus desde 15). Las barreras parecen estar en el alojamiento, el pago y la confianza de los padres. Además, si la plataforma vende transporte y alojamiento juntos, puede tener que ser agencia de viajes (I-01, I-03, I-04).
- **Pendiente:** pilotar las encuestas, acordar umbrales con el equipo, Inturjoven (Q-06), ámbito y canales de difusión (Q-02, Q-03).
- **Repositorio:** privado en GitHub, `alberperezgon-boop/viajes-jovenes`.

## 2026-11-07. Corner, demo del compañero y demo propia

- **Hecho:** análisis funcional de Corner con fuentes públicas y REA ([[Corner - análisis funcional]]); sus condiciones prohíben la ingeniería inversa del software, así que solo se analizó lo público. Análisis independiente de la web Ruta16 del compañero ([[Demo Ruta16 (web del compañero)]]). Demo propia v1 publicada: https://claude.ai/artifact/EdSSd8jeVzEPRUkui2Q42A (código en `60 Demo/ruta16-demo.html`), probada con REA en móvil (claro) y escritorio (oscuro): recorrido de 13 pasos sin errores.
- **Aprendido:** Corner no está pensada para menores (no se dirige a menores de 17). La web del compañero tiene la mejor base de datos por país del equipo; la mía aporta grupo por persona, mapa, guardado, comparador de vuelos y aprobación de las familias. Hay una duda seria sobre Portugal (Q-20).
- **Pendiente:** resolver Q-20; preguntar al compañero cómo leyó las fuentes; segunda demo; encuestas.

## 2026-11-07. Demo v2: filtro por edad

- **Hecho:** la demo pasa a tener la edad como filtro principal (D-11). Con 16 años y amigos de la misma edad: 9 aerolíneas, 3 alojamientos y 3 de 5 destinos; con 15: 7, 1 y 1 de 5; con alguien de 18 en el grupo: 5 de 5. Fichas «Con 16 años en Berlín» (cerveza y vino legales desde 16, fiestas hasta las 24:00, clubes nocturnos no…). Ilustraciones animadas de las 5 ciudades, con botón para pausarlas. Revisada con las skills de interfaz (frontend-ui-engineering, web-design-guidelines) y probada con REA.
- **Aprendido:** **el cuello de botella es el alojamiento**: con 16 y sin un mayor de edad, Roma y Berlín se quedan sin opción verificada (H-03). Es un argumento fuerte para la encuesta y para el producto.
- **Pendiente:** ¿fotos reales con licencia libre en vez de ilustraciones? Probar el bloque de alcohol con padres.

## 2026-11-07. Demo v3: GoLiveIt con fotos reales

- **Hecho:** nombre GoLiveIt y paleta cobalto + mandarina (D-12). Cinco fotos de Wikimedia Commons con licencia libre y crédito (ver [[Fuentes]]), con zoom lento y las animaciones propias encima como pegatinas. `60 Demo/build.mjs` incrusta las fotos y genera `GoLiveIt.html` (artefacto) y `GoLiveIt-para-compartir.html` (archivo que funciona solo, ~1,1 MB). Probado con REA en móvil (claro) y escritorio (oscuro).
- **Pendiente:** comprobar la marca y el dominio de GoLiveIt (Q-21).

## 2026-11-08. Auditoría de la demo (v4)

- **Hecho:** revisión completa del código y recorridos con REA a 320 px y en escritorio oscuro, con recarga de página. 10 errores corregidos (el más grave: se perdía lo guardado al cambiar de destino) y 7 mejoras. Detalle en [[Auditoría de la demo]].
- **Aprendido:** con 15 años y amigos de la misma edad, **la edad quita 14 de 15 alojamientos** en los cinco destinos. Es la cifra más clara para defender H-03 ante el equipo.
- **Pendiente:** Q-20, Q-21 y pilotar las encuestas.

## 2026-11-08. Segunda iteración: Corner v2, recomendador, mapas, guía legal y Planner

- **Hecho:** [[Corner - ingeniería inversa v2]] (6 capturas públicas y protocolo de experimentos), [[Arquitectura del recomendador]], [[Investigación Mapbox y mapas]], [[Integración de proveedores y marketplace]], [[Guía legal y práctica del viaje de menores]] (41 puntos en `60 Demo/data/legal.json`), [[Benchmark UX-UI]], [[Concepto GoLiveIt]] e [[Informe crítico (segunda iteración)]]. Prototipo **GoLiveIt Planner** con el mapa en el centro (MapLibre; sin conexión, OpenFreeMap y Mapbox con token), probado en Chrome a 1440 px con REA. Ver [[Léeme - cómo ejecutar el prototipo]]. La demo GoLiveIt añade «Papeles y dificultades» en el plan.
- **Aprendido:** Q-20 resuelta en la práctica: la ley no exige la autorización a ciudadanos de la UE, pero gov.pt la pide → carta recomendada. Ninguna API de proveedores dice si un grupo de 16-17 puede alojarse: la base de reglas propia es el activo.
- **Pendiente:** actualizar Decisiones, Evidencias y Dudas (Q-08, Q-13, Q-14, Q-19, Q-20) con lo de los agentes; publicar el Planner como artefacto; Mapbox real (sin token); experimentos de Corner con la cuenta de un mayor de edad.

## 2026-11-08. Planner: vuelos, alojamientos y ocio por edad

- **Hecho:** el Planner tiene pestañas **Vuelos, Dormir y Ocio** por destino. Cada oferta y plan se evalúa persona a persona con motivo, condiciones y fuente; lo que no vale se agrupa en «ocultos por edad o sin verificar», con las dificultades de la guía legal. Ocio de día y de noche (alcohol, discotecas, bares, horarios de Alemania, espacios públicos). El gusto «noche» ya no puntúa si la edad no permite ningún plan nocturno (Lisboa, con 15 años: de 100 a 69). Nota [[Motor de IA personalizado]]: la IA entiende, ordena y explica, pero no decide la elegibilidad.
- **Pendiente:** probar un LLM solo para interpretar la consulta (20 frases reales de la encuesta).

## 2026-11-08. Planner: pantalla de entrada e intérprete con IA

- **Hecho:** al entrar, el Planner pide primero **cuántos sois, la edad de cada uno y qué buscáis** (gustos, salida, días y presupuesto), con la opción de contarlo en texto libre. Intérprete con **IA (Claude)** en el enlace publicado, con validador; las reglas de edad siguen decidiendo. Banco de 12 frases: las reglas aciertan 62 de 84 datos (74 %) y fallan en personas (3/12) y edades (3/12). Ver [[Motor de IA personalizado]].
- **Pendiente:** ejecutar el banco con la IA en el enlace y anotar el resultado; probarlo con frases reales de la encuesta.

## 2026-11-08. Planner: tono joven y oferta completa por edad

- **Hecho:** textos reescritos para jóvenes de 16-17 («¿Quiénes os vais y qué os mola?», «Sí podéis / Sí, pero ojo / No con vuestra edad», «Papeleo y posibles líos»), sin cambiar reglas ni fuentes. Fuera el itinerario: cada destino abre en **Todo**, con la oferta recomendada para la edad del grupo (vuelos, sitios para dormir y planes), y el mapa marca los sitios sin rutas.

## 2026-11-08. Planner: Booking.com y diseño

- **Hecho:** fecha de salida en la bienvenida y en el panel. En **Dormir** y en **Todo**, botón «Ofertas reales · Buscar en Booking.com», que abre la búsqueda real con destino, fechas, personas y tipo (albergues, apartamentos u hoteles), ordenada por precio. **Solo para los tipos que aceptan la edad del grupo** según nuestras reglas, con el aviso de mirar «Normas de la casa». Filtros comprobados en Booking el 08/11/2026 (Lisboa, albergues: 81 resultados para 4 personas del 25 al 28/03/2027). Repaso visual: cabecera en degradado, tarjetas con sombra y foto más grande, pestañas tipo píldora y bloques de color por categoría.
- **Límite:** las ofertas de Booking no se ven dentro de la página. Su API está reservada a afiliados gestionados y el *scraping* no está permitido. Para verlas dentro haría falta el programa de afiliados (CJ), que tendría que contratar un adulto del equipo.

## 2026-11-08. Planner: fuera el bloque «Quién se apunta»

- **Hecho:** se quita la edición persona a persona del panel (edad, nombre y gustos de cada uno), porque metía ruido visual y podía liar. En su lugar, un **resumen del grupo** arriba («Vais 3 · 2 de 17 y 1 de 18 años · Buscáis: playa, ambiente joven») con un botón «Cambiar» que abre la bienvenida. Personas sin nombre («Persona 2»). Si todo el grupo tiene el mismo resultado, sale una sola etiqueta («Todo el grupo ✓»).
- **Consecuencia:** los gustos se marcan para todo el grupo, así que en el prototipo ya no se ven conflictos de gustos entre personas. El motor sigue preparado para ellos si en el futuro cada uno vota desde su móvil.

## 2026-11-08. Planner: reserva simulada (D-13)

- **Hecho:** la pestaña Vuelos es un comparador: ida y vuelta con horarios de ejemplo, duración, directo o con escala, precio por persona y total, orden por más barato o más rápido y filtro de solo directos. Dormir permite «Elegir este». La cesta suma el total y lleva a la reserva simulada: resumen tipo tarjeta de embarque, condiciones por edad que hay que confirmar (permiso de viaje, carta de Portugal…), «¿Quién paga?» y envío a la familia. Después se simula la aprobación y salen las tarjetas de embarque y el bono marcados «NO VÁLIDO PARA VIAJAR». Recorrido completo probado en Chrome.

## 2026-11-08. Planner: normativa de cada aerolínea y vuelos reales

- **Hecho:** en Vuelos, el bloque «Qué aerolínea os deja volar con vuestra edad» pone en una escala de 10 a 19 años desde qué edad vuela solo cada aerolínea (verde), con condiciones (ámbar) o no sin un adulto (rojo), con las edades del grupo encima, su norma y su fuente. Cada aerolínea que os deja volar tiene «Vuelos reales ↗», que abre Kayak filtrado por esa aerolínea, ruta, fechas y viajeros. Comprobado el 08/11/2026. Cabecera con la foto del destino y un avión que cruza el arco (se para con «Pausar animaciones» o si el sistema pide menos movimiento).
- **Aprendido:** en la búsqueda real de SVQ → LIS con Vueling (25-28/03/2027) solo salieron vuelos con escala en Barcelona y algunos con «transbordo por cuenta propia». Para menores de 12 a 15 Vueling no permite escalas, así que los datos de ejemplo del prototipo (Vueling directo) no se pueden dar por buenos. Se añade un aviso sobre los transbordos por cuenta propia.

## 2026-11-08. Planner: portada

- **Hecho:** portada antes de la bienvenida, para que la demo no empiece de golpe: titular «Tu primer viaje con amigos, sin líos», mosaico con las cinco fotos de los destinos (movimiento lento, que se para con «menos movimiento»), pegatina «Hecho para 16 y 17 años» y botones «Empezar» y «Ver un ejemplo». Aviso de que es una demo. HTML para compartir: `70 Prototipo/GoLiveIt-Planner-para-compartir.html`.

## 2026-11-08. Planner: calles por defecto, presupuesto claro y vocabulario

- **Hecho:** el mapa abre con calles (OpenFreeMap) en español y sin nombres de ciudad que se pisen con los nuestros. Si no se pueden cargar (en el visor de Claude), cambia solo al mapa simple con un aviso. **Presupuesto orientativo por persona** en «Todo» y en «Presupuesto»: total, si entra o cuánto os pasáis, y desglose de vuelo, noches y gastos al día, con «Cambiar». Usa lo elegido o, si no, lo más barato que os deja la edad. Total del grupo aparte. La cesta y la reserva separan «por persona» y «los N». Vocabulario: tipos de norma en lenguaje claro («Norma de la aerolínea o empresa», «Lo dice la ley») y fuentes con nombre legible («Fuente oficial», «Revisado por el equipo»).

## 2026-11-11. Benchmark de buscadores, funciones esenciales y 4 destinos

- **Hecho:** [[Buscadores y empresas de viaje - ingeniería inversa]] (12 productos, 20 funciones candidatas, solo fuentes públicas). En el Planner (D-14): protección contra transbordos por cuenta propia, FlixBus junto a los vuelos, precio por persona en el mapa, calendario de precios de ejemplo, «Mi viaje» (checklist con progreso, hucha semanal, bote común y compartir por WhatsApp o correo) y memoria del plan con «Seguir con mi plan» en la portada. Destinos nuevos (D-15): Oporto (el más sólido), Ámsterdam y Dublín con condiciones, Praga pendiente. Ver [[Destinos nuevos - normas para 16-17]].
- **Aprendido:** casi todos los buscadores exigen 16-18 años para usar o reservar; el modelo «el joven planifica, el adulto reserva» encaja con el sector. Kiwi.com deja reservar a menores con transbordos por cuenta propia: es el principal riesgo que debemos evitar.
- **Pendiente:** Q-22 a Q-25. El archivo «del compañero» era idéntico al nuestro: pedir la versión buena.

## 2026-11-11. Competencia y demo avanzada del compañero

- **Hecho:** [[Competencia de GoLiveIt]]. No hemos encontrado a nadie que filtre por edad y lo una a la aprobación de la familia. Lo más parecido es informativo (app del Centro Europeo del Consumidor de Alemania, guía de Eurodesk e Injuve, artículos de blogs). La competencia por el dinero de los padres son los viajes con monitores: 500-1.600 € a la semana. Integrada la demo avanzada del compañero (D-16): **26 destinos**, 18 posibles desde Sevilla para 4 personas de 17, albergues consultados por correo, planes, fotos y salida desde cualquier localidad de España, con bus para los destinos españoles.
- **Pendiente:** guardar los correos de los albergues como prueba; Luxemburgo y los «16 por confirmar».

## 2026-11-11. Consultas a 24 albergues nuevos

- **Hecho:** 24 correos enviados desde la cuenta personal de Alberto, como interesado en ir y cada uno en el idioma del lugar, a albergues de 18 ciudades (España, Portugal, Francia, Italia, Alemania, Austria, Chequia, Hungría, Grecia y Polonia). Ver [[Consultas a albergues - 11-11-2026]]. Sin rebotes al enviarlos.
- **Aprendido:** en Londres, Ámsterdam, Dublín y Venecia no se encontró ningún albergue que no exija un adulto. MIJE (París), Pfefferbett y DJH (Berlín, Múnich) y Atlantis (Cracovia) ya publican normas para 16-17 años con permiso de los padres.
- **Pendiente:** registrar las respuestas y, si cambian, actualizar las reglas del Planner; segundo intento con TOC, Shelter, Plus Florence y LATROUPE (opción del amigo de 18).

## 2026-11-11. Respuestas de albergues, grietas de la competencia y tres mejoras

- **Hecho:** 11 de 24 albergues respondieron el mismo día; sus normas están en el Planner con la etiqueta EQUIPO ([[Consultas a albergues - 11-11-2026]]). Análisis de 3.528 reseñas de la competencia con la skill replica-entrepreneur ([[fixes|Grietas de la competencia]]): nadie atiende a menores; lo que más odian es el engaño en el precio y los reembolsos. Construidas las mejoras F-01 a F-03 (D-17) e integrada la investigación de entrada, ocio y aerolíneas: **26 destinos posibles** para 4 personas de 17 desde Sevilla.
- **Arreglado:** el mapa fallaba al abrir un destino sin puntos (Granada, Múnich).
- **Pendiente:** 13 albergues sin respuesta (revisión programada el 13/11 a las 18:00); entrada a Hungría, Grecia y Chequia; tasa turística por ciudad.
