---
tipo: propuesta
tema: integración de proveedores, modelo de marketplace y políticas de edad
version: v0
estado: borrador de investigación; NADA de esto está decidido
actualizado: 2026-11-08
relacionado: "[[Propuesta individual v0]] · [[Marco legal del negocio]] · [[Hipótesis]] (H-14 a H-20) · [[Proveedores - alojamiento]] · [[Proveedores - transporte]]"
---

# Integración de proveedores y marketplace

> Esto **no es asesoramiento jurídico ni comercial**. Es un mapa para decidir y para preparar las preguntas al abogado y a los proveedores. No se ha creado ninguna cuenta, no se ha pedido ningún acceso y no se ha pagado nada: todo sale de documentación pública consultada el **08/11/2026**.

**Etiquetas usadas** (las del [README](<../README.md>), adaptadas a esta tarea):

| Etiqueta | Significado aquí |
|---|---|
| `VERIFICADO` | Página oficial del proveedor o del legislador abierta directamente el 08/11/2026 (lectura asistida por herramienta; releer antes de citarla en una presentación) |
| `OFICIAL-INDIRECTO` | Página oficial, pero solo se vio el fragmento del buscador (la página bloqueó la lectura directa) |
| `SECUNDARIA` | Prensa, blogs, directorios de afiliación, competidores, SDK de terceros |
| `INFERIDO` | Deducción razonada; puede estar equivocada |

---

## Resumen

1. **Casi todo lo que de verdad está abierto a un equipo pequeño es afiliación (enlaces con comisión), no APIs con reserva.** Las APIs con disponibilidad y reserva (Booking Demand API, Expedia Rapid, Hotelbeds, Skyscanner Travel API, Trainline Partner Solutions, Distribusion, Kiwi Tequila) exigen contrato, volumen o invitación. `VERIFICADO` en la mayoría de casos, ver tabla.
2. **Amadeus Self-Service ya no existe:** se cerró el 17/07/2026 y solo queda Amadeus Enterprise, con contrato. `SECUNDARIA` (prensa del sector; no se pudo leer el aviso oficial). Muchos tutoriales que circulan están obsoletos.
3. **Las excepciones realmente abiertas** son: **Viator** (cualquier afiliado recibe al momento la API «Basic Access» con contenido y disponibilidad), **Tiqets** (APIs de contenido y disponibilidad gratis tras una revisión; la de reserva pide unos 200 pedidos al mes), **Duffel** (vuelos con reserva, de pago por uso y sin acreditación IATA propia, pero con verificación de empresa) y **Ticketmaster Discovery API** (clave gratuita, 5.000 llamadas al día). `VERIFICADO`
4. **Políticas de edad estructuradas: existen, pero solo en parte y casi siempre detrás de un contrato.**
   - Booking.com Demand API tiene `policies.minimum_guest_age` y menciona `minimum_checkin_age`. Expedia Rapid tiene `checkin.min_age`. Ninguna de las dos está abierta a GoLiveIt hoy. `VERIFICADO`
   - Viator expone franjas de edad por producto (`ageBands` con `startAge` y `endAge`) y la marca `requiresAdultForBooking` en el acceso básico. GetYourGuide tiene categorías con rango de edad y un campo `independently_bookable`. `VERIFICADO` / `SECUNDARIA`
   - **Ninguna API responde a la pregunta que importa:** ¿puede un grupo de 16-17 años sin adultos alojarse, hacer la actividad o reservar, y con qué autorización? Para eso hace falta **nuestra propia base verificada**, con las APIs como señal de apoyo. `INFERIDO`
5. **Las plataformas exigen un adulto que reserve:** Booking.com («debes tener al menos 18 años para usar la Plataforma», A4.6), Hostelworld (cláusula 4.1: el que reserva debe tener 18 años o más) y BlaBlaCar (§3.1: solo mayores de 18). Esto apoya **H-14** (pagan y reservan los padres) y obliga a diseñar el flujo de afiliación **para el adulto**, no para el menor. `VERIFICADO`
6. **Aviso comercial:** las condiciones de Civitatis permiten cancelar la afiliación si la web «va dirigida a niños y/o menores de edad». Es probable que otras redes tengan cláusulas parecidas. Una web cuyo público declarado son jóvenes de 16-17 años **puede perder sus programas de afiliación**. `VERIFICADO` (Civitatis) / `INFERIDO` (resto)
7. **Aviso legal:** la Directiva (UE) 2026/1024 suprime los «servicios de viaje vinculados» e introduce el art. 5 bis. Según este, si un empresario **invita** a contratar otro servicio para el mismo viaje sin avisar de que no es un viaje combinado, y el pago se hace en el mismo punto de venta en 24 horas, **pasa a ser organizador**. Hay que transponerla antes del 29/09/2028 y se aplica desde el 29/03/2029. `VERIFICADO` (EUR-Lex). Hasta entonces rige el TRLGDCU actual, que sí tiene servicios de viaje vinculados.
8. **Recomendación:** demo sin APIs → MVP con **enlaces de afiliación dirigidos al adulto** + base propia de políticas + **cobro a los padres por el «plan verificado»** → APIs de contenido y disponibilidad (Viator, Tiqets, GetYourGuide) solo si hay tracción. La reserva integrada, solo con una **agencia socia**. Con los números del apartado 5, la afiliación **por sí sola no sostiene el negocio**: con supuestos razonables deja unos 5-6 € por viajero y viaje. `INFERIDO`

---

## 1 Mapa de proveedores

Columnas: **Modelo** = metabuscador/enlace, afiliación (comisión) o reserva integrada (API con reserva). **¿Abierto a GoLiveIt hoy?**: 🟢 sí, sin volumen · 🟡 con revisión o condiciones · 🔴 contrato, volumen o invitación · ⚫ cerrado o retirado.

### 1.1 Vuelos

