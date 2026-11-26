// Modelo de financiación GoLiveIt: hojas como matrices (fórmulas «=...»), evaluadas con HyperFormula y escritas con ExcelJS (fórmula + resultado).
import ExcelJS from "exceljs";
import { HyperFormula } from "hyperformula";
const OUT = process.argv[2];

/* ---------- 1. Supuestos ---------- */
// [clave, concepto, prudente, base, optimista, unidad, etiqueta, fuente/nota, formato]
const SUP = [
  ["h", "DEMANDA (mercado nacional: toda España)"],
  ["grupos0", "Grupos que planifican un viaje en el mes 1", 25, 40, 60, "grupos/mes", "HIPÓTESIS", "Arranque nacional con institutos, redes sociales y la lista de espera; sin publicidad pagada. Validar con la lista de espera. Objetivo: arranque con 3 institutos piloto y la lista de espera.", "n"],
  ["crec", "Crecimiento mensual de grupos", 0.04, 0.07, 0.1, "%/mes", "HIPÓTESIS", "Sin datos propios aún; se revisa con las primeras métricas. Objetivo: boca a boca por grupos (cada viaje trae otro grupo).", "p"],
  ["frenado", "Cada año el crecimiento mensual se multiplica por", 0.5, 0.6, 0.72, "factor", "HIPÓTESIS", "El crecimiento se frena al madurar (año 2 = 60 % del año 1, año 3 = 36 %...).", "n1"],
  ["expMes", "Mes de salida a Portugal, Italia y Francia", 61, 61, 25, "mes nº", "HIPÓTESIS", "La web es la misma: se traduce y se verifican las normas de cada país. 25 = enero de 2029.", "n"],
  ["expMult", "Demanda tras la expansión europea (× la de España)", 1, 1, 2, "factor", "INFERENCIA", "Portugal, Italia y Francia suman unos 4,5 M de jóvenes de 15-17, casi el triple que España (1,6 M); prudente: se dobla la demanda.", "n1"],
  ["convViaje", "Planes que acaban en viaje", 0.30, 0.35, 0.35, "%", "HIPÓTESIS", "Encuesta piloto: el 78 % viaja o lo ha planeado sin adultos (n=40). No mide conversión.", "p"],
  ["porGrupo", "Viajeros por grupo", 4, 4, 4, "personas", "EQUIPO", "Grupo tipo de la demo y de las encuestas.", "n1"],
  ["h", "INGRESOS"],
  ["convPago", "Viajeros que compran el Pase", 0.20, 0.30, 0.40, "% de viajeros", "HIPÓTESIS", "Lo paga la familia, por SU hijo. Dato del equipo: familias dispuestas a pagar más de 20 € y leads (sin compartir aún). Jóvenes: el 48 % pagaría algo o querría que pague la familia (encuesta piloto, n=40). Objetivo: el plan del grupo solo sale «aprobado» cuando cada viajero tiene su Pase (cada familia firma lo suyo).", "p"],
  ["precio", "Precio del Pase por viajero (IVA incluido)", 19.99, 19.99, 19.99, "€/viajero", "EQUIPO (validado)", "Modelo de negocio del equipo: Pase de 19,99 € por viajero. Desbloquea lo personal: autorización y formulario del albergue a su nombre, papeles por edad y nacionalidad, aprobación de los padres y avisos de emergencia. Objetivo: las familias del equipo aceptan más de 20 €.", "e2"],
  ["iva", "IVA incluido en el precio", 0.21, 0.21, 0.21, "%", "OFICIAL", "IVA general en España (servicios digitales a consumidores). Lo que ingresamos es el precio sin IVA.", "p"],
  ["descGrupo", "Descuento medio de grupo (opcional)", 0, 0, 0, "%", "HIPÓTESIS", "El modelo del equipo no lo incluye. Si se ofrece -30 % desde el 2.º viajero, poner en torno a 0,15. Objetivo: pack de grupo de 4 Pases por 89,96 € (22,49 € cada uno).", "p"],
  ["seguroPct", "Viajeros con Pase que contratan el seguro de viaje", 0.20, 0.30, 0.5, "%", "HIPÓTESIS", "Pack tranquilidad: se ofrece a la familia al aprobar el viaje. Objetivo: el seguro se ofrece marcado por defecto al aprobar (la familia puede quitarlo).", "p"],
  ["seguroPrima", "Precio medio del seguro de viaje", 20, 25, 25, "€/viajero", "HIPÓTESIS", "Viaje corto por Europa; comprobar con la aseguradora socia.", "e"],
  ["seguroCom", "Comisión del seguro", 0.20, 0.20, 0.20, "%", "EQUIPO", "Modelo del equipo: unos 20 %. Ojo: la distribución de seguros está regulada; revisar con un abogado.", "p"],
  ["esimPct", "Viajeros con Pase que compran la eSIM", 0.20, 0.30, 0.6, "%", "HIPÓTESIS", "Datos móviles para el viaje.", "p"],
  ["esimPrecio", "Precio medio de la eSIM", 8, 10, 10, "€/viajero", "HIPÓTESIS", "Paquete de datos de unos días en Europa.", "e"],
  ["esimCom", "Comisión de la eSIM", 0.10, 0.10, 0.10, "%", "EQUIPO", "Modelo del equipo: unos 10 %.", "p"],
  ["otrosPct", "Viajeros con Pase que contratan otros servicios", 0, 0.15, 0.30, "%", "HIPÓTESIS", "Traslados al aeropuerto, tarjeta prepago para jóvenes, carné de alberguista y actividades.", "p"],
  ["otrosCom", "Comisión media de esos servicios", 0, 3, 5, "€/viajero", "HIPÓTESIS", "Comisión de afiliación o margen de reventa por servicio.", "e2"],
  ["costeFamilia", "Coste por Pase (avisos, asistencia, soporte)", 2.00, 1.50, 1.2, "€/familia", "HIPÓTESIS", "Mensajes y notificaciones, horas de asistencia en temporada y soporte.", "e2"],
  ["pctEnlaces", "Viajeros que reservan por nuestros enlaces", 0.25, 0.35, 0.4, "%", "HIPÓTESIS", "Reserva el adulto (Booking y Hostelworld exigen 18 años).", "p"],
  ["eurReserva", "Comisión de afiliación por viajero que reserva", 3.00, 5.00, 5, "€/viajero", "INFERENCIA", "Hostelworld 18-22 % de su depósito; Booking, 25-40 % de su comisión (pocos % del precio); GetYourGuide/Civitatis 7-8 %. Canvas: 5-6 €.", "e2"],
  ["b2bInicio", "Mes en que empiezan los centros educativos", 12, 9, 9, "mes nº", "HIPÓTESIS", "Mes 9 = septiembre de 2027 (inicio de curso).", "n"],
  ["b2bRitmo", "Centros nuevos al mes (capa futura, ahora 0)", 0, 0, 0, "centros/mes", "HIPÓTESIS", "Institutos y AMPAs: taller de viaje seguro + acceso del grupo.", "n1"],
  ["b2bCuota", "Cuota anual por centro", 150, 250, 350, "€/año", "HIPÓTESIS", "Sin validar con ningún centro.", "e"],
  ["ayInicio", "Mes en que empieza el primer ayuntamiento", 18, 13, 10, "mes nº", "HIPÓTESIS", "Áreas de Juventud que lo ofrecen gratis a sus jóvenes (licencia anual).", "n"],
  ["ayRitmo", "Ayuntamientos nuevos al mes (capa futura, ahora 0)", 0, 0, 0, "ayunt./mes", "HIPÓTESIS", "Ayuntamientos de cualquier comunidad; sin validar con ninguno.", "n1"],
  ["ayCuota", "Licencia anual por ayuntamiento", 600, 900, 900, "€/año", "HIPÓTESIS", "Precio de un taller o una actividad juvenil municipal; comprobar con 3-5 técnicos de Juventud.", "e"],
  ["pagoPct", "Comisión de la pasarela de pago (%)", 0.015, 0.015, 0.015, "%", "SECUNDARIA", "Tarifa estándar de Stripe para tarjetas del EEE; comprobar antes de contratar.", "p1"],
  ["pagoFijo", "Comisión de la pasarela de pago (fija)", 0.25, 0.25, 0.25, "€/pago", "SECUNDARIA", "Ídem.", "e2"],
  ["h", "COSTES MENSUALES"],
  ["horasVerif", "Horas de verificación de datos al mes", 30, 40, 30, "h/mes", "EQUIPO", "Coste principal del canvas: revisar normas, albergues y caducidades.", "n"],
  ["eurHora", "Coste por hora de verificación", 12, 12, 12, "€/h", "HIPÓTESIS", "Beca o colaboración de estudiantes. Si lo hace el equipo sin cobrar, poner 0.", "e"],
  ["verifDesde", "Mes desde el que se pagan esas horas", 1, 1, 1, "mes nº", "HIPÓTESIS", "Con la financiación, las horas se pagan desde el primer mes en todos los escenarios.", "n"],
  ["marketing", "Marketing (contenido en redes, institutos)", 100, 150, 200, "€/mes", "HIPÓTESIS", "Sin anuncios pagados el primer año; contenido propio en TikTok e Instagram. Objetivo: solo contenido propio e institutos.", "e"],
  ["hosting", "Alojamiento web, dominio, correo y herramientas", 35, 35, 35, "€/mes", "HIPÓTESIS", "Alojamiento, dominio (~15 €/año), correo y formularios.", "e"],
  ["mantWeb", "Mantenimiento y mejoras de la web", 40, 40, 40, "€/mes", "HIPÓTESIS", "Horas de desarrollo, actualizaciones de seguridad y copias de seguridad.", "e"],
  ["mktPct", "Publicidad que crece con las ventas (% de los ingresos)", 0.10, 0.08, 0.08, "%", "HIPÓTESIS", "Anuncios a familias y colaboraciones con creadores para seguir creciendo; se suma al marketing fijo. Revisar con el coste real de captar cada familia.", "p"],
  ["mktDesde", "Mes desde el que se paga esa publicidad", 13, 13, 13, "mes nº", "HIPÓTESIS", "El año 1 lo cubre la campaña de lanzamiento de la inversión inicial (sin más anuncios pagados el primer año).", "n"],
  ["expLanz", "Salida a Portugal, Italia y Francia: lanzamiento (una vez)", 6000, 6000, 6000, "€", "HIPÓTESIS", "Campaña de salida en los 3 países, traducción de la web y constitución de la SL. Se paga en el mes de salida.", "e"],
  ["expMensual", "Operar en esos 3 países (cada mes desde la salida)", 1500, 1500, 1500, "€/mes", "HIPÓTESIS", "Verificar normas y albergues de 3 países más, atención en portugués, italiano y francés, y asesoría local.", "e"],
  ["tipoImp", "Impuesto sobre el beneficio como autónomos (IRPF)", 0.20, 0.20, 0.20, "%", "OFICIAL", "Pago fraccionado de autónomos: 20 % del rendimiento neto acumulado del año (modelo 130). El definitivo depende de la renta.", "p"],
  ["slDesde", "Mes en que se pasa a sociedad limitada (SL)", 61, 61, 25, "mes nº", "HIPÓTESIS", "Al salir a Europa y para poder pedir ENISA (exige SL). Poner un mes de enero (1, 13, 25, 37 o 49). 61 = no se pasa en 5 años.", "n"],
  ["tipoIS", "Impuesto de Sociedades (desde la SL)", 0.25, 0.25, 0.25, "%", "OFICIAL", "Tipo general del 25 % (Ley 27/2014, art. 29). Las empresas de nueva creación pagan el 15 % los dos primeros años con beneficio; aquí se usa el 25 % por prudencia.", "p"],
  ["gestoriaSL", "Gestoría con SL", 120, 120, 120, "€/mes", "HIPÓTESIS", "Contabilidad, impuestos y cuentas anuales de una SL.", "e"],
  ["seguro", "Seguro de responsabilidad civil", 300, 300, 300, "€/año", "SECUNDARIA", "BBVA cita ~120 € de media para autónomos (ICEA); paquetes para startups de 199-295 € (Qonto). Pedir presupuesto.", "e"],
  ["gestoria", "Gestoría", 60, 60, 60, "€/mes", "HIPÓTESIS", "Precio típico de gestoría en línea para autónomos.", "e"],
  ["legalAnual", "Revisión legal anual (desde el año 2)", 300, 300, 300, "€/año", "HIPÓTESIS", "Actualizar condiciones, privacidad de menores (RGPD) y art. 5 bis de la Directiva (UE) 2026/1024.", "e"],
  ["autonomos", "Socios dados de alta como autónomos", 1, 1, 4, "personas", "EQUIPO", "Uno de alta al principio; el resto colabora.", "n"],
  ["tarifaPlana", "Cuota de autónomo con tarifa plana", 88.64, 88.64, 88.64, "€/mes", "SECUNDARIA", "80 € + MEI 2026 (VidaCaixa, Infoautónomos). 12 meses, prorrogables otros 12 si se ingresa menos del SMI.", "e2"],
  ["mesesTP", "Meses con tarifa plana", 24, 24, 24, "meses", "SECUNDARIA", "12 + 12 de prórroga si los ingresos no superan el SMI (17.094 € en 2026).", "n"],
  ["cuotaNormal", "Cuota de autónomo después (por socio)", 200, 200, 350, "€/mes", "HIPÓTESIS", "Depende de los rendimientos de cada socio (cuotas por tramos); con sueldos de 1.200-3.000 € al mes sube a unos 300-450 €. Comprobar en la Seguridad Social.", "e"],
  ["sueldoDesde", "Mes desde el que cobran los fundadores", 25, 25, 25, "mes nº", "HIPÓTESIS", "Años 1 y 2 sin sueldo (estudiantes).", "n"],
  ["sueldo", "Retribución total de los fundadores (los 4), año 3", 0, 300, 4800, "€/mes", "HIPÓTESIS", "1.200 € al mes por socio en el objetivo (años 1 y 2 sin sueldo).", "e"],
  ["sueldo4", "Retribución total de los fundadores (los 4), año 4", 0, 300, 8000, "€/mes", "HIPÓTESIS", "2.000 € al mes por socio en el objetivo.", "e"],
  ["sueldo5", "Retribución total de los fundadores (los 4), año 5", 0, 300, 12000, "€/mes", "HIPÓTESIS", "3.000 € al mes por socio en el objetivo: los 4 viven del proyecto.", "e"],
  ["h", "FINANCIACIÓN"],
  ["margen", "Margen de seguridad sobre la necesidad de caja", 0.25, 0.20, 0.15, "%", "HIPÓTESIS", "Colchón para retrasos en cobros y ayudas.", "p"],
  ["h", "MERCADO (para comprobar que las cifras son realistas)"],
  ["jovEsp", "Jóvenes de 15 a 17 años en España", 1600000, 1600000, 1600000, "personas", "OFICIAL", "INE, población a 1/1/2025 (tabla 56934), citado en el pitch de Ruta16.", "n"],
  ["pctAnd", "Parte de España a la que llegamos", 1, 1, 1, "%", "EQUIPO", "Mercado nacional desde el lanzamiento (100 % = toda España). La empresa tiene su sede en Andalucía (ayudas de la Junta).", "p"],
  ["jovExp", "Jóvenes de 15 a 17 años en Portugal, Italia y Francia", 4500000, 4500000, 4500000, "personas", "INFERENCIA", "Estimación: unos 14 M de jóvenes de 15-17 en la UE (3/15 de los 73 M de 15-29; Eurostat 2023, EU Youth Report) y el peso de esos tres países en la población de la UE (~31 %).", "n"],
  ["pctViajan", "Jóvenes que viajan al extranjero al año", 0.394, 0.394, 0.394, "%", "OFICIAL", "INE, Encuesta de Turismo de Residentes 2025: 15-24 años (aplicado a 15-17: inferencia).", "p1"],
];
const ESTAC = [["ene", 0.5], ["feb", 0.6], ["mar", 1.3], ["abr", 0.9], ["may", 0.8], ["jun", 1.4], ["jul", 1.8], ["ago", 1.6], ["sep", 0.7], ["oct", 0.7], ["nov", 0.6], ["dic", 1.0]];

