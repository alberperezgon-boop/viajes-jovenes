---
tipo: benchmark
actualizado: 2026-11-07
---

# Corner: benchmark conceptual

**Para qué lo estudiamos:** descubrimiento de lugares, mapas personales, recomendación social e IA. **No** para copiarlo: nada de su nombre, diseño, textos ni recursos (D-07).
**Método legítimo:** ficha de la tienda, prensa, ayuda y política de privacidad públicas, y uso normal de la app como usuario. Nada de *scraping* ni de ingeniería inversa.

## 1. Funcionalidades verificadas

Fuente: ficha de la App Store, leída el 07/11/2026 (`VERIFICADO`).

| Funcionalidad | Cómo la describen |
|---|---|
| Mapa personal | Fijar sitios en un mapa propio y crear listas |
| Guardar desde cualquier sitio | Compartir un enlace (Instagram, TikTok, Maps, webs) con la app y que lo convierta en un pin |
| Recomendaciones personalizadas | Aprende tus gustos a partir de **tus reseñas y tus guardados** |
| Social | Seguir a amigos y a otros exploradores y ver sus sitios |
| Objetivo declarado | Menos planificar y hacer scroll, más salir |
| Modelo | Gratis, «sin bots ni anuncios», sin compras dentro de la app |
| Público | **Clasificación por edad 16+**; categoría Redes sociales; chat y contenido de usuarios |
| Datos | Vinculados al usuario: nombre, teléfono, **contactos (usados para personalizar)**, fotos, uso y diagnóstico |
| Ritmo | Versión 5.22, con actualizaciones cada 1-3 semanas |

## 2. Datos de empresa (prensa, `SECUNDARIA`)

- Fundada en 2022 en Nueva York por Eliza Wu y Jake Xia, que además son la cara de la marca en redes.
- 3,75 M$ en dos rondas (Abstract Ventures, Tapestry, 1517 y Shreya Murthy, cofundadora de Partiful, como inversora particular). Total de **7,5 M$ en julio de 2026**, preparando una serie A.
- Más de 250.000 usuarios en 425 ciudades, sobre todo en Nueva York y Europa.
- **Búsqueda con IA** que entiende peticiones como «sitios para trabajar con portátil». Usaría Claude de Anthropic, entre otros modelos, sobre las publicaciones de usuarios y metadatos públicos. **Solo devuelve lugares que algún usuario de Corner ha guardado.**
- Un lugar entra en el mapa de Corner solo cuando un usuario lo guarda.
- Competidores citados: Beli (12 M$ hasta junio de 2025), Google Maps, Apple Maps y apps sociales de ubicación de amigos.

## 3. Hipótesis sobre su algoritmo (NO verificadas)

| # | Hipótesis | En qué nos basamos |
|---|---|---|
| A-1 | Las recomendaciones combinan **filtrado colaborativo** (gente con guardados parecidos) con un **peso extra para tu red** (amigos y contactos) | «Aprende de reseñas y guardados» + uso de contactos para personalizar |
| A-2 | La búsqueda con IA funciona como **búsqueda semántica sobre contenido propio**: convierten reseñas y metadatos en vectores y un modelo de lenguaje interpreta la petición y redacta la respuesta | «Pregunta en lenguaje natural» + «solo lugares de usuarios» |
| A-3 | El **arranque en frío** se resuelve con la importación de contactos y la captura de enlaces de TikTok e Instagram, que dan señales de gusto desde el primer día | Funcionalidades de importación |
| A-4 | La extracción del lugar a partir de un enlace usa un modelo de lenguaje o de visión, más una búsqueda en una base de lugares | «Usa IA para encontrar el sitio» |

Para contrastarlas sin trucos: probar la app como usuario, leer su política de privacidad y buscar entrevistas o charlas de los fundadores.

## 4. Principios que podríamos adaptar a nuestro problema (ideas originales, `HIPÓTESIS`)

| Principio de Corner | Adaptación a viajes de menores | Hipótesis |
|---|---|---|
| Capturar sin esfuerzo desde donde ya está el usuario | «Pega el TikTok de un destino y te digo si puedes ir con 16 años, qué hace falta y cuánto cuesta» | H-05 |
| **Mundo cerrado**: solo lugares que alguien ha guardado | Solo proveedores **con la política para menores verificada** (fuente y fecha). Lo no verificado no aparece como opción | H-11, H-19 |
| La confianza viene de tu círculo | Reseñas de **otros jóvenes de 16-17 que ya fueron** («me dejaron hacer check-in con la autorización») y visibilidad para los padres | H-13 |
| El mapa como lienzo de planificación | Plan de grupo en un mapa compartido, con lo que falta para cada persona (edad, autorización, pago) | H-06 |
| Clasificación 16+ y sin anuncios | Producto pensado para menores desde el principio: sin anuncios, datos mínimos, padres en el flujo | — |

## 5. Lo que NO deberíamos tomar

- **La red social como fin.** El valor de Corner es el descubrimiento social de sitios cotidianos (uso frecuente). Nuestro caso es un **viaje ocasional**: una red social basada en el uso frecuente probablemente no se sostendría (pocas sesiones al año). `INFERENCIA`
- Importar contactos de menores: es una fricción de privacidad difícil de justificar ante los padres.
- Desviarse hacia «una app de descubrimiento de sitios» y perder el problema original.

## Pendiente

- Probar la app como usuario y anotar observaciones aquí, con fecha.
- Leer su política de privacidad y sus condiciones (¿qué edad mínima exigen realmente?).
