---
tipo: diseño
estado: demo v0
actualizado: 2026-11-07
---

# Funciones adaptadas de Corner

De [[Corner - análisis funcional]] salen siete principios que trasladamos, con diseño propio, a nuestro problema. Se añaden dos funciones que Corner no tiene y que son nuestro diferencial. Todo es `HIPÓTESIS` hasta que se valide con usuarios.

| # | En Corner | En nuestra demo | Hipótesis |
|---|---|---|---|
| 1 | Compartir un TikTok → la IA guarda el sitio (F01) | **Pega un enlace o escribe un destino** y la demo detecta el destino. En la versión real, la IA solo *lee* el enlace; las reglas verificadas *deciden* | H-05 |
| 2 | Mapa con pines de amigos (S03) | **Mapa del destino con pines por estado** para la edad del grupo: verde (verificado), ámbar (con requisitos), rojo (no permitido), gris (sin verificar) | H-03, H-11 |
| 3 | Ficha con resumen del ambiente (S04) | **Ficha de requisitos** por viajero, con fuente, fecha y etiqueta de fiabilidad | H-19 |
| 4 | Solo sitios que un usuario ha guardado (F06) | **Mundo cerrado verificado:** lo no verificado sale en gris y no se puede añadir al plan | H-11, H-19 |
| 5 | Lista compartible por enlace web (F04) | **Plan compartible con los padres** sin que necesiten cuenta | H-12 |
| 6 | Filtros por categoría y etiquetas (S10) | Filtros **dormir / moverse / hacer** | — |
| 7 | Recomendaciones según gustos y guardados | Destinos ordenados por gustos y presupuesto, **explicando por qué** | — |
| 8 | Actividad del círculo (S08) | Experiencias de otros jóvenes de 16-17 (en la demo, **inventadas y marcadas así**) | H-13 |
| + | — | **Vista de padres con aprobación** | H-12 |
| + | — | **Lista de documentos por viajero** según edad, nacionalidad, residencia y destino | H-07 |

## Demo v1 (07/11/2026): cambios

Publicada en https://claude.ai/artifact/EdSSd8jeVzEPRUkui2Q42A (D-10).

- **Viajes al extranjero:** Lisboa, París, Roma, Berlín y Londres, con los datos de la web Ruta16 del compañero (etiqueta «Equipo»).
- **Guardar como en Corner:** se puede guardar cualquier sitio o vuelo, pero **solo lo verificado entra en el plan** que ven las familias.
- **Listas de viajeros** (inventadas) que se abren en el mapa con los sitios marcados por estado.
- **Vuelos:** buscador con enlaces a Google Flights, Skyscanner y Kayak (los precios se ven fuera) y **comparador de aerolíneas** por normas para menores, persona a persona.
- **Papeles por país:** pasaporte y ETA en Reino Unido, carta recomendada en Alemania, autorización en duda en Portugal (Q-20).
- **Familias:** separa lo que firman ellos de las condiciones que cumple el grupo.
- Estética de señalética de aeropuerto: panel de salidas, tarjeta de embarque y sellos.

## Lo que no se adapta

Registro con teléfono, importar contactos, agente de chat con IA y red social de seguidores (ver `corner-funciones.csv`).

## Reglas de la demo

- Los **datos de políticas son reales** y llevan la misma etiqueta que en [[Evidencias]] (fecha de consulta: 07/11/2026).
- **No** se comprueban rutas, horarios ni precios: solo políticas de edad.
- Lo que no está verificado aparece en gris, aunque lo más probable sea que esté permitido (por ejemplo, Renfe para 14-17 años, E-05b).
- Las experiencias de jóvenes y la detección de enlaces son **simuladas** y lo dicen en pantalla.
- Se enseña **al final** de las entrevistas, nunca antes, para no sesgar las respuestas (D-08).
