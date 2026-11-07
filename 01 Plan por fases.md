---
tipo: plan
actualizado: 2026-11-07
---

# Plan por fases

Cada fase tiene un **entregable** y un **criterio de salida**. No se pasa a la siguiente sin cumplirlo, salvo decisión explícita registrada en [[Decisiones]].

Las fases 1 y 2 se solapan: las encuestas salen esta semana mientras sigue la investigación documental.

---

## Fase 0. Organización ✔

- Bóveda de Obsidian + repositorio Git (privado) con registro de hipótesis, evidencias, decisiones y dudas.
- Leyenda de fiabilidad (ver README).

**Criterio de salida:** cumplido el 07/11/2026.

---

## Fase 1. Conocimiento del problema (investigación documental)

Objetivo: saber qué es realmente difícil, para quién y por qué, antes de preguntar a nadie.

| Tarea | Nota | Estado |
|---|---|---|
| Autorización de salida de España para menores | [[Normativa - salida de España de menores]] | Primera ronda hecha |
| Políticas de edad de transportes (aéreo, tren, bus, coche compartido) | [[Proveedores - transporte]] | Primera ronda hecha |
| Políticas de edad de alojamientos (hoteles, albergues, plataformas) | [[Proveedores - alojamiento]] | Primera ronda; faltan Inturjoven, Hostelworld y cadenas |
| Actividades con restricción de edad (alquileres, deportes, ocio nocturno, festivales) | — | Pendiente |
| Marco legal del negocio (contratos con menores, datos, viajes combinados, agencia) | [[Marco legal del negocio]] | Primera ronda hecha |
| Normas de otros países frecuentes (Portugal, Francia, Italia, Reino Unido) | — | Pendiente |
| Alternativas actuales y competidores | [[Alternativas actuales y competidores]] | Lista de candidatos, sin investigar |
| Benchmark de Corner | [[Corner]] | Primera ronda hecha |
| Datos de mercado (población 16-17, frecuencia de viajes) | — | Pendiente: INE e INJUVE |

**Entregable:** [[Definición del problema]] actualizada y una *matriz de elegibilidad v0* (qué puede hacer un menor de 16-17 años con cada tipo de proveedor, con fuente y fecha).

**Criterio de salida:** cada uno de los seis problemas del enunciado tiene al menos una evidencia `VERIFICADO` o `OFICIAL-INDIRECTO`, o una duda registrada que explique por qué no se ha podido verificar.

---

## Fase 2. Validación con personas

Objetivo: medir frecuencia, gravedad y alternativas actuales. No buscar confirmar la idea.

1. **Pilotar** las encuestas con 3-5 personas de cada grupo (tiempo, preguntas que no se entienden).
2. **Acordar con el equipo los umbrales de decisión** del [[Plan de análisis]] *antes* de ver resultados.
3. **Publicar** [[Encuesta jóvenes 16-19]] y [[Encuesta padres y tutores]].
4. **Entrevistar** a 8-12 personas (mitad jóvenes, mitad padres) con el [[Guion de entrevistas]].
5. **Analizar** y registrar cada resultado como evidencia.

**Entregable:** informe de validación en `30 Validación/Resultados/`.

**Criterio de salida:** mínimo orientativo de 100 respuestas de jóvenes (al menos 50 de 16-17 años), 50 de padres y 8 entrevistas, y cada hipótesis de problema (H-01 a H-07) marcada como *apoyada*, *refutada* o *sin datos suficientes*.

---

## Fase 3. Análisis de las demos del equipo

Cuando lleguen, cada demo se analiza por separado con la [[Plantilla análisis de demo]], sin compararla todavía con nada.

**Criterio de salida:** dos fichas completas y una lista de elementos aprovechables, cada uno ligado a una hipótesis o evidencia.

---

## Fase 4. Propuesta individual

Completar [[Propuesta individual v0]] con lo aprendido en las fases 1-3. Cada decisión de producto debe citar evidencias.

**Criterio de salida:** propuesta defendible en 10 minutos, con los riesgos principales y lo que falta por validar.

---

## Fase 5. Puesta en común con el equipo

Comparar propuestas con criterios acordados (dolor validado, viabilidad legal, coste de construir, modelo de ingresos). Registrar la decisión en [[Decisiones]].

---

## Fase 6. MVP manual antes del código

Antes de programar: organizar a mano 5-10 viajes reales (formulario + WhatsApp + hoja de proveedores verificados) y ver si alguien paga o se compromete. Solo después se decide qué automatizar.
