// js/core/dialog.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var D = "Detetive";
var GLASSES = "Óculos";
var MEMORY = "Memória";
function say(lines, fn) {
  gameState.dialogQueue = lines.slice();
  gameState.dialogAfter = fn || null;
  nextLine();
}
function nextLine() {
  if (!gameState.dialogQueue.length) {
    gameState.dialogLine = null;
    dlg.style.display = "none";
    const f = gameState.dialogAfter;
    gameState.dialogAfter = null;
    if (f) f();
    return;
  }
  const wasOpen = !!gameState.dialogLine;
  gameState.dialogLine = gameState.dialogQueue.shift();
  gameState.dialogShown = 0;
  const who = gameState.dialogLine[0];
  const isGlasses = who === GLASSES || who === MEMORY;
  whoEl.textContent = isGlasses ? "◈ " + (who === MEMORY ? "MEMÓRIA REGISTRADA" : "ÓCULOS") : who;
  txtEl.textContent = "";
  const kind = !who ? "narr" : isGlasses ? "glass" : "";
  const changed = !wasOpen || dlg.dataset.kind !== kind;
  dlg.className = kind;
  dlg.dataset.kind = kind;
  dlg.style.display = "block";
  if (changed) {
    dlg.classList.remove("enter");
    void dlg.offsetWidth;
    dlg.classList.add("enter");
  }
}
function advance() {
  if (!gameState.dialogLine) return;
  if (gameState.dialogShown < gameState.dialogLine[1].length) {
    gameState.dialogShown = gameState.dialogLine[1].length;
  } else nextLine();
}
