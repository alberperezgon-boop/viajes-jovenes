---
tipo: registro
actualizado: 2026-11-07
---

# Registro de decisiones

Cada decisión dice quién la tomó, con qué evidencia y qué la haría cambiar. Las decisiones «propuestas» están pendientes de que las acepte el equipo.

| ID | Fecha | Decisión | Por qué | Quién | Estado | Se revisa si… |
|---|---|---|---|---|---|---|
| D-01 | 07/11/2026 | Una sola fuente de verdad: bóveda de Obsidian que también es repositorio Git privado en GitHub (`alberperezgon-boop/viajes-jovenes`) | No perder contexto ni repetir investigaciones; historial de cambios | Alberto | Tomada | El equipo prefiere otra herramienta compartida |
| D-02 | 07/11/2026 | Toda afirmación lleva etiqueta de fiabilidad (`VERIFICADO`, `OFICIAL-INDIRECTO`, `SECUNDARIA`, `CONOCIMIENTO PREVIO`, `INFERENCIA`, `HIPÓTESIS`) | Separar hechos de suposiciones | Alberto | Tomada | — |
| D-03 | 07/11/2026 | No se programa la aplicación hasta terminar la fase 2 (validación) | Indicación del propio planteamiento del proyecto | Alberto | Tomada | — |
| D-04 | 07/11/2026 | Las encuestas se titulan «Encuesta sobre viajes de jóvenes» y no mencionan ninguna app hasta el final | Evitar que respondan solo los entusiastas y sesgar las respuestas | — | **Propuesta** | El equipo lo rechaza con un motivo mejor |
| D-05 | 07/11/2026 | La encuesta de jóvenes incluye 18-19 años como **grupo de comparación** | Si los problemas «por edad» aparecen igual a los 18-19, no son de edad (H-08) | — | **Propuesta** | — |
| D-06 | 07/11/2026 | Los umbrales de decisión del [[Plan de análisis]] se acuerdan **antes** de ver los resultados | Evitar el sesgo de confirmación | — | **Propuesta** | — |
| D-07 | 07/11/2026 | El análisis de Corner usa solo información pública y el uso normal de la app: nada de *scraping*, ingeniería inversa de su API ni copia de diseño o textos | Legalidad y originalidad; sus condiciones lo prohíben expresamente (E-20) | Alberto | Tomada | — |
| D-08 | 07/11/2026 | Se construye una **demo navegable con datos de ejemplo** para entrevistas y para la puesta en común. No es el MVP ni sustituye la validación (D-03 sigue en pie) | Hace falta algo tangible que enseñar al equipo y a los entrevistados | Alberto | Tomada | Las entrevistas muestran que la demo sesga las respuestas |
| D-09 | 07/11/2026 | Funciones de la demo: las de [[Funciones adaptadas de Corner]] | Principios de Corner aplicados a nuestras hipótesis | Alberto | Tomada | — |
| D-12 | 07/11/2026 | La propuesta de Alberto se llama **GoLiveIt** (nombre provisional), con paleta cobalto + mandarina y **fotos reales** de Wikimedia Commons con licencia libre (CC0, CC BY, CC BY-SA) y crédito visible. Se mantienen las animaciones propias encima de las fotos | Lo pidió Alberto | Alberto | Tomada | La comprobación de marca y dominio (Q-21) sale mal |
| D-11 | 07/11/2026 | Demo v2: **la edad es el primer filtro** (15, 16, 17 o 18 y con quién vas); recalcula vuelos, alojamientos y destinos, y enseña por país lo que la ley permite con esa edad (ocio, alcohol, museos, transporte). Ilustraciones animadas propias en SVG, sin fotos de terceros | Lo pidió Alberto; el público es de 16-17 | Alberto | Tomada | Las entrevistas a padres muestran que el bloque de alcohol resta confianza (H-04) |
| D-10 | 07/11/2026 | La demo v1 se centra en **viajes al extranjero** (Lisboa, París, Roma, Berlín, Londres), añade **buscador de vuelos con enlaces externos** (Google Flights, Skyscanner, Kayak) y **comparador de aerolíneas por normas para menores**, y usa los datos de la web Ruta16 del compañero etiquetados como «Equipo» | Lo pidió Alberto, y así se alinea con la demo del compañero para poder combinarlas | Alberto | Tomada | La encuesta muestra que los viajes nacionales son mucho más frecuentes (H-09) |

## D-13. La demo simula la reserva (08/11/2026)

