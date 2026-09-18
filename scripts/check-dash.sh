#!/usr/bin/env bash
#
# Procura travessao longo e meia risca em todo arquivo versionado.
# Sai com 1 se achar, imprimindo arquivo, linha e o trecho.
#
# Os dois caracteres nao aparecem escritos aqui de proposito, senao o proprio
# script seria reprovado. Eles sao montados byte a byte pelo printf.
#
# Rode com: pnpm sem-travessao

set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

EM_DASH=$(printf '\342\200\224')
EN_DASH=$(printf '\342\200\223')

list_files() {
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    # Versionado e tambem o que ainda nao foi adicionado, respeitando o gitignore.
    # Sem o --others, um arquivo novo passaria batido antes do primeiro add.
    git ls-files --cached --others --exclude-standard -z
  else
    find . -type f \
      -not -path './node_modules/*' \
      -not -path './*/node_modules/*' \
      -not -path './.git/*' \
      -print0
  fi
}

hits=$(list_files | xargs -0 grep -n -H -I -e "$EM_DASH" -e "$EN_DASH" -- 2>/dev/null)

if [ -z "$hits" ]; then
  echo "Nenhum travessao encontrado."
  exit 0
fi

echo "Travessao encontrado. Troque por virgula, dois pontos, parenteses ou ponto final."
echo
echo "$hits"
echo
echo "Total: $(echo "$hits" | wc -l | tr -d ' ') ocorrencia(s)."
exit 1