| Proveedor | Estado (08/11/2026) | Datos disponibles | Políticas de edad en la API | Modelo | Requisitos y costes | Limitaciones de uso | Etiqueta |
|---|---|---|---|---|---|---|---|
| **Amadeus for Developers, Self-Service** | ⚫ Cerrado. Nuevos registros parados y claves desactivadas el 17/07/2026. Solo queda el portal Enterprise | — | — | — | Enterprise: contrato con un gestor de cuenta | — | `SECUNDARIA` (PhocusWire, BTN, guías de competidores) |
| **Duffel** | 🟡 Abierto a vendedores de viajes. Para pasar a producción hay que **activar la cuenta como comerciante** con datos de empresa | Ofertas en tiempo real, precio, reserva, extras; *Duffel Links*: buscador y reserva alojados por Duffel con tu marca | Solo pide **la edad de cada pasajero menor de 18** para tarificar (cambio de 04/03/2020). No expone las normas de menores no acompañados de cada aerolínea | Reserva integrada (eres vendedor de viajes) | 3 $ por pedido; 1 % del valor si usas su contenido gestionado; 2 $ por extra; 0,005 $ por búsqueda por encima de 1.500:1; 2 % de cambio de divisa. Sin cuota mensual. No hace falta IATA propia | La relación búsquedas/reservas se cobra; tú eres el comercio frente al cliente salvo en Duffel Payments/Links (por confirmar) | `VERIFICADO` (precios, edad) / `SECUNDARIA` (requisitos de activación) |
| **Kiwi.com Tequila** | 🔴 Nuevas alianzas **solo por invitación** desde el 30/05/2024 | Búsqueda y reserva (para socios existentes) | No comprobado | Reserva o afiliación | Invitación | — | `VERIFICADO` |
| **Skyscanner** | 🟡 Afiliación (enlaces, banners y buscador) vía Impact. 🔴 Travel API «solo mediante acuerdo comercial», con aprobación caso a caso | API: precios en vivo, precios orientativos, autocompletar, geo | No | Metabuscador (enlace) | API: tráfico y encaje de mercado; límites por defecto de 100 búsquedas por minuto | Prohíbe guardar en caché, revender o redistribuir datos | `VERIFICADO` (API) / `SECUNDARIA` (Impact) |
| **Travelpayouts / Aviasales** | 🟢 Red de afiliación abierta. *Data API* de Aviasales (precios en caché de 2-7 días) para cualquier socio. *Flight Search API* en tiempo real solo con unos **50.000 usuarios activos al mes** | Precios orientativos (Data API); búsqueda en vivo (Search API) | No | Metabuscador + afiliación | Gratis. Comisiones por marca; las cifras públicas son de terceros | La Data API no sirve para mostrar un precio como «real» | `OFICIAL-INDIRECTO` (requisitos de API) / `SECUNDARIA` (comisiones) |
| **Google Flights** | ⚫ Sin API pública. QPX Express cerró el 10/04/2018 | — | — | — | — | Extraer datos de la web incumpliría sus condiciones (`INFERIDO`) | `SECUNDARIA` |

**Lectura:** para un MVP de viajes **nacionales por Andalucía** (opción A de la [[Propuesta individual v0]]), el avión es secundario. Si se necesitara, bastarían enlaces de afiliación (Skyscanner o Aviasales). Duffel es la única puerta realista a la reserva de vuelos, pero convierte a GoLiveIt en **vendedor de viajes**. `INFERIDO`

### 1.2 Trenes y autobuses

| Proveedor | Estado | Datos disponibles | Políticas de edad en la API | Modelo | Requisitos y costes | Limitaciones | Etiqueta |
|---|---|---|---|---|---|---|---|
| **Renfe** | Sin API pública de venta ni programa de afiliados propio localizado. Hay **datos abiertos** (GTFS de horarios y estaciones) en data.renfe.com / datos.gob.es | Horarios y paradas (GTFS); **sin precio ni disponibilidad** | No (su norma web solo regula a los menores de 14: ver [[Proveedores - transporte]]) | Enlace a renfe.com o venta a través de revendedores (Trainline, Omio) | Gratis (datos abiertos) | Los GTFS pueden desfasarse | `OFICIAL-INDIRECTO` (datos abiertos) / `INFERIDO` (no hay afiliación) |
| **Trainline** | 🟡 Afiliación vía **Partnerize**, con revisión de cada solicitud. Vende Renfe, AVE y Avlo. 🔴 *Partner Solutions* (API B2B) con acuerdo comercial | Enlaces y widgets (afiliación); búsqueda y reserva (B2B) | No comprobado | Afiliación / reserva B2B | Afiliación sin cuota; comisión «según tarifas y condiciones de Partnerize» (no publicada) | — | `VERIFICADO` |
| **Omio** | 🟡 Afiliación propia y a través de redes (Travelpayouts confirmado). API de búsqueda para socios y API B2B de reserva | Tren, autobús y avión en una búsqueda | No comprobado | Afiliación / reserva B2B | Comisión según mercado y retorno; terceros citan un 6 % o un 2-8 % | — | `OFICIAL-INDIRECTO` / `SECUNDARIA` (comisiones) |
| **FlixBus** | 🟢 Afiliación estática (enlaces, banners, widgets) vía **Awin**. 🟡 API («integración dinámica») por correo a online-distribution@flixbus.com, aportando **datos de la empresa, dominios y visitas mensuales** | Enlaces; la API incluye búsqueda y reserva | No en la documentación pública. Norma al pasajero: desde los 15 años viajan solos (ver [[Proveedores - transporte]]) | Afiliación / API | Comisión por pedido, sin cifra pública | En marca blanca, el cliente debe comprobar las normas del transportista para menores | `VERIFICADO` |
| **Rail Europe** | 🟢 Afiliación (vía Travelpayouts, entre otras). 🔴 API B2B para agencias y OTA | Billetes y pases | No comprobado | Afiliación / reserva B2B | Afiliación en torno al 1-1,8 % según terceros; la API B2B se negocia | — | `SECUNDARIA` |
| **BlaBlaCar** | Coche compartido: **solo mayores de 18 pueden registrarse** (§3.1). Un menor puede viajar solo si tiene 13 años o más (16 en Italia y Brasil), con **permiso previo del conductor y autorización firmada de los padres** (§4.2.5). **BlaBlaCar Bus cierra a finales de 2026** (anuncio del 21/04/2026). API de autobús solo para socios | Enlaces | No | Enlace | — | — | `VERIFICADO` (condiciones) / `SECUNDARIA` (cierre del autobús) |
| **Distribusion** | 🔴 Solo B2B. Clave de demostración y acceso por correo a partner@distribusion.com, con un gestor de alianzas y una **acreditación** (mostrar todas las salidas, ida y vuelta, tipo de vehículo…) | Autobús, tren, ferri y traslados (más de 1.200 operadores, según ellos) | No comprobado | Reserva integrada | Precio sin publicar | Exige mostrar todo el inventario | `OFICIAL-INDIRECTO` |

**Lectura:** el transporte es la categoría **con menos problemas de edad** para 16-17 años (I-01) y la mejor cubierta por la afiliación. Para el MVP basta con **un revendedor que incluya Renfe y autobuses** (Omio o Trainline) más FlixBus. `INFERIDO`

### 1.3 Alojamiento

