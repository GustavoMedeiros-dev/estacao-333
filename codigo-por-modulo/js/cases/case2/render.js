// js/cases/case2/render.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function drawCut2() {
  if (gameState.cutscene === 0) {
    R(0, 0, W, H, "#0a0918");
    R(130, 40, 100, 104, "#161333");
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) R(138 + c * 22, 50 + r * 17, 12, 10, (c * 3 + r * 5 + (gameState.clock * 0.7 | 0)) % 4 ? "#d9a85a" : "#2a2640");
    btext("CENTRAL", 152, 26, "#e8b04a", 2);
    R(0, 122, W, 22, "#0b0a15");
    sprite(BENTO, POLICE_PAL, 30, 100, false);
    sprite(WES_ROWS, WES_PAL, 56, 100, false);
    sprite(COND_ROWS, COND2_PAL, 80, 100, false);
    for (const d of drops) R(d.x, d.y, 1, 4, "rgba(150,170,230,.35)");
  } else if (gameState.cutscene === 1) {
    R(0, 0, W, H, "#000");
    btext("DIAS", 104, 44, "#f1e6c8", 3);
    btext("DEPOIS", 90, 72, "#e8b04a", 3);
  } else drawTribunal();
  if (gameState.fadeIn > 0) R(0, 0, W, H, `rgba(0,0,0,${Math.min(1, gameState.fadeIn * 2)})`);
}
function spriteRot(rows, pal, px, py, ang, flip) {
  const L = rows.length, w = rows[0].length, ca = Math.cos(ang), sa = Math.sin(ang), cx = w / 2, Rr = Math.ceil(Math.hypot(w, L)) + 1;
  for (let dy = -Rr; dy <= Rr; dy++) for (let dx = -Rr; dx <= Rr; dx++) {
    const sx = dx * ca + dy * sa, sy = -dx * sa + dy * ca, i = Math.floor(sx + cx), r = Math.floor(sy + L);
    if (i < 0 || i >= w || r < 0 || r >= L) continue;
    const ch = rows[r][flip ? w - 1 - i : i];
    if (ch === ".") continue;
    R(px + dx, py + dy, 1, 1, pixColor(pal, ch));
  }
}
function fallAng(p) {
  return p < 0.82 ? Math.PI / 2 * Math.pow(p / 0.82, 2) : Math.PI / 2 * (1 + 0.07 * Math.sin((p - 0.82) / 0.18 * Math.PI));
}
function fallY(base, p) {
  return base + (122 - base) * Math.pow(Math.min(1, p / 0.82), 2);
}
function c2Doors() {
  const g = "#3fb36b", y = "#e8b04a";
  if (state2.run.sec === "a") {
    c1Door(0, "SAIDA", g, false);
    c1Door(gameState.worldWidth - 16, "VAGAO 2", y, true);
  } else if (state2.run.sec === "b") {
    c1Door(0, "VAGAO 1", y, false);
    c1Door(gameState.worldWidth - 16, "RESTRITO", state2.run.restOpen ? y : "#b33a2e", true);
  } else c1Door(0, "VAGAO 2", y, false);
}
function gasParticles(dt, rate) {
  if (!state2.run.gp) state2.run.gp = [];
  if (rate > 0) for (const vx of VENTS[state2.run.sec] || []) {
    const r = rate * (vx === SRC_VENT ? 1.6 : 1);
    state2.run["acc" + vx] = (state2.run["acc" + vx] || 0) + dt * r;
    while (state2.run["acc" + vx] >= 1) {
      state2.run["acc" + vx]--;
      state2.run.gp.push({ x: vx + 6 + Math.random() * 12, y: 14, vx: (Math.random() - 0.5) * 10, vy: 10 + Math.random() * 12, r: 1 + Math.random(), a: 0.5, floor: 104 + Math.random() * 18 });
    }
  }
  for (const p of state2.run.gp) {
    p.vy += 14 * dt;
    p.y += p.vy * dt;
    p.x += p.vx * dt;
    p.r = Math.min(6, p.r + dt * 2.2);
    if (p.y > p.floor) p.a -= dt * 1.2;
  }
  state2.run.gp = state2.run.gp.filter((p) => p.a > 0);
}
function drawGas() {
  if (!state2.run || !state2.run.gp) return;
  for (const p of state2.run.gp) R(Math.round(p.x - p.r / 2), Math.round(p.y), Math.round(p.r), Math.round(p.r), `rgba(175,125,235,${Math.max(0, p.a)})`);
}
function coffeeArt(x) {
  R(x + 2, 56, 22, 44, "#6e1f2c");
  R(x + 4, 60, 18, 12, "#1b1726");
  R(x + 6, 62, 14, 4, gameState.clock % 1.4 < 0.7 ? "#7fd6a0" : "#2f5a44");
  R(x + 6, 76, 3, 2, "#e8b04a");
  R(x + 11, 76, 3, 2, "#e8b04a");
  R(x + 16, 76, 3, 2, "#b33a2e");
  R(x + 6, 86, 14, 10, "#141124");
  R(x + 11, 91, 4, 4, "#e2dccb");
}
function ventArt(x) {
  R(x, 10, 24, 4, "#3a3f5a");
  for (let k = 0; k < 4; k++) R(x + 2 + k * 6, 11, 3, 2, "#10131f");
  if (state2.run && (state2.run.phase === "gas" || state2.run.phase === "mask")) R(x + 2, 14, 20, 1, "rgba(175,125,235,.6)");
}
function bubble(x, y, ch, c) {
  R(x + 2, y, 8, 10, "#15121c");
  R(x + 3, y + 1, 6, 8, "#f1e6c8");
  text(ch, x + 5, y + 2, c || "#b33a2e");
}
function npcDraw2(n) {
  if (n.gone) return;
  const base = n.sit ? 98 : 120;
  if (n.p > 0 || n.sw > 0) {
    const ang = fallAng(n.p) + (n.sw > 0 ? Math.sin(gameState.clock * 9 + n.x) * 0.14 : 0);
    spriteRot(n.rows, n.pal, n.x + 6, Math.round(fallY(base, n.p)), ang, false);
    if (n.p >= 1 && (gameState.clock * 1.2 + n.x) % 2 < 1) text("Z", n.x + 14, 106 - (gameState.clock * 6 | 0) % 3, "#b79aff");
    if (n.dz) bubble(n.x + 2, base - 38 + (n.sit ? 0 : 0), "?", "#3a3a8a");
    return;
  }
  if (n.walking || n.flee) {
    const fr = (gameState.clock * (n.flee ? 12 : 8) | 0) % 2;
    sprite(runRows(n.rows, fr), n.pal, n.x, 98 - fr, n.flee ? true : P.x < n.x + 6);
    if (n.flee) bubble(n.x + 2, 82, "!");
    if (!n.flee && n.walkTo !== null && Math.abs(n.walkTo - n.x) < 1) n.walking = false;
    return;
  }
  drawNPC(n);
  if (n.dz) bubble(n.x + 2, n.sit ? 60 : 84, "?", "#3a3a8a");
  if (n.otavio && state2.run.phase === "pre") {
    const x = n.x, y = 74;
    R(x - 3, y + 9, 17, 6, "#3e2414");
    R(x - 2, y + 10, 15, 4, "#2a3a7a");
    R(x - 3, y + 15, 17, 6, "#6b4430");
    R(x - 3, y + 15, 17, 1, "#8a5a40");
    R(x + 1, y + 17, 2, 2, "#e8b04a");
    R(x + 9, y + 17, 2, 2, "#e8b04a");
    R(x + 4, y + 11, 5, 1, "#bff3ff");
    R(x + 3, y + 12, 7, 1, "#e6fdff");
    R(x + 4, y + 13, 5, 1, "#9fd8f0");
    R(x + 5, y + 14, 3, 1, "#7fc0e0");
    glint(x + 9, y + 10, 0);
    glint(x + 3, y + 12, 1.6);
  }
  if (n.otavio && state2.run.phase === "gas" && state2.run.gt > 0.3 && state2.run.gt < 1.8) bubble(n.x, 60, "!");
}
function c2Npcs(sec) {
  const fightOn = ["standoff", "flee", "fight"].includes(state2.run.phase);
  C2NPC[sec].forEach((n) => {
    if (n.cond && (gameState.caseSolved || fightOn)) return;
    if (n.cop && fightOn) return;
    if (n.otavio && !n.sit && (state2.run.phase === "clear" || state2.run.phase === "inv")) return;
    if (n.otavio && state2.run.phase === "standoff") {
      sprite(n.rows, n.pal, n.x, 98, true);
      R(n.x + 1, 96, 2, 1, "#c48a62");
      R(n.x + 9, 96, 2, 1, "#c48a62");
      return;
    }
    npcDraw2(n);
  });
}
function gunPix(x, y, left) {
  R(left ? x - 5 : x + 11, y, 5, 2, "#2a2a34");
  R(left ? x - 1 : x + 11, y + 2, 1, 2, "#2a2a34");
}
function drawFightBack() {
  const fr = (gameState.clock * 12 | 0) % 2;
  if (state2.run.phase === "standoff") {
    sprite(WES_ROWS, WES_PAL, 70, 98, false);
    gunPix(70, 112, false);
    sprite(COND_ROWS, COND2_PAL, 118, 98, true);
    gunPix(118, 112, true);
    if (gameState.clock * 2 % 2 < 1) bubble(232, 62, "!");
    sprite(POLICE_ROWS, POLICE_PAL, 306, 100, true);
    return;
  }
  const F = state2.run.F;
  if (!F) return;
  const c = F.cop, ctop = c.st === "hide" ? 100 : 92;
  sprite(c.st === "run" ? runRows(POLICE_ROWS, fr) : POLICE_ROWS, POLICE_PAL, c.x, ctop - (c.st === "run" ? fr : 0), true);
  if (c.st === "out" || c.st === "back") gunPix(c.x, ctop + 14, true);
  if (c.st === "out" && c.tm > 0.3 && c.tm < 0.4) R(c.x - 8, ctop + 13, 2, 3, "#fff1b8");
  for (const b of F.b) {
    if (b.st === "down") {
      sprite(b.rows.slice(0, 19), b.pal, b.x + 6, 105, false);
      R(b.x + 9, 109, 3, 2, "#e9e4f8");
      R(b.x + 9, 111, 3, 1, "#b33a2e");
      R(b.x + 22, 121, 5, 2, "#2a2a34");
      continue;
    }
    if (b.st === "run") {
      sprite(runRows(b.rows, fr), b.pal, b.x, 102 - fr, F.esc);
      continue;
    }
    if (b.st === "hide") {
      sprite(b.rows, b.pal, b.x, 101, false);
      continue;
    }
    const top = 102 + (b.st === "hurt" ? 2 : 0);
    sprite(b.rows, b.pal, b.x, top, false);
    gunPix(b.x, top + 14, false);
    if (b.st === "hurt") R(b.x + 3, top + 15, 2, 2, "#b33a2e");
    if (b.st === "rec" && b.tm > 0.25) R(b.x + 16, top + 13, 2, 3, "#fff1b8");
  }
}
function coverArt(c) {
  const x = c.x, w = c.w, h = c.h, y = c.feet - h;
  R(x - 1, c.feet - 1, w + 2, 2, "rgba(0,0,0,.3)");
  if (c.kind === "malas") {
    R(x, y + 8, w, h - 8, "#7a3a2a");
    R(x, y + 8, w, 1, "#9a5a3a");
    R(x + 2, y, w - 4, 9, "#2a5a7a");
    R(x + 2, y, w - 4, 1, "#4a7a9a");
    R(x + 5, y - 1, 6, 1, "#2a2a2a");
    R(x + 3, y + 12, w - 6, 1, "#5a2a1a");
  } else if (c.kind === "carrinho") {
    R(x, y + 3, w, h - 7, "#c9a44a");
    R(x, y + 3, w, 1, "#e8c86a");
    R(x + 2, y + 8, w - 4, 1, "#a8843a");
    for (let k = 0; k < 4; k++) R(x + 2 + k * 5, y - 2, 2, 5, ["#3a8ad0", "#e8653a", "#5fe08a", "#e8d14a"][k]);
    disc(x + 4, y + h - 2, 2, "#2a2a2a");
    disc(x + w - 4, y + h - 2, 2, "#2a2a2a");
    text("AGUA", x + 3, y + 10, "#6b4430");
  } else if (c.kind === "limpeza") {
    R(x, y + 6, w, h - 6, "#8a8aa0");
    R(x, y + 6, w, 1, "#a8a8bc");
    R(x + 2, y + 2, 8, 6, "#e8d14a");
    R(x + w - 4, y - 10, 1, 16, "#8a6a4a");
    R(x + w - 6, y - 11, 5, 2, "#c9c2a8");
    disc(x + 4, y + h - 1, 2, "#2a2a2a");
    disc(x + w - 4, y + h - 1, 2, "#2a2a2a");
  } else {
    R(x, y + 6, w, h - 6, "#9a7a4a");
    R(x + 3, y, w - 8, 8, "#b8945a");
    R(x, y + 6, w, 1, "#c4a46a");
    R(x + w / 2 - 1, y + 6, 2, h - 6, "#c9b890");
    R(x + 5, y + 2, 6, 1, "#7a5a2a");
    text("FRAGIL", x + 1, y + 12, "#5a3a1a");
  }
}
function drawC2Front() {
  coverArt(C2COV[3]);
  const ot = C2NPC.b.find((n) => n.otavio);
  if (ot && !ot.sit && (state2.run.phase === "clear" || state2.run.phase === "inv")) npcDraw2(ot);
  const F = state2.run.F;
  if (!F) return;
  if (state2.run.phase === "fight" && F.on) {
    for (const b of F.b) if (b.st === "aim") {
      const x0 = b.x + 16, y0 = 112, x1 = b.tg === "cop" ? F.cop.x + 6 : P.x, y1 = b.tg === "cop" ? 98 : 118;
      for (let k = 0; k < 1; k += 0.04) {
        if ((k * 25 | 0) % 2) R(Math.round(x0 + (x1 - x0) * k), Math.round(y0 + (y1 - y0) * k), 1, 1, "rgba(255,60,60,.85)");
      }
    }
  }
  for (const s of F.tr) {
    line(Math.round(s.x0), Math.round(s.y0), Math.round(s.x1), Math.round(s.y1), s.c);
    if (s.spark) R(s.x1 - 1, s.y1 - 1, 3, 3, "#fff1b8");
  }
  if (F.gun) {
    const k = F.gun.t / 0.75, sx = F.cop.x, sy = 96, gx = sx + (P.x - sx) * k, gy = sy + (118 - sy) * k - Math.sin(Math.PI * k) * 30, sp = (gameState.clock * 20 | 0) % 2;
    R(Math.round(gx), Math.round(gy), sp ? 5 : 2, sp ? 2 : 5, "#2a2a34");
  }
  if (state2.run.phase === "fight" && F.out) R(P.x - 11, 118, 5, 2, "#2a2a34");
}
function drawRestCar() {
  const Wd = gameState.worldWidth;
  R(0, 0, Wd, 100, "#3e2c24");
  for (let x = 0; x < Wd; x += 12) R(x, 10, 1, 76, "#34241e");
  R(0, 0, Wd, 10, "#24180f");
  R(0, 86, Wd, 14, "#2e2018");
  R(0, 86, Wd, 1, "#5a4030");
  for (const lx of [60, 160, 260]) {
    R(lx, 10, 1, 8, "#15100c");
    R(lx - 5, 18, 11, 4, "#c96a2a");
    R(lx - 3, 22, 7, 1, "#ffd27a");
    ctx.globalCompositeOperation = "lighter";
    for (let y = 23; y < 100; y++) {
      const w = 4 + (y - 23) * 0.45;
      R(lx - w, y, w * 2, 1, "rgba(255,190,110,.03)");
    }
    ctx.globalCompositeOperation = "source-over";
  }
  R(130, 24, 40, 26, "#1b120c");
  R(132, 26, 36, 22, "#0c0a10");
  for (let k = 0; k < 3; k++) R(134 + (gameState.clock * 30 + k * 14) % 34, 34 + k * 4, 3, 1, "#e8b04a");
  text("DESCANSO", 98, 12, "#e8b04a");
  R(30, 40, 38, 60, "#5a6070");
  R(31, 41, 17, 58, "#6a7080");
  R(50, 41, 17, 58, "#2a2e38");
  for (const hy of [50, 62]) {
    R(54, hy, 2, 2, "#c0c0c8");
    R(60, hy, 2, 2, "#c0c0c8");
  }
  R(56, 74, 8, 6, "#3a3f4a");
  R(36, 46, 6, 8, "#b33a2e");
  R(80, 80, 70, 12, "#a8582a");
  R(80, 92, 70, 8, "#8a4420");
  R(78, 78, 4, 22, "#7a3a1a");
  R(148, 78, 4, 22, "#7a3a1a");
  R(118, 82, 24, 8, "#3a6a8a");
  R(120, 84, 20, 1, "#5a8aaa");
  R(160, 82, 76, 18, "#6b4430");
  R(160, 80, 76, 3, "#8a5a40");
  R(176, 58, 28, 22, "#c0c6d8");
  R(178, 60, 24, 10, "#8a90a4");
  R(184, 70, 12, 6, "#2a2a34");
  R(186, 76, 8, 4, "#e9e4f8");
  R(200, 62, 3, 3, gameState.clock % 1 < 0.5 ? "#ff3a3a" : "#5a1a1a");
  for (let k = 0; k < 3; k++) {
    const p = (gameState.clock * 0.7 + k * 0.33) % 1;
    R(180 + k * 3 + Math.sin(p * 6) * 2, 56 - p * 12, 2, 2, `rgba(230,230,240,${0.5 * (1 - p)})`);
  }
  R(214, 38, 22, 14, "#2a2a34");
  R(216, 40, 12, 10, "#10131f");
  R(230, 41, 4, 2, "#5fe08a");
  R(244, 58, 18, 42, "#e9e4f8");
  R(244, 74, 18, 1, "#c9c4d8");
  R(259, 62, 1, 8, "#8a8aa0");
  R(247, 61, 6, 5, "#f3d27a");
  R(250, 64, 2, 1, "#b33a2e");
  R(270, 26, 26, 18, "#15121c");
  R(272, 28, 22, 14, "#2a7a3a");
  R(272 + gameState.clock * 8 % 20, 33, 2, 2, "#f1f1f1");
  R(282, 28, 1, 14, "#e9e4f8");
  R(302, 90, 10, 10, "#8a5a3a");
  R(300, 78, 4, 12, "#3a8a4a");
  R(305, 74, 4, 16, "#4aa05a");
  R(309, 80, 3, 10, "#3a8a4a");
  R(0, 100, Wd, 44, "#4a3428");
  for (const y of [108, 118, 130]) R(0, y, Wd, 1, "#3e2a20");
  R(70, 112, 110, 18, "#7a2a2a");
  R(72, 114, 106, 14, "#8a3a3a");
  for (let x = 74; x < 178; x += 6) R(x, 120, 3, 1, "#c96a4a");
}
function drawC2A() {
  carShell([30, 110, 200, 276, 352], "#232a40");
  bench(20, 160);
  bench(190, 300);
  bench(320, 400);
  ventArt(48);
  ventArt(330);
  coffeeArt(164);
  R(262, 68, 14, 8, "#d9d4c0");
  R(262, 68, 14, 2, "#15121c");
  R(264, 71, 10, 1, "#8a806a");
  R(264, 73, 8, 1, "#8a806a");
  R(116, 108, 3, 20, "#2a3a6a");
  R(114, 108, 7, 3, "#3a4a8a");
  R(117, 126, 2, 3, "#c9a44a");
  c2Npcs("a");
  drawGas();
}
function drawC2B() {
  carShell([30, 200, 262, 420], "#232a40");
  bench(20, 190);
  bench(220, 340);
  ventArt(236);
  ventArt(SRC_VENT);
  coffeeArt(352);
  R(246, 68, 12, 8, "#c9c4d8");
  R(246, 68, 12, 2, "#7a7a8a");
  R(248, 71, 8, 3, "#e8b04a");
  c2Npcs("b");
  if (["standoff", "flee", "fight"].includes(state2.run.phase)) drawFightBack();
  C2COV.slice(0, 3).forEach(coverArt);
  drawGas();
}
function drawFog() {
  const g = gasLevel();
  if (g <= 0) return;
  const c = Math.round(gameState.cameraX * 4) / 4;
  for (let k = 0; k < 4; k++) for (let x = 0; x < W; x += 4) {
    const y = 108 + k * 7 + Math.sin((x + c) * 0.05 + gameState.clock * (0.6 + k * 0.25) + k) * 3;
    R(x, y, 4, H - y, `rgba(${150 + k * 10},${105 + k * 8},${220},${(0.1 + 0.04 * k) * g})`);
  }
  if (state2.run.phase === "gas") {
    const d = clamp01((state2.run.gt - 3.6) / 0.8);
    if (d > 0) R(0, 0, W, H, `rgba(10,6,18,${d})`);
  }
}
function c2Fx() {
  drawFog();
  if (state2.run.phase === "gas" && state2.run.gt > 4.4) R(0, 0, W, H, "#030208");
  if (state2.run.phase === "mask" && state2.run.faint > 0) R(0, 0, W, H, `rgba(3,2,8,${Math.min(1, (1.6 - state2.run.faint) * 2)})`);
  if (gameState.cutscene >= 0 || gameState.choiceOpen) return;
  if (state2.run.phase === "mask" && !gameState.dialogLine && state2.run.faint <= 0) {
    text("FILTRO", 4, 13, "#c9b8ff");
    R(30, 14, 40, 3, "#2a2040");
    R(30, 14, Math.round(40 * state2.run.filter / 100), 3, state2.run.filter < 25 ? "#ff6a8a" : "#b79aff");
  }
  if (["pre", "mask", "clear", "inv"].includes(state2.run.phase) && !gameState.caseSolved && !gameState.dialogLine) {
    const m = Math.floor(state2.run.arr / 60), sc = Math.floor(state2.run.arr % 60), late = state2.run.arr < 60;
    const str = "PRÓXIMA ESTAÇÃO EM " + m + ":" + (sc < 10 ? "0" : "") + sc;
    R(4, 0.6, Math.max(0, (W - 8) * state2.run.arr / ARR), 1.2, late ? "#ff6a4a" : "#e8b04a");
    R(W - 88, 2.2, 84, 6.6, "rgba(10,8,16,.65)");
    txt(str, W - 6, 7.4, late && (gameState.clock * 3 % 1 < 0.6) ? "#ff8a6a" : "#ffd27a", 4.6, "right");
  }
  const F = state2.run.F;
  if (state2.run.phase === "fight" && F) {
    if (F.hurt > 0) R(0, 0, W, H, `rgba(200,30,30,${F.hurt * 0.6})`);
    for (let i = 0; i < 4; i++) {
      const c = i < F.hp ? "#ff4a5a" : "#3a2030", x = 4 + i * 8;
      R(x, 4, 2, 2, c);
      R(x + 3, 4, 2, 2, c);
      R(x, 6, 5, 2, c);
      R(x + 1, 8, 3, 1, c);
      R(x + 2, 9, 1, 1, c);
    }
    for (let i = 0; i < 6; i++) R(38 + i * 3, 4, 2, 5, i < F.ammo ? "#e8b04a" : "#3a3428");
    if (F.on && !gameState.dialogLine) text(F.rl > 0 ? "RECARREGANDO" : F.out ? "EXPOSTO" : "ABRIGADO", 60, 5, F.out ? "#ff8a6a" : "#7fd6a0");
    if (F.on && !gameState.dialogLine && !F.out) text("TOQUE PARA SAIR", W / 2 - 30, H - 10, "#9aa0c8");
    if (F.msgT > 0) text(F.msg, W / 2 - F.msg.length * 2, 30, "#ff8a6a");
  }
}
var C2ART = {
  "Cafeteira da tripulação": (x, y) => {
    R(x + 30, y + 14, 5, 8, "#e9dfc2");
    R(x + 30, y + 14, 5, 1, "#c9b890");
    R(x + 31, y + 16, 3, 2, "#7a4a2a");
    R(x - 2, y + 15, 5, 7, "#e9dfc2");
    R(x - 2, y + 15, 5, 1, "#c9b890");
    R(x + 8, y - 6, 6, 5, "#3a3f4a");
    R(x + 9, y - 5, 2, 1, "#9fd0e8");
    R(x + 15, y - 6, 6, 5, "#3a3f4a");
    R(x + 16, y - 5, 2, 1, "#9fd0e8");
    R(x + 11, y - 8, 8, 1, "#8a6a4a");
  },
  "Máscara de gás": (x, y) => {
    R(x + 3, y + 2, 10, 7, "#3a3f4a");
    R(x + 4, y + 3, 3, 2, "#9fd0e8");
    R(x + 9, y + 3, 3, 2, "#9fd0e8");
    disc(x + 8, y + 8, 2, "#5a5f6a");
    R(x + 7, y + 8, 2, 1, "#2a2a34");
    R(x, y + 4, 3, 1, "#2a2a34");
    R(x + 13, y + 4, 3, 1, "#2a2a34");
    R(x + 5, y + 1, 2, 1, "#b33a2e");
  },
  "Maleta vazia": (x, y) => {
    R(x, y + 1, 26, 4, "#3e2414");
    R(x + 1, y + 2, 24, 2, "#2a3a7a");
    R(x, y + 5, 26, 8, "#6b4430");
    R(x + 1, y + 5, 24, 5, "#2a3a7a");
    R(x + 10, y + 6, 5, 3, "#1a2450");
    R(x + 11, y + 9, 3, 1, "#1a2450");
    R(x + 2, y + 10, 2, 2, "#e8b04a");
    R(x + 22, y + 10, 2, 2, "#e8b04a");
  },
  "Bilhete do agiota": (x, y) => {
    R(x + 1, y + 2, 10, 7, "#d9d4c0");
    R(x + 2, y + 3, 1, 1, "#b8b098");
    R(x + 8, y + 6, 2, 1, "#b8b098");
    R(x + 4, y + 3, 4, 3, "#b33a2e");
    R(x + 5, y + 4, 1, 1, "#d9d4c0");
    R(x + 7, y + 4, 1, 1, "#d9d4c0");
    R(x + 4, y + 7, 4, 1, "#4a3a3a");
  },
  "Assento vazio": (x, y) => {
    R(x + 2, y + 18, 12, 3, "#4e2230");
    R(x + 3, y + 17, 10, 1, "#6a2a3a");
    R(x + 5, y + 21, 6, 2, "#e8b04a");
    R(x + 6, y + 21, 4, 1, "#c4507a");
  }
};
function drawCase2() {
  if (!state2.run) return;
  if (state2.run.sec === "a") drawC2A();
  else if (state2.run.sec === "b") drawC2B();
  else drawRestCar();
}
