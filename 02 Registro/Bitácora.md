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