- **Decisión:** el Planner simula reservar vuelo y alojamiento, como un comparador, pero filtrado por edad: elegir, revisar las condiciones de la aerolínea, del alojamiento y del país, y **enviar la reserva a la familia para que la apruebe y la pague**.
- **Por qué:** lo pidió Alberto para que la demo se entienda como producto. El paso por la familia refleja la realidad legal: los menores no pueden contratar y las aerolíneas y alojamientos piden un adulto. Además, es nuestra propuesta de valor para los padres.
- **Límites:** todo lleva la marca «simulación» o «demo». Horarios y precios de ejemplo. No se reserva ni se cobra nada, y **no se piden datos de pago ni de documentos**. Las tarjetas de embarque llevan «NO VÁLIDO PARA VIAJAR». Sustituye a la regla anterior de «sin reservas simuladas» solo para el Planner.

## D-14. Funciones que copiamos de los buscadores, y las que no (11/11/2026)

- **Decisión:** del benchmark [[Buscadores y empresas de viaje - ingeniería inversa]] se implementan en el Planner: **sin transbordos por cuenta propia** para grupos con menores (siempre activo y explicado), **bus** junto al avión (FlixBus, edad verificada: desde 15), **precio por persona en el mapa**, **calendario «bajo / típico / alto»** (de ejemplo y marcado así), **bote común** y **hucha** en «Mi viaje», **checklist** de papeles y maleta, **compartir** por WhatsApp o correo, y **memoria del plan** en el navegador.
- **No se copian:** ofertas con prisa o cuentas atrás, congelar el precio pagando, predicciones sin histórico propio, chat abierto con desconocidos (Hostelworld) ni ubicación en directo por defecto.
- **Por qué:** son públicos menores; lo que empuja a decidir con prisa o expone datos no encaja con la confianza de las familias.

## D-15. Cuatro destinos nuevos con reglas generadas desde su norma publicada (11/11/2026)

- **Decisión:** Oporto, Ámsterdam y Dublín pasan a ser viables con sus condiciones; Praga sigue pendiente (Q-22 y Q-25). Las reglas salen de `70 Prototipo/data/destinos-nuevos.json` (fuentes en [[Destinos nuevos - normas para 16-17]]). Lo que depende de cada local o no está confirmado sale «sin confirmar». Los vuelos dependen de la ciudad de salida. Precios de ejemplo.
- **Nota:** el archivo que llegó como «demo del compañero con más destinos» era idéntico al nuestro, así que estos destinos los ha verificado el equipo de investigación de la sesión.

## D-16. Se integra la demo avanzada del compañero con nuestro criterio de prudencia (11/11/2026)

- **Decisión:** entran sus 19 destinos, los 25 albergues consultados por correo, 31 planes, 22 fotos con crédito y el buscador de ciudad de salida (solo España). Ver [[Demo avanzada del compañero (ProyectoMinor)]].
- **Ajustes:** «16 por confirmar» → pendiente; ante dos normas distintas, la más prudente (Pousada do Porto: 17); España en bus y sin permiso de viaje; Luxemburgo pendiente por la entrada; vuelos de los destinos nuevos marcados como rutas de ejemplo.
- **Por qué:** sus correos con albergues son la mejor prueba primaria que tiene el equipo; la regla de no dar por permitido lo dudoso se mantiene.

## D-17. Papeles, confirmación por escrito y precio total, sin salirnos del núcleo (11/11/2026)

- **Decisión:** el Planner añade tres funciones del plan de [[fixes|grietas de la competencia]]: (1) **carta de autorización de los padres** por albergue, rellena con fechas, albergue y grupo, en español e inglés, para imprimir (los datos de documentos se escriben a mano; aquí no se meten); (2) **«Pedir que lo confirmen»**: correo listo en el idioma del albergue (es, pt, fr, it, de; inglés en el resto) que se abre en el correo del usuario; GoLiveIt no envía nada; (3) **precio total honesto**: extras que suben al pagar (maleta de cabina y sentarse juntos, de ejemplo y solo si se marcan), tasa turística como pendiente y enlaces de **reserva directa** con la aerolínea o el albergue.
- **Entra la investigación del 11/11** ([[Investigación 11-11 - entrada, ocio y aerolíneas]]): Austria, Polonia (inferencia nuestra, etiqueta OFICIAL-INDIRECTO) y Luxemburgo pasan a «con carta de los padres»; Hungría, Grecia y Chequia siguen pendientes. Air France, desde 15 (etiqueta SECUNDARIA: solo extractos del buscador).
- **Normas de alcohol y horarios del país:** van en un recuadro aparte de la pestaña Planes («no son planes»), con lenguaje neutro. No se presentan como algo que hacer.
- **No se escribe a las aerolíneas por ahora:** la investigación ya resuelve las dudas de edad (Ryanair, Transavia, easyJet, Wizz Air) y Alberto pidió no salirnos de la línea del proyecto.
- **Por qué:** 10 de los 11 albergues que respondieron piden autorización de los padres, y la queja más repetida de la competencia es el engaño en el precio y los intermediarios (352 reseñas).

