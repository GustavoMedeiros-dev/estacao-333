// js/cases/case1/render.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function drawCut1() {
  if (gameState.cutscene === 2 && state1.run && state1.run.ending) {
    drawEnding(state1.run.ending);
    if (gameState.fadeIn > 0) R(0, 0, W, H, `rgba(0,0,0,${Math.min(1, gameState.fadeIn * 2)})`);
    return;
  }
  if (gameState.cutscene === 0) {
    R(0, 0, W, H, "#0a0918");
    R(130, 40, 100, 104, "#161333");
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) R(138 + c * 22, 50 + r * 17, 12, 10, (c * 3 + r * 5 + (gameState.clock * 0.7 | 0)) % 4 ? "#d9a85a" : "#2a2640");
    btext("CENTRAL", 152, 26, "#e8b04a", 2);
    R(0, 122, W, 22, "#0b0a15");
    sprite(BENTO, POLICE_PAL, 40, 100, false);
    for (let k = 0; k < 8; k++) if ((gameState.clock * 8 | 0) % 8 === k) R(66 + k * 8, 96 - k * 4, 3, 3, "#5fe0ff");
    for (const d of drops) R(d.x, d.y, 1, 4, "rgba(150,170,230,.35)");
  } else if (gameState.cutscene === 1) {
    R(0, 0, W, H, "#000");
    btext("2 HORAS", 82, 44, "#f1e6c8", 3);
    btext("DEPOIS", 90, 72, "#e8b04a", 3);
  } else {
    R(0, 0, W, H, "#0d0b18");
    archShape(40, 10, 176, 134, "#17142a");
    archShape(52, 22, 152, 122, "#0b0a14");
    R(0, 118, W, 26, "#201c33");
    R(0, 126, W, 2, "#4a4568");
    disc(128, 40, 5, "#f3d27a");
    sprite(CLARA_SIT, CLARA_PAL, 114, 93, false);
    R(117, 109, 10, 3, "#8a4a22");
    R(126, 108, 5, 1, "#3a2418");
    sprite(BENTO, POLICE_PAL, 176, 96, true);
    R(140, 104, 36, 10, "rgba(255,240,180,.08)");
  }
  if (gameState.fadeIn > 0) R(0, 0, W, H, `rgba(0,0,0,${Math.min(1, gameState.fadeIn * 2)})`);
}
function c1Door(x, label, col, right) {
  R(x, 22, 16, 78, "#141124");
  R(x + 2, 24, 12, 76, "#1b1828");
  R(x + 5, 36, 6, 12, "#0c0b16");
  R(x + 3, 18, 10, 2, col);
  text(label, right ? gameState.worldWidth - 2 - label.length * 4 : 1, 12, col);
}
function c1Doors() {
  const g = "#3fb36b", y = "#e8b04a";
  if (state1.run.sec === "tras") {
    c1Door(0, "SAIDA", gameState.caseSolved && gameState.clock * 2 % 2 < 1 ? "#9dffb0" : g, false);
    c1Door(gameState.worldWidth - 16, "FRENTE", y, true);
  } else if (state1.run.sec === "frente") {
    c1Door(0, "TRAS", y, false);
    c1Door(gameState.worldWidth - 16, "CABINE", y, true);
  } else if (state1.run.sec === "tunel") c1Door(0, "SAIDA", g, false);
  else c1Door(0, "VAGAO", y, false);
}
function drawRear() {
  carShell([30, 110, 260, 340]);
  bench(20, 170);
  bench(280, 400);
  pole(186);
  pole(268);
  R(196, 40, 14, 22, "#4a4268");
  R(197, 41, 12, 20, "#5c5380");
  R(199, 44, 8, 2, "#e8b04a");
  R(199, 48, 6, 1, "#d9d4e8");
  R(199, 51, 7, 1, "#d9d4e8");
  R(199, 54, 5, 1, "#d9d4e8");
  C1NPC.tras.forEach(drawNPC);
}
function drawFront() {
  carShell([24, 92, 272, 338]);
  bench(20, 130);
  bench(300, 396);
  pole(170);
  R(138, 10, 26, 4, "#3a3550");
  R(140, 14, 22, 3, "#1b1726");
  if (!state1.run.vanished) {
    R(141, 17, 20, 3, Math.sin(gameState.clock * 3) > 0 ? "#ff8a6a" : "#b33a2e");
  } else {
    for (const [sx, sy] of [[144, 126], [150, 129], [156, 125], [161, 128]]) R(sx, sy, 1, 1, "#bfe4ff");
  }
  R(208, 22, 50, 78, "#141124");
  R(210, 24, 22, 74, "#3a3a52");
  R(234, 24, 22, 74, "#3a3a52");
  R(232, 24, 2, 74, "#141124");
  R(214, 30, 14, 16, "#0c0b16");
  R(238, 30, 14, 16, "#0c0b16");
  text("TRILHOS", 219, 52, "#7a7090");
  if (state1.run.vanished) {
    R(231, 24, 4, 74, "#050409");
    R(232, 30, 2, 60, "#0f1a14");
  }
  R(192, 52, 14, 22, "#4a4268");
  R(193, 53, 12, 20, "#5c5380");
  R(198, 56, 3, 10, "#e8b04a");
  R(197, 66, 5, 3, "#b33a2e");
  C1NPC.frente.forEach(drawNPC);
  if (!state1.run.vanished) {
    const x = state1.run.vx, f = true;
    R(x - 1, 119, 14, 2, "rgba(0,0,0,.3)");
    sprite(CLARA, CLARA_PAL, x, 98, f);
    R(x - 3, 104, 5, 14, "#6b3a22");
    R(x - 3, 104, 5, 1, "#8a5a32");
    R(x - 2, 110, 3, 1, "#e8b04a");
    if (state1.run.ev === 1 && state1.run.evT < 1.7) {
      const b = state1.run.evT < 0.15 ? Math.round((0.15 - state1.run.evT) * 30) : 0, by = 86 - b;
      R(x + 2, by, 8, 10, "#15121c");
      R(x + 3, by + 1, 6, 8, "#f1e6c8");
      R(x + 5, by + 2, 2, 4, "#b33a2e");
      R(x + 5, by + 7, 2, 1, "#b33a2e");
      R(x + 5, by + 10, 2, 1, "#15121c");
    }
  }
}
function drawCab() {
  R(0, 0, gameState.worldWidth, 100, "#232a3a");
  R(0, 0, gameState.worldWidth, 10, "#161c28");
  R(0, 86, gameState.worldWidth, 14, "#2a3448");
  R(0, 86, gameState.worldWidth, 1, "#3a4a66");
  R(180, 18, 74, 62, "#141a24");
  R(184, 22, 66, 54, "#05070c");
  for (let k = 0; k < 6; k++) {
    R(206 - k * 4, 76 - k * 0, 1, 1, "#2a3040");
  }
  line(200, 76, 214, 48, "#3a4050");
  line(234, 76, 220, 48, "#3a4050");
  R(214, 48, 7, 1, "#3a4050");
  R(226, 34, 6, 10, "#1b1f2a");
  R(227, 35, 4, 4, gameState.clock % 1.2 < 0.8 ? "#ff3a3a" : "#6a1a1a");
  R(227, 39, 4, 4, "#1a2a1a");
  R(90, 62, 90, 24, "#3a3f5a");
  R(96, 58, 40, 6, "#2a2e44");
  for (let k = 0; k < 8; k++) R(100 + k * 4, 66, 2, 2, ["#e8b04a", "#5fe08a", "#b33a2e", "#5fe0ff"][k % 4]);
  R(100, 72, 30, 6, "#10131f");
  R(102, 74, (Math.sin(gameState.clock * 2) * 0.5 + 0.5) * 24 | 0, 2, "#5fe08a");
  R(150, 64, 3, 14, "#8a8aa0");
  R(148, 62, 7, 3, "#b33a2e");
  R(58, 44, 14, 12, "#2a2a34");
  R(60, 46, 6, 4, "#10131f");
  R(68, 46, 2, 2, gameState.clock % 1 < 0.5 ? "#e8653a" : "#5a2a1a");
  R(70, 40, 1, 4, "#8a8aa0");
  R(82, 30, 10, 12, "#e9dfc2");
  R(83, 31, 8, 7, "#5fa0d0");
  R(83, 36, 8, 2, "#e8d39a");
  R(85, 34, 1, 1, "#15121c");
  R(88, 34, 1, 1, "#15121c");
  R(140, 70, 6, 10, "#c9d4e4");
  R(140, 70, 6, 2, "#3a5a9a");
  R(141, 68, 4, 2, "#2a3550");
  R(0, 100, gameState.worldWidth, 44, "#2e3550");
  for (const y of [106, 114, 124, 136]) R(0, y, gameState.worldWidth, 1, "#262b44");
  C1NPC.cab.forEach((n) => {
    R(n.x - 1, 119, 14, 2, "rgba(0,0,0,.3)");
    sprite(n.rows, n.pal, n.x, 98, false);
  });
}
function drawCase1() {
  if (!state1.run) return;
  if (state1.run.sec === "tras") drawRear();
  else if (state1.run.sec === "frente") drawFront();
  else if (state1.run.sec === "tunel") drawTunnel();
  else drawCab();
}
function drawViolin(x, y, flip, playing) {
  const X = (dx) => flip ? x + 11 - dx : x + dx, bo = playing ? Math.round(Math.sin(gameState.clock * 4) * 3) : 0;
  R(Math.min(X(8), X(11)), y + 10, 4, 3, "#8a4a22");
  line(X(12), y + 11, X(16), y + 9, "#3a2418");
  line(X(5 + bo), y + 8, X(14 + bo), y + 17, "#d9d0b0");
}
function tLampOn(lx) {
  return lx !== 300 || Math.sin(gameState.clock * 17) > -0.3 || Math.sin(gameState.clock * 2.3) > 0.6;
}
/** Ratos (maiores, com olhos que brilham no escuro) e baratas perto da violinista. Também cruzam o caminho do detetive. */
var RAT_RUNS = [[4.2, 0, -1, 121, 90, 560], [5.6, 2.1, 1, 124, 70, 400], [7.4, 4.7, -1, 118, 115, 600], [6.3, 1.2, 1, 126, 85, 250]];
function ratPos(run, t) {
  const [period, off, dir, y, sp, from] = run, p = (t + off) % period, len = 200, dur = len / sp;
  if (p > dur) return null;
  return { x: from + dir * p * sp, y, dir, p };
}
function drawRat(x, y, dir, fr) {
  const X = (dx) => dir < 0 ? x - dx : x + dx, L = (a, b) => Math.min(X(a), X(b));
  R(L(0, 11), y - 1, 12, 5, "#5e5866"); R(L(1, 9), y - 2, 9, 1, "#6e6878");
  R(L(10, 14), y - 1, 5, 4, "#6a6472"); R(X(15), y + 1, 1, 1, "#d8a8a8");
  R(X(11), y - 3, 2, 2, "#8a7a86");
  R(X(13), y, 1, 1, "#ff5a5a");
  R(L(-7, -1), y + 1, 7, 1, "#9a8a8e"); R(L(-10, -7), y + 2, 3, 1, "#9a8a8e");
  R(X(2 + fr * 2), y + 4, 2, 1, "#2a2830"); R(X(8 - fr * 2), y + 4, 2, 1, "#2a2830");
}
function drawSewerCritters() {
  const t = gameState.clock, fr = (t * 18 | 0) % 2;
  for (const run of RAT_RUNS) { const r = ratPos(run, t); if (r) drawRat(r.x, r.y, r.dir, fr); }
  for (let k = 0; k < 6; k++) {
    const ph = t * 0.45 + k * 1.3, bx = 462 + k * 14 + Math.sin(ph * 2.3) * 7, by = 62 + ((ph * 16 + k * 9) % 40);
    R(bx, by, 3, 2, "#4a2c16"); R(bx, by + 2, 3, 1, "#2a180c"); R(bx - 1, by - 1, 1, 1, "#6a4a28"); R(bx + 3, by - 1, 1, 1, "#6a4a28");
    R(bx - 1, by + 1, 1, 1, "#2a180c"); R(bx + 3, by + 1, 1, 1, "#2a180c");
  }
}
/** Olhos vermelhos dos ratos brilhando por cima da escuridão. */
function drawCritterEyes(c) {
  if (state1.run.ending) return;
  const t = gameState.clock;
  for (const run of RAT_RUNS) {
    const r = ratPos(run, t);
    if (!r) continue;
    const ex = (r.dir < 0 ? r.x - 13 : r.x + 13) - c;
    R(ex - 0.5, r.y - 0.5, 2, 2, "rgba(255,60,60,.35)"); R(ex, r.y, 1, 1, "#ff6a6a");
  }
}
function drawTunnel() {
  const Wd = gameState.worldWidth;
  R(0, 0, Wd, 100, "#1c1b21");
  R(0, 0, Wd, 8, "#0e0e12");
  for (let y = 8, r = 0; y < 100; y += 10, r++) {
    R(0, y, Wd, 1, "#141418");
    for (let x = r % 2 * 10; x < Wd; x += 20) R(x, y + 1, 1, 9, "#141418");
  }
  R(0, 13, Wd, 4, "#3a3430");
  R(0, 13, Wd, 1, "#4e463e");
  R(0, 20, Wd, 2, "#2c2824");
  for (let x = 20; x < Wd; x += 60) R(x, 12, 3, 6, "#4a423a");
  for (let x = 0; x < Wd; x += 46) {
    line(x, 26, x + 23, 30, "#151515");
    line(x + 23, 30, x + 46, 26, "#151515");
  }
  R(40, 40, 30, 12, "#c9a530");
  R(40, 40, 30, 1, "#e8d070");
  text("SETOR 4", 42, 43, "#15121c");
  R(150, 14, 6, 10, "#5a4e44");
  R(148, 22, 10, 2, "#6b5e52");
  for (let k = 0; k < 4; k++) {
    const p = (gameState.clock * 0.8 + k * 0.25) % 1;
    R(152 + Math.sin(p * 6 + k) * 3, 24 + p * 14, 2 + p * 3, 2 + p * 3, `rgba(200,200,210,${0.35 * (1 - p)})`);
  }
  R(196, 36, 48, 64, "#26242c");
  archShape(200, 40, 40, 60, "#060608");
  R(222, 52, 8, 6, "#3a3a3a");
  R(226, 54, 1, 2, "#c9a530");
  R(330, 46, 16, 22, "#4a4a3a");
  R(331, 47, 14, 20, "#5a5a48");
  R(336, 56, 4, 8, "#b33a2e");
  R(334, 63, 8, 1, "#2a2a2a");
  text("4", 338, 49, "#15121c");
  R(380, 28, 3, 72, "#3a3a42");
  for (let k = 0; k < 6; k++) R(384 + k * 4, 30 + k, 1, 70 - k, "#5a5a62");
  R(384, 48, 22, 1, "#5a5a62");
  R(392, 98, 5, 3, "#8a7a3a");
  R(462, 26, 98, 74, "#2b2218");
  R(462, 26, 98, 1, "#4a3a28");
  R(505, 8, 1, 18, "#151515");
  R(501, 26, 9, 3, "#3a3430");
  R(503, 29, 5, 2, "#ffd27a");
  R(520, 98, 26, 22, "#5a3e22");
  R(520, 98, 26, 1, "#7a5a32");
  R(520, 108, 26, 1, "#3e2a16");
  R(546, 108, 12, 12, "#2a5a8a");
  R(548, 106, 8, 2, "#3a6aaa");
  R(490, 104, 22, 16, "#6b4a2a");
  R(490, 104, 22, 1, "#8a6a3a");
  R(490, 111, 22, 1, "#4a3218");
  for (const lx of TLAMPS) {
    R(lx - 3, 24, 7, 7, "#2a2a2a");
    R(lx - 2, 25, 5, 5, tLampOn(lx) ? "#ffd27a" : "#3a2e1a");
    R(lx, 23, 1, 1, "#2a2a2a");
    if (lx === 300 && !tLampOn(lx) && gameState.clock * 9 % 1 < 0.3) R(lx + 3, 32, 1, 1, "#fff1b8");
  }
  R(0, 100, Wd, 44, "#232120");
  R(0, 103, Wd, 2, "#35302b");
  for (const y of [112, 122]) R(0, y, Wd, 1, "#1c1a19");
  R(0, 136, Wd, 8, "#10161e");
  for (let k = 0; k < 12; k++) R((k * 53 + gameState.clock * 12) % Wd, 138 + k % 3, 4, 1, "#22303e");
  R(420, 124, 32, 4, "#1c2a3a");
  if (gameState.clock * 0.7 % 1 < 0.1) R(434, 125, 4, 1, "#4a6a8a");
  if (state1.run.rat > 0) {
    const rx = 220 - (1 - state1.run.rat) * 130;
    R(rx, 124, 6, 3, "#5a5a62");
    R(rx + 5, 123, 2, 2, "#5a5a62");
    R(rx + 6, 123, 1, 1, "#ff6a6a");
    R(rx - 4, 125, 4, 1, "#8a7a7a");
  }
  if (!state1.run.ending) drawSewerCritters();
  if (!state1.run.ending || state1.run.ending === "c") {
    const cx = 494, top = 86;
    sprite(CLARA_SIT, CLARA_PAL, cx, top, true);
    drawViolin(cx, top, true, !state1.run.stopPlay || state1.run.ending === "c");
    R(487, 110, 6, 10, "#4a2414");
    R(487, 110, 6, 1, "#6b3a22");
    if (state1.run.met && state1.run.meetT > 0.2 && state1.run.meetT < 1.1) {
      const by = top - 12;
      R(cx + 2, by, 8, 10, "#15121c");
      R(cx + 3, by + 1, 6, 8, "#f1e6c8");
      R(cx + 5, by + 2, 2, 4, "#b33a2e");
      R(cx + 5, by + 7, 2, 1, "#b33a2e");
    }
  }
}
var TMASK = document.createElement("canvas");
TMASK.width = W;
TMASK.height = H;
var tm = TMASK.getContext("2d");
function tHole(cx, cy, r, a) {
  const g = tm.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, `rgba(0,0,0,${a})`);
  g.addColorStop(0.55, `rgba(0,0,0,${a * 0.55})`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  tm.fillStyle = g;
  tm.fillRect(cx - r, cy - r, r * 2, r * 2);
}
function tunnelDark() {
  const c = Math.round(gameState.cameraX * 4) / 4;
  tm.globalCompositeOperation = "source-over";
  tm.clearRect(0, 0, W, H);
  tm.fillStyle = gameState.glassesOn ? "rgba(2,4,10,.72)" : "rgba(2,2,6,.9)";
  tm.fillRect(0, 0, W, H);
  tm.globalCompositeOperation = "destination-out";
  const px = P.x - c;
  tHole(px, 108, 46, 0.35);
  tHole(px, 108, 34, 0.6);
  tHole(px, 108, 24, 0.9);
  for (const lx of TLAMPS) if (tLampOn(lx)) {
    tHole(lx - c, 34, 34, 0.35);
    tHole(lx - c, 34, 20, 0.6);
  }
  tHole(505 - c, 90, 70, 0.45);
  tHole(505 - c, 90, 50, 0.75);
  ctx.drawImage(TMASK, 0, 0);
  drawCritterEyes(c);
  if (gameState.glassesOn) {
    for (let x = 30, k = 0; x < 466; x += 7, k++) {
      const sx = x - c;
      if (sx < -4 || sx > W + 4) continue;
      const a = 0.35 + 0.45 * Math.max(0, Math.sin(gameState.clock * 3 - k * 0.5));
      R(sx, 123 + (k % 2 ? 3 : 0), 2, 1, `rgba(79,184,255,${a})`);
      R(sx + 2, 122 + (k % 2 ? 3 : 0), 1, 1, `rgba(170,230,255,${a})`);
    }
  }
  if (state1.run.blk > 0) R(0, 0, W, H, `rgba(0,0,0,${state1.run.blk > 1 ? (1.2 - state1.run.blk) * 5 : 0.97})`);
}
function drawEnding(k) {
  if (k === "a") {
    R(0, 0, W, H, "#140a10");
    R(0, 112, W, 32, "#4a2a18");
    R(0, 112, W, 2, "#6b4430");
    ctx.globalCompositeOperation = "lighter";
    for (let y = 0; y < 114; y++) {
      const w = 8 + y * 0.32;
      R(128 - w, y, w * 2, 1, "rgba(255,230,170,.05)");
    }
    ctx.globalCompositeOperation = "source-over";
    for (let x = 0; x < 40; x += 6) {
      R(x, 0, 6, H, x / 6 % 2 ? "#7a1a26" : "#5a1220");
      R(W - 6 - x, 0, 6, H, x / 6 % 2 ? "#7a1a26" : "#5a1220");
    }
    R(0, 0, W, 8, "#5a1220");
    sprite(CLARA, CLARA_PAL, 122, 90, false);
    drawViolin(122, 90, false, true);
    for (let i = 0; i < 12; i++) {
      disc(12 + i * 21, 140, 6, "#0a0608");
      if (((gameState.clock * 6 | 0) + i) % 3 === 0) R(10 + i * 21, 128, 1, 1, "#f1e6c8");
    }
  } else if (k === "b") {
    ["#2a1a3a", "#5a2a4a", "#a84a4a", "#e8844a", "#f3c27a"].forEach((c, i) => R(0, i * 17, W, 17, c));
    disc(128, 86, 14, "#fff1b8");
    R(0, 86, W, 58, "#2a2440");
    R(0, 86, W, 1, "#4a4068");
    for (let x = 0; x < W; x += 8) R(x, 90, 5, 1, "#d6aa45");
    R(150, 72, 2, 14, "#1a1630");
    R(146, 70, 10, 3, "#1a1630");
    const cx = 60 + gameState.clock * 9 % 150;
    R(cx - 1, 127, 14, 2, "rgba(0,0,0,.35)");
    sprite(CLARA, CLARA_PAL, cx, 106, false);
    R(cx - 3, 112, 5, 13, "#6b3a22");
    drawDetective(32, 128, 1, false, 0);
  } else {
    R(0, 0, W, 110, "#3a5a4a");
    R(0, 110, W, 34, "#6b4a30");
    for (let x = 0; x < W; x += 16) R(x, 110, 1, 34, "#5a3e28");
    R(68, 12, 120, 48, "#6b4430");
    R(70, 14, 116, 44, "#1f3a2a");
    text("MUSICA", 104, 22, "#e9e4d8");
    for (let k2 = 0; k2 < 4; k2++) {
      R(84 + k2 * 24, 38 + k2 % 2 * 4, 2, 6, "#e9e4d8");
      disc(84 + k2 * 24, 44 + k2 % 2 * 4, 1, "#e9e4d8");
    }
    sprite(CLARA, CLARA_PAL, 122, 88, false);
    drawViolin(122, 88, false, true);
    [14, 36, 58, 166, 188].forEach((x, i) => {
      sprite(KIDS[i % 3], KID_PAL[i % 3], x, 96, x > 128);
    });
    const ana = C1NPC.frente.find((n) => n.name === "Professora Ana");
    sprite(npcRows({ hair: "short", glasses: true, dress: true }), ana.pal, 226, 88, true);
    if (gameState.clock * 2 % 1 < 0.6) R(229, 96, 1, 2, "#9fd0e8");
  }
}
