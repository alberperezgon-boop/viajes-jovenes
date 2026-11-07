---
tipo: benchmark
metodo: análisis funcional de caja negra (fuentes públicas + REA sobre páginas web públicas)
actualizado: 2026-11-07
---

# Corner: análisis funcional (ingeniería inversa legítima)

Complementa a [[Corner]]. Objetivo: entender **qué hace** Corner y **cómo se mueve** el usuario, para **adaptar** principios a nuestro problema. No es un clon.

## Límites del análisis

- **Las condiciones de Corner prohíben** «descifrar, descompilar, desensamblar o hacer ingeniería inversa» de su software y acceder con rastreadores o herramientas de minería de datos (`VERIFICADO`, `/legal/terms`, leído el 07/11/2026). La ley europea solo permite descompilar para lograr compatibilidad entre programas, no para replicar funciones.
- Por eso **no** se descompiló la app, **no** se leyeron sus paquetes de JavaScript y **no** se capturó su API.
- Sí se usó **REA** para inspeccionar, como lo haría un navegador, la estructura y el texto accesible de **6 páginas públicas** de corner.inc, una a una y sin automatizar la navegación. Evidencias REA: `ev_43e87be6…` (portada), `ev_c5ef8a99…` (lista pública), `ev_81df42f3…` (guías), `ev_f3597b14…` (legal), `ev_37009dc9…` (condiciones), `ev_43826c0c…` (privacidad).
- Las capturas de pantalla son solo de referencia y **no** se guardan en el repositorio.
- No se recogen nombres de usuarios de Corner.

## 1. Fuentes

| Fuente | Qué aporta | Etiqueta |
|---|---|---|
| Ficha de la App Store (EE. UU. y España) | Funciones, edad, datos recogidos, reseñas | VERIFICADO |
| Apple, «Meet the Developer» y «Apps We Love» | Principios de los fundadores, resúmenes con IA, etiquetas en tendencia, listas privadas | VERIFICADO (editorial de Apple) |
| corner.inc: portada, `/guides`, `/list/{id}` (REA) | Rutas web públicas, guías por ciudad, listas públicas, actividad | VERIFICADO |
| corner.inc: `/legal/terms` y `/legal/privacy` (REA) | Edad mínima, prohibiciones, usos de IA, datos | VERIFICADO |
| Prensa (Business Insider vía agregadores) | Financiación, usuarios, búsqueda con IA | SECUNDARIA |

## 2. Inventario de pantallas

**App (iOS)**, deducido de fuentes públicas, no observado directamente:

| ID | Pantalla | Propósito | Evidencia | Confianza |
|---|---|---|---|---|
| S01 | Registro con teléfono y código SMS | Alta de cuenta | Reseñas españolas se quejan de que exige teléfono | Alta |
| S02 | Encontrar amigos con los contactos | Arranque social | Privacidad: usa los contactos para ver quién está en Corner | Alta |
| S03 | Mapa interactivo | Ver sitios de amigos y locales; «localízame» | Apple; botón «Locate me» en la lista web | Alta |
| S04 | Ficha de lugar | Resumen con IA del ambiente («¿sirve para una primera cita?»), fotos, enlaces a Instagram y web, guardar | Apple; privacidad; lista web | Alta |
| S05 | Guardar desde «Compartir» | Enlace de TikTok o Instagram → la IA extrae el sitio → pin | Ficha de la tienda; privacidad | Alta |
| S06 | Listas | Públicas o privadas, con notas y etiquetas propias | Apple; privacidad | Alta |
| S07 | Perfil | Mapa personal y listas; enlace para la biografía | Ficha de la tienda; rutas `/{usuario}` | Alta |
| S08 | Actividad | «X añadió un sitio», «X creó una lista» | Página de guías (REA) | Media |
| S09 | Búsqueda con IA y agente de chat | Preguntas en lenguaje natural | Prensa; privacidad («in-app AI agent») | Media |
| S10 | Categorías con filtros de colores | De toda la vida, recién abiertos, etiquetas en tendencia | Apple | Media |
| S11 | Notificaciones, publicaciones y comentarios | Interacción social | Lista de datos que se borran al eliminar la cuenta | Media |

**Web pública** (observada con REA):

