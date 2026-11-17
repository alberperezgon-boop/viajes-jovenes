---
tipo: revisión
fecha: 2026-11-17
relacionado: "[[Mejoras 17-11 - competencia y estética]], [[Benchmark UX-UI]]"
---

# Revisión del 17/11/2026: claridad, ruido y lenguaje

## Cómo se ha medido

Recorrido automático por 15 pantallas en Chrome sin ventana. En cada una se cuentan palabras, cajas, avisos, botones, enlaces y etiquetas de fuente, y se busca en el texto visible: códigos internos, jerga, mezcla de «tú» y «vosotros», e inglés.

| Pantalla | Palabras | Botones | Enlaces | Etiquetas de fuente |
|---|---|---|---|---|
| Lista de destinos | 2.212 | 41 | 22 | — |
| Transporte | 1.079 | 39 | 33 | 22 |
| Papeleo (destino) | 1.495 | 12 | 31 | — |
| Modo padres | 905 | 9 | 20 | 20 |
| Destino «sin confirmar» | **868 → 92** | 1 | — | — |

## Arreglado hoy (D-29)

| Problema | Dónde | Cómo queda |
|---|---|---|
| Código interno **«(Q-20)»** a la vista | Lista, Papeleo, padres, Mi viaje y «¿Cómo va esto?» | Quitado |
| Etiquetas en bruto **«OFICIAL-INDIRECTO»**, **«SECUNDARIA»** | Papeleo y destinos sin confirmar | Siempre traducidas: «Fuente oficial», «Web de la empresa», «Lo preguntamos nosotros», «Otra fuente (guía o prensa)», «Sin confirmar» |
| **«Regla del motor: lo que no está verificado…»** | Destinos sin confirmar | «En GoLiveIt, lo que no hemos podido comprobar sale como “sin confirmar”, nunca como permitido. Para confirmarlo nos falta…» |
| **«El grupo está contento al 100 % y quien menos, al 100 %»** | Cada tarjeta | «Os pega por: playa y ambiente joven.» |
| «Vuelo 32 €» aunque se vaya en bus; «5 vuelos» con un bus dentro | Tarjeta | «Ida y vuelta», «5 formas de ir», «viaje, dormir y gastos» |
| «Entra ✓», «Tope 250 €», «+30 €» | Tarjeta | «Entra en la pasta ✓», «Vuestra pasta 250 €», «Os pasáis 30 €» |
| «—» en lugar del aeropuerto | Tarjeta de Marbella | Ya no sale |
| Notas de aerolíneas en inglés y cortadas («…Contacto: el canal prin…») | Transporte | Fuera; queda la norma clara |
| «Solo desde los 12 años» (se entendía «únicamente») | Transporte | «Sin adulto desde los 12 años» |
| «Normativa de cada una» | Transporte | «Lo que dice cada compañía» |
| Mezcla «tu edad / tu familia» con «os dejan» | Portada y cabecera | Todo en plural: «vuestra edad», «vuestras familias» |
| Leyenda del mapa con otras palabras («Os sale», «No os dejan») | Mapa | Las mismas etiquetas que en toda la app |
| **«¿Cómo va esto?» era una ficha técnica** (pesos del 62 %, token de Mapbox) y estaba desfasada | Cabecera | Primero para los jóvenes: los tres pasos, qué significa cada etiqueta y qué es real y qué de ejemplo. Lo técnico, plegado en «Para el equipo» |
| 868 palabras de papeleo general en un destino sin confirmar | Destinos sin confirmar | Plegado en «Papeleo general (por si os sirve)» |
| Frase enrevesada sobre Praga | Destinos nuevos sin confirmar | Reescrita |

**Tono:** está bien para 16-17 años («¿qué os mola?», «pasta», «os pega»). Hay que mantener el «vosotros» para el grupo y el «tú» solo en lo que hace cada uno (DNI, cartas). El modo padres habla en tercera persona («Pueden»), y está bien así.

## Opciones para que no sea lioso ni lleve a malentendidos (por impacto)

| # | Opción | Qué resuelve | Tamaño |
|---|---|---|---|
| 1 | **Lista más corta:** los destinos que no salen (21 tarjetas con foto y explicación) pasan a una lista plegada de una línea cada uno: «Praga · sin confirmar: falta la norma de entrada» | La lista tiene 2.212 palabras; lo útil son los que sí salen | Pequeño |
| 2 | **Transporte por orden:** primero «Elegid cómo ir» (las tarjetas). Detrás, plegado, «Lo que dice cada compañía». Y en un único bloque «Precios de verdad» lo externo: Kayak, Google, Skyscanner, precio real y avisos | 39 botones y 33 enlaces en una sola pestaña | Medio |
| 3 | **Papeleo por pasos:** primero solo lo obligatorio para ese destino, con fecha (como el calendario del modo padres); el resto, en «Ver más» | 1.495 palabras; cuesta saber qué es imprescindible | Medio |
| 4 | **Un solo sello «EJEMPLO»** en precios y horarios, en vez de repetir «precios de ejemplo» en cada recuadro | Menos texto y que no se confunda lo real con lo de ejemplo | Pequeño |
| 5 | **«Reservar (simulación)»** en el botón y en la barra, y «Elegir» en vez de «Reservar» donde no se reserva nada | Que nadie crea que ha reservado de verdad | Pequeño |
| 6 | **Fuentes más discretas:** un icono de confianza (oficial, empresa, equipo, otra) y «Ver fuente» al tocarlo, en vez de la etiqueta en mayúsculas en cada línea | 20-22 etiquetas por pantalla en Transporte y padres | Pequeño |
| 7 | **Explicar «Sí, pero ojo» donde aparece la primera vez** (una línea: «podéis, con papeles o condiciones; mirad abajo») | Se puede leer como «arriesgado» | Pequeño |
| 8 | **Mini glosario** al pasar el ratón: check-in, escala por vuestra cuenta, TSE, permiso de viaje, albergue | Palabras que un chaval de 16 puede no conocer | Pequeño |
| 9 | **Recorrido de bienvenida** de 3 pasos la primera vez (dónde están las etiquetas, el modo padres y Mi viaje) | Mucha función nueva sin presentar | Medio |
| 10 | **Versión móvil** | El público usa el móvil | Grande |

**Recomendación:** hacer **1, 4, 5, 6 y 7** juntas, porque son pequeñas y quitan la mayor parte del ruido. Después, **2 y 3**.