const S = [];             // hoja Supuestos
const ROW = {};           // clave → fila (1-based)
S.push(["Supuestos del modelo"]);
S.push(["Cambia solo las celdas azules. El escenario se elige en B3 (1 = prudente, 2 = base, 3 = objetivo)."]);
S.push(["Escenario elegido", 3, "=CHOOSE(B3,\"Prudente\",\"Base\",\"Objetivo (modelo mejorado)\")"]);
S.push([]);
S.push(["Concepto", "Prudente", "Base", "Objetivo", "Elegido", "Unidad", "Etiqueta", "Fuente o nota"]);
for (const r of SUP) {
  if (r[0] === "h") { S.push([r[1]]); continue; }
  const n = S.length + 1; ROW[r[0]] = n;
  S.push([r[1], r[2], r[3], r[4], `=CHOOSE($B$3,B${n},C${n},D${n})`, r[5], r[6], r[7]]);
}
S.push([]);
S.push(["ESTACIONALIDAD (1 = mes medio)", null, null, null, null, null, "HIPÓTESIS", "Semana Santa 2027 cae en marzo; picos en verano y Navidad."]);
const ESTROW = S.length + 1;
ESTAC.forEach(([m, v]) => S.push([m, null, null, null, v, "factor"]));
const sup = k => `Supuestos!$E$${ROW[k]}`;

/* ---------- 2. Inversión inicial ---------- */
const INV = [
  ["Revisión legal completa (no ser agencia, datos de menores, seguros, condiciones)", 900, "HIPÓTESIS", "Primera orientación gratuita con Andalucía Emprende (CADE); revisión completa con abogado. Pedir presupuesto."],
  ["Registro de la marca en la OEPM (1 clase, en línea)", 130, "SECUNDARIA", "Tasa aproximada; comprobar la tarifa vigente de la OEPM."],
  ["Identidad visual y dominio", 250, "HIPÓTESIS", "Logo, plantillas y dominio del primer año."],
  ["App de dos partes: pasajero y familia (cuentas, pago, avisos de emergencia)", 2400, "HIPÓTESIS", "160 h de desarrollo externo a 15 €/h, partiendo de la demo que ya funciona."],
  ["Ampliar la base verificada a toda España y más destinos (20 países, 60 albergues)", 1440, "EQUIPO", "120 h a 12 €/h."],
  ["Campaña de lanzamiento nacional para familias (redes sociales y contenidos)", 2700, "HIPÓTESIS", "Anuncios dirigidos a madres y padres + contenido con jóvenes, en los meses previos a Semana Santa y verano."],
  ["Pruebas con jóvenes y familias (incentivos, materiales)", 200, "HIPÓTESIS", "Pequeñas recompensas y materiales para las pruebas."],
];
const I = [["Inversión inicial (mes 0)"], ["Celdas azules editables."], [], ["Concepto", "Importe (€)", "Etiqueta", "Fuente o nota"]];
const invStart = I.length + 1;
INV.forEach(r => I.push(r));
const invEnd = I.length;
I.push(["Subtotal", `=SUM(B${invStart}:B${invEnd})`]);
const invSub = I.length;
I.push(["Imprevistos", 0.15, "HIPÓTESIS", "% sobre el subtotal"]);
const invPct = I.length;
I.push(["Inversión inicial total", `=B${invSub}*(1+B${invPct})`]);
const invTot = I.length;
const INVTOT = `'Inversión inicial'!$B$${invTot}`;

/* ---------- 3. Proyección mensual ---------- */
const MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const P = [["Cálculo interno (no tocar): proyección de 60 meses"], ["Hoja oculta que alimenta las vistas en horizontal. Cambia los supuestos, no esta hoja. Importes en euros."], []];
const HEAD = ["Mes nº", "Mes", "Año", "Mes del año", "Estacionalidad", "Grupos que planifican", "Viajes realizados", "Viajeros", "Viajeros con Pase", "Ingreso Pase (sin IVA)", "Ingreso pack y afiliación", "Centros activos", "Ingreso centros y ayuntamientos", "Ingresos totales", "Costes variables (pago, soporte y publicidad)", "Verificación de datos", "Marketing", "Web y herramientas", "Seguro, gestoría y legal", "Cuota de autónomos", "Retribución fundadores", "Costes totales", "Resultado del mes", "Caja acumulada", "Aux: recuperado", "Aux: mes con beneficio", "Aux: tendencia de crecimiento", "Mantenimiento web", "Aux: beneficio del año", "Aux: impuesto del año", "Impuesto (IRPF o Sociedades)", "Beneficio neto", "Salida a Europa"];
P.push(HEAD);
const p0 = P.length + 1; // fila del mes 0
P.push([0, "inicio", 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, `=${INVTOT}`, `=-V${p0}`, `=W${p0}`, null, null]);
for (let m = 1; m <= 60; m++) {
  const r = p0 + m, prev = r - 1, mm = (m - 1) % 12;
  P.push([
    m, `${MES[mm]} ${2027 + Math.floor((m - 1) / 12)}`, Math.ceil(m / 12), mm + 1,
    `=INDEX(Supuestos!$E$${ESTROW}:$E$${ESTROW + 11},D${r})`,
    `=${sup("grupos0")}*AA${r}*E${r}*IF(A${r}>=${sup("expMes")},${sup("expMult")},1)`,
    `=F${r}*${sup("convViaje")}`,
    `=G${r}*${sup("porGrupo")}`,
    `=H${r}*${sup("convPago")}`,
    `=I${r}*${sup("precio")}*(1-${sup("descGrupo")})/(1+${sup("iva")})`,
    `=H${r}*${sup("pctEnlaces")}*${sup("eurReserva")}+I${r}*(${sup("seguroPct")}*${sup("seguroPrima")}*${sup("seguroCom")}+${sup("esimPct")}*${sup("esimPrecio")}*${sup("esimCom")}+${sup("otrosPct")}*${sup("otrosCom")})`,
    `=IF(A${r}>=${sup("b2bInicio")},(A${r}-${sup("b2bInicio")}+1)*${sup("b2bRitmo")},0)`,
    `=L${r}*${sup("b2bCuota")}/12+IF(A${r}>=${sup("ayInicio")},(A${r}-${sup("ayInicio")}+1)*${sup("ayRitmo")},0)*${sup("ayCuota")}/12`,
    `=J${r}+K${r}+M${r}`,
    `=I${r}*${sup("precio")}*(1-${sup("descGrupo")})*${sup("pagoPct")}+I${r}*(${sup("pagoFijo")}+${sup("costeFamilia")})+IF(A${r}>=${sup("mktDesde")},N${r}*${sup("mktPct")},0)`,
    `=IF(A${r}>=${sup("verifDesde")},${sup("horasVerif")}*${sup("eurHora")},0)`,
    `=${sup("marketing")}`,
    `=${sup("hosting")}`,
    `=${sup("seguro")}/12+IF(A${r}>=${sup("slDesde")},${sup("gestoriaSL")},${sup("gestoria")})+IF(A${r}>12,${sup("legalAnual")}/12,0)`,
    `=IF(A${r}<=${sup("mesesTP")},${sup("tarifaPlana")},${sup("cuotaNormal")})*${sup("autonomos")}`,
    `=IF(A${r}>=${sup("sueldoDesde")},CHOOSE(C${r},${sup("sueldo")},${sup("sueldo")},${sup("sueldo")},${sup("sueldo4")},${sup("sueldo5")}),0)`,
    `=SUM(O${r}:U${r})+AB${r}+AG${r}`,
    `=N${r}-V${r}`,
    `=X${prev}+AF${r}`,
    `=IF(X${r}>=0,A${r},999)`,
    `=IF(W${r}>=0,A${r},999)`,
    m === 1 ? 1 : `=AA${prev}*(1+${sup("crec")}*${sup("frenado")}^(C${r}-1))`,
    `=${sup("mantWeb")}`,
    `=SUMIF($C$${p0 + 1}:C${r},C${r},$W$${p0 + 1}:W${r})`,
    `=MAX(0,AC${r}*IF(A${r}>=${sup("slDesde")},${sup("tipoIS")},${sup("tipoImp")}))`,
    `=AD${r}-IF(C${r}=C${prev},AD${prev},0)`,
    `=W${r}-AE${r}`,
    `=IF(A${r}=${sup("expMes")},${sup("expLanz")},0)+IF(A${r}>=${sup("expMes")},${sup("expMensual")},0)`,
  ]);
}
const pEnd = p0 + 60;
const RNG = c => `'Proyección mensual'!$${c}$${p0 + 1}:$${c}$${pEnd}`;