## D-18. Modo padres: la familia ve el viaje antes de aprobarlo (11/11/2026)

- **Decisión:** el Planner tiene una vista **solo lectura** para la familia (botón «Modo padres» en cada destino, en «Mi viaje» y en la pantalla de pago). Enseña quién va y desde dónde, el precio orientativo, lo comprobado para su edad (transporte, alojamiento y papeles de entrada, cada uno con su fuente y etiqueta, y si el equipo consultó el alojamiento por correo), lo que tiene que hacer la familia (con las cartas de autorización), **lo que todavía no sabemos** y un **plan B** (112/999, consulado vía Exteriores, Registro de Viajeros, seguro, derechos si no les dejan embarcar y otros alojamientos que aceptan su edad). Termina con «Aprobamos» (pago simulado) o «Tenemos dudas».
- **Enlace para la familia:** `#familia=` con edades, fechas, destino y elecciones; **nunca nombres**. Abre directamente la vista y no pisa el plan guardado en ese navegador. Dentro del artefacto de claude.ai no se genera enlace (la página va en un marco); funcionará cuando el HTML esté en una web.
- **Por qué:** los padres pagan, firman y deciden (D-13); las grietas de la competencia muestran que nadie se dirige a ellos ([[fixes|Grietas de la competencia]], punto 6). Sigue en la línea del proyecto: viajar sin adultos, con la familia informada.
- **Pendiente:** validarlo con padres (encuesta F o entrevistas) antes de darle más peso.

## D-19. Vuelos en tiempo real con un conector local, y salidas desde el aeropuerto real (11/11/2026)

- **Decisión:** precios reales con **Duffel** (única API de vuelos con alta autoservicio en noviembre de 2026: Amadeus Self-Service cerró el 17/07/2026; Kiwi y Travelpayouts piden aprobación) mediante `70 Prototipo/conector-vuelos.mjs`, que guarda la clave y busca con las **edades reales**, sin billetes separados. La demo cruza cada oferta con nuestras reglas por aerolínea y manda a reservar directo. Ver [[Conector de vuelos en tiempo real]].
- **Salidas («Salís de»):** se muestra el **aeropuerto real** más cercano entre 35 aeropuertos españoles (coordenadas aproximadas) y se usa en Kayak, Skyscanner, Google Flights y el conector. Los vuelos de ejemplo siguen saliendo de los 5 aeropuertos de la demo, y se dice. Desde **Canarias, Baleares, Ceuta y Melilla** ya no se ofrece bus a la península: vuelos de ejemplo marcados como tales. Se quita el «a 0 km» y el campo selecciona el texto al entrar.
- **Por qué:** era un fallo real (de Bilbao se buscaba desde Madrid; de Las Palmas, bus por carretera) y los precios en directo son el núcleo de «un Skyscanner para jóvenes».

## D-20. Ocio nocturno por región y por local (11/11/2026)

- **Decisión:** la pestaña Planes tiene el bloque «🌙 Noche: qué os dejan», con la norma de la región (Madrid, Andalucía, Cataluña, Comunitat Valenciana, Alemania, Países Bajos, Reino Unido, Francia, Italia, Portugal e Irlanda) y 14 normas de 13 locales con su edad publicada. Lo que no publica edad sale pendiente. Ver [[Ocio nocturno - edad por local]].
- **Hallazgo:** con 16-17, las discotecas de las ciudades grandes son casi siempre de 18; lo abierto son conciertos, sesiones sin alcohol (Madrid, desde 14) y fiestas para adolescentes.

## D-21. El modo padres usa el precio real y la familia reserva (modo test) (11/11/2026)

- **Decisión:** el modo padres añade (1) un **resumen de un vistazo** (comprobado, con condiciones, pendiente), (2) **precio real del vuelo** con Duffel (la oferta más barata de una aerolínea que les deja volar a su edad) y **reserva en modo test pagada por la familia**, (3) un **calendario de papeles** con fechas reales del viaje (permiso de viaje entre 90 y 7 días antes, TSE, seguro, confirmación escrita, cartas y Registro de Viajeros, con fuentes) y (4) **lo que suelen preguntar los padres**, respondido con fuentes de la guía.
- **Prueba:** Duffel aceptó en modo test las reservas de grupos de 16-17 (y mixtos con 15) sin un adulto en el vuelo. Ver [[Conector de vuelos en tiempo real]].
- **Límite:** desde la demo nunca se reserva de verdad; en modo real, cada aerolínea decide con la fecha de nacimiento.

## D-22. Mejoras de la revisión del 17/11: ordenar, descuentos por edad y estética (17/11/2026)

