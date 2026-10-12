// js/cases/registry.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var CASES = [];
function activeCase() {
  return gameState.scene === "case" ? CASES[gameState.caseIndex] : null;
}
function enterCase(i) {
  activateCase(i);
  const def = CASES[i];
  gameState.caseIndex = i;
  gameState.clueTotal = def.cl.length;
  gameState.scene = "case";
  P.tx = null;
  P.pending = null;
  gameState.cameraX = 0;
  gameState.fadeIn = 0.5;
  if (def.enter) {
    def.enter();
    return;
  }
  gameState.worldWidth = def.W;
  P.x = def.sx;
  P.dir = 1;
  const sv = caseSave[i];
  if (sv && (!def.started || def.started())) {
    gameState.hotspots = sv.hs;
    if (gameState.caseSolved && !gameState.adviceText) setAdvice(def.adv || "");
    def.enterBack();
    return;
  }
  gameState.cluesFound = 0;
  gameState.caseSolved = false;
  gameState.promptStarted = false;
  def.enterFresh();
}
function welcomeBack() {
  say([["Óculos", "De volta ao vagão. Pistas encontradas: " + gameState.cluesFound + " de " + gameState.clueTotal + "." + (gameState.caseSolved ? " Caso já deduzido: siga a orientação no canto da tela." : "")]]);
}
function exitCase() {
  if (gameState.scene !== "case") return;
  caseSave[gameState.caseIndex] = done[gameState.caseIndex] ? null : { hs: gameState.hotspots, found: gameState.cluesFound, solved: gameState.caseSolved, chatOn: gameState.promptStarted };
  gameState.scene = "station";
  gameState.worldWidth = 640;
  gameState.hotspots = HS;
  P.x = [225, 335, 445][gameState.caseIndex];
  P.tx = null;
  P.pending = null;
  gameState.cameraX = clamp(P.x - W / 2, 0, gameState.worldWidth - W);
  gameState.fadeIn = 0.5;
}
