// js/ui/pov.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var pov = null;
povEl.onclick = () => povAdvance();
function sendPrompt() {
  say(CASES[gameState.caseIndex].povN || [["", "Os óculos entram em modo chat. A câmera passa para o ponto de vista do detetive."]], startPOV);
}
function startPOV() {
  const c = CASES[gameState.caseIndex], ord = c.ord || c.mem.map((_, i) => i), full = c.pfx + ord.map((i) => c.mem[i][2] + c.mem[i][1]).join("") + "?";
  let acc = c.pfx.length;
  const ends = [];
  ord.forEach((i) => {
    acc += (c.mem[i][2] + c.mem[i][1]).length;
    ends[i] = acc;
  });
  pov = { full, reply: c.dir, n: 0, r: 0, ends, ready: false };
  gameState.cutscene = 3;
  gameState.fadeIn = 0.5;
  povMem.innerHTML = "";
  c.mem.forEach((m) => {
    const li = document.createElement("li");
    li.textContent = m[0];
    povMem.appendChild(li);
  });
  povU.textContent = "";
  povA.style.display = "none";
  povH.style.display = "none";
  povEl.style.display = "block";
  fitPov(c, full);
}
function fitPov(c, full) {
  povU.textContent = "DETETIVE ▸ " + full;
  povA.textContent = "ÓCULOS ▸ " + c.dir;
  povA.style.display = "block";
  povH.style.display = "block";
  for (const el of [document.getElementById("povL"), document.getElementById("povR")]) {
    let fs = 5.5;
    el.style.fontSize = "calc(var(--s)*" + fs + "px)";
    while (fs > 3.4 && el.scrollHeight > el.clientHeight + 1) {
      fs -= 0.25;
      el.style.fontSize = "calc(var(--s)*" + fs.toFixed(2) + "px)";
    }
  }
  povU.textContent = "";
  povA.textContent = "";
  povA.style.display = "none";
  povH.style.display = "none";
}
function povTick(dt) {
  if (!pov) return;
  if (!pov.ready) {
    if (pov.n < pov.full.length) pov.n = Math.min(pov.full.length, pov.n + dt * 38);
    else if (pov.r < pov.reply.length) pov.r = Math.min(pov.reply.length, pov.r + dt * 45);
    else pov.ready = true;
  }
  povU.textContent = "DETETIVE ▸ " + pov.full.slice(0, pov.n | 0);
  Array.from(povMem.children).forEach((li, i) => {
    li.className = pov.n >= pov.ends[i] ? "on" : "";
  });
  const done2 = pov.n >= pov.full.length;
  povA.style.display = done2 ? "block" : "none";
  povA.textContent = done2 ? "ÓCULOS ▸ " + pov.reply.slice(0, pov.r | 0) : "";
  povH.style.display = pov.ready ? "block" : "none";
}
function povAdvance() {
  if (!pov) return;
  if (!pov.ready) {
    pov.n = pov.full.length;
    pov.r = pov.reply.length;
    return;
  }
  const c = CASES[gameState.caseIndex];
  pov = null;
  povEl.style.display = "none";
  gameState.cutscene = -1;
  gameState.caseSolved = true;
  gameState.fadeIn = 0.4;
  setAdvice(c.adv);
}
function drawHolo() {
  const px = P.x - Math.round(gameState.cameraX * 4) / 4, py = 70;
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(1.3, 1.3);
  ctx.translate(-px, -py);
  drawPlay();
  ctx.restore();
  R(0, 0, W, H, "rgba(10,40,60,.22)");
  for (let y = 0; y < H; y += 3) R(0, y, W, 1, "rgba(95,224,255,.05)");
  const cc = "rgba(95,224,255,.85)";
  for (const [x, y, dx, dy] of [[3, 3, 1, 1], [W - 4, 3, -1, 1], [3, H - 4, 1, -1], [W - 4, H - 4, -1, -1]]) {
    R(dx > 0 ? x : x - 9, y, 10, 1, cc);
    R(x, dy > 0 ? y : y - 9, 1, 10, cc);
  }
  const typing = pov && !pov.ready && pov.n < pov.full.length;
  for (let r = 0; r < 4; r++) {
    const y = 108 + r * 7, w = 84 + r * 16, x0 = (W - w) / 2, n = 13, kw = w / n;
    R(x0 - 2, y - 1, w + 4, 7, "rgba(95,224,255,.06)");
    for (let k = 0; k < n; k++) {
      const lit = typing && ((gameState.clock * 20 | 0) * 7 + r * 3) % n === k;
      R(x0 + k * kw + 1, y, kw - 2, 5, lit ? "#bff3ff" : "rgba(95,224,255,.28)");
    }
  }
}
