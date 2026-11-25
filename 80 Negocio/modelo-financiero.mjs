// Modelo de financiación GoLiveIt: hojas como matrices (fórmulas «=...»), evaluadas con HyperFormula y escritas con ExcelJS (fórmula + resultado).
import ExcelJS from "exceljs";
import { HyperFormula } from "hyperformula";
const OUT = process.argv[2];

/* ---------- 1. Supuestos ---------- */
// [clave, concepto, prudente, base, optimista, unidad, etiqueta, fuente/nota, formato]
const SUP = [
  ["h", "DEMANDA (mercado nacional: toda España)"],
  ["grupos0", "Grupos que planifican un viaje en el mes 1", 25, 40, 40, "grupos/mes", "HIPÓTESIS", "Arranque nacional con institutos, redes sociales y la lista de espera; sin publicidad pagada. Validar con la lista de espera. Objetivo: arranque con 3 institutos piloto y la lista de espera.", "n"],
  ["crec", "Crecimiento mensual de grupos", 0.04, 0.07, 0.07, "%/mes", "HIPÓTESIS", "Sin datos propios aún; se revisa con las primeras métricas. Objetivo: boca a boca por grupos (cada viaje trae otro grupo).", "p"],
  ["frenado", "Cada año el crecimiento mensual se multiplica por", 0.5, 0.6, 0.6, "factor", "HIPÓTESIS", "El crecimiento se frena al madurar (año 2 = 60 % del año 1, año 3 = 36 %...).", "n1"],
  ["convViaje", "Planes que acaban en viaje", 0.30, 0.35, 0.35, "%", "HIPÓTESIS", "Encuesta piloto: el 78 % viaja o lo ha planeado sin adultos (n=40). No mide conversión.", "p"],
  ["porGrupo", "Viajeros por grupo", 4, 4, 4, "personas", "EQUIPO", "Grupo tipo de la demo y de las encuestas.", "n1"],
  ["h", "INGRESOS"],
  ["convPago", "Viajeros que compran el Pase", 0.20, 0.30, 0.40, "% de viajeros", "HIPÓTESIS", "Lo paga la familia, por SU hijo. Dato del equipo: familias dispuestas a pagar más de 20 € y leads (sin compartir aún). Jóvenes: el 48 % pagaría algo o querría que pague la familia (encuesta piloto, n=40). Objetivo: el plan del grupo solo sale «aprobado» cuando cada viajero tiene su Pase (cada familia firma lo suyo).", "p"],
  ["precio", "Precio del Pase por viajero (IVA incluido)", 19.99, 19.99, 24.99, "€/viajero", "EQUIPO (validado)", "Modelo de negocio del equipo: Pase de 19,99 € por viajero. Desbloquea lo personal: autorización y formulario del albergue a su nombre, papeles por edad y nacionalidad, aprobación de los padres y avisos de emergencia. Objetivo: las familias del equipo aceptan más de 20 €.", "e2"],
  ["iva", "IVA incluido en el precio", 0.21, 0.21, 0.21, "%", "OFICIAL", "IVA general en España (servicios digitales a consumidores). Lo que ingresamos es el precio sin IVA.", "p"],
  ["descGrupo", "Descuento medio de grupo (opcional)", 0, 0, 0.1, "%", "HIPÓTESIS", "El modelo del equipo no lo incluye. Si se ofrece -30 % desde el 2.º viajero, poner en torno a 0,15. Objetivo: pack de grupo de 4 Pases por 89,96 € (22,49 € cada uno).", "p"],
  ["seguroPct", "Viajeros con Pase que contratan el seguro de viaje", 0.20, 0.30, 0.5, "%", "HIPÓTESIS", "Pack tranquilidad: se ofrece a la familia al aprobar el viaje. Objetivo: el seguro se ofrece marcado por defecto al aprobar (la familia puede quitarlo).", "p"],
  ["seguroPrima", "Precio medio del seguro de viaje", 20, 25, 25, "€/viajero", "HIPÓTESIS", "Viaje corto por Europa; comprobar con la aseguradora socia.", "e"],
  ["seguroCom", "Comisión del seguro", 0.20, 0.20, 0.20, "%", "EQUIPO", "Modelo del equipo: unos 20 %. Ojo: la distribución de seguros está regulada; revisar con un abogado.", "p"],
  ["esimPct", "Viajeros con Pase que compran la eSIM", 0.20, 0.30, 0.4, "%", "HIPÓTESIS", "Datos móviles para el viaje.", "p"],
  ["esimPrecio", "Precio medio de la eSIM", 8, 10, 10, "€/viajero", "HIPÓTESIS", "Paquete de datos de unos días en Europa.", "e"],
  ["esimCom", "Comisión de la eSIM", 0.10, 0.10, 0.10, "%", "EQUIPO", "Modelo del equipo: unos 10 %.", "p"],
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
  ["marketing", "Marketing (contenido en redes, institutos)", 100, 150, 100, "€/mes", "HIPÓTESIS", "Sin anuncios pagados el primer año; contenido propio en TikTok e Instagram. Objetivo: solo contenido propio e institutos.", "e"],
  ["hosting", "Web, dominio y herramientas", 35, 35, 35, "€/mes", "HIPÓTESIS", "Alojamiento estático, dominio, correo y formularios.", "e"],
  ["seguro", "Seguro de responsabilidad civil", 300, 300, 300, "€/año", "SECUNDARIA", "BBVA cita ~120 € de media para autónomos (ICEA); paquetes para startups de 199-295 € (Qonto). Pedir presupuesto.", "e"],
  ["gestoria", "Gestoría", 60, 60, 60, "€/mes", "HIPÓTESIS", "Precio típico de gestoría en línea para autónomos.", "e"],
  ["legalAnual", "Revisión legal anual (desde el año 2)", 300, 300, 300, "€/año", "HIPÓTESIS", "Actualizar condiciones, privacidad de menores (RGPD) y art. 5 bis de la Directiva (UE) 2026/1024.", "e"],
  ["autonomos", "Socios dados de alta como autónomos", 1, 1, 1, "personas", "EQUIPO", "Uno de alta al principio; el resto colabora.", "n"],
  ["tarifaPlana", "Cuota de autónomo con tarifa plana", 88.64, 88.64, 88.64, "€/mes", "SECUNDARIA", "80 € + MEI 2026 (VidaCaixa, Infoautónomos). 12 meses, prorrogables otros 12 si se ingresa menos del SMI.", "e2"],
  ["mesesTP", "Meses con tarifa plana", 24, 24, 24, "meses", "SECUNDARIA", "12 + 12 de prórroga si los ingresos no superan el SMI (17.094 € en 2026).", "n"],
  ["cuotaNormal", "Cuota de autónomo después", 200, 200, 200, "€/mes", "HIPÓTESIS", "Tramo bajo de rendimientos; comprobar en la Seguridad Social.", "e"],
  ["sueldoDesde", "Mes desde el que cobran los fundadores", 25, 25, 25, "mes nº", "HIPÓTESIS", "Años 1 y 2 sin sueldo (estudiantes).", "n"],
  ["sueldo", "Retribución total de los fundadores", 0, 300, 300, "€/mes", "HIPÓTESIS", "A repartir; simbólica.", "e"],
  ["h", "FINANCIACIÓN"],
  ["margen", "Margen de seguridad sobre la necesidad de caja", 0.25, 0.20, 0.15, "%", "HIPÓTESIS", "Colchón para retrasos en cobros y ayudas.", "p"],
  ["h", "MERCADO (para comprobar que las cifras son realistas)"],
  ["jovEsp", "Jóvenes de 15 a 17 años en España", 1600000, 1600000, 1600000, "personas", "OFICIAL", "INE, población a 1/1/2025 (tabla 56934), citado en el pitch de Ruta16.", "n"],
  ["pctAnd", "Parte de España a la que llegamos", 1, 1, 1, "%", "EQUIPO", "Mercado nacional desde el lanzamiento (100 % = toda España). La empresa tiene su sede en Andalucía (ayudas de la Junta).", "p"],
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
  ["Campaña de lanzamiento nacional para familias (redes sociales y contenidos)", 3000, "HIPÓTESIS", "Anuncios dirigidos a madres y padres + contenido con jóvenes, en los meses previos a Semana Santa y verano."],
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
const P = [["Proyección mensual (60 meses, de enero de 2027 a diciembre de 2031)"], ["Todo son fórmulas: cambia los supuestos, no esta hoja. Importes en euros."], []];
const HEAD = ["Mes nº", "Mes", "Año", "Mes del año", "Estacionalidad", "Grupos que planifican", "Viajes realizados", "Viajeros", "Viajeros con Pase", "Ingreso Pase (sin IVA)", "Ingreso pack y afiliación", "Centros activos", "Ingreso centros y ayuntamientos", "Ingresos totales", "Pago y coste por familia", "Verificación de datos", "Marketing", "Web y herramientas", "Seguro, gestoría y legal", "Cuota de autónomos", "Retribución fundadores", "Costes totales", "Resultado del mes", "Caja acumulada", "Aux: recuperado", "Aux: mes con beneficio", "Aux: tendencia de crecimiento"];
P.push(HEAD);
const p0 = P.length + 1; // fila del mes 0
P.push([0, "inicio", 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, `=${INVTOT}`, `=-V${p0}`, `=W${p0}`, null, null]);
for (let m = 1; m <= 60; m++) {
  const r = p0 + m, prev = r - 1, mm = (m - 1) % 12;
  P.push([
    m, `${MES[mm]} ${2027 + Math.floor((m - 1) / 12)}`, Math.ceil(m / 12), mm + 1,
    `=INDEX(Supuestos!$E$${ESTROW}:$E$${ESTROW + 11},D${r})`,
    `=${sup("grupos0")}*AA${r}*E${r}`,
    `=F${r}*${sup("convViaje")}`,
    `=G${r}*${sup("porGrupo")}`,
    `=H${r}*${sup("convPago")}`,
    `=I${r}*${sup("precio")}*(1-${sup("descGrupo")})/(1+${sup("iva")})`,
    `=H${r}*${sup("pctEnlaces")}*${sup("eurReserva")}+I${r}*(${sup("seguroPct")}*${sup("seguroPrima")}*${sup("seguroCom")}+${sup("esimPct")}*${sup("esimPrecio")}*${sup("esimCom")})`,
    `=IF(A${r}>=${sup("b2bInicio")},(A${r}-${sup("b2bInicio")}+1)*${sup("b2bRitmo")},0)`,
    `=L${r}*${sup("b2bCuota")}/12+IF(A${r}>=${sup("ayInicio")},(A${r}-${sup("ayInicio")}+1)*${sup("ayRitmo")},0)*${sup("ayCuota")}/12`,
    `=J${r}+K${r}+M${r}`,
    `=I${r}*${sup("precio")}*(1-${sup("descGrupo")})*${sup("pagoPct")}+I${r}*(${sup("pagoFijo")}+${sup("costeFamilia")})`,
    `=IF(A${r}>=${sup("verifDesde")},${sup("horasVerif")}*${sup("eurHora")},0)`,
    `=${sup("marketing")}`,
    `=${sup("hosting")}`,
    `=${sup("seguro")}/12+${sup("gestoria")}+IF(A${r}>12,${sup("legalAnual")}/12,0)`,
    `=IF(A${r}<=${sup("mesesTP")},${sup("tarifaPlana")},${sup("cuotaNormal")})*${sup("autonomos")}`,
    `=IF(A${r}>=${sup("sueldoDesde")},${sup("sueldo")},0)`,
    `=SUM(O${r}:U${r})`,
    `=N${r}-V${r}`,
    `=X${prev}+W${r}`,
    `=IF(X${r}>=0,A${r},999)`,
    `=IF(W${r}>=0,A${r},999)`,
    m === 1 ? 1 : `=AA${prev}*(1+${sup("crec")}*${sup("frenado")}^(C${r}-1))`,
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
  ["Jóvenes de 15-17 en España que viajan al extranjero al año", `=${sup("jovEsp")}*${sup("pctAnd")}*${sup("pctViajan")}`],
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
  ["Pack tranquilidad por Pase (media)", "=" + sup("seguroPct") + "*" + sup("seguroPrima") + "*" + sup("seguroCom") + "+" + sup("esimPct") + "*" + sup("esimPrecio") + "*" + sup("esimCom")],
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
  ["…más Pack tranquilidad (media)", "=" + sup("seguroPct") + "*" + sup("seguroPrima") + "*" + sup("seguroCom") + "+" + sup("esimPct") + "*" + sup("esimPrecio") + "*" + sup("esimCom")],
  ["Margen por viajero con Pase", "=B5+B6+B7"],
  ["Viajeros que compran el Pase", "=" + sup("convPago")],
  ["Afiliación por viajero (media de todos)", "=" + sup("pctEnlaces") + "*" + sup("eurReserva")],
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
  ["Mes nº", "Mes", "Viajeros del mes", "Viajeros necesarios (punto muerto)", "Margen de contribución", "Costes fijos", "Resultado del mes", "Resultado últimos 12 meses", "Aux: punto muerto"],
];
const pmStart = PM.length + 1;
for (let m = 1; m <= 60; m++) {
  const r = pmStart + m - 1, pr = p0 + m;
  PM.push([m, `='Proyección mensual'!$B$${pr}`, `='Proyección mensual'!$H$${pr}`,
    `=MAX(0,(F${r}-'Proyección mensual'!$M$${pr})/$B$11)`,
    `=C${r}*$B$11`,
    `='Proyección mensual'!$V$${pr}-'Proyección mensual'!$O$${pr}`,
    `='Proyección mensual'!$W$${pr}`,
    m >= 12 ? `=SUM(G${r - 11}:G${r})` : "",
    m >= 12 ? `=IF(H${r}>=0,A${r},999)` : 999]);
}

/* ---------- Evaluar ---------- */
const sheets = { "Números del pitch": NP, "Punto muerto": PM, "Resumen": Rz, "Supuestos": S, "Inversión inicial": I, "Proyección mensual": P, "Financiación": F, "Fuentes": FU };
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
  for (let r = p0; r <= pEnd; r++) { for (let c = 5; c <= 27; c++) { const x = w.getCell(r, c); x.numFmt = c === 5 ? "0.0" : c <= 9 || c === 12 ? NUM1 : EUR; } }
  for (let r = p0; r <= pEnd; r++) for (const c of [23, 24]) { const x = w.getCell(r, c); x.font = { name: FONT, size: 10, bold: true }; }
  w.getColumn(25).hidden = true; w.getColumn(26).hidden = true; w.getColumn(27).hidden = true;
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
  head(w, 13, 4); head(w, 25, 9); w.getRow(25).height = 32; w.getColumn(9).hidden = true;
  for (let r = 5; r <= 11; r++) w.getCell(r, 2).numFmt = r === 9 ? PCT : EUR2;
  w.getCell("A11").font = { name: FONT, size: 11, bold: true }; w.getCell("B11").font = { name: FONT, size: 11, bold: true }; w.getCell("B11").fill = YELLOW;
  for (let c = 2; c <= 4; c++) { w.getCell(14, c).numFmt = EUR; for (const r of [15, 16, 17, 18]) w.getCell(r, c).numFmt = NUM; w.getCell(15, c).font = { name: FONT, size: 11, bold: true }; w.getCell(15, c).fill = YELLOW; }
  w.getCell("A15").font = { name: FONT, size: 11, bold: true };
  for (const r of [21, 22, 23]) { w.getCell(r, 2).font = { name: FONT, size: 10, bold: true }; }
  w.getCell("B22").fill = YELLOW;
  for (let r = pmStart; r < pmStart + 60; r++) { for (const c of [3, 4]) w.getCell(r, c).numFmt = NUM; for (const c of [5, 6, 7, 8]) w.getCell(r, c).numFmt = EUR; }
  w.views = [{ state: "frozen", ySplit: 25 }]; }
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
  for (let m = 1; m <= 60; m++) { const r = pmStart + m - 1; pm.viajeros.push(val("Punto muerto", r, 2)); pm.necesarios.push(val("Punto muerto", r, 3)); pm.r12.push(val("Punto muerto", r, 7)); }
  (await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-pm.json"), JSON.stringify(pm)); }
// curva de caja (base) para la presentación
hf.setCellContents({ sheet: hf.getSheetId("Supuestos"), row: 2, col: 1 }, [[3]]);
const curva = []; for (let r = p0; r <= pEnd; r++) curva.push(Math.round(val("Proyección mensual", r, 23)));
const ing = []; for (let r = p0 + 1; r <= pEnd; r++) ing.push(Math.round(val("Proyección mensual", r, 13)));
const cos = []; for (let r = p0 + 1; r <= pEnd; r++) cos.push(Math.round(val("Proyección mensual", r, 21)));
(await import("node:fs")).writeFileSync(OUT.replace(/\.xlsx$/, "-curva.json"), JSON.stringify({ caja: curva, ingresos: ing, costes: cos }));
