---
tipo: metodologia
estado: propuesta; hay que acordar los umbrales con el equipo ANTES de ver resultados (D-06)
actualizado: 2026-11-07
---

# Plan de análisis de las encuestas

**Por qué escribirlo antes:** si los umbrales se deciden después de ver los datos, cualquier resultado acaba pareciendo una confirmación. Los números de abajo son una **propuesta** para discutir con el equipo; lo importante es fijarlos antes de abrir los resultados.

Referencias: «J-P» = [[Encuesta jóvenes 16-19]], «F-P» = [[Encuesta padres y tutores]].

## 1. Métricas

| # | Pregunta de negocio | Métrica | Fuente | Hipótesis |
|---|---|---|---|---|
| M1 | ¿Es frecuente? | % de 16-17 con al menos un viaje independiente en 12 meses; % con un viaje que no salió o cambió | J-P6, J-P22 | H-01 |
| M2 | ¿Qué lo impide? | Motivo principal de los viajes que no salieron | J-P24 | H-02, H-04 |
| M3 | ¿Es cosa de la edad? | Problemas «por edad» (las cuatro primeras opciones de J-P19) en 16-17 frente a 18-19 | J-P19 por edad | H-08 |
| M4 | ¿Qué barrera pesa más? | % con problemas de alojamiento frente a transporte | J-P19 | H-03 |
| M5 | ¿Cómo lo resuelven hoy? | % donde reservó un mayor de edad o los padres; herramientas usadas | J-P11, J-P15, J-P18, F-P9 | alternativas |
| M6 | ¿Quién paga? | Distribución de quién pone el dinero | J-P14, F-P10 | H-14 |
| M7 | ¿Por qué dicen no los padres? | Motivo principal | F-P17 | H-04 |
| M8 | ¿Conocen la norma? | % que acierta F-P19 | F-P19 | H-07 |
| M9 | ¿Qué quieren los padres? | Condiciones mínimas y papel deseado | F-P22, F-P26 | H-12 |
| M10 | ¿Hay dinero? | Gasto real en servicios parecidos | F-P23, F-P24 | H-15 |
| M11 | Intención (débil) | Reacción al servicio descrito | J-P31, F-P25 | solo orientativo |

## 2. Umbrales de decisión propuestos

| Si… | Entonces… |
|---|---|
| M1: **menos del 20 %** de 16-17 viajó o intentó viajar en 12 meses | El problema es poco frecuente. Valorar ampliar a 18-21 o cambiar de problema |
| M2: los motivos de edad (alojamiento, transporte o actividad por edad, falta de documentos) son el principal en **menos del 20 %** de los viajes que no salieron | La edad no es el problema central. Mirar si el núcleo es la confianza de los padres (M7) o el dinero |
| M3: los problemas por edad son **parecidos** en 16-17 y 18-19 (diferencia menor de 10 puntos) | Las «barreras de edad» no explican el dolor |
| M4: alojamiento **por encima de** transporte | Apoya H-03: el producto empieza por el alojamiento |
| M7: el motivo principal de los padres es la confianza o la falta de información sobre el plan en **más del 40 %** | El cliente con más dolor puede ser el padre. Explorar el «plan para aprobar» (H-12) |
| M8: **menos del 50 %** acierta F-P19 | Apoya H-07: la información documental tiene valor |
| M10: la mayoría **no gasta nada** en servicios parecidos | Dudar mucho de un modelo de pago directo de los padres |

## 3. Cómo leer la intención de pago (M11)

- La gente dice que pagaría mucho más de lo que luego paga. **No se usa M11 para calcular ingresos.**
- Uso permitido: comparar grupos (¿los padres de 16-17 responden distinto que los de 14-15?) y detectar rechazo claro («no lo usaría» por encima del 50 %).
- La evidencia de pago de verdad llega en la fase 6: **preventa o señal** en el MVP manual.

## 4. Calidad de los datos

- **Muestra mínima orientativa:** 100 jóvenes (al menos 50 de 16-17) y 50 padres. Con 50 respuestas el margen de error ronda **±14 puntos** al 95 %, y además la muestra **no es representativa** (la difundimos nosotros). Sirve para orientar, no para dimensionar el mercado.
- **Limpieza:** eliminar respuestas de menos de 2 minutos, incoherentes (P6 = 0 con respuestas en la sección 3) o duplicadas.
- **Sesgos a vigilar y cómo se mitigan:**

| Sesgo | Mitigación |
|---|---|
| Autoselección (responden los interesados en viajar) | Título neutro; difusión por canales variados; anotar el canal |
| Deseabilidad social | Anonimato; «Prefiero no decirlo» |
| Memoria | Ventana de 12 meses; preguntas sobre el *último* viaje |
| Orden de las opciones | Orden aleatorio |
| Pregunta dirigida | Ninguna solución hasta el final; sin preguntas de «¿estás de acuerdo?» |
| Hipotético frente a real | Comportamiento pasado primero; intención marcada como débil |
| Red propia | No más del 30 % de las respuestas de un mismo centro o grupo |

## 5. Entregable

`30 Validación/Resultados/Informe de validación.md` con: tamaño y perfil de la muestra, cada métrica con su n, qué umbral se cruza, qué hipótesis cambian de estado, citas literales de las preguntas abiertas y las limitaciones. Cada resultado se añade a [[Evidencias]].
