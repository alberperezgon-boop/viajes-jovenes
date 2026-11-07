---
tipo: análisis de demo
demo: https://ruta16.netlify.app
recibida: 2026-11-07
metodo: REA (inspección de páginas públicas y recorrido del planificador con los cinco países)
---

# Análisis de demo: Ruta16 (web del compañero)

- **Autor:** compañero del equipo (autor de ruta16.netlify.app)
- **Recibida el:** 07/11/2026
- **Formato:** web pública multipágina en Netlify: inicio, Viajar (planificador), El problema, Datos, Checklist, Familias, Propuesta, Fuentes y Lista de espera. Modo claro y oscuro.
- **Cómo se probó:** con REA, inspeccionando el texto accesible de 8 páginas y recorriendo el planificador con 2 viajeros de 16 años hacia Portugal, Francia, Italia, Alemania y Reino Unido. Evidencias: `ev_781a8057…` (inicio), `ev_5f2c21f6…` (fuentes), `ev_8dd61bb7…` (planificador), `ev_e616ad4f…` (propuesta), `ev_fe98c9dd…` (datos), `ev_8661b09d…` (resultado de Portugal), `ev_f666b9c6…` (resultados de los otros cuatro países).

> Analizada por separado, sin compararla con mi propuesta hasta el punto 6.

## 1. Qué problema intenta resolver

- **Según la demo:** «Tú planeas el viaje. Tus padres firman. Ruta16 os dice qué hace falta». Reúne en un solo sitio, con fuente, las edades mínimas de aerolíneas y alojamientos y el permiso de viaje de Interior, **para viajes al extranjero** de jóvenes de 15 a 17 años.
- **Subproblemas de [[Definición del problema]] que ataca:** 1 (edad en transporte y alojamiento), 2 (información dispersa), 3 (requisitos por país), 4 (actividades, ocio nocturno y alcohol) y 5 (página para familias).
- **Evidencia de que el problema existe:** solo documental (normas). No hay todavía datos de usuarios; plantean la lista de espera como validación.

## 2. Qué funciona de verdad

| Funcionalidad | ¿Funciona? | Observación |
|---|---|---|
| Planificador: nº de viajeros (1-10), edad de cada uno (15-17) y país (5) | Sí | Resultado al momento, con región de anuncio accesible |
| Regla «manda la persona más restrictiva» | Sí | Igual que mi regla de agregación por grupo |
| Bloque de aerolíneas (Ryanair, easyJet, Vueling, Wizz Air, Iberia + una del país) | Sí | Con fuente y fecha por dato |
| Documentación y entrada por país | Sí | Permiso de Interior + normas del país (AST francesa, *dichiarazione* italiana, ETA y pasaporte en Reino Unido…) |
| Del aeropuerto al alojamiento (transporte de la capital) | Sí | Precios y descuentos por edad |
| Alojamientos: redes juveniles por país, Airbnb y Accor | Sí | — |
| Ocio de día y de noche, y alcohol | Sí | Museos, discotecas, edad para el alcohol |
| Checklist en 5 pasos, página para familias, gráfico de datos | Sí | — |
| Fuentes: ~45 enlaces oficiales con fecha de consulta | Sí | Explican que se leyeron a través de un buscador |
| Lista de espera | Parcial | No probada (no se enviaron datos) |
| «Imprimir o guardar en PDF» | Sí | — |
| Sin cookies ni analítica, accesibilidad (saltar al contenido) | Sí | Buen detalle de confianza |

## 3. Qué aporta valor

- **Para el joven:** respuesta concreta y rápida por país, sin registrarse.
- **Para los padres:** el permiso de viaje explicado paso a paso; tono serio y con fuentes.
- **Para el equipo:** **la base de fuentes por país es lo más valioso**: cinco países, seis o siete aerolíneas, redes de albergues, transporte, museos, ocio y alcohol. Va muy por delante de mi investigación en el extranjero.

