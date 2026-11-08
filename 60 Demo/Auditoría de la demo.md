---
tipo: auditoría
demo: GoLiveIt v4
fecha: 2026-11-08
metodo: lectura completa del código + recorridos con REA (320 px claro, 1280 px oscuro, recarga de página)
---

# Auditoría de la demo GoLiveIt (08/11/2026)

Revisión hecha contra el registro de la bóveda ([[Hipótesis]], [[Evidencias]], [[Decisiones]], [[Dudas pendientes]]). Evidencias REA: `ev_b8349106…` (antes, 320 px), `ev_9a9b7357…` (después, 320 px con recarga), y un recorrido de escritorio en oscuro.

## Errores encontrados y corregidos

| # | Error | Gravedad | Corrección |
|---|---|---|---|
| 1 | Al cambiar de destino **se borraba lo guardado** sin avisar | Alta | Guardados y tareas hechas se conservan por destino |
| 2 | Textos con «para **Tú**», «Viajar con **Tú**», «a nombre de **Tú**» | Media | Concordancia: «para ti», «contigo», «a tu nombre», «si vales tú» |
| 3 | Discotecas de Lisboa, fiestas de Berlín y discotecas de Londres: con un adulto en el grupo seguían saliendo «no permitido» para menores de 16 | Media | Con un mayor de edad pasan a «con requisitos» (Londres sigue «sin verificar» porque decide cada local) |
| 4 | Afirmación sin fuente: «En España sigue siendo a los 18» | Media | Eliminada (regla D-02: todo dato con fuente) |
| 5 | Lista de ocultos decía «por vuestra edad» aunque algunos están **sin verificar** | Media | «ocultos por edad o sin verificar» |
| 6 | Enlace de Kayak con «/1adults» al viajar solo | Baja | Sin segmento de pasajeros cuando es una persona |
| 7 | Se podía poner la vuelta antes que la ida | Baja | La vuelta no puede ser anterior; si mueves la ida, la vuelta se ajusta |
| 8 | Erratas: «volais» y «65 € ·2 alojamientos» | Baja | Corregidas |
| 9 | Tras guardar dentro de una ficha o cerrarla, el foco del teclado se perdía | Baja | El foco vuelve al botón o a la tarjeta que abrió la ficha |
| 10 | El nombre «Tú» era editable y aparecía repetido en el grupo | Baja | «Tú» fijo; solo se editan edad, nacionalidad y residencia |

## Mejoras aplicadas

- **Dato para el pitch:** bajo el contador, «Si todos tuvierais 18: X alojamientos y 5 de 5 destinos. La edad os quita N alojamientos». Con 15 años y amigos de la misma edad, **la edad quita 14 de 15 alojamientos** (H-03).
- **Cambiar de destino** desde Destino (botones LIS · PAR · ROM · BER · LON) y desde Vuelos (selector «A»).
- **Avisos vacíos con solución:** «Probar con alguien de 18» cuando no hay alojamiento o vuelo.
- **La demo recuerda tu sesión** (edad, compañía, destino, guardados, fechas) al recargar, en el navegador de cada persona. Botón **«Reiniciar la demo»** en las notas, útil antes de enseñarla.
- **Aviso superior ocultable** y cabecera más compacta en móviles pequeños (320 px).
- **Rendimiento:** las fotos se cargan una sola vez y no se vuelven a decodificar al cambiar la edad.
- Hint de vuelos correcto para grupos de mayores de edad y recordatorio de la declaración de permiso de viaje.

## Pendiente (no se puede resolver en la demo)

- **Q-20 Portugal:** la autorización sigue marcada «con requisitos» y con aviso de duda.
- **Roma y Berlín** no tienen albergue verificado en la ciudad (políticas de AIG y DJH de otras sedes).
- Precios, duraciones y rutas son de ejemplo; para datos reales haría falta una API de vuelos fuera del artefacto.
- **Q-21:** comprobar marca y dominio de GoLiveIt.