/* ---------- 4. Financiación ---------- */
const F = [["De dónde puede salir el dinero"], ["Celdas azules editables. «Seguro» = depende de nosotros; «Por confirmar» = depende de una convocatoria o de terceros."], [],
  ["Fuente", "Importe (€)", "Tipo", "Estado", "Etiqueta", "Condiciones y fuente"]];
const fStart = F.length + 1;
F.push(["Aportación de los socios (y familia)", 600, "Propio", "Seguro", "EQUIPO", "Ej.: 4 socios × 150 €. Cambiadlo por lo que podáis poner."]);
F.push(["«Cuota cero» de la Junta (devuelve las cuotas del año 1)", `=12*${sup("tarifaPlana")}*${sup("autonomos")}`, "Subvención", "Por confirmar", "SECUNDARIA", "Requiere tarifa plana; el plazo de 2026 acabó el 30/09/2026. Comprobar la convocatoria de 2027 en la Junta de Andalucía."]);
F.push(["Ayuda de la Junta al inicio de actividad (autónomos)", 3800, "Subvención", "Por confirmar", "SECUNDARIA", "3.800-5.500 € según edad, sexo y municipio; convocatoria 2025-2026 (plazo hasta el 30/06/2026). Esperar la siguiente."]);
F.push(["Premio o capital semilla de la incubadora / concursos de emprendimiento", 1000, "Premio", "Por confirmar", "HIPÓTESIS", "Preguntar al programa de emprendimiento qué premios hay."]);
F.push(["ENISA Jóvenes Emprendedores (préstamo participativo)", 0, "Préstamo", "Más adelante", "SECUNDARIA", "25.000-75.000 €, menores de 40, exige sociedad (SL) y fondos propios ≥ 50 % de lo pedido. No encaja en el año 1."]);
const fEnd = F.length;
F.push(["Total previsto", `=SUM(B${fStart}:B${fEnd})`]);
const fTot = F.length;
F.push(["…de lo que es seguro", `=SUMIF(D${fStart}:D${fEnd},"Seguro",B${fStart}:B${fEnd})`]);
F.push(["Financiación recomendada (de la hoja Resumen)", `=Resumen!$B$9`]);
F.push(["Cobertura", `=IF(B${fTot + 2}=0,0,B${fTot}/B${fTot + 2})`]);
F.push(["Hueco que falta por cubrir", `=MAX(0,B${fTot + 2}-B${fTot})`]);
F.push([]);
F.push(["Apoyo sin dinero: Andalucía Emprende (CADE) asesora y ayuda con el plan de viabilidad, que la ayuda de la Junta exige con resultado positivo."]);

/* ---------- 5. Resumen ---------- */
const Rz = [
  ["GoLiveIt · cuánta financiación pedir y cuándo se recupera"],
  ["Modelo con supuestos marcados (HIPÓTESIS hasta validarlos). Escenario en Supuestos!B3."],
  [],
  ["Escenario", "=Supuestos!$C$3"],
  [],
  ["Inversión inicial (mes 0)", `=${INVTOT}`],
  ["Peor momento de caja (necesidad máxima)", `=-MIN('Proyección mensual'!$X$${p0}:$X$${pEnd})`],
  ["Margen de seguridad", `=${sup("margen")}`],
  ["FINANCIACIÓN RECOMENDADA (redondeada a 500 €)", `=CEILING(B7*(1+B8),500)`],
  [],
  ["Primer mes con beneficio", `=IF(MIN(${RNG("Z")})=999,"No en 5 años",INDEX(${RNG("B")},MIN(${RNG("Z")})))`],
  ["Mes en que se recupera la inversión (caja acumulada ≥ 0)", `=IF(MIN(${RNG("Y")})=999,"No en 5 años",INDEX(${RNG("B")},MIN(${RNG("Y")})))`],
  ["…meses hasta recuperarla", `=IF(MIN(${RNG("Y")})=999,"más de 60",MIN(${RNG("Y")}))`],
  [],
  ["", "Año 1 (2027)", "Año 2 (2028)", "Año 3 (2029)", "Año 4 (2030)", "Año 5 (2031)"],
  ...[["Viajeros", "H"], ["Ingresos", "N"], ["…Pase (sin IVA)", "J"], ["…pack tranquilidad y afiliación", "K"], ["…centros y ayuntamientos", "M"], ["Costes", "V"], ["Resultado", "W"]].map(([l, c]) =>
    [l, ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG(c)})`)]),
  ["Caja al final del año", ...[12, 24, 36, 48, 60].map(k => `='Proyección mensual'!$X$${p0 + k}`)],
  [],
  ["Comprobación de realismo"],
  ["Jóvenes de 15-17 que viajan al extranjero al año en los países donde estamos", `=(${sup("jovEsp")}*${sup("pctAnd")}+IF(${sup("expMes")}<=60,${sup("jovExp")},0))*${sup("pctViajan")}`],
  ["Viajeros del año 5 sobre ese mercado", "=IF(B26=0,0,F16/B26)"],
];

/* ---------- 6. Fuentes ---------- */
const FU = [["Fuentes y etiquetas"], [],
  ["Etiqueta", "Qué significa"],
  ["OFICIAL", "Organismo público (INE, Junta, Seguridad Social)."],
  ["SECUNDARIA", "Prensa, blogs o webs de terceros; hay que comprobarlo en la fuente oficial."],
  ["EQUIPO", "Dato o decisión del equipo (encuesta propia, demo, correos de albergues)."],
  ["INFERENCIA", "Cálculo razonado a partir de otros datos."],
  ["HIPÓTESIS", "Supuesto sin validar: es lo primero que hay que medir."],
  [],
  ["Fuente", "Enlace"],
  ["Encuesta piloto de Ruta16 (23/11/2026, n=40; 30 jóvenes, 2 familias)", "Pitch de Ruta16, anexos A y B"],
  ["Albergues que aceptan menores (37 sí, 13 con adulto o no, 8 sin respuesta)", "Albergues que aceptan menores.xlsx (23/11/2026)"],
  ["INE: población de 15-17 y Encuesta de Turismo de Residentes 2025", "https://www.ine.es"],
  ["Tarifa plana de autónomos 2026 (80 € + MEI)", "https://www.infoautonomos.com/seguridad-social/tarifa-plana-autonomos/"],
  ["Cuota cero de la Junta de Andalucía", "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/areas/trabajo-autonomo/fomento-trabajo-autonomo/paginas/subv-fomento-cuota-cero.html"],
  ["Ayuda de inicio de actividad (104 M€, 2025-2026)", "https://www.juntadeandalucia.es/organismos/empleoempresaytrabajoautonomo/servicios/actualidad/noticias/detalle/602926.html"],
  ["ENISA Jóvenes Emprendedores (25.000-75.000 €)", "https://www.legalitas.com/actualidad/enisa-jovenes-emprendedores"],
  ["Seguro de responsabilidad civil (precios orientativos)", "https://www.bbva.com/es/salud-financiera/que-es-y-cuanto-cuesta-un-seguro-de-responsabilidad-civil-para-autonomos-coberturas-obligatoriedad-y-precios/"],
  ["Hostelworld, afiliación (18-22 % del depósito, vía Partnerize)", "https://affilimate.com/programs/hostelworld-affiliate-program"],
  ["Booking.com, afiliación (porcentaje de su comisión)", "https://track360.io/blog/booking-com-affiliate-partner-program-operator-teardown-2026"],
  ["Afiliación y APIs de proveedores (estudio propio)", "Bóveda: 50 Propuesta individual/Integración de proveedores y marketplace.md"],
];

/* ---------- 7. Números del pitch ---------- */
const NP = [
  ["Números del pitch · GoLiveIt (equipo Ruta16)"],
  ["Todas las cifras de la presentación en una página. Las de arriba se recalculan solas; las tablas de abajo se calcularon con el modelo el 25/11/2026."],
  [],
  ["LO QUE PEDIMOS", "Escenario:", "=Resumen!$B$4"],
  ["Financiación que pedimos", "=Resumen!$B$9", "", "PUNTO MUERTO (viajeros al mes, año 2)", "='Punto muerto'!$C$15"],
  ["…tramo 1 (meses 0-6: inversión inicial y primeros meses)", "=-'Proyección mensual'!$X$" + (p0 + 6), "", "…de ellos con Pase", "='Punto muerto'!$C$16"],
  ["Inversión inicial (mes 0)", "=Resumen!$B$6", "", "Punto muerto alcanzado (12 meses en positivo)", "='Punto muerto'!$B$22"],
  ["Peor momento de caja", "=-Resumen!$B$7"],
  ["Primer mes con beneficio", "=Resumen!$B$11"],
  ["Mes en que se recupera la inversión", "=Resumen!$B$12"],
  ["…meses hasta recuperarla", "=Resumen!$B$13"],
  [],
  ["CUÁNTO DEJA CADA PASE"],
  ["Precio del Pase (IVA incluido)", "=" + sup("precio")],
  ["…sin IVA (lo que ingresamos)", "=" + sup("precio") + "/(1+" + sup("iva") + ")"],
  ["…menos la pasarela de pago", "=-(" + sup("precio") + "*" + sup("pagoPct") + "+" + sup("pagoFijo") + ")"],
  ["…menos avisos, asistencia y soporte", "=-" + sup("costeFamilia")],
  ["Margen por Pase", "=B15+B16+B17"],
  ["Pack tranquilidad y otros servicios por Pase (media)", "=" + sup("seguroPct") + "*" + sup("seguroPrima") + "*" + sup("seguroCom") + "+" + sup("esimPct") + "*" + sup("esimPrecio") + "*" + sup("esimCom") + "+" + sup("otrosPct") + "*" + sup("otrosCom")],
  [],
  ["AÑO A AÑO", "Año 1 (2027)", "Año 2 (2028)", "Año 3 (2029)", "Año 4 (2030)", "Año 5 (2031)"],
  ["Viajeros", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("H")})`)],
  ["Viajeros con Pase", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("I")})`)],
  ["Ingresos", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("N")})`)],
  ["…Pase (sin IVA)", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("J")})`)],
  ["…pack tranquilidad y afiliación", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("K")})`)],
  ["…centros y ayuntamientos (opcional)", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("M")})`)],
  ["Costes", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("V")})`)],
  ["Resultado", ...[1, 2, 3, 4, 5].map(y => `=SUMIF(${RNG("C")},${y},${RNG("W")})`)],
  ["Caja al final del año", ...[12, 24, 36, 48, 60].map(k => `='Proyección mensual'!$X$${p0 + k}`)],
  [],
  ["EN QUÉ SE USA LA INVERSIÓN INICIAL", "Importe (€)"],
  ...INV.map((r, i) => [r[0], `='Inversión inicial'!$B$${invStart + i}`]),
  ["Imprevistos", `='Inversión inicial'!$B$${invTot}-'Inversión inicial'!$B$${invSub}`],
  ["Total", `='Inversión inicial'!$B$${invTot}`],
  [],
  ["DE DÓNDE PUEDE SALIR EL DINERO", "Importe (€)", "Estado"],
  ...[0, 1, 2, 3, 4].map(i => [`=Financiación!$A$${fStart + i}`, `=Financiación!$B$${fStart + i}`, `=Financiación!$D$${fStart + i}`]),
  ["Total previsto", `=Financiación!$B$${fTot}`],
  ["Hueco que falta por cubrir", `=Financiación!$B$${fTot + 4}`],
];
const npEsc = NP.length + 2;