| Proveedor | Estado | Datos disponibles | Políticas de edad en la API | Modelo | Requisitos y costes | Limitaciones | Etiqueta |
|---|---|---|---|---|---|---|---|
| **Booking.com, programa de afiliados** | 🟡 El registro se hace **a través de CJ** (la página oficial lo dice así). En mayo-junio de 2025 Booking dio de baja a «miles» de afiliados pequeños con 30 días de aviso y los derivó a Awin o CJ | Enlaces, buscadores y widgets | No en la afiliación por enlaces | Afiliación | Gratis. Pagan una parte de **su** comisión (no del precio); terceros hablan del 25-40 % de esa comisión, según volumen | Sesión o cookie corta, según fuentes | `VERIFICADO` (CJ) / `SECUNDARIA` (recorte de 2025, porcentajes) |
| **Booking.com Demand API** | 🔴 Reservada a «**Managed Affiliate Partners**» (afiliados gestionados), con clave de API e `X-Affiliate-Id`. Tiene entorno de pruebas | Búsqueda, disponibilidad, detalles, reserva | **Sí, la más completa:** `policies.minimum_guest_age` (0 = cualquier edad; 18 o más = no admite menores) y `minimum_checkin_age` (edad mínima para hacer el check-in); además, camas supletorias y cunas | Afiliación avanzada o reserva | Ser afiliado gestionado (invitación o volumen, `INFERIDO`) | No usar `maximum_occupancy.children` para saber si admite niños (lo dice la documentación) | `VERIFICADO` |
| **Booking.com, condiciones al cliente** | — | — | **A4.6:** «salvo indicación en contra, debes tener al menos 18 años para usar la Plataforma». **F4.8 (transporte):** quien reserva debe tener 18 años y los pasajeros menores de 18 deben ir acompañados de un adulto responsable. Hay versión nueva desde el 10/12/2026 | — | — | — | `VERIFICADO` |
| **Expedia Rapid API** | 🔴 «Necesitarás convertirte en socio»: contacto comercial, solicitud, certificación y requisitos de lanzamiento B2C o B2B | Contenido, disponibilidad, precio y reserva de hoteles (también Vrbo) | **Sí:** objeto `checkin` con `min_age` (el ejemplo oficial dice 18), además de `policies` y `know_before_you_go`. Es **obligatorio mostrarlos** en la página de disponibilidad. Expedia advierte de que algunos alojamientos no admiten menores de 18 | Reserva integrada (Expedia o el socio como comercio) | Sin precio público | Si Expedia es el comercio, hay que indicar el cargo inmediato y el país del pago; PCI DSS si se tratan datos de tarjeta | `VERIFICADO` |
| **Expedia Travel Creator Program** | 🟡 Afiliación para creadores y publicaciones, con solicitud | Enlaces | No | Afiliación | Requisitos y comisiones solo en fuentes de terceros (hasta un 4 %, sin confirmar) | — | `SECUNDARIA` |
| **Hostelworld** | 🟢 Afiliación gratuita vía **Partnerize**, cookie de 30 días y último clic. Feed de datos. 🟡 API «caso a caso» (affiliates@hostelworld.com) | Enlaces, creatividades, feed de propiedades; API con información en vivo | No documentadas. **Condiciones al cliente:** 16 años para usar la web (1.1), pero **18 años para reservar** (4.1). Cada albergue fija su norma | Afiliación | Comisión: parte del **depósito** que cobra Hostelworld; terceros dicen un 18-22 % del depósito | — | `VERIFICADO` / `SECUNDARIA` (porcentaje) |
| **Hotelbeds (HBX Group)** | 🔴 Portal de desarrolladores con clave de evaluación gratuita (**50 peticiones al día**, sin reservas reales). Producción: perfil, certificación y contrato comercial | Hoteles, actividades y traslados (B2B mayorista) | No comprobado | Reserva integrada B2B (precio neto) | Contrato con su equipo comercial | Pensado para agencias y turoperadores | `OFICIAL-INDIRECTO` / `SECUNDARIA` |
| **Airbnb** | ⚫ Sin API pública de búsqueda; según terceros, «no acepta nuevas solicitudes de acceso a la API». Además, **no admite menores** (ver [[Proveedores - alojamiento]]) | — | — | — | — | — | `SECUNDARIA` |
| **Inturjoven y albergues públicos** (sin API) | Acuerdo directo (H-16) | — | — | Acuerdo directo | — | — | `INFERIDO` |

### 1.4 Actividades y eventos

| Proveedor | Estado | Datos disponibles | Políticas de edad en la API | Modelo | Requisitos y costes | Limitaciones | Etiqueta |
|---|---|---|---|---|---|---|---|
| **GetYourGuide** | 🟢 Afiliación (unos 8 % según terceros; 7 % según su ficha en Awin). 🟡 *Partner API* con clave del *Partner Manager* en tres niveles: catálogo; disponibilidad y precio; reserva y pago | Catálogo, disponibilidad, precio, reserva | Categorías de entrada con `age_range` (mínimo y máximo, p. ej. adulto 18-99 y niño 6-17) y `independently_bookable` (si se puede reservar sin otra categoría) | Afiliación / reserva | Afiliación gratuita; la API pide aprobación y, según terceros, certificación | — | `VERIFICADO` (niveles) / `SECUNDARIA` (campos de edad, comisión) |
| **Viator (Tripadvisor)** | 🟢 **La más abierta:** al crear la cuenta de afiliado se recibe al momento el *Basic Access* (contenido y disponibilidad). *Full* y *Full + Booking* con requisitos | Contenido, disponibilidad, precio; reserva en el nivel superior | **Sí, por producto:** `ageBands` (ADULT, CHILD, INFANT, SENIOR, YOUTH, TRAVELER) con `startAge` y `endAge`, que fija cada operador; `bookingRequirements.requiresAdultForBooking` (si es verdadero, no se puede reservar sin un adulto o un senior) | Afiliación + API | Comisión del **8 %** en reservas hechas en 30 días, que se paga cuando se ha realizado la experiencia | Hay que pedir la edad exacta y casarla con las franjas | `VERIFICADO` / `OFICIAL-INDIRECTO` (8 %) |
| **Civitatis** | 🟢 Afiliación directa (empresa española): persona física o jurídica con web operativa | Enlaces, feed; API previa solicitud | No comprobado | Afiliación | **8 %** (menos de 1.000 €/mes), **9 %** (1.000-5.000 €), **10 %** (más de 5.000 €); 1 € por asistente mayor de 12 años a un free tour; cookie de 30 días; pago mínimo de 50 €; autofacturación | **Puede rescindir si la web va «dirigida a niños y/o menores de edad»**; prohibido pujar por su marca; RGPD y cookies según la AEPD | `VERIFICADO` |
| **Tiqets** | 🟢/🟡 Formulario de socio → portal de afiliado + APIs de **contenido y disponibilidad** gratis tras una revisión. API de **reserva** según resultados: «unos 200 pedidos al mes como mínimo» | Contenido, horarios, precio y disponibilidad en tiempo real; reserva | No comprobado | Afiliación / reserva | API gratuita; comisión sin publicar (Awin EE. UU.: 4-6 %) | Solo para el cliente final; entradas en el formato de Tiqets | `VERIFICADO` / `SECUNDARIA` (comisión) |
| **Ticketmaster Discovery API** | 🟢 Clave gratuita; **5.000 llamadas al día y 5 por segundo** | Eventos, recintos, clasificaciones, enlaces de compra | Parcial: `classifications.family` y el texto libre `venue.generalInfo.childRule`. Un SDK de terceros muestra `ageRestrictions.legalAgeEnforced` (sin confirmar en la documentación oficial). Cobertura de España sin confirmar | Metabuscador (enlace) + afiliación aparte | Gratis; condiciones de marca y uso | Más cuota solo tras revisar el cumplimiento | `VERIFICADO` (cuota, family, childRule) / `SECUNDARIA` (ageRestrictions) |
| **Fever** (empresa española, fuerte en Sevilla) | 🟢 Afiliación vía **Impact** para webs, apps y newsletters. Feeds o API solo para socios seleccionados con más tráfico. Programa de distribución (mayorista) para agencias y OTA | Enlaces; feed o API para socios seleccionados | No comprobado | Afiliación / reventa | Comisión según acuerdo (terceros: 6-10 %) | El pago lo procesa siempre Fever | `VERIFICADO` / `SECUNDARIA` (comisión) |
| **Eventbrite** | ⚫ La búsqueda pública de eventos (`/v3/events/search`) se retiró entre diciembre de 2019 y febrero de 2020. Solo se puede consultar por evento, organizador o recinto concreto, o mediante un programa de distribución | Datos de eventos propios o conocidos | No comprobado | Enlace | — | — | `OFICIAL-INDIRECTO` |

