---
tipo: benchmark
fecha: 2026-11-17
relacionado: "[[Buscadores y empresas de viaje - ingeniería inversa]], [[Competencia de GoLiveIt]], [[fixes|Grietas de la competencia]], [[Benchmark UX-UI]]"
---

# Mejoras del 17/11/2026: lo que tiene la competencia, recursos que ayudan y estética

## 1. Hecho hoy en el Planner (D-22)

| Mejora | De dónde sale | Estado |
|---|---|---|
| **Ordenar la lista** («Os pega más», «Más barato», «Más cerca») y filtro **«Solo los que entran en la pasta»** (dice cuántos se pasan) | Skyscanner Everywhere, Rome2Rio (ordenar por precio o por tiempo) | Hecho y probado |
| **Descuentos y pases para vuestra edad** en Presupuesto: Carné Joven Europeo, Interrail Youth y DiscoverEU | Funciones candidatas 3 y 9 de [[Buscadores y empresas de viaje - ingeniería inversa]] | Hecho, con fuentes |
| **Otras formas de ir:** BlaBlaCar no se propone a menores | Reclamación pública en la OCU | Hecho (SECUNDARIA) |
| **Intérprete:** «salimos de Sevilla» ya no se entiende como destino | Fallo visto en la auditoría | Arreglado |
| **Mapa sin etiquetas amontonadas:** nombre y precio solo en los 8 mejores; el resto, al pasar el ratón | Auditoría estética | Hecho |
| **Precios con la tipografía del título** (sin el hueco raro de la fuente monoespaciada: «223 €») | Auditoría estética | Hecho |
| **«Salís de» y «Días» alineados**; cabecera más limpia (pausa como icono; el lema se oculta en pantallas estrechas); **foco visible** en botones | Auditoría estética | Hecho |
| Errores de librerías visibles en la consola (`crossorigin`) | Mensaje «Script error.» del artefacto | Hecho; falta ver el error real en claude.ai |

## 2. Lo que tienen otros y nosotros no (propuestas, por prioridad)

| # | Función | Quién la tiene | Por qué nos sirve | Tamaño | Ojo |
|---|---|---|---|---|---|
| 1 | ✅ **Hecho (D-23).** **Tren junto a avión y bus**, con la edad mínima de cada operador ([[Tren - edad por operador]]) | Omio, Trainline, Rome2Rio | Muchos trayectos para 16-17 son más fáciles en tren; Interrail Youth ya está en Presupuesto | Grande | Hay que verificar la edad de cada operador (Renfe, SNCF, DB…) |
| 2 | **Cancelación flexible** visible en cada alojamiento y vuelo («cancelación gratis hasta…») | Booking, Hostelworld | La queja número 1 de la competencia son los reembolsos (380 reseñas) | Media | Sin datos reales: de ejemplo y marcado |
| 3 | **Avisos de precio** compartidos con el grupo y la familia | Google Flights, Skyscanner, KAYAK, Hopper | El conector de Duffel ya da precios reales | Media | Sin mensajes de urgencia ni contadores |
| 4 | **Cómo llegar del aeropuerto al albergue** (bus, metro, tiempo y precio) | Rome2Rio | Es lo que más agobia al llegar; también tranquiliza a los padres | Media | Datos por ciudad; empezar por las 5 primeras |
| 5 | **Viaje compartido con niveles**: grupo / grupo + familias (nunca público) | Polarsteps, Wanderlog | Ya existe el enlace de familia; falta que el grupo vea lo mismo | Media | Sin ubicación en directo por defecto |
| 6 | **Opiniones de otros jóvenes** sobre el albergue («¿os dejaron entrar con 17?») | Hostelworld | Prueba social de lo que más miedo da: el check-in | Grande | Moderación; sin datos personales de menores |
| 7 | **Pack sin conexión** del viaje (reservas, cartas, teléfonos) | Lambus | Ya se imprimen las cartas y el modo padres; falta juntarlo | Pequeña | No guardar copias de documentos |
| 8 | **Versión móvil** | Todas | El público usa el móvil | Grande | Alberto pidió centrarse primero en PC |

**No copiar:** chats abiertos con desconocidos, ofertas con cuenta atrás, ubicación en directo por defecto ni cuentas de usuario para menores (ver D-14).

## 3. Recursos externos que nos ayudan

| Recurso | Para qué | Etiqueta | Fuente |
|---|---|---|---|
| Carné Joven Europeo (Andalucía) | Descuentos; de **14 a 30 años**; **versión digital gratis** para residentes (en plástico, 6 €) | VERIFICADO | [BOJA, Orden de 26/07/2023](https://www.juntadeandalucia.es/boja/2023/146/42) · [Junta de Andalucía](https://www.juntadeandalucia.es/temas/familias-igualdad/jovenes/carnet-joven.html) |
| Interrail Youth | Pase de tren, de **12 a 27 años** | OFICIAL-INDIRECTO | [Interrail](https://www.interrail.com/en/interrail-passes/one-country-pass/poland) |
| DiscoverEU | Pase de tren gratis al cumplir 18 | VERIFICADO | [Portal Europeo de la Juventud](https://youth.europa.eu/news/discovereu-its-time-apply_en) |
| BlaBlaCar | **No sirve con menores**: bloqueó la cuenta de un chico de 16 | SECUNDARIA | [Reclamación en la OCU](https://www.ocu.org/reclamar/lista-reclamaciones-publicas/problema-con-el-reembolso/79cecca1f247705fc5) |
| Rome2Rio | Referencia de «cómo llegar» puerta a puerta y ordenar por tiempo o precio | SECUNDARIA | [Guía de uso](https://www.going.com/guides/how-to-use-rome2rio-for-easier-route-planning) |

## 4. Estética: lo que se ha visto y lo que queda

**Arreglado:** etiquetas del mapa amontonadas, campos desalineados, precios en fuente monoespaciada, cabecera cargada, código IATA demasiado grande en las fotos, falta de foco visible.

**Propuestas siguientes:**
1. **Iconos propios en SVG** en vez de emojis (🛏 ✈ 🎟): se ven distintos en cada ordenador y restan coherencia.
2. **Menos texto por tarjeta:** dejar precio, «os pega» y 2 motivos; el resto, al abrir el destino.
3. **Una sola escala de colores de estado** (verde, ámbar, gris y rojo) también en el modo padres y la noche, que hoy mezclan etiquetas («Pueden», «Os dejan», «Sí podéis»).
4. **Estados vacíos con dibujo** («ningún alojamiento os acepta aquí»), en vez de solo texto.
5. ~~Barra de reserva que recortaba «Elige dónde do…»~~: **arreglado** el 17/11.
6. Revisar el **contraste** del naranja con texto blanco en botones pequeños.
