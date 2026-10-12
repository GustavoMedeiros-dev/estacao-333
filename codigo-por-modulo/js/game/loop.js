// js/game/loop.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function startGame() {
  if (gameState.mode !== "menu") return;
  gameState.mode = "fade";
  gameState.fadeTimer = 0;
  menuEl.classList.add("hide");
}
function resetToMenu() {
  stopMusic();
  FIN.on = false; FIN.stage = null; FIN.started = false; FIN.flags = {}; FIN.awaitClick = false; gameState.finaleClock = false; gameState.celiaOut = false; gameState.clockSecOn = false; gameState.clockMin = 33;
  gameState.mode = "menu";
  gameState.fadeTimer = 0;
  menuEl.classList.remove("hide");
  closePanel();
  gameState.dialogQueue = [];
  gameState.dialogLine = null;
  dlg.style.display = "none";
  gameState.scene = "station";
  gameState.worldWidth = 640;
  gameState.hotspots = HS;
  gameState.cluesFound = 0;
  gameState.caseSolved = false;
  gameState.promptStarted = false;
  setAdvice("");
  gameState.cutscene = -1;
  done.fill(false);
  caseSave.fill(null);
  resetProgress();
  resetStationLife();
  CASES.forEach((c) => c.reset && c.reset());
  gameState.inputLocked = false;
  gameState.choiceOpen = false;
  choicesEl.style.display = "none";
  gameState.dialogAfter = null;
  gameState.fadeIn = 0;
  P.x = 70;
  P.dir = 1;
  P.tx = null;
  P.pending = null;
  P.walk = 0;
  P.moving = false;
  gameState.cameraX = 0;
  keys.l = keys.r = false;
  HS.forEach((h) => h.n = 0);
  gameState.glassesOn = false;
  gameState.scanProgress = 0;
  gbtn.classList.remove("on");
}
var ACCEL = 480;
function update(dt) {
  gameState.clock += dt;
  if (gameState.scanProgress > 0) gameState.scanProgress -= dt * 2.2;
  if (gameState.fadeIn > 0) gameState.fadeIn -= dt;
  if (gameState.cutscene === 3) povTick(dt);
  gameState.lightningIn -= dt;
  if (gameState.lightningIn <= 0) {
    if (!gameState.finaleClock || FIN.stage === "post") gameState.lightning = 0.14;
    gameState.lightningIn = 7 + Math.random() * 8;
  }
  if (gameState.lightning > 0) gameState.lightning -= dt;
  for (const d of drops) {
    d.y += d.v * dt;
    d.x -= d.v * dt * 0.15;
    if (d.y > H) {
      d.y = -4;
      d.x = Math.random() * (W + 30);
    }
  }
  if (gameState.mode === "fade") {
    gameState.fadeTimer += dt;
    if (gameState.fadeTimer >= 1) {
      gameState.mode = "play";
      say([
        [D, "Estação Central. Três e trinta e três da manhã."],
        [D, "Três trens esperando. Três casos. E nenhum café decente à vista."],
        [D, "Pelo menos tenho meus óculos inteligentes, com IA embarcada. Eles analisam as pistas e me explicam o que veem."],
        ["Óculos", "Online. Toque numa pista e eu faço a análise."],
        ["", "Clique no chão para andar e em objetos ou pessoas para interagir. No teclado: setas para andar, E para interagir, Q (ou o ícone no canto) para colocar e tirar os óculos."]
      ]);
    }
  }
  if (gameState.mode !== "play" && !(gameState.mode === "fade" && gameState.fadeTimer >= 0.5)) return;
  if (gameState.dialogLine) {
    gameState.dialogShown = Math.min(gameState.dialogLine[1].length, gameState.dialogShown + dt * 45);
    txtEl.textContent = gameState.dialogLine[1].slice(0, gameState.dialogShown | 0);
    dlg.classList.toggle("done", gameState.dialogShown >= gameState.dialogLine[1].length);
  }
  let mv = 0, targetSpeed = 0;
  if (!gameState.dialogLine && gameState.mode === "play" && !gameState.choiceOpen && gameState.cutscene !== 3 && !gameState.inputLocked) {
    if (keys.l) mv -= 1;
    if (keys.r) mv += 1;
  }
  if (mv) {
    P.tx = null;
    P.pending = null;
    targetSpeed = mv * SPEED;
    P.dir = mv;
  } else if (P.tx !== null && !gameState.dialogLine && !gameState.choiceOpen && gameState.cutscene !== 3 && !gameState.inputLocked) {
    const d = P.tx - P.x;
    if (Math.abs(d) < 1.5) {
      P.x = P.tx;
      P.tx = null;
      P.vel = 0;
      if (P.pending) {
        const h = P.pending;
        P.pending = null;
        P.dir = h.x + h.w / 2 >= P.x ? 1 : -1;
        interact(h);
      }
    } else {
      mv = Math.sign(d);
      targetSpeed = mv * Math.min(SPEED, Math.abs(d) * 7 + 10);
      P.dir = mv;
    }
  }
  P.vel += clamp(targetSpeed - P.vel, -ACCEL * dt, ACCEL * dt);
  P.x += P.vel * dt;
  CASES.forEach((c) => c.tick && c.tick(dt));
  P.x = clamp(P.x, 12, gameState.worldWidth - 12);
  const speed = Math.abs(P.vel);
  P.moving = speed > 5;
  P.walk = P.moving ? P.walk + dt * Math.min(1.25, speed / SPEED) : 0;
  P.lead += ((P.moving ? P.dir * 16 : 0) - P.lead) * Math.min(1, dt * 2.5);
  const fix = gameState.scene === "case" && CASES[gameState.caseIndex].cameraFix ? CASES[gameState.caseIndex].cameraFix() : null, target = fix != null ? fix : clamp(P.x + P.lead - W / 2, 0, gameState.worldWidth - W);
  gameState.cameraX += (target - gameState.cameraX) * Math.min(1, dt * 5);
  gameState.smokeTimer -= dt;
  if (gameState.smokeTimer <= 0) {
    gameState.smokeTimer = 0.35;
    smoke.push({ x: 196 + Math.random() * 58, y: 44, a: 0.5, r: 1 + Math.random() * 2 });
  }
  for (const s of smoke) {
    s.y -= dt * 7;
    s.x += Math.sin(gameState.clock * 2 + s.r) * dt * 3;
    s.a -= dt * 0.18;
    s.r += dt * 1.2;
  }
  while (smoke.length && smoke[0].a <= 0) smoke.shift();
  gameState.hovered = null;
  if (gameState.mode === "play" && !gameState.dialogLine && gameState.cutscene < 0 && mouse.in) gameState.hovered = hit(mouse.x + gameState.cameraX, mouse.y);
  if (gameState.hovered && gameState.hovered.clue && gameState.hovered.n === 0) gameState.hovered = null;
}
var last = performance.now();
var frameEma = 0.016;
function frame(now) {
  // telas de 120/144 Hz: desenhar mais de 60 quadros por segundo só gasta processamento
  if (now - last < 15) {
    requestAnimationFrame(frame);
    return;
  }
  const raw = (now - last) / 1e3;
  const dt = Math.min(0.05, raw);
  last = now;
  frameEma = frameEma * 0.96 + Math.min(0.1, raw) * 0.04;
  fxAdapt(frameEma);
  update(dt);
  finaleTick(dt);
  ambientAudio();
  caseMusic();
  ctx.setTransform(K, 0, 0, K, 0, 0);
  ctx.clearRect(0, 0, W, H);
  if (gameState.mode === "menu") drawMenu();
  else if (gameState.mode === "fade") {
    if (gameState.fadeTimer < 0.5) {
      drawMenu();
      R(0, 0, W, H, `rgba(0,0,0,${gameState.fadeTimer / 0.5})`);
    } else {
      drawPlay();
      R(0, 0, W, H, `rgba(0,0,0,${1 - (gameState.fadeTimer - 0.5) / 0.5})`);
    }
  } else if (FIN.on) drawFinale();
  else if (gameState.cutscene >= 0) drawCut();
  else drawPlay();
  if (game.classList) game.classList.toggle("fx", gameState.mode === "play" || gameState.mode === "fade" && gameState.fadeTimer >= 0.5);
  const coverArtEl = document.getElementById("coverArt");
  if (coverArtEl && coverArtEl.style) coverArtEl.style.display = gameState.mode === "menu" || gameState.mode === "fade" && gameState.fadeTimer < 0.5 ? "" : "none";
  labelEl.textContent = gameState.hovered ? gameState.hovered.name : "";
  gbtn.style.display = gameState.mode === "play" && gameState.cutscene < 0 && !gameState.choiceOpen ? "flex" : "none";
  const ac = activeCase(), act = gameState.mode === "play" && ac && ac.actionLabel ? ac.actionLabel() : null;
  fbtn.style.display = act ? "block" : "none";
  flb.style.display = frb.style.display = "none";
  if (act) fbtn.textContent = act;
  cv.style.cursor = gameState.mode === "menu" || gameState.hovered ? "pointer" : "default";
  requestAnimationFrame(frame);
}
function startLoop() {
  requestAnimationFrame(frame);
}
