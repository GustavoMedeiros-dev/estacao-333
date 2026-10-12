// js/cases/progress.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var CASE_TITLES = ["O sumiço da violinista", "A Lágrima do Sertão", "O fantasma da Estação 42"];
var caseLive = [null, null, null];
var setAside = [false, false, false];
var currentCase = -1;
function saveLive(i) {
  caseLive[i] = { found: gameState.cluesFound, solved: gameState.caseSolved, chatOn: gameState.promptStarted, advice: gameState.adviceText };
}
function loadLive(i) {
  const s = caseLive[i] || { found: 0, solved: false, chatOn: false, advice: "" };
  gameState.cluesFound = s.found;
  gameState.caseSolved = s.solved;
  gameState.promptStarted = s.chatOn;
  setAdvice(s.advice);
}
function activateCase(i) {
  if (gameState.caseIndex !== i) {
    saveLive(gameState.caseIndex);
    loadLive(i);
    gameState.caseIndex = i;
    gameState.clueTotal = CASES[i].cl.length;
  }
  currentCase = i;
  setAside[i] = false;
}
function liveOf(i) {
  if (gameState.caseIndex === i) return { found: gameState.cluesFound, solved: gameState.caseSolved };
  return caseLive[i] || { found: 0, solved: false };
}
function isStarted(i) {
  return !done[i] && !!(CASES[i].started && CASES[i].started());
}
function caseProgress(i) {
  if (done[i]) return 100;
  if (!isStarted(i) || !CASES[i].progress) return 0;
  const { found, solved } = liveOf(i);
  return Math.max(0, Math.min(99, Math.round(CASES[i].progress(found, solved))));
}
function caseSolvedFor(i) {
  return liveOf(i).solved;
}
function finishCase(i) {
  if (currentCase === i) currentCase = -1;
  setAside[i] = false;
}
function requestCase(i, go) {
  const enter = go || (() => enterCase(i));
  if (done[i]) {
    say([["Óculos", "Caso resolvido. Nada mais a analisar neste vagão."]]);
    return;
  }
  const prev = currentCase;
  if (prev < 0 || prev === i || !isStarted(prev)) {
    if (go) enter();
    else showOpts("VOCÊ DESEJA ENTRAR NO CASO " + (i + 1) + "?", [{ t: "Sim", f: enter }, { t: "Não", f: () => {
    } }]);
    return;
  }
  const pct = caseProgress(prev);
  showOpts("VOCÊ NÃO DESEJA FINALIZAR O CASO " + (prev + 1) + " ANTES? (" + pct + "% FEITO)", [
    { t: "Sim, vou continuar o caso " + (prev + 1), f: () => {
    } },
    { t: "Não, deixar o caso " + (prev + 1) + " de lado e ir para o caso " + (i + 1), f: () => {
      setAside[prev] = true;
      say([["Óculos", "Caso " + (prev + 1) + " deixado de lado com " + pct + "% concluído. A porcentagem fica no quadro de partidas."]], enter);
    } }
  ]);
}
function statusText(i) {
  if (done[i]) return "resolvido (100%)";
  if (!isStarted(i)) return "não iniciado";
  const pct = caseProgress(i);
  if (setAside[i]) return "deixado de lado (" + pct + "%)";
  return "em andamento (" + pct + "%)";
}
function boardText(i) {
  if (done[i]) return "100%";
  if (!isStarted(i)) return "---";
  return caseProgress(i) + "%";
}
function openBoard() {
  say([[D, "Quadro de partidas. Três trens, três casos."]], () => showOpts("QUADRO DE PARTIDAS", [
    ...[0, 1, 2].map((i) => ({ t: "CASO " + (i + 1) + " · " + CASE_TITLES[i] + " · " + statusText(i), f: () => requestCase(i) })),
    { t: "Fechar", f: () => {
    } }
  ]));
}
function resetProgress() {
  caseLive.fill(null);
  setAside.fill(false);
  currentCase = -1;
}
