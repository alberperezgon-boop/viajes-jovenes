# GoLiveIt (equipo Ruta16) — instrucciones para Claude Code

Bóveda de Obsidian que también es repositorio Git (rama `main`, GitHub privado `alberperezgon-boop/viajes-jovenes`). Proyecto de emprendimiento: viajes de jóvenes de 16-17 años sin adultos. La app filtra transporte, alojamiento y planes según la edad y deja el papeleo claro para que la familia apruebe y pague.

**Línea central:** no salirse de los viajes de 16-17 años sin adultos filtrados por edad. Nada de tangentes. Las normas de alcohol se tratan como ley del país, nunca como «plan».

## Dónde está cada cosa

- `02 Registro/`: Decisiones (D-xx), Dudas pendientes (Q-xx), Evidencias (E-xx), Hipótesis (H-xx) y Bitácora. **Leerlo antes de investigar o cambiar nada**, para no repetir trabajo.
- `10 Problema/`, `20 Benchmark/`, `30 Validación/`, `40 Demos del equipo/`, `50 Propuesta individual/`: investigación, competencia, encuestas, demos de compañeros y propuesta.
- `70 Prototipo/`: el producto, **GoLiveIt Planner**.
  - Fuente editable: `planner.src.html`. Después de cambiarla: `node "70 Prototipo/build.mjs"`.
  - Salidas: `GoLiveIt-Planner.html` (se publica como artefacto: https://claude.ai/artifact/63QKdMuDJnkHYTX3j58dpM; actualizar siempre esa URL) y `GoLiveIt-Planner-para-compartir.html` (archivo independiente para el equipo).
  - Datos en `70 Prototipo/data/*.json`; `build.mjs` los incrusta.
  - Conector de vuelos en tiempo real (Duffel): `conector-vuelos.mjs` en `localhost:8787`; con `--prueba` devuelve datos inventados y marcados.
  - Pruebas: `70 Prototipo/pruebas/` (ver su `LEEME.md`).

## Reglas que no se rompen

- **Datos con etiqueta:** cada dato lleva una (VERIFICADO / OFICIAL-INDIRECTO / SECUNDARIA / EQUIPO / PENDIENTE), con fuente y fecha. Lo que no se sabe queda como «pendiente» o «sin confirmar», **nunca como permitido**. Separar hechos, inferencias e hipótesis.
- **Nada inventado:** ni opiniones (tampoco como ejemplo), ni capturas, ni resultados. Los precios y horarios de ejemplo van marcados con el sello «ejemplo».
- **Reserva simulada:** sin cobrar nada y sin pedir datos de pago o de documentos.
- **Secretos:** el token de Duffel solo vive en la variable de entorno `DUFFEL_TOKEN` del proceso; **nunca** en archivos, notas, Git ni el chat. Antes de cada commit, comprobar que no aparece `duffel_test_` ni ninguna otra clave.
- **Datos personales:** no subir respuestas de encuestas con contactos ni `.csv` o `.xlsx` de `30 Validación/Resultados/`. Las reseñas descargadas (`20 Benchmark/replica/reviews-*.csv`) se quedan solo en local; las dos cosas ya están en `.gitignore`.
- **Cuentas y pagos:** no crear cuentas, no iniciar sesión, no meter credenciales y no hacer pagos. Si algo lo necesita, se le explican los pasos a Alberto.
- **Corner** (app de referencia): solo información pública. Sin descompilar, sin APIs y sin *scraping*.
- **Correos a empresas:** solo a direcciones publicadas oficialmente y nunca mediante formularios web. Se envían desde la cuenta del proyecto, siempre con permiso de Alberto.

## Cómo se trabaja

- Cada sesión acaba igual:
  - se registra la decisión (D-xx) y la bitácora;
  - se hace commit y push, y se republica el artefacto;
  - se le manda a Alberto el HTML para compartir.
- Commits firmados como `alberperezgon-boop` con el correo noreply de GitHub, terminados en la línea `Co-Authored-By` de Claude.
- Antes de dar algo por hecho: `node "70 Prototipo/pruebas/check.mjs" "70 Prototipo/GoLiveIt-Planner.html"` y el recorrido `cdp-check.mjs` sin errores. La única línea que puede salir es la del conector de vuelos apagado.
- Hablarle a Alberto en español, claro y sin jerga. En la app: «vosotros» para el grupo, «tú» solo para lo de cada uno, y tercera persona en el modo padres.