- **Decisión:** lista con **ordenar** (pega, precio, cercanía) y **«Solo los que entran en la pasta»**; recuadro **«Descuentos y pases para vuestra edad»** (Carné Joven, Interrail Youth, DiscoverEU) con fuentes; **«Otras formas de ir»** con BlaBlaCar como no apto para menores; arreglos estéticos (mapa sin etiquetas amontonadas, precios legibles, campos alineados, cabecera más limpia, foco visible) y del intérprete («salimos de X» no es el destino). Ver [[Mejoras 17-11 - competencia y estética]].
- **Por qué:** Alberto pidió revisar la competencia y mejorar la estética sin salirse del núcleo; todo lo añadido sirve para decidir a dónde pueden ir con su edad y su dinero.

## D-23. El tren entra junto a avión y bus (17/11/2026)

- **Decisión:** la pestaña «Vuelos» pasa a llamarse **«Transporte»** e incluye tren con la norma de edad de cada operador: Renfe (sin condiciones desde 14), Iryo (14-17 con consentimiento de los padres), Ouigo (pendiente: no lo publica) y SNCF TGV INOUI (desde 12). Ver [[Tren - edad por operador]].
- **Datos:** red de 12 estaciones; Iryo y Ouigo solo en corredores con Madrid; desde Barcelona, TGV a París y Renfe a Marsella. Rutas, horarios y precios **de ejemplo** (se dice en la pestaña). Desde Canarias, Baleares, Ceuta y Melilla no hay tren a la península.
- **Por qué:** era la propuesta 1 de la revisión de competencia (Omio, Trainline, Rome2Rio) y, dentro de España, el tren es muchas veces la mejor opción para 16-17.

## D-24. Cómo llegar al alojamiento (17/11/2026)

- **Decisión:** recuadro **«🧭 Cómo llegar al alojamiento»** en las pestañas Todo y Transporte y en el modo padres. Incluye:
  - del aeropuerto al centro, con línea, tiempo, precio y horario, en 14 ciudades (`70 Prototipo/data/llegadas.json`);
  - el **último tramo** hasta el alojamiento cuando tenemos su ubicación;
  - un aviso si el vuelo de ejemplo **llega de noche**.
  
  Si se va en bus o tren: llegada a la estación. Sin datos de una ciudad: pendiente.
- **Fuentes:**
  - Oficiales: París (14 € desde el 1/1/2026, Île-de-France Mobilités), Berlín (23 min, aeropuerto), Niza (aeropuerto) y Budapest (2.500 HUF, BKK).
  - El resto, guías marcadas como SECUNDARIA (precios orientativos que no siempre coinciden).
- **Por qué:** propuesta 4 de [[Mejoras 17-11 - competencia y estética]] (Rome2Rio). Es lo que más agobia al llegar y tranquiliza a las familias.

## D-25. Viaje compartido con el grupo, con niveles (17/11/2026)

- **Decisión:** botón **«👥 Compartir con el grupo»** en cada destino y en «Mi viaje», con dos niveles:
  - **Solo el grupo:** plan, cómo llegar, bote común y lista de cada uno.
  - **Grupo + familias:** además, un botón a lo que verán los padres.
  
  Comportamiento del enlace `#grupo=`:
  - Abre la vista directamente.
  - **No pisa el plan guardado** de quien lo abre hasta que pulsa «Usar este plan en mi planner».
  - Lo que cada uno marca en su lista se queda en su navegador.
- **Privacidad:** nunca público; el enlace lleva edades, elecciones y lo ahorrado en el bote, **nunca nombres** (en el bote: «Persona 1, 2…»). Dentro del artefacto de claude.ai no hay enlace; funciona con la web publicada.
- **Por qué:** propuesta 5 de [[Mejoras 17-11 - competencia y estética]] (Polarsteps, Wanderlog), sin ubicación en directo ni chat abierto (D-14).

## D-26. Avisos de precio sin prisas (17/11/2026)

- **Decisión:** en la pestaña Transporte, **«🔔 Vigilar este precio»** guarda el precio real (Duffel) del vuelo más barato de una aerolínea que deja volar al grupo.
  - Se vuelve a comprobar al abrir el planner (como mucho cada 30 minutos) o con «Comprobar ahora».
  - Enseña la evolución con una gráfica pequeña.
  - Si baja, da un aviso **sin prisas** con botones para contárselo al grupo o a la familia por WhatsApp o correo.
  - «Mi viaje» lista los precios vigilados; todo se guarda solo en el navegador.
- **Sin conector:** lo explica, y un ejemplo marcado como **simulación** enseña cómo es un aviso.
- **No se copia:** cuentas atrás, «quedan pocas plazas» ni notificaciones push (D-14).
- **Prueba:** con Duffel en modo test, el precio guardado (66 €) y la nueva comprobación (65 €) dieron el aviso correcto; el token no se guardó en ningún archivo.

## D-27. Estética: iconos propios, estados unificados y contraste (17/11/2026)

