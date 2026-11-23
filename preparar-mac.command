#!/bin/bash
# GoLiveIt · deja la bóveda lista para trabajar en el Mac.
# Uso (en Terminal):  bash ~/Documents/viajes-jovenes/preparar-mac.command
# Se puede repetir las veces que haga falta: solo instala o cambia lo que falta.
cd "$(dirname "$0")" || exit 1
VAULT="$(pwd)"
ok()    { printf "  \033[32m✓\033[0m %s\n" "$1"; }
falta() { printf "  \033[33m!\033[0m %s\n" "$1"; }
pregunta() { local r; read -r -p "  $1 (s/n) " r; [[ "$r" =~ ^[sS] ]]; }

echo
echo "== GoLiveIt: preparar el Mac =="
echo "Carpeta: $VAULT"
case "$VAULT" in
  *"Mobile Documents"*|*"CloudDocs"*) falta "Esta carpeta está en iCloud Drive. iCloud puede estropear la carpeta .git: mejor muévela a ~/Proyectos y vuelve a ejecutar esto." ;;
esac

echo
echo "1. Git"
if xcode-select -p >/dev/null 2>&1 && command -v git >/dev/null 2>&1; then
  ok "$(git --version)"
else
  falta "Falta Git. Se abre el instalador de Apple; cuando termine, vuelve a ejecutar este archivo."
  xcode-select --install
  exit 0
fi

echo
echo "2. Homebrew, Node y GitHub CLI"
if command -v brew >/dev/null 2>&1; then
  ok "Homebrew"
  command -v node >/dev/null 2>&1 || { pregunta "Falta Node (para compilar y probar el Planner). ¿Lo instalo con Homebrew?" && brew install node; }
  command -v gh   >/dev/null 2>&1 || { pregunta "Falta GitHub CLI (para iniciar sesión en GitHub). ¿Lo instalo con Homebrew?" && brew install gh; }
else
  falta "Falta Homebrew. Instálalo con el comando de https://brew.sh y vuelve a ejecutar este archivo."
fi
command -v node >/dev/null 2>&1 && ok "Node $(node --version)" || falta "Node no está: el Planner se abre igual, pero no se puede compilar ni probar."

echo
echo "3. Git del proyecto"
git config user.name "alberperezgon-boop"
git config user.email "353882499+alberperezgon-boop@users.noreply.github.com"
ok "Commits firmados como alberperezgon-boop"
git config core.autocrlf input
ok "Saltos de línea de Mac"

echo
echo "4. GitHub (cuenta alberperezgon-boop)"
if command -v gh >/dev/null 2>&1; then
  if gh auth status --hostname github.com >/dev/null 2>&1; then
    ok "Sesión de GitHub iniciada"
  else
    falta "Hay que iniciar sesión en GitHub con la cuenta alberperezgon-boop (se abre el navegador)."
    gh auth login --hostname github.com --git-protocol https --web
  fi
  gh auth setup-git >/dev/null 2>&1 && ok "Git usará esa sesión para pull y push"
  git remote set-url origin https://github.com/alberperezgon-boop/viajes-jovenes.git
  if git fetch -q origin 2>/dev/null; then
    ok "Conectado con GitHub"
    detras=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)
    if [ "$detras" -gt 0 ] 2>/dev/null; then
      if git diff --quiet && git diff --cached --quiet; then git pull -q --ff-only && ok "Traídos $detras cambios nuevos de GitHub"; else falta "Hay $detras cambios nuevos en GitHub, pero tienes cambios sin guardar: haz commit y luego git pull."; fi
    else
      ok "Al día con GitHub"
    fi
  else
    falta "No he podido conectar con GitHub (¿sesión iniciada con la cuenta correcta?)."
  fi
else
  falta "Sin GitHub CLI: no se puede hacer pull ni push todavía."
fi
cambios=$(git status --porcelain | wc -l | tr -d ' ')
[ "$cambios" = "0" ] && ok "Sin cambios pendientes" || falta "$cambios archivos con cambios (mira: git status)"

echo
echo "5. Planner"
if command -v node >/dev/null 2>&1; then
  node "70 Prototipo/pruebas/check.mjs" "70 Prototipo/GoLiveIt-Planner.html" >/dev/null 2>&1 && ok "El Planner compila y su código está bien" || falta "El Planner no ha pasado la comprobación de sintaxis"
fi
[ -d "/Applications/Google Chrome.app" ] && ok "Chrome (para las pruebas automáticas)" || falta "Sin Google Chrome: las pruebas automáticas lo necesitan (la demo funciona en Safari)."

echo
echo "6. Obsidian y Claude Code"
if [ -d "/Applications/Obsidian.app" ]; then
  ok "Obsidian instalado"
  if command -v node >/dev/null 2>&1 && pregunta "¿Abro esta carpeta como bóveda en Obsidian?"; then
    open "obsidian://open?path=$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$VAULT")"
  fi
else
  falta "Instala Obsidian desde https://obsidian.md y abre esta carpeta con «Open folder as vault»."
fi
command -v claude >/dev/null 2>&1 && ok "Claude Code: entra con  cd \"$VAULT\" && claude" || falta "Claude Code no está en el PATH de esta terminal."

echo
echo "Listo. Para ver la demo: open \"$VAULT/70 Prototipo/GoLiveIt-Planner-para-compartir.html\""
echo "Recuerda: git pull al empezar y git push al acabar, para no pisar lo del Windows."
echo
