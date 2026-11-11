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