/* ---------- 8. Punto muerto ---------- */
const PM = [
  ["Punto muerto (umbral de rentabilidad)"],
  ["Cuántos viajeros al mes hacen falta para cubrir los costes fijos, y en qué mes se llega. Todo son fórmulas sobre Supuestos y Proyección mensual."],
  [],
  ["MARGEN DE CONTRIBUCIÓN POR VIAJERO", "€"],
  ["Pase sin IVA, por viajero con Pase", "=" + sup("precio") + "*(1-" + sup("descGrupo") + ")/(1+" + sup("iva") + ")"],
  ["…menos pasarela, avisos y soporte", "=-(" + sup("precio") + "*(1-" + sup("descGrupo") + ")*" + sup("pagoPct") + "+" + sup("pagoFijo") + "+" + sup("costeFamilia") + ")"],
  ["…más Pack tranquilidad y otros servicios (media)", "=" + sup("seguroPct") + "*" + sup("seguroPrima") + "*" + sup("seguroCom") + "+" + sup("esimPct") + "*" + sup("esimPrecio") + "*" + sup("esimCom") + "+" + sup("otrosPct") + "*" + sup("otrosCom")],
  ["Margen por viajero con Pase (tras la publicidad que crece con las ventas)", "=B5+B6+B7-" + sup("mktPct") + "*(B5+B7)"],
  ["Viajeros que compran el Pase", "=" + sup("convPago")],
  ["Afiliación por viajero (media de todos, tras la publicidad)", "=" + sup("pctEnlaces") + "*" + sup("eurReserva") + "*(1-" + sup("mktPct") + ")"],
  ["MARGEN DE CONTRIBUCIÓN POR VIAJERO (media)", "=B8*B9+B10"],
  [],
  ["COSTES FIJOS AL MES", "Año 1", "Año 2", "Año 3 en adelante"],
  ["Costes fijos (sin los que dependen de las ventas)", `='Proyección mensual'!$V$${p0 + 1}-'Proyección mensual'!$O$${p0 + 1}`, `='Proyección mensual'!$V$${p0 + 13}-'Proyección mensual'!$O$${p0 + 13}`, `='Proyección mensual'!$V$${p0 + 25}-'Proyección mensual'!$O$${p0 + 25}`],
  ["PUNTO MUERTO: viajeros al mes", "=B14/$B$11", "=C14/$B$11", "=D14/$B$11"],
  ["…de ellos, con Pase", "=B15*$B$9", "=C15*$B$9", "=D15*$B$9"],
  ["…al año (viajeros)", "=B15*12", "=C15*12", "=D15*12"],
  ["…al año (grupos de 4)", "=B17/" + sup("porGrupo"), "=C17/" + sup("porGrupo"), "=D17/" + sup("porGrupo")],
  [],
  ["CUÁNDO SE ALCANZA", "Mes"],
  ["Primer mes con beneficio (temporada alta)", "=Resumen!$B$11"],
  ["Punto muerto alcanzado (los últimos 12 meses en positivo)", "=IF(MIN($I$26:$I$85)=999,\"No en 5 años\",INDEX($B$26:$B$85,MIN($I$26:$I$85)))"],
  ["Inversión recuperada (caja acumulada ≥ 0)", "=Resumen!$B$12"],
  [],
  ["MES A MES (en horizontal)"],
];
const pmStart = 0;

/* ---------- 10. Vistas en horizontal (meses en columnas) ---------- */
const colL = n => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }; // 0 → A
const mc = m => colL(m + 1); // mes 1 → columna C
const PJ = (c, m) => `'Proyección mensual'!$${c}$${p0 + m}`;
function buildHZ({ title, intro, HN, cut, yearTotals }) {
  const T = [], ROWS = [];
  const lastC = mc(HN);
  T.push([title]);
  T.push([intro]);
  T.push(["Inversión recuperada en", "=Resumen!$B$12"]);
  T.push([cut ? "…último mes de la tabla (nº)" : "Meses que se muestran", cut ? "=IF(ISNUMBER(Resumen!$B$13),MIN(" + HN + ",Resumen!$B$13)," + HN + ")" : HN]);
  T.push(["Escenario", "=Supuestos!$C$3"]);
  const head = T.length + 1;
  const yearCols = yearTotals ? [1, 2, 3, 4, 5].map(y => colL(HN + 2 + y)) : [];
  T.push(["Concepto", "Total", ...Array.from({ length: HN }, (_, i) => cut ? `=IF(${i + 1}<=$B$4,'Proyección mensual'!$B$${p0 + i + 1},"")` : `='Proyección mensual'!$B$${p0 + i + 1}`), ...(yearTotals ? ["", "Año 1 (2027)", "Año 2 (2028)", "Año 3 (2029)", "Año 4 (2030)", "Año 5 (2031)"] : [])]);
  const yearRow = T.length + 1;
  T.push(["Año", "", ...Array.from({ length: HN }, (_, i) => Math.ceil((i + 1) / 12))]);
  ROWS.push([yearRow, "year"]);
  const wrap = (m, f) => cut ? `=IF(${m}<=$B$4,${f},"")` : `=${f}`;
  const addSec = t => { T.push([t]); ROWS.push([T.length, "sec"]); };
  const addRow = (label, f, tipo = "eur", total = true) => {
    const r = T.length + 1;
    const yt = yearTotals && total ? ["", ...[1, 2, 3, 4, 5].map(y => `=SUMIF($C$${yearRow}:$${lastC}$${yearRow},${y},$C${r}:$${lastC}${r})`)] : [];
    T.push([label, total ? `=SUM(C${r}:${lastC}${r})` : "", ...Array.from({ length: HN }, (_, i) => wrap(i + 1, f(i + 1, r))), ...yt]);
    ROWS.push([r, tipo]); return r;
  };
  const ventas = m => `${PJ("I", m)}*${sup("precio")}*(1-${sup("descGrupo")})`;
  addSec("DEMANDA");
  addRow("Temporada", m => `IF(${PJ("E", m)}>=1.3,"Alta",IF(${PJ("E", m)}<=0.7,"Baja","Media"))`, "txt", false);
  addRow("Factor de temporada (1 = mes medio)", m => PJ("E", m), "fac", false);
  addRow("Grupos que planifican un viaje", m => PJ("F", m), "num");
  addRow("Viajeros", m => PJ("H", m), "num");
  addRow("Viajeros con Pase", m => PJ("I", m), "num");
  addSec("VENTAS E IVA");
  addRow("Ventas de Pases cobradas a las familias (IVA incluido)", m => ventas(m));
  addRow("…IVA incluido en esas ventas (no es nuestro: va a Hacienda)", m => `${ventas(m)}*${sup("iva")}/(1+${sup("iva")})`);
  addRow("IVA a ingresar a Hacienda en el trimestre (modelo 303)", m => (m % 3 === 0 ? [m - 2, m - 1, m].map(k => `${ventas(k)}*${sup("iva")}/(1+${sup("iva")})`).join("+") : "0"));
  addSec("INGRESOS (sin IVA)");
  addRow("Pases (sin IVA)", m => PJ("J", m));
  addRow("Comisión del seguro de viaje", m => `${PJ("I", m)}*${sup("seguroPct")}*${sup("seguroPrima")}*${sup("seguroCom")}`);
  addRow("Comisión de la eSIM (se contrata con el Pase)", m => `${PJ("I", m)}*${sup("esimPct")}*${sup("esimPrecio")}*${sup("esimCom")}`);
  addRow("Otros servicios (traslados, tarjeta prepago, carné, actividades)", m => `${PJ("I", m)}*${sup("otrosPct")}*${sup("otrosCom")}`);
  addRow("Reservas por enlace (afiliación)", m => `${PJ("H", m)}*${sup("pctEnlaces")}*${sup("eurReserva")}`);
  addRow("TOTAL INGRESOS", m => PJ("N", m), "tot");
  addSec("GASTOS VARIABLES (dependen de las ventas)");
  addRow("Pasarela de pago", m => `${ventas(m)}*${sup("pagoPct")}+${PJ("I", m)}*${sup("pagoFijo")}`);
  addRow("Avisos, asistencia y soporte a familias", m => `${PJ("I", m)}*${sup("costeFamilia")}`);
  addRow("Publicidad que crece con las ventas (% de los ingresos)", m => `IF(${m}>=${sup("mktDesde")},${PJ("N", m)}*${sup("mktPct")},0)`);
  addSec("GASTOS FIJOS");
  addRow("Verificación de datos (normas, albergues, caducidades)", m => PJ("P", m));
  addRow("Marketing fijo (contenido en redes)", m => PJ("Q", m));
  addRow("Alojamiento web, dominio, correo y herramientas", m => PJ("R", m));
  addRow("Mantenimiento y mejoras de la web", m => PJ("AB", m));
  addRow("Salida a Europa (lanzamiento y operación en Portugal, Italia y Francia)", m => PJ("AG", m));
  addRow("Seguro de responsabilidad civil", m => `${sup("seguro")}/12`);
  addRow("Gestoría (más cara desde que se pasa a SL)", m => `IF(${m}>=${sup("slDesde")},${sup("gestoriaSL")},${sup("gestoria")})`);
  addRow("Revisión legal anual", m => `IF(${m}>12,${sup("legalAnual")}/12,0)`);
  addRow("Cuota de autónomo", m => PJ("T", m));
  addRow("Retribución de los fundadores", m => PJ("U", m));
  addRow("TOTAL GASTOS", m => PJ("V", m), "tot");
  addSec("RESULTADO");
  addRow("Beneficio antes de impuestos", m => PJ("W", m), "tot");
  addRow("Impuesto sobre el beneficio (IRPF como autónomos; Impuesto de Sociedades desde la SL)", m => PJ("AE", m));
  const rNeto = addRow("BENEFICIO NETO", m => PJ("AF", m), "tot");
  const rAcum = T.length + 1;
  T.push(["Beneficio neto acumulado", "", ...Array.from({ length: HN }, (_, i) => wrap(i + 1, i === 0 ? `${mc(1)}${rNeto}` : `${mc(i)}${rAcum}+${mc(i + 1)}${rNeto}`))]);
  ROWS.push([rAcum, "eur"]);
  const rCaja = addRow("CAJA ACUMULADA (con la inversión inicial)", m => PJ("X", m), "caja", false);
  T.push([]);
  T.push(["Notas: el IVA de las ventas se cobra y se ingresa a Hacienda cada trimestre; los gastos se muestran sin IVA (el IVA soportado se descuenta en el mismo modelo 303). El impuesto se estima sobre el beneficio acumulado del año: 20 % como autónomos (pagos fraccionados) y 25 % de Impuesto de Sociedades desde que se pasa a SL. Desde la salida a Europa, las ventas a Portugal, Italia y Francia llevan el IVA de cada país (ventanilla única OSS); el modelo usa el 21 % para todo."]);
  return { T, ROWS, head, yearRow, rCaja, note: T.length, HN, lastC, yearTotals };
}
const HZB = buildHZ({ title: "Previsión mensual hasta recuperar la inversión (en horizontal)", intro: "Cada columna es un mes desde el lanzamiento; la tabla se corta en el mes en que la caja acumulada vuelve a positivo. Importes en euros sin IVA, salvo donde se indica.", HN: 36, cut: true, yearTotals: false });
const H5B = buildHZ({ title: "Previsión a 5 años, mes a mes (en horizontal)", intro: "Los 60 meses de 2027 a 2031 en columnas, con el total de cada año a la derecha. Importes en euros sin IVA, salvo donde se indica.", HN: 60, cut: false, yearTotals: true });
const HZ = HZB.T, H5 = H5B.T, HZROWS = HZB.ROWS, HN = HZB.HN;

