---
tipo: propuesta
version: v0
estado: borrador; NADA de esto está decidido
actualizado: 2026-11-07
---

# Propuesta individual v0

> Este borrador ordena las opciones y señala qué hay que validar. Todo lo que no lleva evidencia es `HIPÓTESIS`. Se reescribe tras la fase 2.

## 0. Tesis provisional (para intentar tumbarla)

**«El plan que tus padres pueden aprobar»:** el joven arma el viaje con su grupo solo con proveedores cuya política para menores está **verificada con fuente y fecha**; la app genera la lista de documentos y autorizaciones según la edad, la nacionalidad y el destino de cada uno; y los padres revisan, aprueban y, si hace falta, pagan.

Por qué este ángulo y no «un buscador de viajes para menores»:
- El transporte parece menos problemático de lo supuesto (I-01). La barrera fuerte está en el **alojamiento**, el **pago** y el **permiso de los padres** (I-01, I-03).
- Quien puede contratar, pagar y firmar suele ser un adulto (E-01, E-08, E-12). **Diseñar sin los padres es diseñar contra la realidad.**
- Nadie parece mantener una base verificada de políticas para menores (pendiente de confirmar: [[Alternativas actuales y competidores]]).

**Qué la tumbaría:** que la encuesta muestre que los viajes no salen por dinero o por falta de ganas, no por edad ni por confianza (M2, M7), o que los padres no gasten nada en tranquilidad (M10).

## 1. Propuesta de valor (borrador)

| Para | Problema | Propuesta |
|---|---|---|
| Joven de 16-17 años | No sabe qué servicios le aceptan y depende de un adulto para casi todo | Saber en minutos qué se puede hacer con su edad y llegar a sus padres con un plan cerrado |
| Padres | Incertidumbre sobre seguridad, documentos y el plan real | Ver el plan completo, saber qué está verificado y qué trámites faltan, y aprobarlo |
| Proveedores (fase posterior) | Riesgo y papeleo con menores | Recibir grupos de jóvenes con la autorización estándar y los datos ya preparados |

## 2. Público objetivo inicial (opciones)

| Opción | A favor | En contra |
|---|---|---|
| A. 16-17 años, viajes **nacionales**, Andalucía | Nuestro entorno, sin trámite de salida del país, fácil de verificar a mano | Mercado pequeño y estacional |
| B. 16-17 años, viajes a Europa | Más dolor documental | Más normativa por país; más riesgo |
| C. 18-21 años (primer Interrail, DiscoverEU) | Más frecuencia y dinero; sin barreras de edad | Abandona el problema original; más competencia |

Recomendación provisional: **A** para el MVP, con B como segunda fase si la encuesta lo justifica. C solo si M1 o M3 refutan el problema.

## 3. Experiencia de usuario (flujo principal, hipótesis)

1. El joven crea el viaje (destino, fechas, presupuesto) o pega un enlace de TikTok o Instagram con una idea (principio tomado de [[Corner]]).
2. Invita a sus amigos; cada uno indica edad, nacionalidad y residencia (solo lo necesario).
3. Ve **solo opciones verificadas** para la edad del grupo, cada una con su sello: *verificado el dd/mm, fuente*.
4. La app construye la **lista de lo que falta por persona**: autorización de alojamiento, declaración de permiso de viaje si sale de España, pago.
5. Cada padre recibe un enlace: ve el plan, los contactos y los documentos, y **aprueba** (y paga si hace falta).
6. Durante el viaje: itinerario y contactos de emergencia al alcance; ubicación compartida opcional.

## 4. Funcionalidades esenciales frente a las que sobran (por ahora)

| Esencial para validar | Puede esperar |
|---|---|
| Base de proveedores verificados (alojamiento primero) | Red social y seguidores |
| Lista de documentos según el perfil del viajero | Recomendaciones con IA |
| Vista y aprobación para padres | Reservas y pagos dentro de la app |
| Plan compartido del grupo | Mapa sofisticado |

## 5. Elemento diferencial y posible ventaja

