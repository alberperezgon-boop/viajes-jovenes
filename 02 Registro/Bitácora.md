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