/* Punto muerto mes a mes, en horizontal */
const pmLast = mc(60);
const pmMes = PM.length + 1;
PM.push(["Mes", "", ...Array.from({ length: 60 }, (_, i) => `='Proyección mensual'!$B$${p0 + i + 1}`)]);
const pmV = PM.length + 1;
PM.push(["Viajeros del mes", "", ...Array.from({ length: 60 }, (_, i) => `='Proyección mensual'!$H$${p0 + i + 1}`)]);
const pmN = PM.length + 1;
PM.push(["Viajeros necesarios (punto muerto)", "", ...Array.from({ length: 60 }, (_, i) => `=MAX(0,(${mc(i + 1)}${pmN + 2}-'Proyección mensual'!$M$${p0 + i + 1})/$B$11)`)]);
const pmMC = PM.length + 1;
PM.push(["Margen de contribución", "", ...Array.from({ length: 60 }, (_, i) => `=${mc(i + 1)}${pmV}*$B$11`)]);
const pmCF = PM.length + 1;
PM.push(["Costes fijos", "", ...Array.from({ length: 60 }, (_, i) => `='Proyección mensual'!$V$${p0 + i + 1}-'Proyección mensual'!$O$${p0 + i + 1}`)]);
const pmR = PM.length + 1;
PM.push(["Resultado del mes (antes de impuestos)", "", ...Array.from({ length: 60 }, (_, i) => `='Proyección mensual'!$W$${p0 + i + 1}`)]);
const pmR12 = PM.length + 1;
PM.push(["Resultado de los últimos 12 meses", "", ...Array.from({ length: 60 }, (_, i) => i >= 11 ? `=SUM(${mc(i - 10)}${pmR}:${mc(i + 1)}${pmR})` : "")]);
const pmAux = PM.length + 1;
PM.push(["Aux: punto muerto", "", ...Array.from({ length: 60 }, (_, i) => i >= 11 ? `=IF(${mc(i + 1)}${pmR12}>=0,${i + 1},999)` : 999)]);
PM[21][1] = `=IF(MIN($C$${pmAux}:$${pmLast}$${pmAux})=999,"No en 5 años",INDEX($C$${pmMes}:$${pmLast}$${pmMes},1,MIN($C$${pmAux}:$${pmLast}$${pmAux})))`;

/* ---------- 11. Ventas de un mes (todo desglosado, eligiendo el mes) ---------- */
const IX = c => `INDEX(${RNG(c)},$B$4)`;
const VM = [["Ventas de un mes: de dónde sale cada euro"],
  ["Elige el mes en la celda amarilla (1 = enero de 2027 … 60 = diciembre de 2031). Cada línea dice cuántas ventas hay, a qué precio, cuánto paga el cliente, cuánto es IVA y cuánto nos queda."], []];
const VMR = {};
VM.push(["Mes nº (escribe de 1 a 60)", 7, "", "", "", "", "7 = julio de 2027, el mes más fuerte del primer año."]); VMR.sel = VM.length;
VM.push(["Mes", `=${IX("B")}`]);
VM.push(["Temporada", `=IF(B7>=1.3,"Alta",IF(B7<=0.7,"Baja","Media"))`]);
VM.push(["Factor de temporada (1 = mes medio)", `=${IX("E")}`]);
VM.push(["Grupos que planifican un viaje", `=${IX("F")}`]);
VM.push(["Viajeros", `=${IX("H")}`]);
VM.push(["Viajeros con Pase (ventas del Pase)", `=${IX("I")}`]);
VM.push(["Escenario", "=Supuestos!$C$3"]);
VM.push([]);
VM.push(["INGRESOS POR VENTAS", "Nº de ventas", "Precio unitario", "Paga el cliente (IVA incl.)", "IVA (va a Hacienda)", "Nos queda (sin IVA)", "Cómo se calcula"]); VMR.h1 = VM.length;
const vr = () => VM.length + 1;
let r = vr(); VMR.i0 = r;
VM.push(["Pase del viajero", "=B10", `=${sup("precio")}*(1-${sup("descGrupo")})`, `=B${r}*C${r}`, `=D${r}*${sup("iva")}/(1+${sup("iva")})`, `=D${r}-E${r}`, "Cada viajero con Pase paga el precio con IVA; quitamos el IVA, que es de Hacienda."]);
r = vr(); VM.push(["Seguro de viaje (pack tranquilidad)", `=B10*${sup("seguroPct")}`, `=${sup("seguroPrima")}`, `=B${r}*C${r}`, 0, `=D${r}*${sup("seguroCom")}`, "La prima la cobra la aseguradora; nos quedamos su comisión (Supuestos). Los seguros no llevan IVA."]);
r = vr(); VM.push(["eSIM de datos (se contrata con el Pase)", `=B10*${sup("esimPct")}`, `=${sup("esimPrecio")}`, `=B${r}*C${r}`, 0, `=D${r}*${sup("esimCom")}`, "La eSIM la vende el operador (con su IVA); nos paga una comisión (Supuestos)."]);
r = vr(); VM.push(["Otros servicios (traslados, tarjeta prepago, carné, actividades)", `=B10*${sup("otrosPct")}`, null, null, 0, `=B${r}*${sup("otrosCom")}`, "Comisión media por servicio (Supuestos); el precio lo pone cada proveedor."]);
r = vr(); VM.push(["Reservas de alojamiento y transporte por nuestros enlaces", `=B9*${sup("pctEnlaces")}`, null, null, 0, `=B${r}*${sup("eurReserva")}`, "Reserva un adulto en Booking, Hostelworld, etc.; nos pagan una comisión por viajero. Cuentan todos los viajeros, tengan Pase o no."]);
r = vr(); VM.push(["Centros y ayuntamientos (desactivado: solo particulares)", `=${IX("L")}`, null, null, 0, `=${IX("M")}`, "Capa futura; ahora 0 en todos los escenarios."]); VMR.i1 = r;
r = vr(); VMR.iT = r;
VM.push(["TOTAL DEL MES", `=B${VMR.i0}`, null, `=SUM(D${VMR.i0}:D${VMR.i1})`, `=SUM(E${VMR.i0}:E${VMR.i1})`, `=SUM(F${VMR.i0}:F${VMR.i1})`, "Paga el cliente = todo lo que pagan las familias por lo que pasa por la web (incluye primas y eSIM que no son nuestras)."]);
r = vr(); VM.push(["Comprobación: ingresos del mes en la proyección", null, null, null, null, `=${IX("N")}`, `=IF(ABS(F${VMR.iT}-F${r})<0.01,"✓ Cuadra con la proyección","REVISAR: no cuadra")`]); VMR.iC = r;
VM.push([]);
VM.push(["GASTOS DEL MES", "Nº", "Coste unitario", "", "", "Importe", "Cómo se calcula"]); VMR.h2 = VM.length;
r = vr(); VMR.g0 = r;
VM.push(["Pasarela de pago", `=B${VMR.i0}`, `=C${VMR.i0}*${sup("pagoPct")}+${sup("pagoFijo")}`, null, null, `=B${r}*C${r}`, "Stripe: porcentaje del cobro + fijo por pago."]);
r = vr(); VM.push(["Avisos, asistencia y soporte a familias", `=B${VMR.i0}`, `=${sup("costeFamilia")}`, null, null, `=B${r}*C${r}`, "Mensajes, notificaciones y horas de atención por cada Pase."]);
r = vr(); VM.push(["Publicidad que crece con las ventas", null, null, null, null, `=IF($B$4>=${sup("mktDesde")},F${VMR.iT}*${sup("mktPct")},0)`, "Porcentaje de los ingresos del mes (Supuestos); desde el año 2."]);
r = vr(); VMR.gV = r; VM.push(["Total gastos variables", null, null, null, null, `=SUM(F${VMR.g0}:F${r - 1})`]);
r = vr(); VMR.f0 = r;
[["Verificación de datos (normas, albergues, caducidades)", "P", "Horas de verificación × coste por hora."], ["Marketing fijo (contenido en redes)", "Q", ""], ["Alojamiento web, dominio, correo y herramientas", "R", ""], ["Mantenimiento y mejoras de la web", "AB", ""],
 ["Seguro, gestoría y revisión legal", "S", "Seguro anual / 12 + gestoría (más cara con SL) + revisión legal / 12 desde el año 2."], ["Cuotas de autónomo (los socios de alta)", "T", "Tarifa plana los primeros meses; después, cuota normal."], ["Retribución de los fundadores", "U", "Sin sueldo los años 1 y 2; sube cada año desde el 3."], ["Salida a Europa (Portugal, Italia y Francia)", "AG", "Lanzamiento en el mes de salida y coste de operar allí cada mes."]]
  .forEach(([l, c, n]) => VM.push([l, null, null, null, null, `=${IX(c)}`, n]));
r = vr(); VMR.gF = r; VM.push(["Total gastos fijos", null, null, null, null, `=SUM(F${VMR.f0}:F${r - 1})`]);
r = vr(); VMR.gT = r; VM.push(["TOTAL GASTOS DEL MES", null, null, null, null, `=F${VMR.gV}+F${VMR.gF}`, `=IF(ABS(F${r}-${IX("V")})<0.01,"✓ Cuadra con la proyección","REVISAR: no cuadra")`]);
VM.push([]);
VM.push(["RESULTADO DEL MES", "", "", "", "", "Importe", ""]); VMR.h3 = VM.length;
r = vr(); VMR.bai = r; VM.push(["Beneficio antes de impuestos", null, null, null, null, `=F${VMR.iT}-F${VMR.gT}`]);
r = vr(); VM.push(["Impuesto sobre el beneficio del mes (estimación)", null, null, null, null, `=${IX("AE")}`, "IRPF como autónomos (20 %) o Impuesto de Sociedades desde la SL (25 %), sobre lo acumulado en el año."]);
r = vr(); VMR.neto = r; VM.push(["BENEFICIO NETO DEL MES", null, null, null, null, `=F${VMR.bai}-F${r - 1}`, `=IF(ABS(F${r}-${IX("AF")})<0.01,"✓ Cuadra con la proyección","REVISAR: no cuadra")`]);
VM.push([]);
r = vr(); VMR.iva = r; VM.push(["IVA cobrado este mes (se ingresa a Hacienda en el trimestre)", null, null, null, null, `=E${VMR.iT}`, "No es un gasto ni un ingreso: lo cobramos a las familias y lo pasamos a Hacienda (modelo 303)."]);
r = vr(); VMR.caja = r; VM.push(["Caja acumulada al acabar el mes (con la inversión inicial)", null, null, null, null, `=${IX("X")}`]);

/* ---------- 12. Presupuesto de una venta ---------- */
const PV = [["Presupuesto de una venta: lo que entra y lo que sale por cada Pase"],
  ["Tres casos: solo el Pase, la venta media (lo que de verdad pasa de media) y la venta completa (con seguro, eSIM, otro servicio y reserva por enlace). Los costes fijos se reparten entre los Pases del año elegido."], []];
