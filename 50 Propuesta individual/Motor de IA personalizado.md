---
tipo: propuesta
fecha: 2026-11-08
pregunta: "¿Un motor de IA personalizado puede ir bien?"
relacionado: "[[Arquitectura del recomendador]], [[Informe crítico (segunda iteración)]], [[Integración de proveedores y marketplace]]"
---

# ¿Un motor de IA personalizado para GoLiveIt?

## Respuesta corta

**Sí, pero como copiloto y no como juez.** La IA tiene que entender lo que pide el grupo, personalizar el orden y explicar. **Lo que se puede o no se puede hacer con 15, 16 o 17 años lo deciden reglas con fuente**, nunca el modelo. (PROPUESTA)

Motivos:
- Un modelo puede **inventarse una norma** (por ejemplo, decir que un albergue acepta a menores de 16). En un producto para menores, un solo error así rompe la confianza de las familias y puede tener consecuencias legales.
- Las normas cambian y tienen fecha. Con reglas se puede auditar la fuente y la fecha de cada «sí» y cada «no». Un modelo no da esa trazabilidad.
- Corner usa la IA para buscar y resumir (Claude, según Business Insider, SECUNDARIA), no para dar permisos. Es el mismo reparto que proponemos.

## Qué haría la IA y qué no

| Tarea | ¿IA? | Cómo |
|---|---|---|
| Entender «4 amigos de 17, Sevilla, 250 €, playa» | **Sí** | Un LLM rellena un formulario cerrado (personas, edades, origen, presupuesto, días, gustos). La edad sale siempre del perfil, no del texto |
| Decidir si un vuelo, alojamiento u ocio está permitido por edad | **No** | Motor de reglas con fuente y fecha (como en el Planner) |
| Ordenar los destinos y los planes según los gustos del grupo | **Sí, poco a poco** | MVP: fórmula publicada (gustos 62 % + presupuesto 38 %, media y persona menos contenta). Después: *embeddings* y aprendizaje del orden con datos reales |
| Explicar «por qué este destino» | **Sí** | El LLM redacta solo a partir de los datos que le da el motor; se comprueba que no añade normas nuevas |
| Responder dudas legales («¿me dejan entrar a una discoteca en Lisboa con 16?») | **Solo con fuentes** | Busca en nuestra guía verificada (41 puntos) y cita el punto; si no está, responde «pendiente», no improvisa |
| Leer políticas nuevas de albergues y aerolíneas | **Sí, con revisión humana** | La IA propone una regla y una persona la valida antes de publicarla |

## ¿«Personalizado» quiere decir entrenar un modelo propio?

**No hace falta, al menos al principio.**

- **Entrenar o ajustar un modelo propio** necesita miles de viajes y valoraciones que no tenemos. Es caro y no mejoraría lo importante, que son las normas.
- **Lo que sí conviene** es usar un modelo potente vía API (por ejemplo, Claude) con:
  1. **Salidas estructuradas**: el modelo devuelve un JSON validado, no texto libre.
  2. **Recuperación sobre nuestra base** (RAG): solo puede citar reglas y puntos de la guía verificados.
  3. **Un validador** que comprueba que cada afirmación de edad que aparece en la respuesta existe en la base de reglas.
- El «personalizado» viene de **nuestros datos**: reglas por edad, la guía legal, los gustos del grupo y el feedback de los viajeros («¿te dejaron con 17? ¿qué te pidieron?»). Eso es lo que no puede copiar un competidor.

## Fases

| Fase | Motor | IA |
|---|---|---|
| Demo (hoy) | Reglas + fórmula | Ninguna: el intérprete del Planner usa reglas simples |
| MVP | Reglas + fórmula | LLM para entender la consulta y redactar explicaciones, con validador |
| Con usuarios | Reglas + *embeddings* de gustos | Recomendación de planes parecidos a los guardados por jóvenes de tu edad |
| Con datos | Reglas + aprendizaje del orden | Personalización por grupo; **la elegibilidad sigue en reglas** |

## Riesgos y cómo se controlan

- **Datos de menores:** no enviar al modelo nombres ni datos personales, solo edades y gustos; sin publicidad basada en perfiles (DSA art. 28).
- **Alucinaciones:** validador de reglas y respuesta «pendiente» por defecto.
- **Coste:** una consulta cuesta céntimos, pero con muchos usuarios conviene guardar en caché las respuestas por destino.
- **Dependencia de un proveedor:** el formulario cerrado permite cambiar de modelo sin tocar el motor de reglas.

## Cómo probarlo pronto

1. Conectar el intérprete del Planner a un LLM (solo la parte de entender la consulta) y comparar con el intérprete de reglas usando 20 frases reales de la encuesta.
2. Medir: datos bien extraídos, edades correctas y cero normas inventadas.
3. Enseñarlo en las entrevistas: ¿las familias se fían más si cada «sí» lleva fuente?