## 4. Limitaciones

| Tipo | Limitación | Gravedad |
|---|---|---|
| Técnica | Datos estáticos escritos a mano; sin fecha de caducidad ni aviso de reverificación | Media |
| Técnica | Solo edades de 15 a 17: no contempla grupos mixtos con alguien de 18, que cambia reglas (Airbnb, Ryanair, Accor) | Media |
| Técnica | No pregunta nacionalidad ni residencia, que cambian el permiso (E-01) | Media |
| Técnica | Destino por país, no por ciudad: los alojamientos no siempre están en la ciudad del viaje (Italia: un albergue de Sperlonga; Alemania: asociaciones DJH regionales que no son de Berlín) | Media |
| Técnica | No guarda un plan ni lo comparte; no hay mapa ni vuelos concretos | Baja (es una primera versión) |
| Legal | **Portugal, posible contradicción:** el resultado dice que Portugal exige una autorización escrita para entrar, pero su propia fuente de la Ley 23/2007 indica que el artículo 4 excluye a los ciudadanos de la UE y que el artículo 31 tiene excepciones para turismo. Hay que aclararlo antes de enseñarlo (Q-20) | **Alta** |
| Legal | Marca «✓ Acepta a todo el grupo» en albergues que piden autorización de los padres: debería ser «con requisitos» | Media |
| Legal | Las fuentes se leyeron a través de un buscador (como mis `OFICIAL-INDIRECTO`): falta releer las críticas | Media |
| Comercial | Modelo previsto: **comisión por reserva «como una agencia»**, lo que puede obligar a ser agencia de viajes (I-04, H-17) | Alta |
| Comercial | Ellos mismos listan los retos: quién es el cliente si pagan los padres, qué pasa si algo sale mal, por qué un hotel aceptaría menores, público pequeño, si ya existe | — |

## 5. Funcionalidades que parecen innecesarias (a debatir)

- **Gráfico de edades del alcohol y bloque de ocio nocturno:** es información real y útil para el joven, pero puede **restar confianza a los padres**, que son quienes firman y pagan (H-04, H-14). Propongo probarlo en las entrevistas a padres antes de decidir.
- El correo personal del autor como contacto público.

## 6. Qué merece la pena llevar a una propuesta conjunta

| Elemento | Por qué | Relación |
|---|---|---|
| Base de fuentes por país (5 países) | Es el activo más difícil de construir | H-11, H-18 |
| Estructura del resultado: aerolíneas → papeles → llegada → dormir → ocio | Fácil de entender | H-05 |
| Regla «manda la persona más restrictiva» | Coincide con la mía; señal de que es la correcta | — |
| Tono «Tú planeas, tus padres firman» | Resume la tesis común | H-12 |
| Lista de espera como primera validación | Barata; ojo: apuntarse no es pagar (H-15) | H-01 |
| Sección «Lo que todavía no está resuelto» | Honestidad que da credibilidad ante el jurado | — |

**Lo que mi demo aporta y la suya no:** grupo con edad, nacionalidad y residencia por persona; mapa y fichas por ciudad con estado por persona; plan guardable que se comparte con los padres y se aprueba; comparador de aerolíneas con enlaces a buscadores de vuelos. **Encajan bien:** su base de datos más mi experiencia de producto.

## 7. Preguntas para su autor

1. ¿Leíste las fuentes en la página oficial o en el resumen del buscador? ¿Cuáles has releído?
2. Portugal: ¿has visto la excepción para ciudadanos de la UE (art. 4 de la Ley 23/2007)?
3. ¿Por qué solo de 15 a 17? ¿Y los grupos con alguien de 18?
4. ¿Por qué Sperlonga y DJH de Mecklemburgo y Hannover para Italia y Alemania? ¿Hay datos de Roma y Berlín?
5. ¿Cuántas personas hay en la lista de espera y por qué canal llegaron?
6. ¿Cómo piensas mantener los datos al día?