- **Decisión:**
  - **Iconos:** 23 iconos SVG propios (de trazo, en el color del texto) sustituyen a los emojis de la interfaz, que se veían distintos en cada ordenador. Los textos para WhatsApp y correo conservan sus emojis, y los documentos para imprimir llevan los iconos.
  - **Estados:** las mismas palabras en toda la vista de los jóvenes.
  - **Tarjetas:** un solo motivo por tarjeta.
  - **Estados vacíos:** con dibujo.
- **Contraste (WCAG):** naranja con texto oscuro 7,3:1; azul con blanco 8,6:1; texto secundario 5,8:1 (claro) y 7,7:1 (oscuro); estados en oscuro, de 7,9 a 9,8:1. Todo supera AA.

## D-28. Opiniones de jóvenes sobre la entrada, sin inventar ninguna (17/11/2026)

- **Decisión:** cada alojamiento de la pestaña Dormir tiene **«💬 Opiniones sobre la entrada»** con preguntas cerradas:
  - ¿os dejaron entrar? (sí / con papeles / no);
  - edad;
  - mes;
  - qué pidieron: autorización, copia del DNI de los padres, habitación privada o alguien de 18;
  - un comentario de 200 caracteres.
- **Moderación:** se quitan solos correos, teléfonos, @usuarios y enlaces, y se explican las normas (sin nombres, redes ni fotos). En la app real, todo se revisaría antes de publicarse.
- **No se inventa ninguna opinión,** ni siquiera como ejemplo. Mientras no haya, se enseña la evidencia real: la respuesta del alojamiento al equipo (EQUIPO). En la demo, la opinión de cada uno se guarda solo en su navegador y se marca como pendiente de moderación.
- **Pendiente para la app real:** servidor con moderación, verificación de que quien opina estuvo allí y política de datos de menores (RGPD; consentimiento a partir de 14 años en España).

## D-29. Revisión de claridad y lenguaje (17/11/2026)

- **Decisión:**
  - **Textos fuera de la vista:** ningún código interno (Q-xx) y ninguna etiqueta en bruto; las etiquetas pasan a palabras claras («Fuente oficial», «Web de la empresa», «Lo preguntamos nosotros», «Otra fuente», «Sin confirmar»).
  - **Destinos sin confirmar:** desaparecen «Regla del motor» y los porcentajes del motor, y el papeleo general queda plegado (de 868 a 92 palabras).
  - **Lenguaje:** tarjetas con palabras que no confunden («Ida y vuelta», «Entra en la pasta», «formas de ir»); portada en plural; leyenda del mapa con las mismas etiquetas que el resto.
  - **«¿Cómo va esto?»:** primero para los jóvenes; lo técnico, plegado para el equipo.
- **Opciones siguientes** en [[Revisión 17-11 - claridad, ruido y lenguaje]]. La recomendación es acortar la lista, poner un solo sello de ejemplo, el botón «Reservar (simulación)», fuentes más discretas y explicar «Sí, pero ojo».

## D-30. Menos ruido y nada que lleve a engaño (17/11/2026)

- **Decisión:** se hacen las cinco opciones pequeñas de [[Revisión 17-11 - claridad, ruido y lenguaje]]:
  - **(1) Lista más corta:** los destinos que no salen pasan a una lista plegada («Fuera de juego por ahora: 12 destinos»), una línea por destino con su etiqueta, el motivo y «¿Por qué?».
  - **(4) Un solo sello «ejemplo»:** sustituye a las frases repetidas («precios de ejemplo…, la reserva es simulada») en el presupuesto, los días alternativos, el transporte, los trenes, el alojamiento, el total y la hora de llegada. Al pasar el ratón explica que no es real y que la reserva es simulada.
  - **(5) Reserva claramente simulada:** el botón dice «Reservar (simulación)», el recuadro de montar el viaje lleva «Reserva simulada» y el título del transporte pasa a «Elegid cómo ir».
  - **(6) Fuentes discretas:** cada norma lleva una sola línea con un punto de confianza (azul oficial, ámbar web de la empresa, verde lo preguntamos nosotros, discontinuo otra fuente o sin confirmar), la etiqueta y «ver fuente»; nombre y fecha, al pasar el ratón. El tipo de norma ya no se repite en cada tarjeta; solo queda en la tabla de papeleo. Esa tabla mostraba la etiqueta en bruto y ahora sale traducida.
  - **(7) «Sí, pero ojo» explicado:** leyenda de dos líneas bajo el resumen y explicación al pasar el ratón por cualquier etiqueta.
- **Medido:**
  - lista: de 2.212 a 2.002 palabras;
  - transporte: de 22 a 16 etiquetas de fuente;
  - ninguna etiqueta en bruto;
  - sin errores.
  
  Lo que más pesa ya en la lista son las 26 tarjetas que sí salen.