---

## 2 Metabuscador vs afiliación vs marketplace

| | **Metabuscador** | **Afiliación** | **Marketplace con reserva integrada (comercio o *merchant of record*)** |
|---|---|---|---|
| **Qué es** | Compara opciones y manda al usuario a la web del proveedor; cobra por clic o por envío | Enlaza o integra un widget; el usuario reserva y paga **en la web del proveedor**; se cobra una comisión si hay venta | El usuario reserva y **paga en GoLiveIt**. GoLiveIt es quien vende: cobra, emite la factura y atiende al cliente |
| **Contrato del viajero** | Con el proveedor | Con el proveedor | **Con GoLiveIt** (y GoLiveIt con el proveedor) |
| **Técnica** | APIs de precios (en caché o en vivo), normalización y deduplicación; mucho tráfico de búsquedas | Enlaces con identificador, widgets y, como mucho, APIs de contenido; **lo más sencillo** | Disponibilidad en tiempo real, tarificación, reserva y cancelación, pagos con autenticación reforzada (PSD2), PCI DSS, conciliación, devoluciones, contracargos, atención al cliente y certificaciones de cada API |
| **Comercial** | Exige mucho tráfico; las APIs de Skyscanner o Kiwi están cerradas a los pequeños | Abierta, pero con **comisiones bajas** (1-10 %), pagos aplazados (cuando acaba la estancia o la actividad) y riesgo de baja (recorte de Booking en 2025, cláusula de menores de Civitatis) | Margen mayor (precio neto + recargo), pero con **capital circulante**, riesgo de impago y fraude, y contratos con volumen mínimo |
| **Legal en España** | Prestador de servicios de la información (LSSI). Responde de **su propia** información | Igual que el metabuscador, con matices: cookies de seguimiento (LSSI, art. 22.2) y obligación de transparencia publicitaria. Con la norma actual hay riesgo de **servicio de viaje vinculado** si se facilita de forma específica un segundo servicio para el mismo viaje en 24 horas (Directiva 2015/2302, art. 3.5) | **Agencia de viajes**: minorista u organizador, y casi seguro **organizador de viaje combinado** si junta transporte y alojamiento. Inscripción en el Registro de Turismo de Andalucía, garantía de responsabilidad y de insolvencia, y responsabilidad por todo el viaje |
| **Encaje con GoLiveIt** | Bajo: no tenemos tráfico y el valor no está en comparar precios | **Alto para el MVP** si el flujo va dirigido al **adulto** | Solo en una fase avanzada y con una **agencia socia** (I-04) |

Etiquetas: definiciones `CONOCIMIENTO PREVIO`; el art. 3.5 de la Directiva 2015/2302, `VERIFICADO`; la valoración, `INFERIDO`.

**Matiz importante:** las cuatro fases del apartado 8 de la [[Propuesta individual v0]] (enlace → afiliación → acuerdos directos → reserva) encajan con esta tabla. **El salto legal no está entre enlace y afiliación, sino entre afiliación y cobrar nosotros.** `INFERIDO`

---

## 3 Implicaciones legales en España

> Lo que sigue son **preguntas bien planteadas para el abogado** (H-17, Q-16), no conclusiones.

### 3.1 Agencia de viajes y viaje combinado

- **Norma vigente hoy:** Libro IV del TRLGDCU (RDL 23/2018), que transpone la Directiva 2015/2302 (ver [[Marco legal del negocio]]).
  - Es **viaje combinado** el caso de servicios contratados con distintos empresarios «a través de procesos de reserva en línea conectados» en los que el nombre del viajero, sus datos de pago y su correo «son transmitidos» al segundo empresario, con el que se contrata «a más tardar 24 horas después» de la primera confirmación (art. 3.2.b.v). `VERIFICADO` (EUR-Lex)
  - Es **servicio de viaje vinculado** facilitar «de manera específica» la contratación de otro servicio con un tercero en 24 horas (art. 3.5). Un afiliado que muestra «tu albergue + tu tren» para el mismo viaje y cobra comisión por ambos **podría** encajar. Las obligaciones del facilitador son, sobre todo, de **información**, más la garantía de insolvencia **si cobra pagos**. `VERIFICADO` (definición) / `INFERIDO` (aplicación a GoLiveIt)
- **Norma futura: Directiva (UE) 2026/1024.** Transposición antes del 29/09/2028; aplicación desde el 29/03/2029. `VERIFICADO`
  - **Suprime los servicios de viaje vinculados** (desaparecen el art. 3.5 y el anexo II).
  - **Nuevo art. 5 bis:** quien **invite** al viajero a contratar un servicio adicional para el mismo viaje debe avisar, en ese momento y de forma destacada, de que no constituirán un viaje combinado. Si no avisa y el pago del segundo servicio se hace **en el mismo punto de venta en 24 horas**, el empresario «se considerará el organizador».
  - Según el considerando 8, la mera disponibilidad de sistemas de reserva o la publicidad genérica **no** es invitación; una oferta con características y precio **sí** es un indicio sólido. Un correo con un enlace puede ser invitación.
  - **Consecuencia de diseño (`INFERIDO`):** cada vez que GoLiveIt sugiera «añade el albergue a tu plan», debe mostrar el aviso de que **no es un viaje combinado** y **nunca** cobrar ni transmitir los datos del viajero al proveedor.
- **Andalucía:** si GoLiveIt cobrara y vendiera, sería agencia, con inscripción en el Registro de Turismo de Andalucía mediante declaración responsable y garantía. `SECUNDARIA` (ver [[Marco legal del negocio]]). Alternativa: actuar como **agente comercial de una agencia socia** que sea la organizadora (I-04). `INFERIDO`

