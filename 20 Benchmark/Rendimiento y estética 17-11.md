---
tipo: revisión
fecha: 2026-11-17
relacionado: "[[Revisión 17-11 - claridad, ruido y lenguaje]], [[Mejoras 17-11 - competencia y estética]]"
---

# Rendimiento y estética (17/11/2026)

## El lag: qué era y cómo se ha medido

Medido con Chrome sin ventana (perfil de CPU vía CDP). Ese Chrome dibuja el mapa por software, así que en un ordenador con tarjeta gráfica los números absolutos son menores; lo que vale es la comparación.

| Momento | Antes | Después |
|---|---|---|
| App quieta en la lista (5 s, ya cargada) | 2.433 ms de CPU (~48 %, sin parar nunca) | 160-185 ms (~3 %) |
| Mover el deslizador de la pasta | 1.763 ms | ~300 ms |
| Cambiar de pestaña en un destino | 22 tareas largas (2 s bloqueada) | 0-4 tareas largas |
| Escribir el plan | 6 tareas largas | 0-3 |

**Causas y arreglos:**

1. **Las líneas del mapa se animaban para siempre:** 11 repintados por segundo del mapa entero, aunque nadie tocara nada. Ahora se animan 3 s después de cada cambio y se quedan quietas; también paran con la pestaña oculta.
2. **Colores de los marcadores:** cada marcador leía el CSS (`getComputedStyle`), lo que forzaba a recalcular estilos unas 40 veces por redibujado. Ahora se guardan en caché.
3. **Deslizador de la pasta:** cada pequeño movimiento rehacía la lista entera y los 40 marcadores. Ahora la lista se redibuja como mucho una vez por fotograma, y el mapa cuando dejas de mover.
4. **Iconos:** cada bloque nuevo se recorría nodo a nodo buscando emojis. Ahora primero se comprueba de un vistazo si tiene alguno.
5. **Avión de la tarjeta de transporte:** la línea discontinua se anima tres veces y para.

**Lo que queda:** al volar a un destino o volver a Europa, el mapa mueve unos 40 marcadores HTML en cada fotograma. Es la opción 6 de abajo.

## Estética: aplicado (D-31)

- **Mapa a juego con el tema:** en modo oscuro, mapa de calles oscuro (OpenFreeMap «dark», con la misma atribución) teñido con la paleta de la app: tierra azul marino, agua más oscura y carreteras en azul suave. Antes era blanco y deslumbraba. Se cambia solo si cambia el tema del sistema.
- **Menos texto en el mapa alejado:** los nombres de regiones (Baviera, Sajonia…) solo salen al acercar.
- **Botones en oscuro:** los secundarios dejan de ser blancos y pasan a superficie con borde; el naranja queda solo para la acción principal. La barra de búsqueda de alojamiento, igual.
- **Cabecera:** lema en texto normal y «Demo» como distintivo naranja, en vez de mayúsculas monoespaciadas.
- **Barra de reserva:** «Os faltan 2 cosas» en lugar de la frase repetida, y el botón desactivado se lee bien (antes, naranja apagado y marrón).
- **Botones:** pequeña respuesta al pulsar.

## Opciones siguientes (por elegir)

| # | Opción | Qué mejora | Tamaño |
|---|---|---|---|
| 1 | Selector de mapa (Calles / Mapa simple / Mapbox) dentro del mapa, fuera de la cabecera | Cabecera con 3 botones en vez de 6; «Mapbox» es jerga para el público | Pequeño |
| 2 | Etiquetas del mapa sin solaparse: nombres de los sitios al pasar el ratón o al acercar | Hoy se pisan en el centro de Lisboa | Pequeño |
| 3 | Rótulos «VUESTROS VIAJES», «QUIÉN VA»… en texto normal | Menos aire técnico; más cercano a 16-17 años | Pequeño |
| 4 | Tarjetas de destino más compactas (foto más baja, presupuesto en una línea) | Se ven más destinos sin desplazarse | Medio |
| 5 | Repaso del modo claro (contraste y mapa con la paleta) | Hoy solo se ha pulido el oscuro | Medio |
| 6 | Marcadores del mapa dibujados por el propio mapa (WebGL) en vez de 40 elementos HTML | Mover y volar por el mapa más fluido; es el lag que queda | Medio |
| 7 | Versión móvil | El público usa el móvil | Grande |

## Hecho el 23/11 (D-32)

Opciones **1, 2, 3 y 6** aplicadas. Al volar por el mapa: abrir un destino, de 2.358 a 581 ms de CPU; volver a Europa, de 2.869 a 399 ms; ninguna tarea larga. Quedan la 4 (tarjetas más compactas), la 5 (modo claro) y la 7 (móvil).