## D-31. Quitar el lag y pulir la estética (17/11/2026)

- **Decisión (lag):**
  - las líneas del mapa se animan 3 s tras cada cambio en vez de para siempre (con la app quieta, de ~48 % a ~3 % de CPU);
  - colores en caché;
  - el deslizador de la pasta redibuja una vez por fotograma;
  - los iconos se buscan con un filtro rápido.
- **Decisión (estética):**
  - en modo oscuro, mapa oscuro teñido con la paleta de la app;
  - botones secundarios sin blanco que deslumbre;
  - cabecera con el lema en texto normal y el distintivo «Demo»;
  - barra de reserva más clara.
- **Detalle y opciones siguientes** en [[Rendimiento y estética 17-11]].

## D-32. Mapa más fluido y limpio, y bóveda lista para el Mac (23/11/2026)

- **Decisión (mapa):**
  - **Selector de mapa y pausa:** salen de la cabecera y pasan al propio mapa. «Mapbox» solo aparece si el equipo guardó su token.
  - **Rótulos** («Vuestros viajes», «Quién va»…) en texto normal, sin mayúsculas monoespaciadas.
  - **Etiquetas que se pisan:** la de menos prioridad se esconde y aparece al pasar el ratón.
  - **Marcadores:** solo el origen, los 8 primeros y el destino elegido son marcadores HTML. El resto son puntos que dibuja el propio mapa, con su nombre al pasar el ratón y que se abren al pulsarlos; funcionan también en el «Mapa simple».
  - **Medido:** al abrir un destino, de 2.358 a 581 ms de CPU; al volver a Europa, de 2.869 a 399 ms; sin tareas largas.
- **Decisión (Mac):**
  - las pruebas pasan a `70 Prototipo/pruebas/` y buscan Chrome en Windows o Mac;
  - `CLAUDE.md` en la raíz con las reglas del proyecto, para que Claude Code las tenga en cualquier ordenador;
  - los temas de Obsidian se suben para que la bóveda se vea igual.

## D-33. Modelo de negocio, financiación, pitch y rediseño (25/11/2026)

- **Modelo de negocio:** se adopta el **modelo validado del equipo**. Está en [[Modelo de negocio v3 - Pase del viajero]]:
  - **Pase del viajero** a 19,99 € (IVA incluido), que paga la familia;
  - **Pack tranquilidad** (comisiones de seguro y eSIM);
  - **reservas por enlace**;
  - centros y ayuntamientos, como capa opcional sin validar.
  
  Lo que se paga es personal de cada viajero, para que no pague uno y lo usen los cuatro.
- **Fallos detectados:**
  - el IVA: nos quedan 16,52 € por Pase;
  - la distribución de seguros está regulada;
  - la afiliación es frágil;
  - los acuerdos con albergues frente a la etiqueta «verificado»;
  - los datos de menores;
  - el texto del modelo llegó cortado.
- **Financiación:** [[GoLiveIt - financiación y recuperación.xlsx]], con 3 escenarios, proyección a 60 meses y sensibilidad.
  - **Base:** se piden 13.000 € y se recupera en agosto de 2030 (44 meses), si compra el Pase el 30 % de los viajeros.
  - **Mejoras posibles:** con el Pase a 24,99 €, 32 meses; con centros y ayuntamientos, 27 meses.
  - **Lo primero que hay que medir con los leads:** qué porcentaje compra el Pase.
- **Pitch:** 15 diapositivas, con la línea visual de la web de Ruta16. Está en tres sitios:
  - artefacto Slides: https://claude.ai/artifact/Po8zG9rVEzfSGxN6gp7e6K;
  - Figma «GoLiveIt · Pitch»: https://www.figma.com/design/ijxJEYF3ii1EBqaMyWzMcw;
  - web en Netlify: `/pitch/`.
  
  La fuente está en `80 Negocio/Pitch/`.
- **Rediseño del Planner** con la estética de Ruta16:
  - fondo lavanda, violeta y lima;
  - Space Grotesk e Inter;
  - cabecera oscura y mapa a juego.
  
  Publicado en Netlify (proyecto `goliveit-ruta16`; ahora mismo solo para el equipo). Las pantallas, en claro y en oscuro, están en el mismo archivo de Figma.

## D-34. Pitch de 12 diapositivas y escenario objetivo (25/11/2026)

- **Pitch:** máximo 12 diapositivas, con la estructura y la estética del pitch del compañero (oscuro, violeta y lima) y los datos actualizados. Está en Slides, en Figma (página más reciente) y en el archivo `80 Negocio/Pitch/GoLiveIt-Pitch.html`. La web de Netlify solo lleva la demo.
- **Escenario objetivo** (modelo mejorado y arranque ligero; todo hipótesis): se piden **2.000 €**, se recupera en **junio de 2027** y el punto muerto llega en **diciembre de 2027**.
- Las cifras validadas (base: 7.000 € y 32 meses) siguen en el Excel y se citan en la diapositiva de números.
- Detalle en [[Modelo de negocio v3 - Pase del viajero]].