### 3.2 Responsabilidad si una reserva se rechaza por edad

| Escenario | Afiliación (reserva el adulto en la web del proveedor) | Marketplace u organizador |
|---|---|---|
| El albergue no deja entrar a un grupo de 16 años | El contrato es entre el adulto y el proveedor. GoLiveIt responde **de la información que publicó** («acepta menores»). Es contenido propio, así que no le protege la exención de la LSSI para enlaces (art. 17). Podría haber responsabilidad civil (CC, art. 1902) o práctica engañosa (Ley 3/1991, art. 5) | El organizador responde de **todos** los servicios del viaje frente al viajero: debe buscar una alternativa, reembolsar y, en su caso, indemnizar (TRLGDCU, Libro IV; numeración exacta por verificar en el BOE) |
| El menor, a 300 km de casa y sin alojamiento | Riesgo reputacional máximo (H-19); la única defensa es la **procedencia** de cada dato (fuente, fecha y método) y el aviso de «no verificado» | Además, obligación de **asistencia** al viajero en dificultades |

Etiquetas: artículos citados de memoria, `CONOCIMIENTO PREVIO`; aplicación, `INFERIDO`. **Pregunta para el abogado:** ¿basta un aviso legal para limitar la responsabilidad por un dato verificado que luego cambia?

### 3.3 Contratación con menores (CC, art. 1263)

- Los menores no emancipados solo pueden contratar lo que la ley les permita y lo relativo a «bienes y servicios de la vida corriente propios de su edad de conformidad con los usos sociales» (redacción de la Ley 8/2021). `SECUNDARIA` (vLex) + `CONOCIMIENTO PREVIO`; **falta leerlo en el BOE.**
- Un contrato fuera de ese ámbito es, en principio, **anulable** a instancia de los representantes (CC, arts. 1301-1302). `CONOCIMIENTO PREVIO`
- **Para un marketplace:** vender un viaje de 200-400 € a un menor de 16-17 años expone a anulaciones, devoluciones y contracargos. **Para la afiliación:** el problema lo resuelven los propios proveedores, porque Booking, Hostelworld y BlaBlaCar exigen 18 años para reservar. `VERIFICADO` (condiciones) / `INFERIDO` (consecuencia)
- **Diseño:** el menor **planifica** y el adulto **contrata y paga**. Coincide con H-14 y con el flujo de la [[Propuesta individual v0]].

### 3.4 Pagos y KYC

- **Afiliación:** GoLiveIt **no toca el dinero del viaje**. Solo cobra comisiones como empresa, lo que exige darse de alta como autónomo o crear una entidad para facturar; Civitatis, por ejemplo, autofactura. Las redes exigen titulares **mayores de 18 años**: Awin lo pide en sus condiciones. `OFICIAL-INDIRECTO` (Awin) / `VERIFICADO` (Civitatis)
- **Marketplace:** cobrar a los padres y pagar a los proveedores es, en la práctica, **un servicio de pago para terceros**. O se usa una pasarela con licencia (estilo marketplace, donde la pasarela hace el KYC de GoLiveIt y de los cobros), o se cae en la reserva de actividad del RDL 19/2018. Hacen falta autenticación reforzada (PSD2), PCI DSS (con formularios alojados basta el nivel mínimo) y la gestión de contracargos. **«Hacer bote» entre amigos (H-06) es justo lo más delicado.** `CONOCIMIENTO PREVIO` + `INFERIDO`
- **Duffel:** pide datos de empresa para cumplir con «reguladores y socios financieros» antes de dar claves de producción. `SECUNDARIA`

### 3.5 Protección de datos de menores

- **Consentimiento:** a partir de los 14 años (LOPDGDD, art. 7; RGPD, art. 8). `CONOCIMIENTO PREVIO`
- **Evaluación de impacto (RGPD, art. 35):** muy probable, porque hay personas vulnerables, ubicación y documentos de identidad. `INFERIDO`
- **Cookies de afiliación:** son de seguimiento y publicidad, así que **requieren consentimiento previo** (LSSI, art. 22.2; guía de la AEPD). Civitatis lo exige por contrato. Hay que decidir si se muestran enlaces de afiliación a menores de 16 o solo al adulto. `VERIFICADO` (Civitatis) / `INFERIDO`
- **DSA, art. 28:** una plataforma accesible a menores debe garantizar un nivel alto de privacidad y seguridad, y **no puede mostrarles publicidad basada en perfiles**. Los enlaces de afiliación contextuales probablemente no lo son, pero no hay que perfilar. `CONOCIMIENTO PREVIO` / `INFERIDO`
- **Si GoLiveIt intermediara en alojamiento:** el RD 933/2021 también afecta a las plataformas de intermediación en hospedaje (registro y comunicación de datos de viajeros, parentesco con menores). **Otra razón para no ser marketplace al principio.** `CONOCIMIENTO PREVIO`; verificar en el BOE (Q-08)
- **Mínimo de datos al proveedor:** con afiliación no se transmite nada. Con API de reserva, lo que pida cada una (Viator pide la edad exacta de cada viajero). `VERIFICADO` (Viator)

---

## 4 Políticas de edad: ¿de dónde salen?

### 4.1 Qué dan las APIs (y qué no)

| Fuente | Campo | Qué responde | Qué **no** responde | Acceso para GoLiveIt | Etiqueta |
|---|---|---|---|---|---|
| Booking.com Demand API | `policies.minimum_guest_age`, `minimum_checkin_age` | Si admite menores (acompañados) y la edad mínima del check-in | Si acepta **grupos** de 16-17 sin adultos, qué autorización pide o si la aplica de verdad | 🔴 Afiliados gestionados | `VERIFICADO` |
| Expedia Rapid | `checkin.min_age`, `policies`, `know_before_you_go` | Edad mínima del check-in; reglas en texto libre | Igual que la anterior; además, mucho texto libre | 🔴 Contrato | `VERIFICADO` |
| Viator | `ageBands` (franjas por producto), `requiresAdultForBooking` | Si una franja (p. ej. YOUTH de 13-17) puede reservar **sin adulto** | Si el operador lo aplica in situ o qué documento pide | 🟢 Basic Access | `VERIFICADO` |
| GetYourGuide | `age_range`, `independently_bookable` | Lo mismo que Viator | Lo mismo | 🟡 Clave del Partner Manager | `SECUNDARIA` |
| Ticketmaster | `family`, `venue.generalInfo.childRule` (texto) | Señal de público familiar y norma del recinto en texto libre | Edad mínima estructurada (sin confirmar) | 🟢 | `VERIFICADO` / `SECUNDARIA` |
| Duffel | Edad de cada pasajero menor de 18 | Tarifa por edad | Si la aerolínea deja volar solo a un menor de 16 | 🟡 | `VERIFICADO` |
| Renfe GTFS, FlixBus, Omio, Trainline, Hostelworld, Civitatis, Tiqets, Fever | — | Nada sobre menores en lo consultado | Todo | — | `INFERIDO` (no documentado) |

