---
tipo: benchmark
fecha: 2026-11-11
metodo: skill replica-entrepreneur (reseñas reales, citas literales con enlace)
relacionado: "[[Competencia de GoLiveIt]], [[Buscadores y empresas de viaje - ingeniería inversa]], [[Consultas a albergues - 11-11-2026]]"
---

# Grietas de la competencia y mejoras para GoLiveIt (11/11/2026)

## Muestra (qué se ha leído y qué no)

- **3.528 reseñas y comentarios**: 3.338 reseñas de la App Store (España y Reino Unido, las más recientes) de 9 apps (Skyscanner, Hostelworld, Booking, Omio, Rail Planner de Eurail/Interrail, KAYAK, FlixBus, Kiwi.com y eDreams), sacadas del **feed oficial de Apple**; y 190 comentarios de **Hacker News** que hablan de viajes (API oficial de Algolia).
- **No se ha podido leer**: Reddit (bloqueado en el navegador), Trustpilot (pide una comprobación anti-bots y no se salta) ni Google Play. Es una limitación: **son 2 plataformas**, aunque haya 9 apps.
- Archivos: `reviews-appstore.csv`, `reviews-hn.csv` (texto tal cual, sin nombres de usuario), `feedback.md` (ranking automático) y `rank.mjs` + `themes-viajes.json` (el ranker de la skill pasado a Node, con temas de viaje en español e inglés).
- Las citas van **literales**, en su idioma, con el enlace al feed donde aparecen. No se usan como testimonios.

## 1. Lo que odian (ranking por peso: más peso a 1★ y a lo reciente)

| # | Problema | Reseñas | Fuentes | Media ★ |
|---|---|---|---|---|
| 1 | Cancelaciones y reembolsos que no llegan | 380 | 11 | 1,3 |
| 2 | Sensación de engaño: precios de anuncio que no existen, intermediarios dudosos | 352 | 15 | 1,2 |
| 3 | Atención al cliente que no responde | 223 | 10 | 1,2 |
| 4 | Fallos y cuelgues de la app | 204 | 15 | 1,7 |
| 5 | Confusa, filtros que no sirven, pierdes la búsqueda | 98 | 14 | 2,2 |
| 6 | Notificaciones y publicidad de más | 81 | 14 | 1,8 |
| 7 | Precio final distinto, comisiones y tasas ocultas | 77 | 13 | 1,7 |
| 8 | Una actualización la empeoró | 77 | 15 | 2,0 |

Dónde se concentra: reembolsos en **Kiwi.com (119)**, eDreams (63) y FlixBus (59); engaño en **Kiwi.com (99)** y eDreams (82); lo confuso, en **Rail Planner (34)**.

- Precio que cambia: *"Today it shows flights to Denmark for £30 however, when going into them the flights are £280."* (Skyscanner, 1★, 12/09/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=415458524/sortBy=mostRecent/json)
- Intermediarios: *"Partner with notorious scammers such as Opido and Edreams. Book at your own risk."* (KAYAK, 1★, 16/07/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=305204535/sortBy=mostRecent/json)
- Albergues que cancelan: *"One hostel cancelled because they apparently emailed me and wanted money upfront, the other is not showing up in my trips."* (Hostelworld, 1★, 25/10/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=348890820/sortBy=mostRecent/json)
- Pierdes la búsqueda: *"there is no back button once you have gone to view a hostel in more details!!"* (Hostelworld, 1★, 12/07/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=348890820/sortBy=mostRecent/json)

## 2. Lo que falta (piden por su nombre)

| # | Petición | Reseñas | Fuentes | Nota |
|---|---|---|---|---|
| 1 | Mapa, ubicación y cómo llegar | 92 | 15 | Hostelworld (18) y Rail Planner (16) |
| 2 | Billetes y reservas sin conexión | 30 | 10 | |
| 3 | Todo en un sitio (transporte + alojamiento) | 22 | 9 | Se valora cuando existe |
| 4 | Alertas de precio útiles (no spam) | 19 | 7 | |
| 5 | Viajar en grupo: asientos juntos, compartir, dividir | 13 | 10 | **Fino**: pocas reseñas |

