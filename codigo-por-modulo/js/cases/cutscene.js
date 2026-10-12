// js/cases/cutscene.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function startCut() {
  const c = CASES[gameState.caseIndex].cut;
  gameState.cutscene = 0;
  gameState.fadeIn = 0.5;
  say(c.a, () => {
    gameState.cutscene = 1;
    gameState.fadeIn = 0.5;
    say(c.card, () => {
      gameState.cutscene = 2;
      gameState.fadeIn = 0.5;
      say(c.b, () => {
        gameState.cutscene = -1;
        done[gameState.caseIndex] = true;
        finishCase(gameState.caseIndex);
        setAdvice("");
        exitCase();
        say([["Óculos", "Caso " + (gameState.caseIndex + 1) + " encerrado." + (done.every(Boolean) ? " Todos os casos foram resolvidos." : " Os outros casos esperam no quadro de partidas.")]]);
      });
    });
  });
}
function drawCut() {
  if (gameState.cutscene === 3) {
    drawHolo();
    return;
  }
  CASES[gameState.caseIndex].drawCut();
}