**Conclusión:** solo **Booking.com Demand API** y **Expedia Rapid** exponen de forma estructurada la **edad mínima de check-in**, y ninguna de las dos está a nuestro alcance. **Viator** es la única fuente **abierta hoy** con un campo estructurado útil (franjas de edad + «requiere adulto»), y solo para actividades. Incluso el mejor campo (`minimum_checkin_age = 16`) **no basta para decir «verificado»**:

1. La plataforma exige que **reserve un adulto** (Booking, A4.6).
2. El RD 933/2021 obliga a registrar el parentesco, y algunos alojamientos piden **autorización escrita** de los padres (albergues de Castilla y León, ver [[Proveedores - alojamiento]]).
3. Los datos los rellena cada alojamiento y pueden estar desactualizados o contradecir su web (E-03).

### 4.2 Propuesta: base propia + señales de API

- **Base propia:** es la fuente de verdad. Cada regla lleva proveedor, servicio, condición, requisito, fuente, método, fecha de verificación, caducidad y confianza (el modelo del apartado 6 de la [[Propuesta individual v0]]). El «oro» es una **confirmación escrita del proveedor**: un correo que diga «aceptamos grupos de 16-17 con autorización firmada».
- **Las señales de API solo sirven para descartar rápido o para priorizar:**
  - `minimum_guest_age` ≥ 18 o `requiresAdultForBooking = true` → «No permitido» casi seguro, y ahorra verificar a mano.
  - Una franja YOUTH reservable sin adulto → candidata que **hay que verificar**.
  - Un campo que cambia → aviso de reverificación.
- **Automatizable:** vigilar cambios en las páginas de condiciones (comparar versiones), que la IA **proponga** reglas leyendo las condiciones (siempre con validación humana) y los avisos de caducidad.

### 4.3 Estimación del esfuerzo de mantenimiento (`INFERIDO`; medirlo en la fase 1 para validar H-18)

Supuestos:
- **Verificación inicial:** 30-45 minutos por regla (leer condiciones, buscar contradicciones, enviar un correo y registrar la respuesta) y **varios días de espera** a que conteste el proveedor.
- **Reverificación cada 90 días:** 10-15 minutos si no cambia y unos 30 minutos si cambia (H-20).

| Alcance | Reglas | Alta inicial | Mantenimiento |
|---|---|---|---|
| MVP Andalucía: 15 operadores de transporte, 40 alojamientos, 20 actividades | ~75 | **45-55 h** | **15-20 h por trimestre** (~1,5 h a la semana) |
| Crecimiento: varias comunidades autónomas y Portugal | ~500 | ~300-350 h | ~110-130 h por trimestre (~**0,25 personas a jornada completa**) |

- **Los alojamientos son lo caro:** cada uno es una regla distinta. En transporte, en cambio, 15 operadores cubren casi todo.
- El riesgo no está en las horas, sino en **una regla caducada que se muestra como válida**. Por eso, al caducar, la regla pasa sola a «no verificado».

---

## 5 Propuesta por fases y modelo de ingresos

| Fase | Qué se construye | Proveedores | Ingresos | Requisitos y coste | Criterio para pasar de fase |
|---|---|---|---|---|---|
| **0. Demo (ahora; sin APIs)** | La demo actual con datos estáticos: 30-50 proveedores verificados a mano y **enlaces normales** (sin afiliación) a la web oficial | Ninguna integración | **Ninguno.** Como mucho, una **señal o preventa** de los padres (H-15, M10) | 0 €; horas de verificación (medirlas, H-18) | Respuesta de la encuesta (M1, M2, M7) y algún padre que pague una señal |
| **1. MVP (afiliación + base propia)** | Web adaptada a móvil, base de reglas con caducidad, enlace de aprobación para padres. **El enlace de compra aparece en la vista del adulto**, con el aviso de que «no es un viaje combinado» | Hostelworld, Booking.com (CJ), Omio o Trainline, FlixBus (Awin), Viator (enlaces + Basic Access para leer franjas de edad), Civitatis o GetYourGuide, Fever. Opcional: una sola red (Travelpayouts) para simplificar | 1) **Cuota a los padres por el «plan verificado»** (la hipótesis principal); 2) comisiones de afiliación como complemento; 3) piloto con institutos o asociaciones juveniles | Titular mayor de 18 años y alta fiscal para cobrar comisiones; consulta jurídica (H-17); evaluación de impacto; política de cookies. Coste técnico casi nulo | X viajes reales con pago de los padres y una tasa de alojamiento rechazado por edad cercana a cero |
| **2. Crecimiento (APIs con disponibilidad)** | Mostrar precio y disponibilidad reales; prefiltrar con las señales de API; acuerdos directos con albergues (autorización estándar, H-16) | Viator Full, Tiqets (contenido y disponibilidad), GetYourGuide READ, Ticketmaster Discovery (eventos), Omio o FlixBus API si aceptan; Duffel solo si entran viajes en avión | Comisiones con más conversión + cuota o suscripción de familias + **pago de los alojamientos por grupo recibido** (H-16) + acuerdos institucionales | Empresa constituida; integración y certificación de cada API (unas semanas cada una para un equipo a tiempo parcial); revisar la transposición de la Directiva 2026/1024 antes de 2029 | Volumen suficiente para pedir los niveles de reserva (p. ej., Tiqets: ~200 pedidos al mes) |
| **3. Reserva integrada (opcional)** | Cobro en la app y paquete «transporte + alojamiento» | APIs de reserva y pasarela de pagos | Margen sobre el precio neto | **Agencia socia** como organizadora, o licencia propia con garantías | Solo si la fase 2 demuestra demanda y margen |

Etiquetas: el diseño de las fases, `INFERIDO`; los requisitos de cada proveedor, ver el apartado 1.

### 5.1 Números de la afiliación (`INFERIDO`, orden de magnitud)

Supuesto: grupo de 4 jóvenes, 2 noches en albergue a 25 € por persona y noche (200 €), una actividad de 30 € por persona (120 €) y tren a 40 € por persona (160 €).

| Concepto | Base | Tasa supuesta | Comisión |
|---|---|---|---|
| Alojamiento (Booking u Hostelworld) | 200 € | ~4-6 % efectivo | 8-12 € |
| Actividad (Viator o Civitatis) | 120 € | 8 % (`VERIFICADO`) | ~9,6 € |
| Transporte (Omio, Trainline o Rail Europe) | 160 € | ~1-2 % | 2-3 € |
| **Total por viaje de grupo** | 480 € | | **~20-25 €**, es decir, **5-6 € por viajero** |