## D-35. Mercado nacional, solo particulares y 12.000 € (25/11/2026)

- **Mercado:** toda España (≈ 630.000 jóvenes de 15-17 que viajan al extranjero al año); el objetivo es el 0,6 % en 5 años.
- **Clientes:** solo particulares. Institutos y ayuntamientos quedan fuera por ahora (en el Excel, a 0).
- **Financiación:** 12.000 € para un lanzamiento nacional financiado (campaña, app, base verificada, legal y caja).
  - Escenario objetivo: punto muerto en diciembre de 2027 y recuperación en septiembre de 2028 (21 meses).
- **Pitch** (12 diapositivas) actualizado en Slides, Figma, HTML y PowerPoint.
- **Detalle:** [[Modelo de negocio v3 - Pase del viajero]].

## D-36. El modelo del compañero, como base, en positivo (25/11/2026)

- **Referencia:** el modelo de negocio del equipo tal cual, con el Pase Ruta16 a 19,99 €, el Pack tranquilidad, las reservas por enlace y, más adelante, acuerdos con albergues. El pitch y el prompt de ChatGPT lo cuentan en positivo.
- **Escenario objetivo:** se piden 12.000 €; el punto muerto llega en diciembre de 2027 y la inversión se recupera en diciembre de 2028 (24 meses).

## D-37. Pitch para inversores (25/11/2026)

- **Las 12 diapositivas se rehacen con la estructura de inversión:**
  1. portada con lo que pedimos;
  2. problema;
  3. solución;
  4. ventaja (la base verificada);
  5. mercado (total, alcanzable y objetivo);
  6. competencia (mapa de posicionamiento);
  7. tracción;
  8. modelo;
  9. captación de clientes, con coste por cliente frente a margen;
  10. previsión financiera;
  11. equipo;
  12. inversión, uso de los fondos e hitos.
- **Datos:** encuesta actualizada del compañero (61 respuestas, 48 de jóvenes).
- **Números por cliente:**
  - captación de unos 10 € por Pase el primer año (2.700 € de campaña + 1.200 € de contenido, entre unos 400 Pases);
  - margen de unos 17,70 € por Pase (Pase sin IVA menos pago y avisos, más Pack tranquilidad).
  
  Las dos son estimaciones.
- **Pendiente del equipo:** los nombres de los compañeros en la diapositiva de equipo (ahora pone [Nombre]) y el correo de contacto.

## D-38. Modelo escalable a Europa y pitch con logos (25/11/2026)

- **Alberto:** 38.000 € al año no sostienen a un equipo de 4; el mercado es mucho mayor porque una web escala a toda Europa.
- **Escenario objetivo:**
  - expansión a Portugal, Italia y Francia en 2029 (demanda × 2);
  - más crecimiento;
  - complementos que se contratan con el Pase: eSIM (60 %), seguro (50 %) y otros servicios (30 %, ~5 €);
  - sueldos de los 4 desde 2029 (4.800 €/mes en total);
  - IVA, IRPF, temporadas y mantenimiento de la web.
- **Resultado:**
  - financiación de 12.000 €;
  - punto muerto en diciembre de 2027;
  - recuperación en junio de 2028 (18 meses);
  - 44.737 viajeros y 467.419 € de ingresos en 2031 (el 1,9 % del mercado alcanzable de 2,4 M).
- **Excel:**
  - hoja nueva «Previsión hasta recuperar», en horizontal, con todo desglosado: ventas con IVA, IVA trimestral, ingresos por línea, gastos variables y fijos, beneficio antes de impuestos, IRPF, neto y caja;
  - se retira la hoja vertical «PM + 6».
- **Pitch:**
  - fuera el equipo;
  - diapositiva de complementos;
  - logos de la competencia (EF, Finnair, KLM y Airbnb, sacados del pitch del compañero);
  - mercado total, alcanzable y objetivo europeo.

## D-39. Cálculos corregidos, ventas de un mes y presupuesto de una venta (26/11/2026)

- **Alberto:** los cálculos no estaban bien; quiere una hoja con el desglose de todos los ingresos por ventas de un mes y un presupuesto de ingresos y gastos de una venta.
- **Revisión:** un recálculo independiente (fuera del Excel) daba lo mismo que el Excel, mes a mes y al céntimo. El fallo era de planteamiento: el beneficio de 2031 salía demasiado alto porque los gastos no crecían con el negocio.
  - El marketing seguía en 200 € al mes con 45.000 viajeros.
  - La salida a Europa doblaba la demanda sin costar nada.
  - Los sueldos se quedaban en 1.200 € por socio con 360.000 € de beneficio.
  - Se aplicaba un impuesto plano del 20 %.
