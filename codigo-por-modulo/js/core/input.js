// js/core/input.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function hit(wx, y) {
  for (let i = gameState.hotspots.length - 1; i >= 0; i--) {
    const h = gameState.hotspots[i];
    if (wx >= h.x && wx < h.x + h.w && y >= h.y && y < h.y + h.h) return h;
  }
  return null;
}
function toCanvas(e) {
  const r = cv.getBoundingClientRect();
  return { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H };
}
function installInputHandlers() {
  addEventListener("keydown", (e) => {
    const ac = activeCase();
    if (ac && ac.onKeyDown) ac.onKeyDown(e);
  }, true);
  fbtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ac = activeCase();
    if (ac && ac.onActionButton) ac.onActionButton();
  });
  addEventListener("keyup", (e) => CASES.forEach((c) => c.onKeyUp && c.onKeyUp(e)));
  [[flb, "l"], [frb, "r"]].forEach(([b, k]) => {
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      keys[k] = true;
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => b.addEventListener(ev, () => {
      keys[k] = false;
    }));
  });
  gbtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleGlasses();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "q" || e.key === "Q") toggleGlasses();
  });
  addEventListener("pageshow", (e) => {
    if (e.persisted) resetToMenu();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") resetToMenu();
  });
  cv.addEventListener("pointermove", (e) => {
    const p = toCanvas(e);
    mouse.x = p.x;
    mouse.y = p.y;
    mouse.in = true;
  });
  cv.addEventListener("pointerleave", () => {
    mouse.in = false;
  });
  cv.addEventListener("pointerdown", (e) => {
    if (gameState.audioCtx && gameState.audioCtx.state === "suspended") gameState.audioCtx.resume();
    const p = toCanvas(e);
    mouse.x = p.x;
    mouse.y = p.y;
    if (gameState.mode === "menu") return;
    if (gameState.mode === "play") {
      const ac = activeCase();
      if (ac && ac.onPointer && ac.onPointer(p)) return;
    }
    if (gameState.mode !== "play" || gameState.inputLocked) return;
    if (gameState.dialogLine) {
      advance();
      return;
    }
    const wx = p.x + gameState.cameraX, h = hit(wx, p.y);
    if (h) {
      P.tx = clamp(h.wx, 12, gameState.worldWidth - 12);
      P.pending = h;
    } else {
      P.tx = clamp(wx, 12, gameState.worldWidth - 12);
      P.pending = null;
    }
  });
  addEventListener("keydown", (e) => {
    const k = e.key;
    if (["ArrowLeft", "ArrowRight", " ", "Enter"].includes(k)) e.preventDefault();
    if (gameState.cutscene === 3) {
      if (k === "e" || k === "E" || k === " " || k === "Enter") povAdvance();
      return;
    }
    if (gameState.choiceOpen) {
      if (k >= "1" && k <= "3" && gameState.choiceHandlers[k - 1]) gameState.choiceHandlers[k - 1]();
      return;
    }
    if (gameState.mode === "menu") {
      if ((k === "Enter" || k === " ") && !coverPanelOpen()) startGame();
      return;
    }
    if (k === "ArrowLeft" || k === "a" || k === "A") keys.l = true;
    if (k === "ArrowRight" || k === "d" || k === "D") keys.r = true;
    if (k === "e" || k === "E" || k === " " || k === "Enter") {
      if (gameState.mode !== "play" || gameState.inputLocked) return;
      if (gameState.dialogLine) {
        advance();
        return;
      }
      let best = null, bd = 28;
      for (const h of gameState.hotspots) {
        const d = Math.abs(h.wx - P.x);
        if (d < bd) {
          bd = d;
          best = h;
        }
      }
      if (best) {
        P.tx = best.wx;
        P.pending = best;
      }
    }
  });
  addEventListener("keyup", (e) => {
    const k = e.key;
    if (k === "ArrowLeft" || k === "a" || k === "A") keys.l = false;
    if (k === "ArrowRight" || k === "d" || k === "D") keys.r = false;
  });
}