- Para ingresar **1.000 € al mes** harían falta unos **40-50 viajes de grupo al mes**, y los jóvenes viajan pocas veces al año (riesgo n.º 1 de la [[Propuesta individual v0]]).
- Además, las comisiones se cobran **después** de la estancia y algunas tienen pago mínimo (Civitatis: 50 €).
- **Conclusión crítica:** la afiliación **paga parte del servidor, no el equipo**. El modelo que puede sostenerse es **cobrar a los padres por la tranquilidad** (H-15) o **a las instituciones**, con la afiliación como complemento. Si la fase 0 no consigue que ningún padre pague una señal, **no merece la pena programar la fase 1**.

### 5.2 Viabilidad para un equipo de estudiantes

- **Lo realista:** las fases 0 y 1. Son enlaces y una base de datos que un equipo pequeño puede construir con herramientas sencillas.
- **Lo que no lo es:**
  - Contratos B2B (Booking Demand, Expedia Rapid, Hotelbeds, Distribusion, Trainline B2B), que piden empresa, volumen y certificaciones.
  - Ser comercio, que requiere agencia, garantías, pagos y atención al cliente cuando hay incidencias.
- **Cuello de botella real:** no es la tecnología, sino **las horas de verificación** y la **disciplina de reverificar**. Si nadie del equipo puede dedicar 1,5 h a la semana de forma estable, la base se degrada y aparece el riesgo H-19.
- **Edad del propio equipo:** las cuentas de afiliación, la pasarela de pagos y la facturación tienen que estar a nombre de **una persona mayor de edad o de una entidad**. `OFICIAL-INDIRECTO` (Awin) / `INFERIDO` (resto)

---

## 6 Riesgos

| # | Riesgo | Prob. | Impacto | Mitigación | Hipótesis |
|---|---|---|---|---|---|
| R1 | **Baja de programas de afiliación** por ser una web «dirigida a menores» (cláusula de Civitatis) o por ser un afiliado pequeño (Booking, 2025) | Media | Alto | Presentar GoLiveIt como herramienta **para familias**; enlaces solo en la vista del adulto; preguntar a cada programa por escrito antes de integrarlo; no depender de uno solo | H-17 |
| R2 | Un dato de edad erróneo deja a un menor sin alojamiento | Media | Muy alto | Procedencia y caducidad, «no verificado» por defecto, confirmación escrita del proveedor, plan B en cada viaje | H-19, H-20 |
| R3 | Convertirse en organizador sin quererlo (invitación sin aviso o transmisión de datos al proveedor) | Baja con afiliación pura | Muy alto | No cobrar ni transmitir datos; aviso de «no es viaje combinado» en cada sugerencia; consulta jurídica antes del MVP | H-17 |
| R4 | Ingresos de afiliación insuficientes | Alta | Alto | Cuota a padres e instituciones; medir M10 antes de programar | H-14, H-15 |
| R5 | Cierre o cambio de APIs (Amadeus Self-Service en 2026, Kiwi en 2024, búsqueda de Eventbrite en 2020, BlaBlaCar Bus en 2026) | Alta a 2-3 años | Medio | Capa propia de abstracción; enlaces como alternativa; no construir el producto sobre una sola API | — |
| R6 | Coste de mantener la base mayor del estimado | Media | Alto | Medir horas desde la fase 0; limitar el alcance geográfico; automatizar la detección de cambios | H-18 |
| R7 | Incumplimiento de cookies o datos de menores (seguimiento de afiliación sin consentimiento) | Media | Medio-alto | Banner con rechazo por defecto, evaluación de impacto, datos mínimos, nada de perfiles | — |
| R8 | Transposición de la Directiva 2026/1024 más estricta en España (margen nacional) | Media | Medio | Seguir la consulta de Consumo (julio de 2026) y revisar el modelo en 2028 | H-17 |
| R9 | Las condiciones de los proveedores (18 años para reservar) hacen imposible que reserve el joven | Ya ocurre | Medio | Es la base del diseño: el adulto reserva (H-14) | H-14 |

---

## 7 Fuentes

Todas consultadas el **08/11/2026**.

### Vuelos
- Duffel, precios: https://duffel.com/pricing `VERIFICADO`
- Duffel, edad de pasajeros menores de 18 (04/03/2020): https://changelog.duffel.com/announcements/you-should-now-give-the-age-of-passengers-under-18-when-creating-an-offer-request `VERIFICADO`
- Duffel, activación con datos de empresa: https://help.duffel.com/hc/en-gb/articles/360019685959 `SECUNDARIA` (solo fragmento del buscador; la página bloqueó la lectura)
- Duffel Links: https://duffel.com/docs/guides/duffel-links y https://help.duffel.com/hc/en-gb/articles/10092977166226 `OFICIAL-INDIRECTO`
- Duffel, normativa para vender viajes (blog, 2022): https://www.duffel.com/blog/start-a-travel-business-regulations `VERIFICADO`
- Amadeus Self-Service, cierre: https://www.phocuswire.com/amadeus-shut-down-self-service-apis-portal-developers · https://www.phocuswire.com/news/technology/amadeus-anthropic-claude-developers-travel-sellers · https://www.businesstravelnews.com/Technology/Amadeus-Partners-with-Anthropic-for-Tool-Integration-Developer-Access `SECUNDARIA`. El portal oficial (https://developers.amadeus.com) no devolvió texto legible.
- Kiwi.com, Tequila solo por invitación (30/05/2024): https://media.kiwi.com/articles-and-interviews/better-for-business-kiwi-com-takes-a-new-approach-to-partnerships/ `VERIFICADO`
- Skyscanner, servicios y límites de la Travel API: https://skyscannerpartnersupport.zendesk.com/hc/en-us/articles/4687312848797-Which-services-can-I-access-and-what-are-the-rate-limits `VERIFICADO`
- Travelpayouts, requisitos de la API de Aviasales: https://support.travelpayouts.com/hc/en-us/articles/203956083-Requirements-for-Aviasales-data-API-access `OFICIAL-INDIRECTO`
- Travelpayouts, marcas con API: https://support.travelpayouts.com/hc/en-us/articles/20384016664594 `OFICIAL-INDIRECTO`
- Google QPX Express, cierre: https://www.pymnts.com/?p=431655 `SECUNDARIA`

