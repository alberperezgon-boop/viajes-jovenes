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
