---
tipo: propuesta
fecha: 2026-11-11
relacionado: "[[Integración de proveedores]], [[Buscadores y empresas de viaje - ingeniería inversa]]"
---

# Conector de vuelos en tiempo real (11/11/2026)

## Qué opciones hay (noviembre de 2026)

| Opción | ¿Podemos usarla ya? | Notas | Fuente |
|---|---|---|---|
| **Duffel** | **Sí**: alta autoservicio y modo test | 3 $ por reserva; búsquedas gratis hasta 1.500 por reserva (0,005 $ cada búsqueda de más). Se busca con la **edad real** de cada pasajero (`age`) y se pueden pedir solo directos (`max_connections: 0`) y **sin billetes separados** (`include_split_ticket: false`) | [Precios](https://duffel.com/pricing) · [Búsqueda](https://duffel.com/docs/api/v2/offer-requests/create-offer-request) (OFICIAL-INDIRECTO) |
| Amadeus Self-Service | **No** | Cerró el 17/07/2026; solo queda Enterprise con contrato | [PhocusWire](https://www.phocuswire.com/amadeus-shut-down-self-service-apis-portal-developers), [Amadeus](https://amadeus.com/en/industry-messaging/statement-regarding-amadeus-for-developers-portal) |
| Kiwi Tequila | No | Altas cerradas desde mayo de 2024; solo por invitación | [Geekflare](https://geekflare.com/guides/flight-booking-api/) (SECUNDARIA) |
| Travelpayouts | No por ahora | Requiere aprobación (se cita un mínimo de 50.000 usuarios al mes) | [FlightPowers](https://flightpowers.com/guides/amadeus-self-service-alternatives) (SECUNDARIA) |
| Skyscanner, Google Flights | No | Skyscanner, solo socios; Google Flights no tiene API pública. Seguimos con **enlaces** (Kayak, Google Flights, Skyscanner) | — |
| Scraping de webs de aerolíneas | **Descartado** | Va contra sus condiciones de uso | — |

## Qué se ha hecho

- `70 Prototipo/conector-vuelos.mjs`: servidor Node sin dependencias en `http://localhost:8787`. La **clave de Duffel se queda en el conector** (variable `DUFFEL_TOKEN`) y nunca va a la página. Solo acepta peticiones de la propia página en local, valida los datos y devuelve como mucho 12 ofertas.
- Modo `--prueba`: sin clave, con **datos inventados marcados como PRUEBA** para poder enseñar la pantalla.
- En el Planner, pestaña Vuelos: recuadro **«Precios reales ahora (beta)»**. Busca con las edades del grupo, cruza cada oferta con nuestras reglas por aerolínea (la que no tenemos verificada sale «sin verificar», nunca permitida) y manda a **reservar directo** con la aerolínea.
- Desde la web pública (artefacto) no funciona: la página no puede llegar al conector de tu PC. Para producción haría falta un servidor propio.

## Cómo activarlo con precios reales (pasos para Alberto)

1. Crear una cuenta en Duffel (la hace Alberto; en modo test no se paga nada).
2. En el panel de Duffel, copiar el **token de test** (empieza por `duffel_test_`).
3. Guardarlo **solo en el PC**, nunca en la bóveda ni en Git. En PowerShell: `$env:DUFFEL_TOKEN = "…"`.
4. En esa misma ventana: `node "70 Prototipo/conector-vuelos.mjs"`.
5. Abrir el HTML desde el PC y pulsar «Buscar precios reales».

Con el token de test, Duffel devuelve su aerolínea de prueba; para precios de verdad hace falta el token *live* (y cumplir sus condiciones).
