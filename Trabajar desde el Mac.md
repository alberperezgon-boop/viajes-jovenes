---
tipo: guía
fecha: 2026-11-23
---

# Trabajar desde el Mac

Esta carpeta es a la vez la bóveda de Obsidian y el repositorio Git (GitHub privado `alberperezgon-boop/viajes-jovenes`). Si viene del zip, ya trae todo el historial, así que no hace falta clonarla.

## Primera vez

1. **Descomprimir** el zip y mover la carpeta `viajes-jovenes` a `~/Documents`. Si iCloud sincroniza «Documentos», mejor a `~/Proyectos`, porque iCloud puede estropear la carpeta `.git`.
2. **Abrir Terminal** y ejecutar:
   ```bash
   bash ~/Documents/viajes-jovenes/preparar-mac.command
   ```
   El script comprueba e instala, pidiendo permiso antes de cada cosa:
   - Git, Homebrew, Node y GitHub CLI;
   - el inicio de sesión en GitHub con **alberperezgon-boop**;
   - la firma de los commits;
   - que esté al día con GitHub;
   - que el Planner compile.
   
   Al final ofrece abrir la bóveda en Obsidian. Se puede repetir sin miedo.
   
   Si el Mac dice que no puede abrir el archivo por ser «de un desarrollador no identificado», no hagas doble clic: usa el comando de arriba en Terminal.
3. **Obsidian:** si no lo abrió el script, en Obsidian elige «Open folder as vault» y selecciona esta carpeta. Los temas ya vienen incluidos.
4. **Claude Code:** arráncalo siempre desde esta carpeta, para que lea `CLAUDE.md` con las reglas del proyecto:
   ```bash
   cd ~/Documents/viajes-jovenes && claude
   ```

## Cada día

- **Al empezar:** `git pull`. **Al acabar:** commit y `git push`. Así no se pisan el Windows y el Mac.
- **Ver la demo:** abrir `70 Prototipo/GoLiveIt-Planner-para-compartir.html`.
- **Cambiar la demo:**
  1. editar `70 Prototipo/planner.src.html`;
  2. compilar con `node "70 Prototipo/build.mjs"`;
  3. probar con lo que explica `70 Prototipo/pruebas/LEEME.md`.
- **Vuelos en tiempo real:** `DUFFEL_TOKEN=… node "70 Prototipo/conector-vuelos.mjs"`. El token se pone solo al arrancar el conector, **nunca** en un archivo.

## Lo que no viaja por Git (a propósito)

- **Respuestas de encuestas** con contactos y los `.csv`/`.xlsx` de `30 Validación/Resultados/`: se copian a mano y nunca se suben.
- **Reseñas descargadas** (`20 Benchmark/replica/reviews-*.csv`): el zip las lleva, pero Git no.
- **La memoria de Claude Code** del Windows: en el Mac, la referencia es `CLAUDE.md`.