const PVR = {};
PV.push(["Año para repartir los costes fijos (escribe de 1 a 5)", 1, "", "", "1 = 2027 … 5 = 2031."]); PVR.sel = PV.length;
PV.push(["Año", `="Año "&B4&" ("&(2026+B4)&")"`]);
PV.push(["Pases vendidos ese año", `=SUMIF(${RNG("C")},$B$4,${RNG("I")})`]); PVR.pases = PV.length;
PV.push(["Escenario", "=Supuestos!$C$3"]);
PV.push([]);
PV.push(["POR CADA PASE VENDIDO", "Solo el Pase", "Venta media", "Venta completa", "Cómo se calcula"]); PVR.head = PV.length;
const pr = () => PV.length + 1; const all = f => [f("B"), f("C"), f("D")];
PV.push(["INGRESOS"]); PVR.s1 = PV.length;
let q = pr(); PVR.precio = q; PV.push(["Precio que paga la familia (IVA incluido)", ...all(() => `=${sup("precio")}*(1-${sup("descGrupo")})`), "Precio del Pase del viajero."]);
q = pr(); PV.push(["…IVA incluido (va a Hacienda)", ...all(c => `=-${c}${PVR.precio}*${sup("iva")}/(1+${sup("iva")})`), "IVA incluido en el precio."]);
q = pr(); PVR.i0 = q; PV.push(["Pase sin IVA", ...all(c => `=${c}${q - 2}+${c}${q - 1}`), "Lo que nos queda del Pase."]);
q = pr(); PV.push(["Comisión del seguro de viaje", 0, `=${sup("seguroPct")}*${sup("seguroPrima")}*${sup("seguroCom")}`, `=${sup("seguroPrima")}*${sup("seguroCom")}`, "Media: no todos lo contratan. Completa: prima × comisión."]);
q = pr(); PV.push(["Comisión de la eSIM", 0, `=${sup("esimPct")}*${sup("esimPrecio")}*${sup("esimCom")}`, `=${sup("esimPrecio")}*${sup("esimCom")}`, "Ídem con la eSIM."]);
q = pr(); PV.push(["Otros servicios (traslado, tarjeta, carné, actividad)", 0, `=${sup("otrosPct")}*${sup("otrosCom")}`, `=${sup("otrosCom")}`, "Completa: un servicio."]);
q = pr(); PVR.i1 = q; PV.push(["Reserva por nuestros enlaces (afiliación)", 0, `=${sup("pctEnlaces")}*${sup("eurReserva")}/${sup("convPago")}`, `=${sup("eurReserva")}`, "Media: lo que dejan las reservas de todos los viajeros, repartido entre los que tienen Pase."]);
q = pr(); PVR.iT = q; PV.push(["TOTAL INGRESOS POR VENTA (sin IVA)", ...all(c => `=SUM(${c}${PVR.i0}:${c}${PVR.i1})`)]);
PV.push(["GASTOS QUE DEPENDEN DE LA VENTA"]); PVR.s2 = PV.length;
q = pr(); PVR.g0 = q; PV.push(["Pasarela de pago", ...all(c => `=-(${c}${PVR.precio}*${sup("pagoPct")}+${sup("pagoFijo")})`), "Porcentaje del cobro + fijo por pago."]);
q = pr(); PV.push(["Avisos, asistencia y soporte", ...all(() => `=-${sup("costeFamilia")}`), "Por cada Pase."]);
q = pr(); PV.push(["Publicidad que crece con las ventas", ...all(c => `=-IF(($B$4-1)*12+1>=${sup("mktDesde")},${sup("mktPct")},0)*${c}${PVR.iT}`), "Porcentaje de los ingresos (Supuestos); desde el año 2."]);
q = pr(); PVR.mc = q; PV.push(["MARGEN DE CONTRIBUCIÓN POR VENTA", ...all(c => `=${c}${PVR.iT}+SUM(${c}${PVR.g0}:${c}${q - 1})`), "Lo que deja cada venta para pagar los costes fijos."]);
PV.push(["COSTES FIJOS REPARTIDOS ENTRE LAS VENTAS DEL AÑO"]); PVR.s3 = PV.length;
q = pr(); PVR.cf = q; PV.push(["Costes fijos del año (verificación, web, gestoría, autónomos, sueldos, Europa…)", `=SUMIF(${RNG("C")},$B$4,${RNG("V")})-SUMIF(${RNG("C")},$B$4,${RNG("O")})`, null, null, "Total del año, sin los gastos de arriba."]);
q = pr(); PVR.cfv = q; PV.push(["…parte que le toca a cada venta", ...all(() => `=-$B$${PVR.cf}/$B$${PVR.pases}`), "Costes fijos del año ÷ Pases vendidos ese año."]);
q = pr(); PVR.bai = q; PV.push(["BENEFICIO POR VENTA (antes de impuestos)", ...all(c => `=${c}${PVR.mc}+${c}${PVR.cfv}`)]);
q = pr(); PV.push(["Impuesto sobre el beneficio", ...all(c => `=-MAX(0,${c}${PVR.bai})*IF(($B$4-1)*12+1>=${sup("slDesde")},${sup("tipoIS")},${sup("tipoImp")})`), "20 % como autónomos; 25 % de Sociedades desde la SL."]);
q = pr(); PVR.neto = q; PV.push(["BENEFICIO NETO POR VENTA", ...all(c => `=${c}${PVR.bai}+${c}${q - 1}`)]);
PV.push([]);
PV.push(["COMPROBACIÓN Y LECTURA"]); PVR.s4 = PV.length;
q = pr(); PVR.chk = q; PV.push(["Beneficio del año en la proyección ÷ Pases del año", null, `=SUMIF(${RNG("C")},$B$4,${RNG("W")})/$B$${PVR.pases}`, null, `=IF(ABS(C${q}-C${PVR.bai})<0.01,"✓ Cuadra con la venta media","REVISAR: no cuadra")`]);
q = pr(); PVR.nec = q; PV.push(["Ventas necesarias en el año para cubrir los costes fijos", null, `=B${PVR.cf}/C${PVR.mc}`, null, "Punto muerto del año, en Pases (con la venta media)."]);
q = pr(); PVR.pct = q; PV.push(["Parte de los ingresos de cada venta que es beneficio antes de impuestos", ...all(c => `=IF(${c}${PVR.iT}=0,0,${c}${PVR.bai}/${c}${PVR.iT})`)]);
PV.push([]);
PV.push(["Los ingresos van sin IVA. Las primas del seguro y el precio de la eSIM no son nuestros: solo cuenta la comisión. El primer año los costes fijos pesan más porque hay menos ventas; prueba con el año 3 o el 5."]); PVR.note = PV.length;

/* ---------- Evaluar ---------- */
const sheets = { "Números del pitch": NP, "Ventas de un mes": VM, "Presupuesto de una venta": PV, "Previsión hasta recuperar": HZ, "Previsión 5 años": H5, "Punto muerto": PM, "Resumen": Rz, "Supuestos": S, "Inversión inicial": I, "Proyección mensual": P, "Financiación": F, "Fuentes": FU };
const norm = a => a.map(r => r.map(v => v === undefined ? null : v));
const hf = HyperFormula.buildFromSheets(Object.fromEntries(Object.entries(sheets).map(([k, v]) => [k, norm(v)])), { licenseKey: "gpl-v3" });
const val = (name, r, c) => hf.getCellValue({ sheet: hf.getSheetId(name), row: r - 1, col: c });
let errors = [];
for (const [name, rows] of Object.entries(sheets)) rows.forEach((row, ri) => row.forEach((v, ci) => {
  if (typeof v === "string" && v.startsWith("=")) { const x = val(name, ri + 1, ci); if (x && typeof x === "object" && x.type) errors.push(`${name}!${String.fromCharCode(65 + ci)}${ri + 1}: ${x.type} ${x.message || ""} ← ${v}`); }
}));

