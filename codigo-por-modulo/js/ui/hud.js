// js/ui/hud.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function setAdvice(txt2) {
  gameState.adviceText = txt2;
  adviceEl.textContent = txt2 ? "ÓCULOS ▸ " + txt2 : "";
  adviceEl.style.display = txt2 ? "block" : "none";
}
function showOpts(q2, opts) {
  gameState.choiceOpen = true;
  choicesEl.innerHTML = '<div class="q">' + q2 + "</div>";
  gameState.choiceHandlers = [];
  opts.forEach((o, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1 + ". " + o.t;
    const f = () => {
      gameState.choiceOpen = false;
      choicesEl.style.display = "none";
      o.f();
    };
    b.onclick = f;
    gameState.choiceHandlers.push(f);
    choicesEl.appendChild(b);
  });
  choicesEl.style.display = "flex";
}