- **Correcciones (escenario objetivo):**
  - publicidad que crece con las ventas: 8 % de los ingresos desde 2028 (el año 1 lo cubre la campaña de lanzamiento);
  - salida a Portugal, Italia y Francia: 6.000 € de lanzamiento (con la constitución de la SL) y 1.500 € al mes;
  - sueldos por año: 1.200, 2.000 y 3.000 € al mes por socio en 2029, 2030 y 2031;
  - SL desde 2029: Impuesto de Sociedades del 25 % y gestoría de 120 € al mes;
  - cuota de autónomo después de la tarifa plana: 350 € por socio.
  - Todo va como HIPÓTESIS en Supuestos, salvo los tipos de impuesto (OFICIAL).
- **Resultado:**
  - siguen igual: 12.000 €, punto muerto en diciembre de 2027 y recuperación en junio de 2028 (18 meses), con los mismos ingresos;
  - el beneficio neto pasa a 3.588 / 22.417 / 43.189 / 101.283 / 157.690 € (2027-2031) y la caja de 2031 a 318.943 €;
  - punto muerto de ~123 viajeros al mes;
  - el escenario base ya no recupera en 5 años, porque ahora paga publicidad.
- **Excel:**
  - hoja nueva **«Ventas de un mes»**: se elige el mes. Cada línea de ingreso trae nº de ventas, precio, lo que paga el cliente, IVA y lo que nos queda; después, gastos variables y fijos, resultado, impuesto, neto, IVA del mes y caja. Comprobaciones ✓ contra la proyección.
  - hoja nueva **«Presupuesto de una venta»**: solo el Pase, venta media y venta completa, con ingresos, gastos variables, costes fijos repartidos entre las ventas del año elegido, impuesto y neto. Comprobación ✓ con el beneficio del año.
- **Pitch:** diapositiva de números actualizada en Slides, PowerPoint (también en Descargas) y HTML.

## D-40. Rediseño «Independent Travel Editorial» y nombre oficial Ruta16 (26/11/2026)

- **Alberto:** el nombre oficial es **Ruta16**. Pidió rediseñar la demo con su guion de dirección artística y publicarla en Netlify, buscando él mismo las imágenes y añadiendo detalles sutiles con humor.
- **Proceso:** auditoría de la demo publicada y de la web pública de Corner (sin descompilar ni APIs). Pinterest, Mobbin y Dribbble piden cuenta: no se consultaron. Propuesta con tres variaciones en el lienzo https://claude.ai/artifact/DRW2EzAABrmBBYGfwuxgWe; Alberto aprobó la **A · Cuaderno de ruta**.
- **Implementado en la rama `rediseno-ruta16`** (sin tocar `main`):
  - capa de estilos nueva al final de `planner.src.html` (Warm White, Sky Blue, Ink Blue, Signal Yellow y Vermilion; Space Grotesk, Inter e IBM Plex Mono). Los colores de edad siguen siendo semánticos, con icono y texto;
  - tema claro por defecto, mapa de calles con tierra cálida, agua azul suave y verde discreto, y marcadores con borde de tinta;
  - portada «Vuestro primer gran viaje», sin emojis, con sello «Hecho para 16 y 17 años» y avioncito a tinta;
  - marca Ruta16 en todo lo visible (las claves de guardado no cambian; los nombres de archivo `GoLiveIt-Planner*.html` se mantienen);
  - barra del presupuesto: vuelo azul, dormir amarillo y gastos azul cielo (el verde queda solo para «Sí podéis»).
- **Fotos:** las 22 del prototipo pasan de 330 a 960 px con el **mismo archivo de Commons** (mismo crédito); se añaden Granada (Jebulon, CC0) y Cracovia (Igor123121, CC BY 4.0) en `data/creditos-fotos.json`. Se descartó una foto con caras de desconocidos en primer plano.
- **Guiños** (uno por pantalla; nunca en estados de edad, avisos legales ni condiciones):
  - «500 km ≈ 1 h de vuelo ≈ un disco entero» en la leyenda del mapa;
  - «os sobran 27 € (¿pastéis de nata?)», con un dulce o plato típico por ciudad;
  - «Aquí la letra pequeña va en grande» en el modo padres.
- **Comprobado:** `check.mjs` y `cdp-check.mjs` sin errores (solo el aviso esperado del conector de vuelos apagado), auditoría de 15 pantallas y capturas reales en escritorio y móvil (390 px, sin scroll horizontal).
- **Publicado** en https://goliveit-ruta16.netlify.app (sustituye a la versión anterior de la demo).
- **Pendiente:** fusionar la rama con `main` y republicar el artefacto del Planner, si Alberto lo aprueba.