/* ---------- Escribir con ExcelJS ---------- */
const wb = new ExcelJS.Workbook(); wb.creator = "GoLiveIt (Ruta16)"; wb.calcProperties.fullCalcOnLoad = true;
const BLUE = { color: { argb: "FF0000FF" } }, FONT = "Arial";
const EUR = '#,##0 €;-#,##0 €;"-"', EUR2 = '#,##0.00 €;-#,##0.00 €;"-"', PCT = '0%;-0%;"-"', PCT1 = '0.0%;-0.0%;"-"', NUM = '#,##0;-#,##0;"-"', NUM1 = '#,##0.0;-#,##0.0;"-"';
const FMT = { n: NUM, n1: NUM1, p: PCT, p1: PCT1, e: EUR, e2: EUR2 };
const YELLOW = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF00" } };
const HEADFILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1730D6" } };
for (const [name, rows] of Object.entries(sheets)) {
  const ws = wb.addWorksheet(name, { views: [{ state: "frozen", ySplit: name === "Proyección mensual" ? 4 : 0, xSplit: name === "Proyección mensual" ? 2 : 0 }] });
  rows.forEach((row, ri) => row.forEach((v, ci) => {
    if (v === null || v === undefined || v === "") return;
    const cell = ws.getCell(ri + 1, ci + 1);
    if (typeof v === "string" && v.startsWith("=")) { let res = val(name, ri + 1, ci); if (res && typeof res === "object") res = undefined; cell.value = { formula: v.slice(1), result: res }; }
    else cell.value = v;
    cell.font = { name: FONT, size: 10 };
  }));
  ws.getCell(1, 1).font = { name: FONT, size: 14, bold: true, color: { argb: "FF0E1330" } };
  if (rows[1] && rows[1][0]) ws.getCell(2, 1).font = { name: FONT, size: 10, italic: true, color: { argb: "FF555C7B" } };
}
const ws = n => wb.getWorksheet(n);
const head = (w, r, n) => { for (let c = 1; c <= n; c++) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true, color: { argb: "FFFFFFFF" } }; x.fill = HEADFILL; x.alignment = { wrapText: true, vertical: "middle" }; } };
// Supuestos
{ const w = ws("Supuestos"); head(w, 5, 8); w.getCell("B3").font = { name: FONT, size: 11, bold: true, ...BLUE }; w.getCell("B3").fill = YELLOW; w.getCell("C3").font = { name: FONT, size: 11, bold: true };
  w.getCell("B3").dataValidation = { type: "whole", operator: "between", formulae: [1, 3], showErrorMessage: true, errorTitle: "Escenario", error: "Escribe 1, 2 o 3" };
  w.getCell("B3").note = "1 = prudente · 2 = base · 3 = objetivo (modelo mejorado)";
  SUP.forEach(r => { if (r[0] === "h") return; const n = ROW[r[0]]; for (const c of ["B", "C", "D"]) { w.getCell(c + n).font = { name: FONT, size: 10, ...BLUE }; w.getCell(c + n).numFmt = FMT[r[8]]; } w.getCell("E" + n).numFmt = FMT[r[8]]; w.getCell("E" + n).font = { name: FONT, size: 10, bold: true }; });
  for (const k of ["convPago", "precio", "grupos0", "crec", "eurReserva"]) for (const c of ["B", "C", "D"]) w.getCell(c + ROW[k]).fill = YELLOW;
  w.eachRow((row, i) => { const a = row.getCell(1).value; if (typeof a === "string" && a === a.toUpperCase() && a.length > 4 && !row.getCell(2).value && i > 5) row.getCell(1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF1730D6" } }; });
  for (let i = 0; i < 12; i++) { w.getCell("E" + (ESTROW + i)).font = { name: FONT, size: 10, ...BLUE }; w.getCell("E" + (ESTROW + i)).numFmt = "0.0"; }
  w.columns.forEach((c, i) => c.width = [48, 11, 11, 11, 12, 13, 13, 80][i] || 12); w.getColumn(8).alignment = { wrapText: true, vertical: "top" }; }
// Inversión
{ const w = ws("Inversión inicial"); head(w, 4, 4); for (let r = invStart; r <= invEnd; r++) { w.getCell("B" + r).font = { name: FONT, size: 10, ...BLUE }; w.getCell("B" + r).numFmt = EUR; }
  w.getCell("B" + invSub).numFmt = EUR; w.getCell("B" + invPct).numFmt = PCT; w.getCell("B" + invPct).font = { name: FONT, size: 10, ...BLUE }; w.getCell("B" + invTot).numFmt = EUR;
  for (const r of [invSub, invTot]) { w.getCell("A" + r).font = { name: FONT, size: 10, bold: true }; w.getCell("B" + r).font = { name: FONT, size: 10, bold: true }; }
  w.columns.forEach((c, i) => c.width = [70, 14, 13, 80][i]); w.getColumn(4).alignment = { wrapText: true, vertical: "top" }; w.getColumn(1).alignment = { wrapText: true, vertical: "top" }; }
// Proyección
{ const w = ws("Proyección mensual"); head(w, 4, HEAD.length); w.getRow(4).height = 42;
  for (let r = p0; r <= pEnd; r++) { for (let c = 5; c <= 33; c++) { const x = w.getCell(r, c); x.numFmt = c === 5 ? "0.0" : c <= 9 || c === 12 ? NUM1 : EUR; } }
  for (let r = p0; r <= pEnd; r++) for (const c of [23, 24]) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true }; }
  for (const c of [25, 26, 27, 29, 30]) w.getColumn(c).hidden = true;
  w.columns.forEach((c, i) => { if (!c.hidden) c.width = i === 1 ? 10 : 12; }); }
// Financiación
{ const w = ws("Financiación"); head(w, 4, 6); for (let r = fStart; r <= fEnd; r++) { const x = w.getCell("B" + r); x.numFmt = EUR; if (typeof F[r - 1][1] === "number") x.font = { name: FONT, size: 10, ...BLUE }; }
  for (let r = fTot; r <= fTot + 4; r++) { w.getCell("A" + r).font = { name: FONT, size: 10, bold: true }; w.getCell("B" + r).numFmt = EUR; w.getCell("B" + r).font = { name: FONT, size: 10, bold: true }; }
  w.getCell("B" + (fTot + 2)).font = { name: FONT, size: 10, bold: true, color: { argb: "FF008000" } }; w.getCell("B" + (fTot + 3)).numFmt = PCT;
  w.columns.forEach((c, i) => c.width = [62, 14, 12, 14, 13, 90][i]); w.getColumn(6).alignment = { wrapText: true, vertical: "top" }; w.getColumn(1).alignment = { wrapText: true, vertical: "top" }; }
// Resumen
{ const w = ws("Resumen"); w.getColumn(1).width = 62; for (const c of [2, 3, 4, 5, 6]) w.getColumn(c).width = 15;
  w.getCell("B4").font = { name: FONT, size: 11, bold: true, color: { argb: "FF008000" } };
  for (const r of [6, 7, 9]) w.getCell("B" + r).numFmt = EUR; w.getCell("B8").numFmt = PCT;
  w.getCell("A9").font = { name: FONT, size: 12, bold: true }; w.getCell("B9").font = { name: FONT, size: 12, bold: true }; w.getCell("B9").fill = YELLOW;
  for (const r of [11, 12]) { w.getCell("A" + r).font = { name: FONT, size: 11, bold: true }; w.getCell("B" + r).font = { name: FONT, size: 11, bold: true }; }
  head(w, 15, 6);
  for (let r = 16; r <= 23; r++) for (const c of ["B", "C", "D", "E", "F"]) w.getCell(c + r).numFmt = r === 16 ? NUM : EUR;
  w.getCell("A25").font = { name: FONT, size: 10, bold: true }; w.getCell("B26").numFmt = NUM; w.getCell("B27").numFmt = PCT1;
  w.getCell("A29").value = "Cómo leerlo: azul = dato que puedes cambiar; negro = fórmula; verde = viene de otra hoja; amarillo = supuesto clave que hay que validar primero (sobre todo, cuántas familias pagan)."; w.getCell("A29").font = { name: FONT, size: 9, italic: true, color: { argb: "FF555C7B" } };
  w.getCell("A29").alignment = { wrapText: true }; w.mergeCells("A29:F29"); w.getRow(29).height = 30; }
// Fuentes
{ const w = ws("Fuentes"); head(w, 3, 2); head(w, 10, 2); w.getColumn(1).width = 70; w.getColumn(2).width = 110; }
// Verde para enlaces a otras hojas
for (const [name, rows] of Object.entries(sheets)) rows.forEach((row, ri) => row.forEach((v, ci) => { if (typeof v === "string" && /^=('[^']+'|[A-Za-zÁ-ú]+)!\$?[A-Z]+\$?\d+$/.test(v)) { const x = ws(name).getCell(ri + 1, ci + 1); x.font = { ...(x.font || {}), name: FONT, color: { argb: "FF008000" } }; } }));
{ const w = ws("Números del pitch");
  // tablas calculadas (se rellenan más abajo, tras evaluar escenarios); aquí solo formato
  w.getColumn(1).width = 58; for (const c of [2, 3, 4, 5, 6]) w.getColumn(c).width = 16; w.getColumn(4).width = 44;
  for (const r of [5, 6]) w.getCell(r, 5).numFmt = NUM; for (const r of [5, 6, 7]) { w.getCell(r, 4).font = { name: FONT, size: 10, bold: r === 5 }; w.getCell(r, 5).font = { name: FONT, size: r === 5 ? 12 : 10, bold: true }; } w.getCell("E5").fill = YELLOW;
  for (const r of [4, 13, 21, 32, 32 + INV.length + 4]) { const c = w.getCell(r, 1); c.font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } }; }
  head(w, 21, 6); head(w, 32, 2); head(w, 32 + INV.length + 4, 3);
  for (const r of [5, 6, 7, 8]) w.getCell(r, 2).numFmt = EUR;
  w.getCell("B5").font = { name: FONT, size: 12, bold: true }; w.getCell("A5").font = { name: FONT, size: 12, bold: true }; w.getCell("B5").fill = YELLOW;
  for (const r of [9, 10, 11]) w.getCell(r, 2).font = { name: FONT, size: 10, bold: true };
  for (let r = 14; r <= 19; r++) w.getCell(r, 2).numFmt = EUR2; w.getCell("B18").font = { name: FONT, size: 10, bold: true };
  for (let r = 22; r <= 30; r++) for (let c = 2; c <= 6; c++) w.getCell(r, c).numFmt = r <= 23 ? NUM : EUR;
  for (let r = 33; r <= 33 + INV.length + 1; r++) w.getCell(r, 2).numFmt = EUR;
  for (let r = 33 + INV.length + 5; r <= 33 + INV.length + 11; r++) w.getCell(r, 2).numFmt = EUR;
  w.getColumn(1).alignment = { wrapText: true, vertical: "top" }; }
{ const w = ws("Punto muerto"); w.getColumn(1).width = 56; for (let c = 2; c <= 9; c++) w.getColumn(c).width = 16;
  for (const r of [4, 13, 20]) w.getCell(r, 1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } };
  head(w, 13, 4);
  for (let r = 5; r <= 11; r++) w.getCell(r, 2).numFmt = r === 9 ? PCT : EUR2;
  w.getCell("A11").font = { name: FONT, size: 11, bold: true }; w.getCell("B11").font = { name: FONT, size: 11, bold: true }; w.getCell("B11").fill = YELLOW;
  for (let c = 2; c <= 4; c++) { w.getCell(14, c).numFmt = EUR; for (const r of [15, 16, 17, 18]) w.getCell(r, c).numFmt = NUM; w.getCell(15, c).font = { name: FONT, size: 11, bold: true }; w.getCell(15, c).fill = YELLOW; }
  w.getCell("A15").font = { name: FONT, size: 11, bold: true };
  for (const r of [21, 22, 23]) { w.getCell(r, 2).font = { name: FONT, size: 10, bold: true }; }
  w.getCell("B22").fill = YELLOW;
}
if (false) { const w = ws("Previsión hasta PM + 6"); w.getColumn(1).width = 46; w.getColumn(2).width = 12; w.getColumn(3).width = 22; for (let c = 4; c <= 12; c++) w.getColumn(c).width = 15;
  head(w, 9, 12); w.getRow(9).height = 34;
  for (const r of [4, 5, 6, 7]) { w.getCell(r, 1).font = { name: FONT, size: 10, bold: true }; w.getCell(r, 2).font = { name: FONT, size: 11, bold: true }; }
  w.getCell("B5").fill = YELLOW;
  for (let r = pvStart; r <= pvTot + 1; r++) { for (const c of [4, 5]) w.getCell(r, c).numFmt = NUM; for (let c = 6; c <= 12; c++) w.getCell(r, c).numFmt = EUR; }
  for (const r of [pvTot, pvTot + 1]) for (let c = 1; c <= 12; c++) w.getCell(r, c).font = { name: FONT, size: 10, bold: true };
  w.addConditionalFormatting({ ref: `A${pvStart}:L${pvEnd}`, rules: [{ type: "expression", formulae: [`$C${pvStart}="PUNTO MUERTO"`], style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFFFFF00" } }, font: { bold: true } } }] });
  w.views = [{ state: "frozen", ySplit: 9, xSplit: 2 }]; }
const fmtHZ = (name, B) => { const w = ws(name); const nc = B.HN + 2 + (B.yearTotals ? 6 : 0); w.getColumn(1).width = 58; w.getColumn(2).width = 13; for (let c = 3; c <= nc; c++) w.getColumn(c).width = 11;
  for (const r of [3, 4, 5]) { w.getCell(r, 1).font = { name: FONT, size: 10, bold: true }; w.getCell(r, 2).font = { name: FONT, size: 11, bold: true }; }
  w.getCell("B3").fill = YELLOW;
  head(w, B.head, nc); if (B.yearTotals) { w.getCell(B.head, B.HN + 3).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } }; for (let c = B.HN + 4; c <= nc; c++) w.getColumn(c).width = 14; }
  for (const [r, t] of B.ROWS) {
    if (t === "sec") { w.getCell(r, 1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } }; continue; }
    if (t === "year") { for (let c = 1; c <= nc; c++) w.getCell(r, c).font = { name: FONT, size: 9, color: { argb: "FF555C7B" } }; continue; }
    for (let c = 2; c <= nc; c++) { const x = w.getCell(r, c); x.numFmt = t === "num" ? NUM : t === "fac" ? "0.0" : t === "txt" ? "@" : EUR; if (t === "tot" || t === "caja") x.font = { name: FONT, size: 10, bold: true }; if (t === "txt") x.alignment = { horizontal: "center" }; }
    if (B.yearTotals) for (let c = B.HN + 4; c <= nc; c++) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true }; x.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECE9FC" } }; }
    if (t === "tot" || t === "caja") { w.getCell(r, 1).font = { name: FONT, size: 10, bold: true }; for (let c = 1; c <= nc; c++) w.getCell(r, c).border = { top: { style: "thin", color: { argb: "FFB9C2DE" } } }; }
  }
  const rTemp = B.ROWS.find(x => x[1] === "txt")[0];
  w.addConditionalFormatting({ ref: `C${rTemp}:${B.lastC}${rTemp}`, rules: [
    { type: "containsText", operator: "containsText", text: "Alta", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFE4F7B0" } }, font: { bold: true } } },
    { type: "containsText", operator: "containsText", text: "Baja", style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFE6E8EE" } } } }] });
  w.addConditionalFormatting({ ref: `C${B.rCaja}:${B.lastC}${B.rCaja}`, rules: [{ type: "cellIs", operator: "greaterThanOrEqual", formulae: ["0"], style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFC6F432" } }, font: { bold: true } } }] });
  w.getCell(B.note, 1).font = { name: FONT, size: 9, italic: true, color: { argb: "FF555C7B" } };
  w.views = [{ state: "frozen", xSplit: 2, ySplit: B.head }]; };
fmtHZ("Previsión hasta recuperar", HZB); fmtHZ("Previsión 5 años", H5B);
// punto muerto en horizontal
{ const w = ws("Punto muerto"); for (let c = 3; c <= 62; c++) w.getColumn(c).width = 11; head(w, pmMes, 62);
  for (const r of [pmV, pmN]) for (let c = 3; c <= 62; c++) w.getCell(r, c).numFmt = NUM;
  for (const r of [pmMC, pmCF, pmR, pmR12]) for (let c = 3; c <= 62; c++) w.getCell(r, c).numFmt = EUR;
  w.getRow(pmAux).hidden = true;
  w.addConditionalFormatting({ ref: `C${pmR12}:${pmLast}${pmR12}`, rules: [{ type: "cellIs", operator: "greaterThanOrEqual", formulae: ["0"], style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFC6F432" } } } }] });
  w.views = [{ state: "frozen", xSplit: 2 }]; }
// formato: Ventas de un mes
{ const w = ws("Ventas de un mes"); const GREY = { name: FONT, size: 9, italic: true, color: { argb: "FF555C7B" } };
  w.getColumn(1).width = 60; for (const c of [2, 3, 4, 5, 6]) w.getColumn(c).width = 16; w.getColumn(7).width = 80;
  const sel = w.getCell("B" + VMR.sel); sel.fill = YELLOW; sel.font = { name: FONT, size: 12, bold: true, ...BLUE };
  sel.dataValidation = { type: "whole", operator: "between", formulae: [1, 60], showErrorMessage: true, errorTitle: "Mes", error: "Escribe un número de 1 a 60" };
  w.getCell("A" + VMR.sel).font = { name: FONT, size: 11, bold: true };
  for (let r = 5; r <= 11; r++) { const x = w.getCell("B" + r); x.font = { name: FONT, size: 11, bold: true }; x.numFmt = r === 7 ? "0.0" : NUM; x.alignment = { horizontal: "right" }; }
  for (const r of [VMR.h1, VMR.h2, VMR.h3]) { head(w, r, 7); w.getRow(r).height = 30; }
  for (let r = VMR.i0; r <= VMR.caja; r++) { w.getCell("B" + r).numFmt = NUM; w.getCell("C" + r).numFmt = EUR2; for (const c of ["D", "E", "F"]) w.getCell(c + r).numFmt = EUR2; w.getCell("G" + r).font = GREY; w.getCell("G" + r).alignment = { wrapText: true, vertical: "top" }; }
  for (const r of [VMR.iT, VMR.gV, VMR.gF, VMR.gT, VMR.bai, VMR.neto]) for (let c = 1; c <= 6; c++) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true }; x.border = { top: { style: "thin", color: { argb: "FFB9C2DE" } } }; }
  for (const r of [VMR.iT, VMR.neto]) { w.getCell("F" + r).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECE9FC" } }; w.getCell("F" + r).font = { name: FONT, size: 11, bold: true }; }
  for (const r of [VMR.iC, VMR.gT, VMR.neto]) w.getCell("G" + r).font = { name: FONT, size: 10, bold: true, color: { argb: "FF008000" } };
  w.getCell("F" + VMR.caja).font = { name: FONT, size: 10, bold: true };
  w.views = [{ state: "frozen", ySplit: VMR.sel }]; }
// formato: Presupuesto de una venta
{ const w = ws("Presupuesto de una venta"); const GREY = { name: FONT, size: 9, italic: true, color: { argb: "FF555C7B" } };
  w.getColumn(1).width = 66; for (const c of [2, 3, 4]) w.getColumn(c).width = 17; w.getColumn(5).width = 80;
  const sel = w.getCell("B" + PVR.sel); sel.fill = YELLOW; sel.font = { name: FONT, size: 12, bold: true, ...BLUE };
  sel.dataValidation = { type: "whole", operator: "between", formulae: [1, 5], showErrorMessage: true, errorTitle: "Año", error: "Escribe un número de 1 a 5" };
  w.getCell("A" + PVR.sel).font = { name: FONT, size: 11, bold: true };
  for (let r = 5; r <= 7; r++) { const x = w.getCell("B" + r); x.font = { name: FONT, size: 11, bold: true }; x.alignment = { horizontal: "right" }; } w.getCell("B" + PVR.pases).numFmt = NUM;
  head(w, PVR.head, 5); w.getRow(PVR.head).height = 30;
  for (const r of [PVR.s1, PVR.s2, PVR.s3, PVR.s4]) w.getCell(r, 1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } };
  for (let r = PVR.precio; r <= PVR.pct; r++) { for (const c of ["B", "C", "D"]) w.getCell(c + r).numFmt = EUR2; w.getCell("E" + r).font = GREY; w.getCell("E" + r).alignment = { wrapText: true, vertical: "top" }; }
  w.getCell("B" + PVR.cf).numFmt = EUR; w.getCell("C" + PVR.nec).numFmt = NUM; for (const c of ["B", "C", "D"]) w.getCell(c + PVR.pct).numFmt = PCT;
  for (const r of [PVR.i0, PVR.iT, PVR.mc, PVR.bai, PVR.neto]) for (let c = 1; c <= 4; c++) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true }; if (r !== PVR.i0) x.border = { top: { style: "thin", color: { argb: "FFB9C2DE" } } }; }
  for (const c of ["B", "C", "D"]) { w.getCell(c + PVR.neto).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFECE9FC" } }; w.getCell(c + PVR.neto).font = { name: FONT, size: 11, bold: true }; }
  w.getCell("C" + PVR.head).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF5B3DF5" } };
  w.getCell("E" + PVR.chk).font = { name: FONT, size: 10, bold: true, color: { argb: "FF008000" } };
  w.getCell("A" + PVR.note).font = GREY; w.getCell("A" + PVR.note).alignment = { wrapText: true }; w.mergeCells(`A${PVR.note}:E${PVR.note}`); w.getRow(PVR.note).height = 28;
  w.views = [{ state: "frozen", ySplit: PVR.head }]; }

// la proyección vertical es el cálculo interno: oculta
ws("Proyección mensual").state = "hidden";
await wb.xlsx.writeFile(OUT);

/* ---------- Informe ---------- */
const out = {};
for (const sc of [1, 2, 3]) {
  hf.setCellContents({ sheet: hf.getSheetId("Supuestos"), row: 2, col: 1 }, [[sc]]);
  out[["", "prudente", "base", "objetivo"][sc]] = {
    inversion: Math.round(val("Resumen", 6, 1)), necesidad: Math.round(val("Resumen", 7, 1)), pedir: val("Resumen", 9, 1), beneficio: val("Resumen", 11, 1), recupera: val("Resumen", 12, 1), meses: val("Resumen", 13, 1),
    viajeros: [1, 2, 3, 4, 5].map(c => Math.round(val("Resumen", 16, c))), ingresos: [1, 2, 3, 4, 5].map(c => Math.round(val("Resumen", 17, c))), resultado: [1, 2, 3, 4, 5].map(c => Math.round(val("Resumen", 22, c))), caja: [1, 2, 3, 4, 5].map(c => Math.round(val("Resumen", 23, c))), cuota: +(val("Resumen", 27, 1) * 100).toFixed(2),
    financ: Math.round(val("Financiación", fTot, 1)), cobertura: Math.round(val("Financiación", fTot + 3, 1) * 100),
  };
}
console.log(JSON.stringify({ errors, ...out }, null, 1));
// sensibilidad (escenario base): precio × % de familias que pagan → meses hasta recuperar y financiación
{ const sid = hf.getSheetId("Supuestos"); hf.setCellContents({ sheet: sid, row: 2, col: 1 }, [[2]]);
  const pr = ROW.precio, cv = ROW.convPago, orig = [val("Supuestos", pr, 2), val("Supuestos", cv, 2)], sens = [];
  for (const c of [0.10, 0.15, 0.20, 0.30, 0.40]) { const fila = { conv: c }; for (const p of [14.99, 19.99, 24.99, 29.99]) {
    hf.setCellContents({ sheet: sid, row: pr - 1, col: 2 }, [[p]]); hf.setCellContents({ sheet: sid, row: cv - 1, col: 2 }, [[c]]);
    fila[p] = [val("Resumen", 13, 1), val("Resumen", 9, 1)]; } sens.push(fila); }
  hf.setCellContents({ sheet: sid, row: pr - 1, col: 2 }, [[orig[0]]]); hf.setCellContents({ sheet: sid, row: cv - 1, col: 2 }, [[orig[1]]]);
  (await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-sens.json"), JSON.stringify(sens)); }
{ const wb2 = new ExcelJS.Workbook(); await wb2.xlsx.readFile(OUT); const w = wb2.getWorksheet("Números del pitch"); let r = npEsc + 1 + 0;
  r = w.rowCount + 2;
  const put = (row, vals, bold) => vals.forEach((v, i) => { const c = w.getCell(row, i + 1); c.value = v; c.font = { name: FONT, size: 10, bold: !!bold }; });
  put(r, ["ESCENARIOS (calculados con el modelo el 25/11/2026)"], true); w.getCell(r, 1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } }; r++;
  put(r, ["Escenario", "Financiación", "Recuperación", "Meses", "Caja año 5"]); head(w, r, 5); r++;
  for (const k of ["prudente", "base", "objetivo"]) { const x = out[k]; put(r, [k[0].toUpperCase() + k.slice(1), x.pedir, x.recupera, x.meses, x.caja[4]]); w.getCell(r, 2).numFmt = EUR; w.getCell(r, 5).numFmt = EUR; r++; }
  r++;
  const sens = JSON.parse((await import("node:fs")).readFileSync(OUT.replace(/\.xlsx$/, "-sens.json"), "utf8"));
  put(r, ["SENSIBILIDAD: meses hasta recuperar / financiación (escenario base, solo B2C)"], true); w.getCell(r, 1).font = { name: FONT, size: 10, bold: true, color: { argb: "FF5B3DF5" } }; r++;
  put(r, ["Viajeros que compran el Pase", "14,99 €", "19,99 €", "24,99 €", "29,99 €"]); head(w, r, 5); r++;
  for (const f of sens) { put(r, [Math.round(f.conv * 100) + " %", ...[14.99, 19.99, 24.99, 29.99].map(p => (typeof f[p][0] === "number" ? f[p][0] + " meses" : f[p][0]) + " / " + String(f[p][1]).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €")]); r++; }
  r++; put(r, ["Para recalcular estas dos tablas con otros supuestos, cambia la hoja Supuestos y vuelve a generar el archivo (80 Negocio/modelo-financiero.mjs)."]); w.getCell(r, 1).font = { name: FONT, size: 9, italic: true, color: { argb: "FF555C7B" } };
  await wb2.xlsx.writeFile(OUT); }
{ hf.setCellContents({ sheet: hf.getSheetId("Supuestos"), row: 2, col: 1 }, [[3]]);
  const pm = { margen: val("Punto muerto", 11, 1), cf: [1, 2, 3].map(c => val("Punto muerto", 14, c)), viaj: [1, 2, 3].map(c => val("Punto muerto", 15, c)), pases: [1, 2, 3].map(c => val("Punto muerto", 16, c)), alcanzado: val("Punto muerto", 22, 1), viajeros: [], necesarios: [], r12: [] };
  for (let m = 1; m <= 60; m++) { pm.viajeros.push(val("Punto muerto", pmV, m + 1)); pm.necesarios.push(val("Punto muerto", pmN, m + 1)); pm.r12.push(val("Punto muerto", pmR12, m + 1)); }
  (await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-pm.json"), JSON.stringify(pm)); }
if (false) { const pv = { pm: val("Previsión hasta PM + 6", 5, 1), pmN: val("Previsión hasta PM + 6", 6, 1), hasta: val("Previsión hasta PM + 6", 7, 1), filas: [] };
  for (let r = pvStart; r <= pvEnd; r++) { const a = val("Previsión hasta PM + 6", r, 0); if (a === "" || a == null) continue; pv.filas.push([2, 4, 7, 8, 9, 10, 11].map(c => val("Previsión hasta PM + 6", r, c))); }
  pv.tot = [3, 5, 6, 7, 8, 9].map(c => val("Previsión hasta PM + 6", pvTot, c)); pv.tot6 = [3, 5, 6, 7, 8, 9].map(c => val("Previsión hasta PM + 6", pvTot + 1, c));
  (await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-pv.json"), JSON.stringify(pv)); }
{ hf.setCellContents({ sheet: hf.getSheetId("Supuestos"), row: 2, col: 1 }, [[3]]);
  const hz = { rec: val("Previsión hasta recuperar", 3, 1), n: val("Previsión hasta recuperar", 4, 1), filas: {} };
  for (const [r, t] of HZROWS) { if (t === "sec") continue; const lab = HZ[r - 1][0]; hz.filas[lab] = [val("Previsión hasta recuperar", r, 1), ...Array.from({ length: hz.n }, (_, i) => val("Previsión hasta recuperar", r, i + 2))]; }
  (await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-hz.json"), JSON.stringify(hz)); }
// curva de caja (base) para la presentación
hf.setCellContents({ sheet: hf.getSheetId("Supuestos"), row: 2, col: 1 }, [[3]]);
const curva = []; for (let r = p0; r <= pEnd; r++) curva.push(Math.round(val("Proyección mensual", r, 23)));
const ing = []; for (let r = p0 + 1; r <= pEnd; r++) ing.push(Math.round(val("Proyección mensual", r, 13)));
const cos = []; for (let r = p0 + 1; r <= pEnd; r++) cos.push(Math.round(val("Proyección mensual", r, 21)));
(await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-curva.json"), JSON.stringify({ caja: curva, ingresos: ing, costes: cos }));
