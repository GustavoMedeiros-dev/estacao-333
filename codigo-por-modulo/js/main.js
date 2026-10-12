// js/main.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

addEventListener("keydown", (e) => {
  const a = document.activeElement;
  if ((e.key === " " || e.key === "Enter") && a && a.tagName === "BUTTON" && gameState.mode === "play") a.blur();
}, true);
addEventListener("keyup", (e) => { if (e.key === " " && gameState.mode === "play") e.preventDefault(); }, true);
addEventListener("pointerdown", () => { finaleClick(); });
addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") finaleClick(); });
installInputHandlers();
installAmbient();
installCover();
installMobile();
startLoop();
if (typeof globalThis.__ESTACAO_TEST__ === "function") {
  globalThis.__ESTACAO_TEST__({ G: gameState, P, CASES, enterCase, startGame, resetToMenu, advance, povAdvance, startPOV, exitCase, done, progress: { caseProgress, requestCase, openBoard, boardText } });
}
})();