- Grupo separado: *"el check in automático es una manera de asignarte el peor asiento con todo el grupo separado, para que pagues cantidades ridículas si queréis sentaros juntos."* (Kiwi.com, 1★, 16/05/2026) [feed](https://itunes.apple.com/es/rss/customerreviews/page=1/id=657843853/sortBy=mostRecent/json)
- Sin conexión: *"I bought return rail tickets but only the outbound tickets are available on the app and on apple wallet."* (Omio, 2★, 15/10/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=885372509/sortBy=mostRecent/json)

## 3. Lo que nadie resuelve (aquí está el hueco de GoLiveIt)

**Los menores que viajan sin adultos no existen para la competencia.** De 3.528 reseñas, el patrón «edad/menor» salta 39 veces, pero casi todas son falsos positivos («minor gripe», «minor change»). Leídas a mano, solo **2** hablan de verdad del problema:

- *"I then checked the hostel rules to realise I fell outside of their age range. [...] I feel however, the app knowing my age, should never have offered the hostel to me as their recommended one to book."* (Hostelworld, 1★, 10/07/2026) [feed](https://itunes.apple.com/gb/rss/customerreviews/page=1/id=348890820/sortBy=mostRecent/json)
- *"We booked a round-trip journey for four people, including a 16-year-old minor, through Kiwi.com as a single itinerary."* (Kiwi.com, 1★, 12/03/2026), acaba sin reembolso. [feed](https://itunes.apple.com/gb/rss/customerreviews/page=4/id=657843853/sortBy=mostRecent/json)

**Esto es fino como reseña (2 casos)**, y no se puede vender como «tendencia». La prueba fuerte del hueco es **nuestra propia investigación**: de los 11 albergues que respondieron el 11/11, **10 piden autorización de los padres**, 2 solo aceptan si va alguien de 18, 2 dicen que no y 2 solo en habitación privada. Ninguna de estas apps lo dice antes de pagar. Ver [[Consultas a albergues - 11-11-2026]].

Otros grupos ignorados: **los padres** (pagan, firman y quieren saber dónde están) y **los grupos de amigos** (dividir, sentarse juntos, una sola reserva).

## 4. Plan de mejoras para GoLiveIt (evidencia × lo barato que es)

| # | Qué hacer | Tamaño | Skill | Evidencia | ¿Lo tenemos? |
|---|---|---|---|---|---|
| 1 | **Kit de papeles automático**: carta de autorización de los padres rellenada con fechas, albergue y nombres, según lo que pide cada sitio (firma, copia del DNI, formulario propio), para imprimir | M | replica-build | 10 de 11 albergues la piden; reseña de Hostelworld | Solo el aviso; no se genera |
| 2 | **«Pídeles confirmación»**: correo listo, en el idioma del albergue, para que confirmen por escrito antes de pagar (las plantillas del 11/11 ya funcionan) | S | replica-build | Hostelworld (edad y cancelaciones); 11 respuestas en un día | No |
| 3 | **Precio total honesto y reserva directa**: total por persona con equipaje, tasas y comisiones; solo enlaces a la aerolínea o al albergue, con la etiqueta «sin intermediario» | S | replica-build | Engaño 352 · precio 77 | Precio orientativo sí; desglose de extras y etiqueta, no |
| 4 | **Plan B por viaje**: qué hacer si cancelan el vuelo o no os dejan entrar (2 alternativas cerca que aceptan vuestra edad, 112, consulado, cómo reclamar) | M | replica-build | Reembolsos 380 · soporte 223 · reserva que no vale 6 | Solo «Posibles líos» generales |
| 5 | **Pack del viaje sin conexión**: una página imprimible/PDF con reservas, direcciones, normas, autorizaciones y teléfonos | S | replica-build | Sin conexión 30 | No |
| 6 | **Modo padres**: enlace de solo lectura con destino, alojamiento y sus normas, papeles y contactos | M | replica-build + replica-backend | Hueco «padres» (nuestras encuestas y entrevistas) | Compartir por WhatsApp sí; vista para padres, no |
| 7 | **Grupo de verdad**: aviso de asientos separados y su precio por aerolínea; quién paga qué (ya está el bote) | S | replica-build | Grupo 13 (**fino**) | Bote sí; asientos no |
| 8 | **Avisos útiles, nunca spam**: «avísame cuando se confirme» para lo pendiente (albergues, normas de país) | M | replica-backend | Spam 81 · alertas 19 | No |

Ya cubierto y que conviene **mantener**: no perder la búsqueda (se guarda en el navegador y hay «Volver»), mapa con todo lo que se puede hacer, todo en un sitio (vuelo/bus + albergue + planes) y una sola página sin anuncios.

Precios y suscripciones (eDreams Prime y similares) → a `/replica-launch` cuando toque el modelo de negocio.

## 5. El ángulo (posicionamiento)

1. **Recomendado.** *Para chavales de 16 y 17 años que quieren viajar con amigos y a los que los buscadores enseñan sitios donde luego no les dejan entrar, GoLiveIt solo enseña lo que acepta vuestra edad, con la norma, la fuente y los papeles listos.*
   Evidencia: 2 reseñas literales (fino) + 11 respuestas de albergues del 11/11 + las consultas del compañero (25 albergues).
2. *Para quien está harto de precios que cambian al pagar y de intermediarios que no contestan, GoLiveIt da el precio total y te manda a reservar directo.* Evidencia: engaño 352 + precio 77 reseñas en 15 y 13 fuentes.
3. *Para los padres que tienen que firmar, GoLiveIt junta en un sitio dónde van, con quién duermen, qué papeles hacen falta y qué hacer si algo falla.* Evidencia: el hueco «padres» (sin reseñas: hay que validarlo con entrevistas).

Se recomienda el **1** (es lo único que nadie hace) usando el **2** como argumento de apoyo. No se cita a ninguna marca de la competencia en la web ni en anuncios; una comparativa con nombres sería una consulta legal.

## Siguiente paso

Construir 1, 2 y 3 (son los más baratos con más evidencia) y validar el 6 con padres. Después: `/replica-brand` si se quiere revisar nombre y tono.
