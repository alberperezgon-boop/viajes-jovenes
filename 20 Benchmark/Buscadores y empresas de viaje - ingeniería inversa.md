---
tipo: benchmark
fecha: 2026-11-11
metodo: "Ingeniería inversa funcional de caja negra con fuentes públicas: centros de ayuda, términos de uso, páginas de producto, blogs y notas de prensa oficiales, fichas de App Store y documentación pública de APIs. Unas 45 cargas de página y búsquedas web a ritmo humano. Sin cuenta, sin sesión, sin APIs ni endpoints internos, sin leer bundles JS, sin scraping, sin datos personales."
productos: [Skyscanner, Google Flights, KAYAK, Kiwi.com, Hopper, Omio, Trainline, Hostelworld, DiscoverEU, Interrail, Polarsteps, Wanderlog, Lambus, Splitwise, Tricount, Contiki, StudentUniverse]
complementa: "[[Alternativas actuales y competidores]], [[Integración de proveedores y marketplace]], [[Proveedores - transporte]], [[Corner - ingeniería inversa v2]], [[Benchmark UX-UI]]"
---

# Buscadores y empresas de viaje: ingeniería inversa funcional

> **Etiquetas.** `CONFIRMADO` = lo dice una fuente pública directa. Entre corchetes va la fuerza: **[p]** página oficial leída entera, **[e]** texto oficial visto solo en el extracto del buscador (la página no cargó sin JavaScript o devolvió un error), **[s]** fuente secundaria (prensa o blog de terceros). `INFERIDO` = hipótesis razonada, con la evidencia al lado. `PROPUESTO` = idea para GoLiveIt. `PENDIENTE` = no se encontró o no se pudo comprobar.
> **Fechas.** Todas las fuentes se consultaron el **11/11/2026**, salvo las marcadas «(08/11)», que vienen de [[Integración de proveedores y marketplace]]. Las referencias **[F#]** remiten a la tabla de fuentes del final (§ 9).
> **Equivalencias con [[Evidencias]]:** CONFIRMADO[p] = VERIFICADO; CONFIRMADO[e] y [s] = SECUNDARIA; INFERIDO = HIPÓTESIS.

## 0. Resumen ejecutivo

1. **Ninguno de los grandes está pensado para menores, y casi todos fijan la edad en sus términos.** KAYAK pide 18 años para cuenta y reserva [F16]; Wanderlog, 18 [F47]; Skyscanner dice que sus servicios «no están destinados a menores de 18» [F5]; Hostelworld deja *usar* la web desde los 16 pero *reservar* solo desde los 18 [F37]; Hopper y Polarsteps empiezan en 16 [F23][F45]; Splitwise, en 13 [F50]; una cuenta de Google en España, en 14 [F4]. `CONFIRMADO`. **Lectura:** el modelo de GoLiveIt (el joven planifica, el adulto reserva y paga) **va a favor del sector**. No es un parche.
2. **El mayor riesgo para un menor está en el producto estrella de Kiwi.com.** Kiwi deja reservar solo a un menor si la aerolínea lo permite (Ryanair, 16 años; easyJet, 13) [F17], y sus condiciones no fijan una edad mínima para el comprador [F20]. Su gancho es el **transbordo por cuenta propia**: en él, el viajero recoge y vuelve a facturar las maletas, pasa los controles otra vez y, si pierde la conexión, la aerolínea «solo le ayuda con los vuelos de su reserva» [F19]. KAYAK hace algo parecido con los *Hacker Fares* (dos billetes de ida) [F14]. `CONFIRMADO`. **GoLiveIt debe bloquear esto por defecto** para menores.
3. **Los precios de «explorar», «el mes más barato» o el «precio típico» salen de cachés de precios ya vistos, no de búsquedas en vivo.** La API de Skyscanner usa una caché de precios con hasta 4 días de antigüedad, pensada «para comparar un mes entero o varios destinos» [F9]. Google calcula el «precio típico» como la **mediana de los precios más baratos de los últimos 12 meses** en esa ruta [F1]. KAYAK Explore enseña los precios más bajos de las últimas 48 horas [F15]. `CONFIRMADO`. **Lectura:** estas funciones se pueden **simular con honestidad** en el prototipo (con datos de ejemplo marcados como tales) y alimentar después con una caché abierta (Travelpayouts/Aviasales). No necesitan una API cerrada.
4. **Lo «social» de Hostelworld no encaja con 16-17 años.** Sus chats del hostal y de la ciudad, los *Linkups* y el «ver quién se aloja» ponen en contacto con **adultos desconocidos** [F35][F36]. No se ha encontrado una regla de edad específica para el chat (`PENDIENTE`). La versión segura para GoLiveIt es un **chat solo del propio grupo** más actividades verificadas.
5. **Lo más útil para padres no está en los buscadores, sino en los planificadores.** Tres ideas: los niveles de privacidad por viaje de Polarsteps (solo yo, amigos y familia, público), con seguidores que **no necesitan cuenta** [F46]; los gastos en grupo de Splitwise, Tricount y Lambus [F50][F52][F49]; y los documentos del viaje sin conexión de Lambus [F49].
6. **El calendario joven ya existe y lo publica Bruselas.** DiscoverEU da pases de tren a quien cumple 18. La ronda de otoño de 2026 fue del 1 al 15/10/2026, para nacidos en 2008, con viajes del 1/03/2027 al 31/05/2028 [F39]. El pase Interrail Youth sirve **de 12 a 27 años** [F41]. `CONFIRMADO`. Es contenido barato y muy valioso para un público de 16-17 años.

## 1. Mapa rápido: edad mínima según los términos de cada producto

| Producto | Usar el servicio | Reservar o comprar | ¿Deja viajar solo a menores? | Etiqueta |
|---|---|---|---|---|
| Skyscanner | «No destinado a menores de 18»; nadie menor de 18 puede aportar información [F5] | Se reserva con el proveedor (`INFERIDO`) | Lo decide el proveedor | `CONFIRMADO[e]` |
| Google Flights | Buscar no requiere cuenta. Para seguir precios hace falta iniciar sesión [F3]. Cuenta propia en España: **14** [F4] | Con la aerolínea o la agencia | Lo decide el proveedor | `CONFIRMADO[p]` |
| KAYAK | **18** para cuenta y funciones de reserva (EE. UU.); KAYAK Europe (kayak.fr): 18 y capacidad para contratar [F16] | Con el proveedor [F13]; *Book with KAYAK*: 18 [F16] | Lo decide el proveedor | `CONFIRMADO[e]` |
| Kiwi.com | Sus condiciones **no fijan edad** [F20] | Un menor puede reservar solo si la aerolínea lo deja [F17] | Sí: Ryanair 16, Wizz 14, easyJet 13, Iberia 12, Vueling 16 en Kiwi [F17] | `CONFIRMADO[p]` |
| Hopper | **16**, o la mayoría de edad local si es mayor (cl. 1.2) [F23] | Igual | `PENDIENTE` | `CONFIRMADO[p]` |
| Omio | `PENDIENTE` (la página de términos devolvió 403) | Se aplican también las condiciones de cada operador [F29] | Según el operador; p. ej. FlixBus, sin restricciones desde los 15 ([[Proveedores - transporte]]) | `PENDIENTE` |
| Trainline | `PENDIENTE` (no se encontraron sus términos generales). En una web de venta que opera Trainline: 16+, y de 16 a 17 con consentimiento de los padres [F33] | Igual | Según el operador | `CONFIRMADO[e]` (solo ese caso) |
| Hostelworld | **16** (cl. 1.1) [F37] | **18** (cl. 4.1) [F37] | Depende del hostal | `CONFIRMADO[p]` |
| DiscoverEU | Hay que tener 18: nacidos en 2008 en la ronda de otoño de 2026 [F39] | Gratis (pase de tren) | Los ganadores ya son mayores de edad | `CONFIRMADO[p]` |
| Interrail | Pase Youth de 12 a 27 años [F41] | `PENDIENTE` (edad del comprador) | Los menores de 12 que viajan solos necesitan pase Youth propio; el adulto acompañante debe tener 18 [F42] | `CONFIRMADO[e]` |
| Polarsteps | **16** [F45] | 18 para comprar productos (libros) [F45] | — | `CONFIRMADO[p]` |
| Wanderlog | **18** (sec. 10 y 11) [F47] | — | — | `CONFIRMADO[p]` |
| Lambus | `PENDIENTE` | — | — | `PENDIENTE` |
| Splitwise | **13** [F50]; su API prohíbe apps usadas por menores de 13 [F51] | — | — | `CONFIRMADO[p]` |
| Tricount | `PENDIENTE` (la página de funciones no lo dice) [F52] | — | — | `PENDIENTE` |
| Contiki | Viajes programados **solo de 18 a 35** (el primer día de viaje) [F53] | — | Grupos a medida de **20 o más menores de 13 a 17** [F53] | `CONFIRMADO[e]` |

## 2. Fichas por producto

### 2.1 Skyscanner

**Funciones (`CONFIRMADO`)**
- **Everywhere (A cualquier sitio):** se pone el origen y las fechas, y salen todos los destinos ordenados del más barato al más caro [F6][e]. Funciona en la web y en las apps de iOS y Android [F11][e].
- **Mes entero / mes más barato:** en lugar de un día concreto se elige «Mes entero» y luego «Mes más barato» [F6][e].
- **Vista de mapa:** enseña los mismos resultados que *Everywhere*, pero con los precios de **cualquier día del mes elegido**: puntos verdes para vuelos directos y rojos para vuelos con escala [F11][e].
- **Alertas de precio:** se crean desde una búsqueda de ruta y fecha concretas. Piden iniciar sesión y avisan por correo o notificación cuando el precio sube o baja. Los vuelos guardados en «Guardados» reciben alertas automáticamente [F7][e]. Según un tercero, **no se pueden crear alertas desde *Everywhere*** [F7][s].
- **Novedades de verano de 2026** (artículo del 30/06/2026) [F8][s]: *Explore with AI* (beta; buscar destinos escribiendo en lenguaje natural; solo en mercados de habla inglesa); un planificador de viajes por carretera; un rastreador de vuelos en tiempo real; **DROPS** (solo en la app: vuelos que han bajado un 20 % o más en los últimos 7 días); y *Stays*, con más de 5 millones de alojamientos, hostales incluidos.

**Cómo funciona por dentro (`INFERIDO`)**
- *Everywhere*, el mapa y el «mes más barato» **no lanzan miles de búsquedas en vivo**: leen una **caché de precios orientativos**. *Evidencia:* la documentación pública de su API describe una *Indicative Prices API* que devuelve «los precios más baratos vistos por última vez por nuestros viajeros», con datos de hasta 4 días, pensada para «comparar un mes entero o varios destinos» cuando el viajero no tiene claro el destino o las fechas [F9][p]. El producto de consumo parece apoyarse en la misma idea: la vista de mapa enseña precios «de cualquier día del mes» [F11].
- Al hacer clic se lanza la búsqueda en vivo (*Flights Live Prices API*: crear la búsqueda y luego consultarla varias veces, con límites de 100 y 500 peticiones por minuto) [F10][p]. Eso explica por qué el precio de la tarjeta y el precio final no siempre coinciden.
- DROPS compara el precio actual con el de hace 7 días en la misma caché (`INFERIDO`, por el umbral de «20 % en 7 días» [F8]).

**Modelo de negocio.** `INFERIDO`: es un metabuscador que gana por enviar viajeros a aerolíneas y agencias, y por publicidad. Tiene programa de afiliados (vía Impact, (08/11) [[Integración de proveedores y marketplace]]). Los términos no se pudieron leer (la página no carga sin JavaScript) → `PENDIENTE` confirmarlo en ellos.

**Menores.** Sus términos dicen que los servicios «no están destinados a menores de 18» y que nadie menor de 18 puede aportarles información; la política de privacidad añade que borran los datos de un menor si no los aportó su padre, madre o tutor [F5][e]. Un joven de 16-17 años puede *mirar*, pero **no debería crear alertas** (exigen cuenta y correo).

**Lección para GoLiveIt (`PROPUESTO`):** «Explorar» por presupuesto, con precios **orientativos y marcados como tales**, y alertas que gestiona el adulto.

### 2.2 Google Flights

**Funciones (`CONFIRMADO`)**
- **Seguimiento de precios** [F2][p]: por ruta (en las fechas buscadas o en «Cualquier fecha»), o por un vuelo concreto. Avisa por correo de las **bajadas** y también de las **subidas probables** (con la subida estimada y la confianza del cálculo), y de cuándo una tarifa está a punto de caducar. Con «Cualquier fecha» avisa si el precio mínimo de la ruta baja mucho en un mes; si no, manda un resumen periódico. El blog de 2023 dice que hace falta **iniciar sesión** con una cuenta de Google y que «Cualquier fecha» cubre los próximos 3 a 6 meses [F3][p].
- **Información de precios:** marca si el precio está bajo, en lo típico o alto frente a la media histórica de esa ruta, y cuándo suele ser más barato reservar [F3][p] (28/08/2023).
- **«Precio típico» (definición oficial):** la **mediana de los precios más baratos de esa ruta en los últimos 12 meses**, ajustada por época del año, duración del viaje y clase; tiene en cuenta los filtros de escalas y aerolínea. Una «oferta» es un vuelo **al menos un 20 % por debajo** de lo típico, con la etiqueta «% menos de lo habitual» [F1][p].
- **Flight Deals (beta, con IA):** se describe el viaje con palabras («escapada de playa de fin de semana») y propone destinos y fechas entre los precios de más de 300 socios. **No admite grupos de más de 4**, ni viajes multidestino, ni escalas concretas [F1][p].
- **Garantía de precio** (piloto en 2023, solo en algunos itinerarios de *Book on Google* con salida desde EE. UU.): si el precio baja antes del vuelo, devuelve la diferencia por Google Pay [F3][p].
- Calendario, gráfico de precios y Explorar: `PENDIENTE` encontrar la página de ayuda oficial actual (el blog de 2023 no los describe).

**Cómo funciona por dentro (`INFERIDO`)**
- La etiqueta «bajo, típico, alto» es **pura estadística sobre un histórico**: mediana de 12 meses + ajustes + umbral del 20 % [F1]. Para replicarla basta con un histórico de precios mínimos por ruta y mes. No hace falta aprendizaje automático.
- La alerta de «probable subida, con su confianza» indica un modelo de predicción encima del histórico [F2].

**Modelo de negocio.** `INFERIDO`: enlaces de reserva a aerolíneas y agencias, y anuncios. `PENDIENTE` encontrar una fuente oficial que explique cómo cobra.

**Menores.** En España, una cuenta propia de Google exige **14 años** [F4][p]; por tanto, un joven de 16-17 **puede** seguir precios con su cuenta. Flight Deals no admite grupos de más de 4 [F1], justo el tamaño típico de un grupo de amigos.

**Lección para GoLiveIt (`PROPUESTO`):** copiar la **transparencia**: decir *cómo* se calcula lo «típico» (mediana de 12 meses) en una línea, al lado de la etiqueta.

### 2.3 KAYAK

**Funciones (`CONFIRMADO`)**
- **Previsión de precios:** predice si el precio de una ruta subirá o bajará en los **próximos 7 días**, con un **nivel de confianza** y una recomendación de «comprar ahora o esperar». Comprueba cada día sus aciertos siguiendo una muestra de vuelos y **no garantiza** nada («nunca puede ser perfecta») [F12][p]. El gráfico solo sale en búsquedas de ida y vuelta y cuando hay histórico suficiente [F12][e].
- **Alertas de precio:** usan la previsión y avisan por correo o en la app [F12][e].
- **Explore:** un mapa para quien no sabe a dónde ir. Se fija un **presupuesto con una barra**, temporada o fechas, duración y filtros (directo, temática como «playa»). Enseña **los precios más bajos encontrados en las últimas 48 horas** [F15][e].
- **Hacker Fares:** una ida y vuelta montada con **dos billetes de ida separados**, a menudo de aerolíneas distintas. La propia KAYAK avisa: el equipaje puede cambiar en cada tramo, y un retraso o una cancelación se complican al haber **dos reservas** [F14][e].
- **Cómo obtiene precios:** busca a la vez en cientos de webs de viaje; el usuario **reserva con el proveedor**, y KAYAK no garantiza el precio [F13][p].

**Cómo funciona por dentro (`INFERIDO`)**
- La previsión se entrena con los **más de mil millones de búsquedas al año** que hacen sus usuarios [F12]: su ventaja es el volumen de búsquedas, algo que GoLiveIt no tendrá.
- Explore lee una caché de 48 horas [F15], la misma idea que Skyscanner.

**Modelo de negocio.** `CONFIRMADO[p]`: metabuscador; se reserva con el proveedor [F13]. Que cobre por clic o por publicidad es `INFERIDO` (la página no lo explica).

**Menores.** 18 años para cuenta y funciones de reserva [F16][e]. Los *Hacker Fares* son un riesgo para menores (`INFERIDO`: igual que el transbordo por cuenta propia, pero sin escala intermedia).

**Lección (`PROPUESTO`):** el Explore «por presupuesto» es perfecto para un grupo con 250 € por cabeza. La previsión **no**: sin histórico propio sería inventarse la confianza.

### 2.4 Kiwi.com

**Funciones (`CONFIRMADO`)**
- **Transbordo por cuenta propia** (*virtual interlining*): junta billetes separados de aerolíneas que no colaboran entre sí. Kiwi reconoce que «no es un itinerario oficial de las aerolíneas». El viajero recoge el equipaje y lo vuelve a facturar, puede tener que facturarse otra vez fuera de la zona segura, pasar inmigración (con visado si lo exige el país de la escala) y cambiar de terminal. Si pierde la conexión, la aerolínea «solo le ayuda con los vuelos de su reserva» [F19][p]. Las condiciones lo recogen en el art. 4.6, y el art. 16.2 deja los visados por cuenta del cliente [F20][p].
- **Servicios de protección ante incidencias** (*Kiwi.com Guarantee*): de pago y opcionales. Si una aerolínea cambia o cancela un tramo, ofrecen otra alternativa o un reembolso, normalmente en **crédito de Kiwi.com**. Sin ellos, Kiwi propone alternativas pero «no ayudará a cubrir los costes» [F18][p]. No cubren, entre otras cosas, las denegaciones de embarque por documentos inválidos [F20][p] (art. 10.5.2).
- **Nomad:** búsqueda multidestino. Se ponen 3 o más ciudades y los días en cada una, y **reordena las paradas** para encontrar la ruta más barata (lanzado en 2018) [F22][s].
- **Política de menores:** «si la aerolínea permite que los niños viajen solos, les dejaremos reservar en nuestra web». La tarifa es la misma que la de un adulto. Tabla de edades: **Ryanair 16, Wizz Air 14, easyJet 13, Iberia 12, United 16; en Kiwi, Vueling 16** (por una condición que afecta a los italianos) [F17][p].

**Cómo funciona por dentro (`INFERIDO`)**
- Calcula combinaciones entre aerolíneas *low cost* que no venden conexiones entre sí y se protege con una regla interna de «tiempo mínimo de transbordo» (las condiciones la llaman *Self-transfer Time Requirement*, art. 5.6 [F20]). La «garantía» es en el fondo un **seguro propio** con el que Kiwi asume parte del riesgo que crea su combinación.

**Modelo de negocio.** `CONFIRMADO[p]`: precio del billete + **tarifa de servicio de Kiwi.com** + servicios extra de pago (la *Guarantee*, un «paquete prémium») [F21]. Su API (Tequila) solo admite socios nuevos **por invitación** desde el 30/05/2024 (08/11).

**Menores.** Sus condiciones no fijan edad mínima para el comprador y obligan a quien reserva para otros a tener su autorización (art. 2.4) [F20][p]. **Un joven de 16 años puede reservar en Kiwi un vuelo de Ryanair con transbordo por cuenta propia** (`INFERIDO`, al juntar [F17] y [F19]): es la combinación de mayor riesgo de todo este análisis.

**Lección (`PROPUESTO`):** hacer lo **contrario**: filtro «solo billete único o conexión protegida», activado y **sin opción de quitarlo** para menores.

### 2.5 Hopper

**Funciones (`CONFIRMADO`)**
- **Predicción de precio** con recomendación de «comprar o esperar» y la opción de **vigilar un viaje** (avisa cuando la recomendación pasa a «comprar») [F25][s]. La empresa afirma que, en pruebas con datos pasados, el 95 % de las veces su recomendación ahorra dinero o no empeora el primer precio visto [F25][e] (dato de la propia empresa, sin verificación independiente).
- **Congelar el precio** (*Price Freeze*): solo en la app y solo para el billete elegido. Se paga un depósito para retener el precio unos días; si se compra, cuenta para el precio final; si el precio baja, se paga el más bajo; puede no ofrecerse en vuelos con mucha demanda [F24][s]. (La página de ayuda oficial devolvió 404 → `PENDIENTE` el importe y el plazo actuales.)
- **Productos propios:** *Cancel for any Reason* (cancelar por cualquier motivo), *Price Drop* (bajada de precio) y *Flight Disruption Guarantee* (garantía ante incidencias). Los términos dicen que «**NO son productos financieros regulados como un seguro**» (sec. 9) [F23][p].

**Cómo funciona por dentro (`INFERIDO`)**
- El negocio real es **asumir riesgo de precio**: con el modelo de predicción calcula cuánto cobrar por congelar un precio o por permitir una cancelación. *Evidencia:* los términos enumeran los productos y advierten de que no son seguros [F23]; la congelación no se ofrece cuando el riesgo es alto (vuelos con mucha demanda) [F24].

**Modelo de negocio.** `CONFIRMADO[p]`: comisiones de las aerolíneas (a veces como recargo sobre el precio, 5.3.17), tarifas incluidas en el precio de los hoteles (5.4.1), tarifas de servicio en casas (5.5.7), resultados pagados con la etiqueta «Anuncio» (4.2) y los productos propios (sec. 9) [F23].

**Menores.** Edad mínima: **16**, o la mayoría de edad local si es mayor (cl. 1.2) [F23][p]. En España la mayoría de edad son 18, así que `INFERIDO`: un español de 16-17 años quedaría fuera.

**Lección (`PROPUESTO`):** no vender productos financieros a menores. Sí copiar el **problema** que resuelve la congelación: la familia necesita **tiempo para aprobar**. En el prototipo bastaría con un «plazo de aprobación» con precio orientativo y aviso si cambia, sin cobrar nada.

### 2.6 Omio y Trainline

**Omio: funciones (`CONFIRMADO`)**
- Tren, autobús, avión y ferri en una sola búsqueda: **más de 2.000 proveedores en 45 países**, billetes en el móvil, cambios de horario y andén en tiempo real, tarjeta de estudiante, programas de fidelidad de **Renfe, Alsa** y otros, «recomienda a un amigo», eSIM gratis de 2 días, pago con Apple Pay y PayPal. Clasificación por edad **4+**; **contiene publicidad**; declara identificadores y datos de uso para **rastrear** en apps y webs de terceros, y uso de la ubicación exacta [F27][p].

**Trainline: funciones (`CONFIRMADO`)**
- Se guardan en la cuenta **tarjetas de descuento y fidelidad**, que luego se aplican solas en las reservas. Los códigos de operador se añaden **antes de buscar**; entre los aceptados están **Verano Joven**, iryo, Trenitalia, Italo y SNCF [F31][e]. Vende la *16-25 Railcard* digital británica (1/3 de descuento durante un año) [F32][e].

**Cómo funcionan por dentro (`INFERIDO`)**
- Son **revendedores que conectan con cada operador** (no metabuscadores): emiten el billete del operador y lo guardan en su app. *Evidencia:* Omio cobra comisión «por actuar como agente» del operador [F29][e]; Trainline cobra comisiones y tarifas por billete y vende su tecnología a operadores (*Partner Solutions*) [F30][p].
- Las tarjetas de descuento son un **perfil de tarifas por pasajero** que se manda en cada búsqueda al operador (`INFERIDO`: por eso hay que añadirlas *antes* de buscar [F31]).

**Modelo de negocio.** Omio: comisión del operador + tarifa de servicio [F28][F29][e]. Trainline: comisión y tarifas por billete, publicidad, extras (seguros, pago en varias divisas) y servicios B2B [F30][p]. En el Reino Unido, el regulador ferroviario (ORR) obligó a enseñar la tarifa de gestión en el precio inicial [F34][e].

**Menores.** Omio remite a las condiciones de cada operador [F29]; edad de la cuenta `PENDIENTE`. Trainline: en una web de venta que opera para Northern, 16+, y de 16 a 17 con consentimiento parental [F33][e]; edad general `PENDIENTE`. El transporte es la categoría **con menos barreras** para 16-17 años: FlixBus, sin restricciones desde los 15 ([[Proveedores - transporte]]).

**Lección (`PROPUESTO`):** comparar **avión, tren y bus juntos** y que cada opción diga qué edad exige su operador. Más un selector «tengo Carné Joven, Interrail Youth o una tarjeta joven de Renfe» que recalcule el presupuesto.

### 2.7 Hostelworld

**Funciones (`CONFIRMADO`)**
- **Linkups:** actividades organizadas por el hostal, por hostales cercanos o por otros mochileros (visitas a pie, surf, *pub crawls*, cenas de grupo). Se pueden crear o unirse **desde 14 días antes de la entrada**; se ven los **perfiles de quién va** antes de unirse [F35][p].
- **Chats del hostal y de la ciudad**, ver quién se aloja en el mismo hostal y **mensajes directos** con otros viajeros. ***Social Pass*** (de pago): da acceso a los chats y quedadas **sin tener reserva** [F36][p] (artículo actualizado el 19/10/2026).
- Ficha de App Store: clasificación **4+**, con «mensajes y chat» y «contenido generado por usuarios» [F38][e].

**Cómo funciona por dentro (`INFERIDO`)**
- La reserva da acceso: la reserva (hostal + fechas) abre una sala de chat temporal, de 14 días antes a unos días después [F35]. El *Social Pass* cambia el modelo: convierte la red social en un producto en sí mismo, desligado de la reserva [F36].

**Modelo de negocio.** Comisión sobre la reserva (`INFERIDO`) + *Social Pass* de pago [F36]. Afiliación abierta vía Partnerize (08/11).

**Menores.** Usar: **16** (cl. 1.1). Reservar: **18** (cl. 4.1). Las condiciones **no tienen reglas de edad para el chat o los perfiles** [F37][p]. Una fuente de prensa de 2022 decía que la parte social exigía 18 → `PENDIENTE` (no está en los términos actuales). **Riesgo:** un joven de 16-17 años con cuenta podría chatear con adultos desconocidos y quedar con ellos.

**Lección (`PROPUESTO`):** **no** copiar el chat abierto. Sí la mecánica de «la reserva abre una sala», pero **solo para el propio grupo y la familia**, y actividades **verificadas para 16-17** en lugar de quedadas con desconocidos.

### 2.8 DiscoverEU e Interrail Youth

**Funciones (`CONFIRMADO`)**
- **DiscoverEU, ronda de otoño de 2026:** solicitudes del 1/10/2026 (12:00 CET) al 15/10/2026 (12:00 CET) en el Portal Europeo de la Juventud. Para **nacidos entre el 1/01/2008 y el 31/12/2008**. Viajes del **1/03/2027 al 31/05/2028**, de **1 a 30 días** y como mucho 7 días de tren. Se puede pedir **con amigos** si todos cumplen los requisitos (no se dice el máximo del grupo). Incluye viaje en tren gratis y una **tarjeta de descuento DiscoverEU** (cultura, transporte local, alojamiento, comida…). La página dice que vuelve en primavera de 2027 [F39][p] (actualizada el 05/10/2026).
- Ronda de primavera de 2026: del 8 al 22/04/2026 [F40][e]. Antes hay que pasar un control de requisitos y un **cuestionario** (salvo quien va como miembro de un grupo) [F40][e].
- **Interrail Youth:** de **12 a 27 años** (cumplidos el día de inicio del viaje). Solo para residentes en Europa [F41][e]. Según la FAQ de Deutsche Bahn, los menores de 12 que viajan solos necesitan un pase Youth propio, y el adulto que acompaña a niños gratis debe tener 18 [F42][e].
- Que haya una edad mínima o una autorización de los padres en Interrail: `PENDIENTE`. Solo hay respuestas de usuarios en el foro oficial, que dicen no trabajar para Interrail [F43][p] (2022).

**Cómo funciona por dentro (`INFERIDO`).** Es una convocatoria con cupo: requisitos → cuestionario → selección → pase Interrail digital. No tiene API pública (`PENDIENTE` confirmarlo).

**Modelo de negocio.** Programa público (Erasmus+). Interrail: venta de pases por los operadores ferroviarios.

**Menores.** DiscoverEU es justo **el siguiente paso** de un usuario de GoLiveIt: quien hoy tiene 16-17 años (nacidos en 2009-2010) cumplirá 18 en 2027-2028. `INFERIDO`: le tocarían las rondas de esos años, si el programa mantiene el calendario.

**Lección (`PROPUESTO`):** una tarjeta «Tu DiscoverEU»: «cumples 18 en 2027 → la próxima ronda abre en primavera» y el aviso «el pase Interrail Youth ya te sirve hoy (12-27)».

### 2.9 Polarsteps, Wanderlog y Lambus (planificar en grupo)

**Polarsteps (`CONFIRMADO`)**
- Seguimiento automático del viaje con fotos e historias. Privacidad **por viaje**: solo yo, amigos y familia, o público. **Los seguidores no necesitan cuenta** para ver el viaje y pueden ver la **ubicación en directo** [F46][e].
- Versión de verano de 2026 (9/06/2026): nueva pestaña Explorar, planificación desde la web, **búsqueda de vuelos dentro de la app**, **opción de ocultar la ubicación en directo** o enseñar la ruta solo hasta el último paso guardado, y vídeos del viaje con vuelos sobre el mapa [F44][p].
- Edad mínima: **16**; 18 para comprar productos. Negocio: libros de viaje impresos, *Polarsteps Plus* y tarjetas regalo [F45][p].

**Wanderlog (`CONFIRMADO`)**
- Itinerario **colaborativo en tiempo real** (se invita a los compañeros por correo o enlace), presupuesto individual o de grupo, **quién pagó qué y quién debe a quién**, e importación de reservas reenviando correos o conectando Gmail [F48][e].
- Edad mínima: **18** (sec. 10 y 11). Negocio: suscripciones y compras [F47][p].

**Lambus (`CONFIRMADO[e]`)**
- Gastos privados y de grupo con reparto de costes, **documentos del viaje sin conexión** compartidos con los compañeros, chat, notas, fotos e itinerario compartido [F49]. La versión PRO exporta los gastos y avisa de la puerta de embarque [F49].
- Edad mínima: `PENDIENTE`.

**Cómo funcionan por dentro (`INFERIDO`).** Hay un objeto «viaje» con miembros y permisos (privado, grupo, público), y dentro de él paradas, reservas, gastos y documentos. La importación de reservas lee los correos de confirmación (Wanderlog lo dice: reenvío o Gmail [F48]). Para menores, conectar Gmail es una puerta a muchísimos datos.

**Lección (`PROPUESTO`):** el «viaje» compartido con **tres niveles de visibilidad**, adaptados: *grupo*, *grupo + familias* y **nunca público** para menores. Ubicación en directo **desactivada por defecto**, como opción de cada familia; Polarsteps acaba de añadir el control para ocultarla [F44]. Sin conectar el correo.

### 2.10 Splitwise y Tricount (gastos compartidos)

**Splitwise (`CONFIRMADO[p]`)**
- Grupos, gastos a partes iguales o personalizados, comentarios y notificaciones; *Splitwise Pro* de pago; pagos integrados según el país (PayPal y Venmo solo en EE. UU.; pago desde el banco con terceros como Tink) [F50].
- Edad mínima: **13** [F50]. **API pública** (v3.0, con OAuth o clave), pero «**no pensada para uso comercial**»: las integraciones comerciales necesitan licencia, prohíbe crear apps que copien sus funciones y prohíbe que la usen menores de 13 [F51].

**Tricount (`CONFIRMADO[p]`)**
- Lista común de gastos, propuesta de pagos para saldar cuentas, **varias divisas**, uso **sin conexión**, peticiones de pago, importación desde Splitwise, repartos personalizados y conexión con la tarjeta de bunq (su dueño) para añadir gastos automáticamente [F52].
- Edad mínima: `PENDIENTE`.

**Cómo funcionan por dentro (`INFERIDO`).** Un libro de cuentas por grupo con saldos netos y un algoritmo que **minimiza el número de pagos** necesarios para saldar las deudas. Es un cálculo sencillo que se puede hacer en el navegador, sin servidor.

**Lección (`PROPUESTO`):** un **bote del viaje** propio: lo que paga cada familia, lo que se ha gastado y lo que se debe, con una vista de solo lectura para las familias. **No integrar Splitwise** (su API prohíbe el uso comercial y copiar funciones [F51]).

### 2.11 Contiki y StudentUniverse

- **Contiki (`CONFIRMADO[e]`):** viajes programados **solo de 18 a 35 años** («el primer día de viaje»); explica el límite porque los jóvenes prefieren viajar con gente de su edad. Para **grupos de 20 o más jóvenes de 13 a 17**, organiza viajes a medida [F53]. `INFERIDO`: los menores solo entran como grupo cerrado y organizado (colegio, club), nunca mezclados con adultos.
- **StudentUniverse (`CONFIRMADO[e]`):** según una página de la Universidad de Stanford, BYOjet (que la compró) cerró su portal de reservas el **2/06/2025** [F54]. Edades y verificación actuales: `PENDIENTE` (solo hay fuentes de baja calidad).
- **Lección (`PROPUESTO`):** la **franja de edad cerrada** es un argumento de venta (Contiki lo usa) y una medida de seguridad: en GoLiveIt, todos los miembros del grupo tienen 16-17 años y están verificados por su familia.

### 2.12 Corner

Ya está analizado en [[Corner - ingeniería inversa v2]] y en [[Funciones adaptadas de Corner]]. **No aporta nada nuevo** a este análisis de buscadores, porque no busca vuelos ni reserva. No se ha vuelto a consultar.

## 3. Funciones candidatas para GoLiveIt

Columnas: **Valor J** = para jóvenes de 16-17 años; **Valor P** = para padres; **Prototipo sin datos reales** = si se puede hacer con datos de ejemplo marcados como tales. Riesgos: ⚠️ = cuidado especial.

| # | Función | Quién la tiene | Valor J | Valor P | Dificultad | Riesgo legal o ético | Prototipo sin datos reales | Recomendación |
|---|---|---|---|---|---|---|---|---|
| 1 | **Filtro «solo billete único o conexión protegida»**, fijo para menores | Inverso de Kiwi [F19] y de KAYAK Hacker Fares [F14] | Medio (menos opciones baratas) | **Muy alto** | Baja | Bajo; *reduce* riesgo | Sí | **Integrar ya** |
| 2 | **Comparador multimodal** avión, tren y bus con edad mínima por operador | Omio [F27], Trainline [F30] | Alto | Alto | Media | Bajo si la edad está verificada; alto si nos equivocamos (H-19) | Sí (datos de [[Proveedores - transporte]]) | **Integrar ya** |
| 3 | **Tarjetas jóvenes en el presupuesto** (Carné Joven, Interrail Youth, tarjetas de Renfe, Verano Joven) | Omio [F27], Trainline [F31], Interrail [F41] | Alto | Alto (ahorro) | Baja | Bajo; ojo a las condiciones de cada tarjeta | Sí (descuentos de ejemplo) | **Integrar ya** |
| 4 | **Explorar por presupuesto** («¿a dónde llegamos con X € por persona?») en el mapa, solo con destinos viables para 16-17 | Skyscanner Everywhere [F6], KAYAK Explore [F15], Polarsteps Explore [F44] | **Muy alto** | Medio | Media | Bajo si el precio dice «orientativo» | Sí | **Integrar ya** |
| 5 | **Calendario de precios + etiqueta bajo/típico/alto** con la explicación del cálculo | Google [F1][F3], Skyscanner mes más barato [F6] | Alto | Alto (entender si es buen precio) | Media | Medio: no crear falsa urgencia | Sí (histórico simulado) | **Integrar ya** |
| 6 | **Seguimiento de precio compartido grupo + familia**, en la app, sin mensajes de urgencia | Google [F2], Skyscanner [F7], KAYAK [F12], Hopper «vigilar» [F25] | Alto | Alto | Baja-media | ⚠️ Medio: no mandar correos de marketing a menores; la familia gestiona la alerta | Sí (alerta simulada) | **Integrar ya** |
| 7 | **Bote común del viaje** (quién pagó qué, saldar cuentas, vista de la familia) | Splitwise [F50], Tricount [F52], Wanderlog [F48], Lambus [F49] | Alto | **Muy alto** | Media | Bajo si no se mueve dinero real | Sí (local) | **Integrar ya** |
| 8 | **Viaje compartido con niveles de visibilidad** (grupo / grupo + familias; nunca público) | Polarsteps [F46], Wanderlog [F48] | Alto | Alto | Media | ⚠️ Datos de menores: nunca público por defecto | Sí | Más adelante (después del Top 6) |
| 9 | **Tarjeta «Tu DiscoverEU / Interrail Youth»** | Comisión Europea [F39], Interrail [F41] | Alto | Medio | Baja | Bajo; actualizarla en cada ronda | Sí | Integrar ya (como contenido) |
| 10 | **Plazo de aprobación familiar** con precio orientativo y aviso si cambia (sin cobrar) | Idea tomada del *Price Freeze* de Hopper [F24] | Medio | Alto | Baja | Bajo; **no** cobrar depósitos a menores | Sí | Más adelante |
| 11 | Búsqueda en lenguaje natural con IA («finde barato con playa en mayo») | Google Flight Deals [F1], Skyscanner Explore with AI [F8] | Alto | Bajo | Media-alta | ⚠️ Medio: alucinaciones; que la IA no se invente precios | Sí, con datos de ejemplo | Más adelante (ver [[Motor de IA personalizado]]) |
| 12 | Multidestino optimizado (reordenar las ciudades) | Kiwi Nomad [F22] | Medio | Bajo | Alta | ⚠️ Alto si genera transbordos por cuenta propia | Parcial | Más adelante, solo con la regla 1 |
| 13 | Documentos del viaje sin conexión (billetes, autorización de salida) | Lambus [F49] | Alto | Alto | Media | ⚠️ **Alto**: no guardar copias del DNI ni del pasaporte; solo la lista de comprobación | Sí (sin documentos reales) | Más adelante |
| 14 | Previsión «comprar o esperar» con confianza | KAYAK [F12], Hopper [F25] | Medio | Medio | Alta | ⚠️ Alto: falsa precisión sin histórico propio | No (sería inventar) | **No** |
| 15 | Congelar el precio pagando, o garantías y seguros propios | Hopper [F23][F24], Kiwi Guarantee [F18] | Medio | Medio | Alta | ⚠️ **Muy alto**: producto financiero o de seguro vendido a menores | No | **No** |
| 16 | Chat abierto del alojamiento o la ciudad, «ver quién va», quedadas con desconocidos | Hostelworld [F35][F36] | Alto | **Negativo** | Media | ⚠️ **Muy alto**: contacto de menores con adultos desconocidos | — | **No** (versión segura: chat solo del grupo) |
| 17 | Ofertas «de última hora», bajadas del 20 % en 7 días, contadores de escasez | Skyscanner DROPS [F8]; la UE ya actuó contra la venta bajo presión [F57] | Alto (tentación) | Negativo | Baja | ⚠️ **Alto**: presión de compra sobre menores; las directrices del DSA (art. 28) piden evitar los patrones oscuros [F56] | Sí, pero no se debe | **No** |
| 18 | Ubicación en directo del menor para la familia | Polarsteps [F46][F44] | Bajo (sensación de vigilancia) | Alto | Media | ⚠️ **Alto**: datos de ubicación de menores | No hace falta | No en el prototipo; más adelante solo como opción de la familia y desactivada por defecto |
| 19 | Importar reservas leyendo el correo o Gmail | Wanderlog [F48] | Medio | Bajo | Alta | ⚠️ Alto: acceso masivo a los datos de un menor | No | **No** |
| 20 | Grupo cerrado por edad (todos 16-17, verificados por su familia) | Contiki [F53] | Alto | **Muy alto** | Baja (ya existe la aprobación de la familia) | Reduce riesgo | Sí | Integrar ya (como regla y mensaje) |

### 3.1 Cuidado especial (resumen)

- **Transbordos por cuenta propia (Kiwi, KAYAK Hacker Fares).** El riesgo es del viajero: maletas, controles, visados y conexiones perdidas sin ayuda [F19][F14]. Para un menor solo, un retraso puede acabar en una noche en un aeropuerto extranjero (`INFERIDO`). **Regla:** prohibido por defecto, y que solo la familia pueda autorizarlo… y ni así en el MVP.
- **Ofertas urgentes y presión de compra.** La Comisión y las autoridades de consumo ya obligaron a Booking.com a aclarar mensajes como «última habitación disponible» [F57][e]. Las directrices del art. 28 del DSA (14/07/2025) piden evitar los patrones oscuros con menores [F56][s]. **Regla en GoLiveIt:** nada de contadores, «solo quedan 2», notificaciones de oferta al menor ni colores de alarma; las bajadas de precio se cuentan con tono neutro y le llegan **también** a la familia.
- **Productos financieros y garantías.** Hopper avisa de que sus productos «no son seguros regulados» [F23]; Kiwi da los reembolsos en crédito propio [F18]. **Regla:** GoLiveIt no vende nada parecido.
- **Funciones sociales.** El chat abierto con desconocidos (Hostelworld) queda fuera; solo chat del grupo verificado.
- **Datos de menores.** En España un mayor de 14 años puede consentir el uso de sus datos (LOPDGDD art. 7, `CONOCIMIENTO PREVIO` según [[Marco legal del negocio]]), pero eso no obliga a pedir muchos. La app de Omio, con clasificación 4+, declara **rastreo con identificadores** y uso de la **ubicación exacta** [F27]: es justo lo que GoLiveIt **no** debe hacer. Datos mínimos; sin rastreo publicitario; sin conectar el correo; sin guardar documentos de identidad; ubicación desactivada.

## 4. Top 6 funciones para implementar ya en el prototipo

Orden de prioridad: primero lo que **reduce riesgo y da confianza a los padres**, que son quienes pagan (ver [[Concepto GoLiveIt]]). Después, lo que más ilusiona a los jóvenes.

1. **Filtro «sin transbordos por cuenta propia» (fijo para menores).**
   *Por qué:* es la función de mayor riesgo de todo el sector (Kiwi la vende como «travel hack» [F19]), cuesta muy poco quitarla y es un argumento de venta para los padres.
   *En la interfaz:* en el comparador de vuelos, una etiqueta fija con candado («Solo billetes protegidos: si un vuelo se retrasa, la aerolínea os recoloca») y, debajo, «3 opciones más baratas ocultas por seguridad» con un enlace que explica por qué.

2. **Comparador multimodal con edad por operador y tarjetas jóvenes.**
   *Por qué:* el tren y el bus tienen menos barreras de edad que el avión ([[Proveedores - transporte]]); Omio y Trainline enseñan que juntar los tres modos y aplicar las tarjetas antes de buscar es lo que más ahorra [F27][F31].
   *En la interfaz:* pestañas «Todo / Avión / Tren / Bus» con tarjetas que dicen «Ryanair: solos desde 16 ✓ · FlixBus: desde 15 ✓», y un selector «Tengo: Carné Joven · Interrail Youth · Tarjeta joven de Renfe» que recalcula el precio por persona.

3. **Explorar por presupuesto en el mapa.**
   *Por qué:* un grupo de 16-17 años no empieza por el destino, sino por el dinero. *Everywhere* y KAYAK Explore demuestran que funciona [F6][F15], y GoLiveIt puede hacer lo que ellos no hacen: **quitar los destinos sin alojamiento verificado para menores**.
   *En la interfaz:* en el mapa que ya existe, una barra «Presupuesto por persona: 250 €» que va encendiendo destinos, y cada uno con la etiqueta «orientativo · ida y vuelta + 2 noches en albergue apto 16-17».

4. **Calendario de precios con la etiqueta bajo/típico/alto explicada.**
   *Por qué:* da a los padres la tranquilidad de que «es buen precio» sin presionar; el método de Google (mediana de 12 meses y −20 % = oferta [F1]) es transparente y se puede simular.
   *En la interfaz:* una cuadrícula del mes con los días coloreados en verde, gris o naranja, y una línea: «Típico = precio mediano de los últimos 12 meses (datos de ejemplo en esta demo)».

5. **Seguimiento de precio compartido con la familia, sin urgencia.**
   *Por qué:* las alertas son la función de retención de Google, Skyscanner y KAYAK [F2][F7][F12], pero allí exigen la cuenta y el correo del usuario. Aquí la alerta **la tienen también los padres**, y así la decisión de comprar no recae solo en el menor.
   *En la interfaz:* un botón «Vigilar este viaje» en el resumen del plan, y el aviso en el panel de la familia: «El tren Sevilla-Madrid ha bajado 12 € desde el martes. Sin prisa: vuestro plazo de aprobación sigue abierto».

6. **Bote común del viaje con vista para las familias.**
   *Por qué:* las peleas por el dinero son el problema clásico de los viajes en grupo (por eso existen Splitwise y Tricount [F50][F52]). Para los padres, ver lo que ha pagado su hijo vale tanto como el presupuesto.
   *En la interfaz:* una pestaña «Bote» con lo que ha aportado cada familia, lo gastado por categorías y «Para quedar en paz: Lucía → Marcos 8,50 €», y un enlace de solo lectura para los padres.

*Justo después del Top 6:* la tarjeta «Tu DiscoverEU / Interrail Youth» (fila 9) y el viaje compartido con niveles de visibilidad (fila 8).

## 5. Integraciones técnicas posibles (estado público de acceso)

Estado: 🟢 abierto sin volumen · 🟡 con revisión, volumen o condiciones · 🔴 contrato o invitación · ⚫ no existe.

| Integración | Para qué función | Estado | Detalle | Fuente |
|---|---|---|---|---|
| **Travelpayouts / Aviasales Data API** | 3, 4, 5 (precios orientativos en caché) | 🟢 | Datos de 2 a 7 días para cualquier socio; la búsqueda en tiempo real exige unos 50.000 usuarios activos al mes | (08/11) [[Integración de proveedores y marketplace]] |
| **Skyscanner, afiliación** (enlaces, *widgets*) | Enlace de salida al reservar (lo hace el adulto) | 🟡 | Vía Impact | (08/11) |
| **Skyscanner Travel API** (Live Prices, Indicative Prices, Autosuggest, Geo, Culture) | 3, 4, 5 | 🔴 | «Acceso a las APIs de vuelos solo mediante acuerdo comercial»; límites de 100 y 500 peticiones por minuto | [F10][p] (página de 10/05/2023) |
| **Duffel** | Vuelos con tarifa por edad y reserva | 🟡 | Exige activar la cuenta como comerciante con datos de empresa; pide la **edad de cada pasajero menor de 18** en la búsqueda | [F55][p]; (08/11) |
| **Kiwi.com Tequila** | — | 🔴 | Socios nuevos solo por invitación desde el 30/05/2024 | (08/11) |
| **Google Flights** | — | ⚫ | No hay API pública (QPX Express cerró en 2018) | (08/11) |
| **KAYAK** (afiliación o API) | — | `PENDIENTE` | No se ha investigado | — |
| **Hopper** (HTS, B2B) | — | `PENDIENTE` | Solo se han visto términos de productos para aerolíneas (CFAR, *disruption*); no se descarta que sea B2B | — |
| **Omio, afiliación** | 2 | 🟡 | Programa propio y vía Travelpayouts | (08/11) |
| **Trainline, afiliación** | 2 | 🟡 | Vía Partnerize, con revisión. La API B2B (*Partner Solutions*) va por acuerdo comercial | (08/11); [F30] |
| **FlixBus** | 2 | 🟢/🟡 | Afiliación estática vía Awin; la API se pide por correo con datos de empresa y tráfico | (08/11) |
| **Renfe, datos abiertos (GTFS)** | 2 (horarios, sin precios) | 🟢 | Horarios y estaciones; sin precio ni disponibilidad | (08/11) |
| **Interrail / Rail Europe** | 2, 9 | 🟢 (afiliación) / 🔴 (API B2B) | Vía Travelpayouts | (08/11) |
| **DiscoverEU** | 9 | ⚫ (`INFERIDO`) | No se ha encontrado API; contenido manual con las fechas de cada ronda | [F39] |
| **Hostelworld** | Alojamiento (lo reserva el adulto) | 🟢 (afiliación) / 🟡 (API caso a caso) | Partnerize, *cookie* de 30 días | (08/11) |
| **Splitwise API** | 7 | 🔴 para GoLiveIt | Autoservicio, pero «no pensada para uso comercial»; prohíbe copiar sus funciones | [F51][p] |
| **Tricount / bunq** | 7 | `PENDIENTE` | No se ha encontrado una API pública para terceros | — |

**Lectura.** Para el Top 6 **no hace falta ninguna API cerrada**. El prototipo funciona con datos de ejemplo. El primer paso real sería la **Data API de Travelpayouts** para los precios orientativos (funciones 3, 4 y 5) más **enlaces de afiliación dirigidos al adulto** para reservar. El bote común y el filtro de seguridad son lógica propia.

## 6. Qué se ha inferido y con qué evidencia (resumen)

| Hipótesis | Evidencia | Fuerza |
|---|---|---|
| Explorar y el mes más barato funcionan sobre una caché de precios ya vistos | Skyscanner documenta una API de precios en caché de hasta 4 días para «un mes entero o varios destinos» [F9]; KAYAK Explore, 48 horas [F15] | Alta |
| El «precio típico» se puede replicar sin aprendizaje automático | Definición oficial: mediana de 12 meses + ajustes + umbral del 20 % [F1] | Alta |
| La previsión de KAYAK y Hopper depende del volumen propio de búsquedas | Más de mil millones de búsquedas al año [F12]; 5.000-8.000 millones de precios al día (Hopper, prensa) [F25] | Media |
| La «garantía» de Kiwi y los productos de Hopper son seguros propios encubiertos | Crédito como reembolso [F18]; «no son seguros regulados» [F23] | Media |
| En Hostelworld, la reserva abre el acceso a la red social | Ventana de 14 días antes de la entrada [F35]; el *Social Pass* lo rompe [F36] | Media |
| Un menor de 16 años puede comprar en Kiwi un transbordo por cuenta propia con Ryanair | Kiwi deja reservar a menores solos si la aerolínea lo permite [F17]; sus condiciones no tienen edad mínima [F20] | Media (no probado: implicaría reservar) |

## 7. Pendientes

- [ ] Edad mínima en los términos de **Omio** (403), de **Trainline** (generales), de **Lambus** y de **Tricount**.
- [ ] Leer el texto completo de los **términos de Skyscanner** en un navegador normal (aquí solo se vio el extracto del buscador).
- [ ] Ayuda oficial actual de Google Flights sobre el **calendario, el gráfico de precios y Explorar**.
- [ ] Importe y plazo actuales del **Price Freeze** de Hopper (la ayuda oficial devolvió 404).
- [ ] Regla de edad del **chat social de Hostelworld** (la prensa de 2022 dice 18; los términos actuales no dicen nada).
- [ ] **DiscoverEU:** tamaño máximo del grupo y número de pases (la página de las normas devolvió 429).
- [ ] **Interrail:** ¿pide autorización de los padres o tiene edad mínima para viajar solo? (Solo hay respuestas de usuarios.)
- [ ] Si **Trainline** acepta la tarjeta Más Renfe Joven y otras tarjetas jóvenes de Renfe (la página de ayuda devolvió 404; solo se vio Verano Joven en el extracto).
- [ ] Afiliación y APIs de **KAYAK** y de **Hopper**.
- [ ] Leer el texto oficial de las **directrices del art. 28 del DSA** (aquí solo se citan resúmenes de despachos).
- [ ] Modelo de negocio de **Google Flights** y de **Skyscanner** con fuente oficial.

## 8. Cómo se ha hecho (para repetirlo)

- Búsquedas web y lectura de páginas públicas, una a una. Cuando una página devolvía error (403, 404 o 429) **no se ha insistido** ni se ha buscado otra forma de entrar: se ha usado el extracto del buscador, marcado como [e], o se ha dejado `PENDIENTE`.
- No se ha probado ninguna reserva ni ninguna búsqueda dentro de los productos: todo sale de su documentación pública.

## 9. Fuentes (todas consultadas el 11/11/2026)

| Ref. | Fuente | URL | Fuerza |
|---|---|---|---|
| F1 | Google: Flight Deals (ayuda) | <https://support.google.com/travel/answer/16497283?hl=en> | [p] |
| F2 | Google: seguir vuelos y precios (ayuda) | <https://support.google.com/travel/answer/6235879?hl=en> | [p] |
| F3 | Blog de Google: 3 formas de encontrar ofertas (28/08/2023) | <https://blog.google/products/travel/google-flights-find-deals/> | [p] |
| F4 | Google: edad mínima de las cuentas (España: 14) | <https://support.google.com/accounts/answer/1350409?hl=es> | [p] |
| F5 | Skyscanner: términos del servicio | <https://www.skyscanner.com/terms-of-service> | [e] |
| F6 | Skyscanner: guía de *Everywhere* | <https://www.skyscanner.com/tips-and-inspiration/choose-your-next-adventure-skyscanner-everywhere-search> | [e] |
| F7 | Skyscanner: alertas de precio y «Guardados»; guía de terceros sobre los límites de las alertas | <https://www.skyscanner.com.my/news/how-use-skyscanners-price-alerts-feature> · <https://www.skyscanner.com/tips-and-inspiration/visit-paris-on-a-1-000-budget> · <https://dollarflightclub.com/?p=9496> | [e] / [s] |
| F8 | Travolution: novedades de Skyscanner (30/06/2026) | <https://www.travolution.com/news/travel-sectors/intermediaries/ai-discovery-among-new-skyscanner-product-releases/> | [s] |
| F9 | Skyscanner Developers: Indicative Prices API | <https://developers.skyscanner.net/docs/flights-indicative-prices/overview> | [p] |
| F10 | Skyscanner Partner Support: servicios y límites (10/05/2023) | <https://skyscannerpartnersupport.zendesk.com/hc/en-us/articles/4687312848797-Which-services-can-I-access-and-what-are-the-rate-limits> | [p] |
| F11 | Skyscanner: *Explore Everywhere* y vista de mapa | <https://www.skyscanner.co.in/news/skyscanner-tips-and-tools-everywhere-search> | [e] |
| F12 | KAYAK: cómo funciona la previsión de precios | <https://www.kayak.com/c/help/pricing/how-does-kayak-price-forecast-work.62022.faq> | [p] |
| F13 | KAYAK: cómo obtiene los precios | <https://www.kayak.com/c/help/about/how-does-kayak-get-prices.61916.faq> | [p] |
| F14 | KAYAK: qué es un Hacker Fare | <https://www.kayak.com/c/help/pricing/what-is-hacker-fare.62042.faq> | [e] |
| F15 | KAYAK: Explore por presupuesto | <https://www.ca.kayak.com/news/where-to-fly-on-your-budget-kayak-explore> | [e] |
| F16 | KAYAK: términos (EE. UU., Book with KAYAK, kayak.fr) | <https://www.kayak.com/terms-of-use> · <https://www.kayak.com/terms-of-use-book> · <https://www.kayak.fr/terms-of-use> | [e] |
| F17 | Kiwi.com: niños de 2 a 18 años y menores no acompañados | <https://www.kiwi.com/en/help/born-spaedborn-og-klapvogne-279/article/child-passengers-2-18-years-16> | [p] |
| F18 | Kiwi.com: servicios de protección ante incidencias | <https://www.kiwi.com/help/search/article/28?ui=webview> | [p] |
| F19 | Kiwi.com: el «travel hack» del transbordo por cuenta propia | <https://www.kiwi.com/help/search/article/131> | [p] |
| F20 | Kiwi.com: condiciones legales | <https://www.kiwi.com/en/pages/content/legal> | [p] (leído hasta el carácter 100.000 de 102.625) |
| F21 | Kiwi.com: tarifas | <https://www.kiwi.com/en/pages/content/fees> | [p] |
| F22 | Kiwi.com Nomad: prensa de 2018 y página de *travel hacks* | <https://travolution.com/articles/107970/kiwi-com-introduces-nomad-to-automate-users-multi-destination-routing> · <https://www.kiwi.com/en/cheap-flights/travel-hacks/> | [s] / [e] |
| F23 | Hopper: términos y condiciones | <https://www.hopper.com/legal/terms-and-conditions> | [p] (leído hasta el carácter 100.000) |
| F24 | Price Freeze de Hopper (prensa) | <https://thriftytraveler.com/hopper-launches-price-freeze-feature/> | [s] |
| F25 | Predicción de Hopper: blog de la empresa y prensa | <https://medium.com/@hopper_travel/waiting-is-the-hardest-thing-b340626ff123> · <https://www.phocuswire.com/AI-series-part-3-Hopper> | [e] / [s] |
| F27 | Omio en App Store (España) | <https://apps.apple.com/es/app/omio-trenes-buses-y-vuelos/id885372509> | [p] |
| F28 | Omio: preguntas frecuentes | <https://www.omio.com/faq> | [e] |
| F29 | Omio: condiciones de uso | <https://www.omio.co.uk/terms-of-use> | [e] (403 al cargarla) |
| F30 | Trainline Group: modelo de negocio | <https://www.trainlinegroup.com/what-we-do/business-model> | [p] |
| F31 | Trainline: tarjetas de descuento y fidelidad aceptadas en Europa | <https://support.thetrainline.com/en/support/solutions/articles/78000000465> | [e] (404 al cargarla) |
| F32 | Trainline: 16-25 Railcard | <https://www.thetrainline.com/trains/great-britain/railcards/16-25-railcard> | [e] |
| F33 | Northern: condiciones de su web de venta (la opera Trainline) | <https://www.northernrailway.co.uk/legal/booking-service-terms-conditions> | [e] |
| F34 | ORR: vendedores en línea y tarifas | <https://www.orr.gov.uk/monitoring-regulation/rail/passengers/consumer-law-investigation-and-enforcement/online-ticket-fees> | [e] |
| F35 | Hostelworld: Linkups | <https://www.hostelworld.com/linkups> | [p] |
| F36 | Blog de Hostelworld: funciones sociales (actualizado el 19/10/2026) | <https://www.hostelworld.com/blog/launching-the-solo-system-a-new-way-to-travel/> | [p] |
| F37 | Hostelworld: términos y condiciones | <https://www.hostelworld.com/hosteltermsandconditions/> | [p] |
| F38 | Hostelworld en App Store | <https://apps.apple.com/app/id348890820> | [e] |
| F39 | Portal Europeo de la Juventud: DiscoverEU, ronda de otoño de 2026 (actualizado el 05/10/2026) | <https://youth.europa.eu/news/discovereu-its-time-apply_en> | [p] |
| F40 | Portal Europeo de la Juventud: normas de DiscoverEU | <https://youth.europa.eu/discovereu/rules> | [e] (429 al cargarla) |
| F41 | Interrail: pases de un país (edad del pase Youth) | <https://www.interrail.com/en/interrail-passes/one-country-pass/poland> | [e] |
| F42 | Deutsche Bahn: Interrail con niños | <https://int.bahn.de/en/faq/children-interrail> | [e] |
| F43 | Comunidad de Interrail: edad mínima (30/08/2022) | <https://community.interrail.com/interrail-passes-41/minimum-age-for-young-travellers-7489> | [p] (respuestas de usuarios) |
| F44 | Polarsteps: versión de verano de 2026 (9/06/2026) | <https://www.polarsteps.com/news/polarsteps-launches-summer-2026-release-new-tools-for-planning-privacy-and-sharing> | [p] |
| F45 | Polarsteps: términos | <https://www.polarsteps.com/legal/terms> | [p] |
| F46 | Polarsteps: privacidad (niveles por viaje y seguidores sin cuenta) | <https://www.polarsteps.com/legal/privacy> | [e] |
| F47 | Wanderlog: términos | <https://wanderlog.com/terms> | [p] |
| F48 | Wanderlog en App Store | <https://apps.apple.com/app/id1476732439> | [e] |
| F49 | Lambus: viajes en grupo y Lambus PRO | <https://lambus.com/solutions/group> · <https://support.lambus.com/en/articles/4941701-about-lambus-pro> | [e] |
| F50 | Splitwise: términos | <https://www.splitwise.com/terms> | [p] |
| F51 | Splitwise: API para desarrolladores | <https://dev.splitwise.com/> | [p] |
| F52 | Tricount: funciones | <https://www.tricount.com/en/features> | [p] |
| F53 | Contiki: grupos y preguntas básicas | <https://www.contiki.com/en-ca/groups> · <https://www.contiki.com/en-sg/faq/the-basics> | [e] |
| F54 | Stanford FinGate: StudentUniverse | <https://fingate.stanford.edu/system/studentuniverse> | [e] |
| F55 | Changelog de Duffel: edad de los pasajeros menores de 18 (4/03/2020) | <https://changelog.duffel.com/announcements/you-should-now-give-the-age-of-passengers-under-18-when-creating-an-offer-request> | [p] |
| F56 | Freshfields: directrices del art. 28 del DSA (finales, 14/07/2025) | <https://technologyquotient.freshfields.com/post/102kv4s/dsa-decoded-6-the-european-commission-finalises-guidelines-on-the-protection-of> | [s] |
| F57 | Comisión Europea: acción coordinada sobre webs de reserva de alojamiento (versión en portugués) | <https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/enforcement-consumer-protection/coordinated-actions/accommodation-booking_pt> | [e] |
