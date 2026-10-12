// js/scenes/menu.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function drawMenu() {
  R(0, 0, W, 4, "rgba(5,6,14,.35)");
  for (const d of drops) R(d.x, d.y, 1, 4, "rgba(170,190,240,.38)");
  if (gameState.lightning > 0) R(0, 0, W, H, "rgba(180,190,255,.14)");
}