### Trenes y autobuses
- Renfe, datos abiertos: https://datos.gob.es/es/iniciativas/renfe-data `OFICIAL-INDIRECTO`
- Trainline, afiliados: https://www.thetrainline.com/about-us/partnerships/affiliates `VERIFICADO`
- Trainline, modelo de negocio B2B: https://www.trainlinegroup.com/what-we-do/business-model `OFICIAL-INDIRECTO`
- Omio, afiliados: https://www.omio.co.uk/affiliate `OFICIAL-INDIRECTO` (403 al abrirla); comisión: https://www.travelpayouts.com/en/offers/omio-affiliate-program `SECUNDARIA`
- FlixBus, afiliados: https://www.flixbus.com/company/partners/affiliate-partners `VERIFICADO`
- Rail Europe: https://travelpayouts.com/en/offers/raileurope-affiliate-program · https://railwaynews.net/rail-europe-launches-api-targeting-42-long-haul-europe-travelers.html `SECUNDARIA`
- BlaBlaCar, condiciones (vigentes desde el 15/06/2026): https://legal.blablacar.com/en-gb/terms-and-conditions/ `VERIFICADO`
- BlaBlaCar Bus, cierre: https://newmobility.news/en/2026/04/22/blablacar-is-shutting-down-its-bus-division-in-france/ · https://www.connexionfrance.com/news/blablacars-intercity-coach-service-to-shut-in-france/788230 `SECUNDARIA`
- Distribusion, API para revendedores: https://docs.distribusion.com/dt/api/getting-started/intro · https://docs.distribusion.com/dt/api/getting-started/accreditation/criteria `OFICIAL-INDIRECTO`

### Alojamiento
- Booking.com, afiliación vía CJ: https://www.booking.com/affiliate-program/v2/index.html `VERIFICADO`
- Booking.com, recorte de afiliados (2025): https://skift.com/2025/05/30/why-booking-com-cut-thousands-of-affiliate-partners-and-what-comes-next/ `SECUNDARIA`
- Booking.com Demand API, políticas de niños: https://developers.booking.com/demand/docs/accommodations/child-policies `VERIFICADO`
- Booking.com Demand API, requisitos de acceso: https://developers.booking.com/demand/docs/getting-started/try-out-the-api `VERIFICADO`
- Booking.com, condiciones al cliente (versión del 15/09/2025): https://www.booking.com/content/terms.en-gb.html `VERIFICADO`
- Expedia Rapid, requisitos de lanzamiento: https://developers.expediagroup.com/rapid/setup/launch-requirements/lodging-launch-reqs `VERIFICADO`
- Expedia Rapid, cómo hacerse socio: https://partner.expediagroup.com/en-gb/solutions/build-your-travel-experience/rapid-api `VERIFICADO`
- Expedia Travel Creator Program: https://creator.expediagroup.com/ `SECUNDARIA`
- Hostelworld, preguntas frecuentes de afiliados: https://partners.hostelworld.com/faqs `VERIFICADO`
- Hostelworld, soluciones (API caso a caso): https://partners.hostelworld.com/solutions `VERIFICADO`
- Hostelworld, condiciones: https://www.hostelworld.com/hosteltermsandconditions/ `VERIFICADO`
- Hotelbeds, portal de desarrolladores: https://developer.hotelbeds.com/ `OFICIAL-INDIRECTO`
- Airbnb, API cerrada: https://www.bnbcalc.com/help/articles/does-airbnb-have-an-api `SECUNDARIA`

### Actividades y eventos
- GetYourGuide Partner API (wiki oficial): https://github.com/getyourguide/partner-api-spec/wiki/Home `VERIFICADO`
- GetYourGuide, campos de edad (réplica del repositorio oficial): https://context7.com/getyourguide/partner-api-spec `SECUNDARIA`
- GetYourGuide en Awin: https://ui.awin.com/merchant-profile/77814 `SECUNDARIA`
- Viator, afiliados: https://partnerresources.viator.com/travel-commerce/affiliate/ `VERIFICADO`
- Viator, franjas de edad y combinación de viajeros: https://partnerresources.viator.com/travel-commerce/merchant/agebands-pax-mix `VERIFICADO`
- Viator, 8 %: https://partnerresources.viator.com/ `OFICIAL-INDIRECTO`
- Civitatis, condiciones generales de afiliados: https://www.civitatis.com/es/afiliados/condiciones_generales_afiliados/ `VERIFICADO`
- Tiqets, programa de API: https://www.tiqets.com/en/partner-program/api-program/ `VERIFICADO`
- Tiqets en Awin (EE. UU.): https://ui.awin.com/merchant-profile/12428 `SECUNDARIA`
- Ticketmaster Discovery API v2: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ `VERIFICADO` (lectura parcial)
- Ticketmaster, modelo de evento en un SDK de terceros: https://docs.rs/crate/ticketmaster-rs/latest/source/src/models/event.rs `SECUNDARIA`
- Fever, afiliados: https://business.feverup.com/en/partner-programs/affiliate-program/ `VERIFICADO`
- Fever, distribución: https://business.feverup.com/en/partner-programs/experience-distribution-platform/ `OFICIAL-INDIRECTO`
- Eventbrite, cierre de la búsqueda: https://groups.google.com/g/eventbrite-api/c/FT2MsDswdrA · https://www.eventbrite.co/platform/docs/changelog `OFICIAL-INDIRECTO`

### Redes de afiliación
- Awin, condiciones para afiliados (ES, agosto de 2025; 18 años o más): https://www.awin.com/docs.awin.com/Legal/Publisher+Terms/2025/ES_Awin-AG-Publisher-terms_August-2025.pdf `OFICIAL-INDIRECTO`

### Normativa
- Directiva 2015/2302 (art. 3.2.b.v y 3.5): https://eur-lex.europa.eu/legal-content/ES/TXT/HTML/?uri=CELEX:32015L2302 `VERIFICADO`
- Directiva (UE) 2026/1024 (art. 5 bis, supresión de los servicios de viaje vinculados, plazos): https://eur-lex.europa.eu/legal-content/ES/TXT/HTML/?uri=CELEX:32026L1024 `VERIFICADO`
- Código Civil, art. 1263 (redacción de la Ley 8/2021): https://vlex.es/vid/veintinueve-modifica-articulo-1263-753077773 `SECUNDARIA`; pendiente de leer en el BOE: https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763
- TRLGDCU, Libro IV, y garantías: https://www.consumoresponde.es/art%C3%ADculos/viajes_combinados_y_servicios_de_viajes `SECUNDARIA`
- Sin abrir hoy (`CONOCIMIENTO PREVIO`): LOPDGDD art. 7, RGPD arts. 8 y 35, LSSI arts. 17 y 22.2, DSA art. 28, RDL 19/2018, RD 933/2021, CC arts. 1301-1302 y 1902, Ley 3/1991 art. 5.

## Pendiente (para [[Dudas pendientes]])

- Preguntar por escrito a Civitatis, Hostelworld, Viator y Booking (vía CJ) si aceptan una web **para familias de jóvenes de 16-17** (R1).
- Comprobar si las condiciones al cliente de Viator, GetYourGuide y Civitatis exigen 18 años para reservar.
- Comprobar con una clave de prueba (cuando se decida crearla) si Ticketmaster Discovery cubre España y si devuelve `ageRestrictions`.
- Llevar al abogado: el art. 5 bis, los servicios de viaje vinculados con la norma actual, la responsabilidad por información verificada, el art. 1263 y la fiscalidad de las comisiones.
