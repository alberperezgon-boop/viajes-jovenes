---
tipo: normativa
actualizado: 2026-11-07
---

# Marco legal del negocio

Esto **no es asesoramiento jurídico**. Es el mapa de normas que hay que revisar con un profesional antes de lanzar nada.

## 1. ¿Puede un menor contratar y pagar?

- **Código Civil, art. 1263** (Ley 8/2021): los menores no emancipados pueden celebrar los contratos que la ley les permita y los relativos a «bienes y servicios de la vida corriente propios de su edad». `CONOCIMIENTO PREVIO` + `SECUNDARIA`; falta leerlo en el BOE.
- **Inferencia (I-03):** un viaje de varios cientos de euros difícilmente cuenta como «vida corriente» de un joven de 16. Por eso muchas plataformas exigen 18 años (Airbnb, E-08). **Lo más probable es que el titular o el pagador sea un adulto.**
- Consecuencia de diseño: el producto necesita un **rol de adulto** (padre o tutor) que autorice o pague. No es un añadido, es parte del flujo principal.

## 2. Datos personales de menores

- **LOPDGDD, art. 7:** solo a partir de los **14 años** puede el menor consentir por sí mismo el tratamiento de sus datos. `CONOCIMIENTO PREVIO`
- Encuestas: los encuestados de 16-19 pueden consentir. Hay que informar de para qué se usan los datos, que sea **anónima** y pedir el contacto en un formulario aparte.
- Producto: la ubicación en tiempo real, los documentos de identidad y los datos de padres son **datos sensibles en la práctica**. Hace falta una evaluación de impacto antes de construir el producto.
- Por revisar: la Ley de Servicios Digitales de la UE (DSA, art. 28) exige a las plataformas accesibles a menores medidas de protección. `CONOCIMIENTO PREVIO`

## 3. Viajes combinados: ¿somos agencia?

- La Directiva 2015/2302 se incorporó al **Libro IV del TRLGDCU** (RDL 23/2018). Quien combina y vende transporte más alojamiento para un mismo viaje puede ser **organizador**, con responsabilidad por todo el viaje y garantía frente a insolvencia. `SECUNDARIA`
- **Directiva (UE) 2026/1024** (DOUE, 8/5/2026): revisa la anterior y **elimina los «servicios de viaje vinculados»**, que era la zona gris. Aplicación prevista para 2029 (una sola fuente). Consumo abrió la consulta pública para transponerla en julio de 2026. `SECUNDARIA` + `OFICIAL-INDIRECTO`
- **Andalucía:** las agencias se inscriben en el Registro de Turismo de Andalucía con **declaración responsable y garantía de responsabilidad** (Decreto 301/2002 y sus modificaciones). Existe la modalidad online. `SECUNDARIA`
- **Inferencia (I-04):** hay tres modelos con riesgos distintos:
  1. **Informar y verificar + enlazar** al proveedor (el usuario reserva fuera): el riesgo regulatorio más bajo. El riesgo principal es informar mal.
  2. **Revender servicios sueltos** como intermediario: riesgo medio.
  3. **Vender paquetes** (transporte + alojamiento): eres agencia, con garantías y responsabilidad plena. Inviable para empezar **salvo que se haga con una agencia socia**.
- → H-17 y Q-16. **Primera pregunta para un abogado.**

## 4. Responsabilidad por la información

- Si el producto dice «este albergue acepta menores» y no es así, el joven puede quedarse sin alojamiento lejos de casa. Ese es el riesgo reputacional y legal más directo (H-19).
- Medida de diseño: cada dato muestra **fuente, fecha de verificación y nivel de confianza**, y nada sin verificar se presenta como válido. Lo mismo exige el propio planteamiento del proyecto.

## Fuentes

- [EUR-Lex: Directiva 2015/2302](https://eur-lex.europa.eu/eli/dir/2015/2302/oj?locale=es)
- [DOUE: Directiva (UE) 2026/1024 (PDF en el BOE)](https://www.boe.es/doue/2026/1024/L00001-00025.pdf)
- [Hosteltur: margen de España en la nueva directiva](https://www.hosteltur.com/176127_el-margen-de-maniobra-de-espana-en-la-nueva-directiva-de-viajes-combinados-depositos-y-plazos-de-reclamacion.html)
- [Consumo: consulta pública de transposición](https://www.dsca.gob.es/es/consumo/se-inicia-tramite-consulta-publica-transposicion-nueva-normativa-proteccion-personas)
- [Consumo Responde: agencias de viajes en Andalucía](https://www.consumoresponde.es/art%C3%ADculos/recomendaciones_sobre_agencias_de_viajes)
- Pendiente de leer en el BOE: Código Civil art. 1263, LOPDGDD art. 7, TRLGDCU Libro IV, RD 933/2021.