- **Diferencial:** la verificación con procedencia (fuente, fecha y método) de lo que un menor puede hacer, y los padres dentro del flujo.
- **Ventaja que se acumula (hipótesis):** cada proveedor verificado y cada viaje realizado mejoran la base; con el tiempo, acuerdos con alojamientos para aceptar una **autorización estándar**. Copiar el software es fácil; copiar una base verificada y los acuerdos, no tanto.
- **Debilidad honesta:** mantener esa base cuesta trabajo continuo (H-18) y un error es grave (H-19).

## 6. Motor de verificación legal y comercial (concepto)

Cada regla es un dato, no código fijo:

| Campo | Ejemplo |
|---|---|
| Proveedor y servicio | Vueling, vuelos |
| Condición | edad ≥ 16 → puede volar solo |
| Requisito adicional | si internacional y menor español residente en España → declaración de permiso de viaje |
| Fuente | URL oficial |
| Método | leído en web / confirmado por correo / por teléfono |
| Verificado el | 07/11/2026 |
| Caduca el | +90 días |
| Confianza | alta / media / baja |

**Salidas posibles:** *Permitido (verificado)* · *Permitido con requisitos* · *No permitido* · **No verificado: no se recomienda.** Nunca se muestra «permitido» con una regla caducada o sin fuente.
La IA puede **proponer** reglas leyendo condiciones de proveedores, pero **una persona las valida** antes de publicarlas.

## 7. Arquitectura técnica viable (para después de validar)

- Aplicación web adaptada a móvil (sin tiendas de apps al principio).
- Base de datos de proveedores, reglas y fuentes con historial de cambios.
- Panel interno para verificar y reverificar reglas, con avisos de caducidad.
- Enlaces de aprobación para padres (sin obligarles a crear cuenta).
- Sin pagos propios en el MVP: el pago lo hace el adulto en la web del proveedor.
- Datos mínimos de menores y evaluación de impacto antes de lanzar (ver [[Marco legal del negocio]]).

## 8. Integración con proveedores (opciones por fases)

1. **Ninguna:** enlaces a la web oficial del proveedor (MVP).
2. **Afiliación:** comisión por reserva (Q-17). Ojo: comisiones bajas y viajes poco frecuentes.
3. **Acuerdos directos** con albergues y campings para grupos de jóvenes con autorización estándar (H-16).
4. **Reserva integrada:** solo con agencia socia o licencia propia (I-04).

## 9. Modelo de negocio (opciones a validar)

| Modelo | Quién paga | Riesgo principal |
|---|---|---|
| Pago por viaje de los padres («plan verificado + asistencia») | Padres | Disposición a pagar sin demostrar (H-15) |
| Comisión de afiliación | Proveedores | Volumen insuficiente |
| Pago por grupo recibido | Alojamientos y actividades | ¿Quieren más menores? (H-16) |
| Acuerdo con centros educativos, ayuntamientos o asociaciones juveniles | Institución | Ciclos de venta lentos |

Lectura crítica: un joven de 16-17 años viaja **pocas veces al año** y con poco dinero. Si cobramos poco por viaje, hace falta mucho volumen; si cobramos a los padres, hay que demostrar que ya gastan en tranquilidad (M10). **Es el riesgo número uno del negocio.**

## 10. MVP y validación

1. **Fase 2:** encuestas y entrevistas (en marcha).
2. **MVP manual:** un formulario y un WhatsApp; verificamos a mano 30-50 alojamientos y actividades de Andalucía; organizamos 5-10 viajes reales con su lista de documentos y un enlace para padres hecho con una herramienta sin código.
3. **Señal de demanda real:** que algún padre pague una señal (aunque sea pequeña) o que los grupos vuelvan a pedirlo. Sin eso, no se programa.

## 11. Principales riesgos e hipótesis pendientes

| Riesgo | Hipótesis | Mitigación |
|---|---|---|
| El problema es poco frecuente | H-01 | Umbral M1; plan C (18-21) |
| El freno no es la edad sino el dinero o los padres | H-02, H-04 | Si son los padres, girar hacia ellos |
| Nadie paga | H-15 | Preventa en el MVP manual |
| Informar mal sobre un proveedor | H-19 | Procedencia, caducidad y «no verificado» |
| Acabar siendo agencia sin quererlo | H-17 | Consulta jurídica antes del MVP |
| Coste de mantener los datos | H-18 | Medir horas por proveedor desde ya |
| Datos de menores | — | Datos mínimos y evaluación de impacto |