| ID | Ruta | Qué hay |
|---|---|---|
| W01 | `/` | Lema «not your mom's map», «cero anuncios, cero *influencers*», 350.000 usuarios en más de 400 ciudades, listas destacadas, equipo |
| W02 | `/guides` y `/guides/{ciudad}` | «Recomendaciones de la generación Z, para la generación Z». Guías por ciudad con contador: **Lisboa es la primera (482)**, Barcelona 130, Madrid 110. Actividad reciente y escritores |
| W03 | `/list/{uuid}` | Lista pública con mapa, «Locate me», cada sitio con «Save to Corner», enlaces a Instagram y web, y botón de descarga |
| W04 | `/{usuario}` | Perfil público |
| W05 | `/place/{id}` | Ficha pública de lugar |
| W06 | `/legal/terms`, `/privacy`, `/dmca` | Condiciones |

## 3. Flujos

```
F01 Guardar un sitio visto en TikTok (≈3 toques)
    Compartir en TikTok → S05 la IA identifica el sitio → pin en S03 → (opcional) añadir a S06
    límite: enlace sin sitio claro; varios sitios en un vídeo
F02 Descubrir
    S03 mapa → S10 filtro o etiqueta → S04 ficha con resumen → guardar
F03 Círculo social
    S01 registro → S02 contactos → seguir → sitios de amigos en S03 y S08
F04 Compartir una lista (bucle de crecimiento)
    S06 lista → enlace web W03 → quien lo recibe la ve sin la app → «Save to Corner» → descarga
F05 Captación por buscadores
    W02 guía de ciudad → lista → descarga
F06 Búsqueda con IA
    S09 pregunta → solo devuelve sitios que algún usuario ha guardado
```

## 4. Modelo de datos inferido

| Entidad | Campos | Evidencia | Confianza |
|---|---|---|---|
| Usuario | nombre, usuario, teléfono, correo, redes sociales, foto | Privacidad («Account and Profile Information») | Alta |
| Lugar | nombre, coordenadas, categoría, enlaces, resumen IA, fotos, etiquetas | Ficha W05; Apple; privacidad (descripciones generadas) | Alta |
| Guardado | usuario, lugar, nota, etiquetas propias, fecha | Privacidad («places, notes, and custom tags») | Alta |
| Lista | id (uuid), dueño, título, visibilidad, lugares | Ruta `/list/{uuid}`; Apple (listas privadas) | Alta |
| Seguimiento | seguidor, seguido | Privacidad («follow relationships») | Alta |
| Publicación y comentario | usuario, lugar, texto, fotos | Privacidad | Media |
| Notificación | — | Privacidad | Media |
| Coincidencia de contacto | contacto → usuario | Privacidad | Alta |

## 5. Recomendación: lo declarado y lo supuesto

- **Declarado por Corner** (privacidad, `VERIFICADO`): usa IA y aprendizaje automático para analizar **preferencias, intereses, ubicación o movimientos** y recomendar lugares a partir del contenido de los usuarios. También usa IA para resumir reseñas, categorizar, generar descripciones de lugares, elegir fotos y analizar fotos (por ejemplo, la luz).
- **Supuesto** (`HIPÓTESIS`, ver A-1 a A-4 en [[Corner]]): combinación de filtrado colaborativo con peso de la red social, y búsqueda semántica sobre contenido propio.

## 6. Hallazgos que nos afectan directamente

1. **Edad:** las condiciones admiten desde 13 años con aceptación de los padres; la privacidad dice que el servicio «no está dirigido a menores de 17»; la App Store lo clasifica 16+ (17+ en algún país). **Corner no está pensado para menores**, y eso es justo nuestro segmento.
2. **Mundo cerrado:** «cada lugar tiene que añadirlo alguien que lo quiera lo bastante como para compartirlo» (Eliza Wu, en Apple). Empezaron con el mapa vacío.
3. **Fricción de registro:** el teléfono obligatorio genera rechazo en reseñas españolas.
4. **Crecimiento por enlaces y guías:** las listas se ven en la web sin la app (F04) y las guías por ciudad captan desde buscadores (F05).

## 7. Lo que no se puede ni se debe copiar

Su red de usuarios y su contenido, su base de lugares, sus guías, su marca y su estética (objetos 3D, logotipo cromado), y los textos de su app y su web.

## 8. Qué adaptamos → [[Funciones adaptadas de Corner]]

La matriz completa está en `corner-funciones.csv`.
