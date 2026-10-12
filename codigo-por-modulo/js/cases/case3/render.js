// js/cases/case3/render.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function drawCut3() {
  if (gameState.cutscene === 0) {
    R(0, 0, W, H, "#0a0918");
    R(0, 112, W, 32, "#0b0a15");
    archShape(60, 16, 136, 100, "#17142a");
    archShape(72, 28, 112, 88, "#0b0a14");
    if ((gameState.clock * 5 | 0) % 3) R(120, 50, 18, 44, "rgba(220,235,255,.16)");
    sprite(BENTO, POLICE_PAL, 92, 92, false);
    sprite(ENG_ROWS, ENG_PAL, 122, 92, false);
    for (const d of drops) R(d.x, d.y, 1, 4, "rgba(150,170,230,.3)");
  } else if (gameState.cutscene === 1) {
    R(0, 0, W, H, "#000");
    btext("DEPOIS", 90, 58, "#f1e6c8", 3);
  } else {
    drawNewspaper();
  }
  if (gameState.fadeIn > 0) R(0, 0, W, H, `rgba(0,0,0,${Math.min(1, gameState.fadeIn * 2)})`);
}
/* ---------- Fim do caso 3: recorte de jornal antigo no muro (estilo "jornal de arquivo") ---------- */
var NEWS_PHOTO = typeof Image === "function" ? new Image() : null;
if (NEWS_PHOTO) NEWS_PHOTO.src = "data:image/jpeg;base64,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";
var ARREST_PHOTO = typeof Image === "function" ? new Image() : null;
if (ARREST_PHOTO) ARREST_PHOTO.src = "data:image/jpeg;base64,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";
var grayCache = /* @__PURE__ */ new Map();
/** Versão em tons de sépia de uma paleta, para a foto da prisão parecer impressa no jornal. */
function sepiaPal(pal) {
  if (grayCache.has(pal)) return grayCache.get(pal);
  const out = { __out: pal.__out };
  for (const k of Object.keys(pal)) {
    const v = pal[k];
    if (typeof v !== "string" || v[0] !== "#") continue;
    const n = parseInt(v.slice(1), 16), l = (n >> 16 & 255) * 0.3 + (n >> 8 & 255) * 0.59 + (n & 255) * 0.11;
    const c = (x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0");
    out[k] = "#" + c(l * 1.02 + 8) + c(l * 0.95 + 4) + c(l * 0.8);
  }
  grayCache.set(pal, out);
  return out;
}
function serif(size, weight) { ctx.font = `${weight || ""} ${size}px Georgia, "Times New Roman", serif`; }
function wrapLines(str, maxW) {
  const words = str.split(" "), lines = [];
  let cur = "";
  for (const w of words) { const test = cur ? cur + " " + w : w; if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test; }
  if (cur) lines.push(cur);
  return lines;
}
function paperText(str, x, y, maxW, size, lh, color, weight, align) {
  serif(size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align || "left";
  ctx.textBaseline = "alphabetic";
  const lines = wrapLines(str, maxW);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
  ctx.textAlign = "left";
  return lines.length * lh;
}
/** Foto da prisão: policial levando o engenheiro algemado pelo túnel, em sépia e granulada. */
function arrestPhoto(x, y, w, h) {
  if (ARREST_PHOTO && ARREST_PHOTO.complete && ARREST_PHOTO.naturalWidth) { ctx.drawImage(ARREST_PHOTO, x, y, w, h); return; }
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  R(x, y, w, h, "#3a342a");
  R(x, y + h - 10, w, 10, "#2a2620");
  for (let k = 0; k < w; k += 9) R(x + k, y, 1, h - 10, "#332e25");
  R(x + w * 0.62, y + 3, 10, 6, "#8a7e64");
  sprite(BENTO, sepiaPal(POLICE_PAL), x + 10, y + h - 30, false);
  sprite(ENG_ROWS, sepiaPal(ENG_PAL), x + 24, y + h - 30, false);
  R(x + 20, y + h - 17, 6, 1, "#c8bea4");
  R(x + 34, y + h - 15, 3, 2, "#a8a090");
  const fl = ctx.createRadialGradient(x + w - 4, y + 4, 1, x + w - 4, y + 4, w * 0.8);
  fl.addColorStop(0, "rgba(255,248,225,.55)"); fl.addColorStop(1, "rgba(255,248,225,0)");
  ctx.fillStyle = fl; ctx.fillRect(x, y, w, h);
  for (let k = 0; k < 140; k++) { const gx = x + (k * 37.7 % w), gy = y + (k * 23.3 % h); R(gx, gy, 0.5, 0.5, k % 2 ? "rgba(0,0,0,.35)" : "rgba(255,245,220,.18)"); }
  ctx.restore();
}
function drawNewspaper() {
  const t = gameState.clock;
  // muro de tijolos à noite, com um poste iluminando o recorte
  R(0, 0, W, H, "#4a261c");
  for (let y = 0, r = 0; y < H; y += 7, r++) {
    R(0, y, W, 1, "#2e140e");
    for (let x = (r % 2) * 11; x < W; x += 22) R(x, y + 1, 1, 6, "#2e140e");
  }
  for (let k = 0; k < 50; k++) R((k * 53) % W, (k * 37) % H, 3, 2, k % 3 ? "#5a2e22" : "#3a1a12");
  const lamp = ctx.createRadialGradient(128, 66, 8, 128, 66, 160);
  lamp.addColorStop(0, "rgba(255,214,150,.20)"); lamp.addColorStop(1, "rgba(0,0,0,.62)");
  ctx.fillStyle = lamp; ctx.fillRect(0, 0, W, H);
  ctx.save();
  ctx.translate(128, 73);
  ctx.rotate(-0.028);
  const pw = 196, ph = 130, x0 = -pw / 2, y0 = -ph / 2;
  // papel amarelado, com borda rasgada e manchas
  R(x0 + 3, y0 + 4, pw, ph, "rgba(0,0,0,.5)");
  ctx.fillStyle = "#e6dcc2";
  ctx.beginPath(); ctx.moveTo(x0, y0);
  for (let k = 0; k <= 40; k++) ctx.lineTo(x0 + pw * k / 40, y0 + (k % 2 ? 0.8 : 0));
  for (let k = 0; k <= 26; k++) ctx.lineTo(x0 + pw + (k % 2 ? -0.9 : 0), y0 + ph * k / 26);
  for (let k = 40; k >= 0; k--) ctx.lineTo(x0 + pw * k / 40, y0 + ph + (k % 3 ? 0 : -1.2));
  ctx.closePath(); ctx.fill();
  const age = ctx.createRadialGradient(0, 0, 30, 0, 0, 120);
  age.addColorStop(0, "rgba(120,90,40,0)"); age.addColorStop(1, "rgba(120,90,40,.32)");
  ctx.fillStyle = age; ctx.fillRect(x0, y0, pw, ph);
  for (const [sx, sy, sr] of [[60, -40, 9], [-80, 44, 7], [70, 50, 5]]) { ctx.fillStyle = "rgba(140,105,50,.13)"; ctx.beginPath(); ctx.arc(sx, sy, sr, 0, 6.2832); ctx.fill(); }
  const ink = "#231d18", soft = "#4a4036";
  // cabeçalho
  serif(13, "bold italic"); ctx.fillStyle = ink; ctx.textAlign = "center"; ctx.fillText("Diário da Estação", 0, y0 + 14); ctx.textAlign = "left";
  serif(3.4); ctx.fillStyle = soft; ctx.fillText("EDIÇÃO EXTRA", x0 + 6, y0 + 18.5);
  ctx.textAlign = "right"; ctx.fillText("ANO XLII · Nº 333 · R$ 3,00", x0 + pw - 6, y0 + 18.5); ctx.textAlign = "left";
  R(x0 + 5, y0 + 20, pw - 10, 0.7, ink); R(x0 + 5, y0 + 21.3, pw - 10, 0.3, ink);
  // manchete
  serif(11.5, "bold"); ctx.fillStyle = ink; ctx.textAlign = "center";
  ctx.fillText("FANTASMA DA ESTAÇÃO 42", 0, y0 + 33);
  ctx.fillText("ERA UM ENGENHEIRO", 0, y0 + 44.5);
  ctx.textAlign = "left";
  paperText("Detetive desvenda o mistério que aterrorizava o trem da plataforma 3 e encontra o responsável escondido nos túneis", 0, y0 + 51, pw - 30, 4.4, 5, soft, "italic", "center");
  R(x0 + 5, y0 + 59, pw - 10, 0.4, soft);
  // foto do detetive (da capa) e foto da prisão
  const fx = x0 + 7, fy = y0 + 62, fw = 40, fh = 52;
  R(fx - 0.8, fy - 0.8, fw + 1.6, fh + 1.6, ink);
  if (NEWS_PHOTO && NEWS_PHOTO.complete && NEWS_PHOTO.naturalWidth) ctx.drawImage(NEWS_PHOTO, fx, fy, fw, fh);
  else R(fx, fy, fw, fh, "#3a342a");
  serif(3.3, "italic"); ctx.fillStyle = soft; ctx.fillText("O detetive responsável pelo caso.", fx, fy + fh + 4);
  const ax = x0 + pw - 7 - 62, ay = fy, aw = 62, ah = 40;
  R(ax - 0.8, ay - 0.8, aw + 1.6, ah + 1.6, ink);
  arrestPhoto(ax, ay, aw, ah);
  paperText("O engenheiro Amaro Siqueira deixa o túnel algemado.", ax, ay + ah + 4, aw, 3.3, 3.8, soft, "italic");
  // texto da matéria, em coluna
  const cx = fx + fw + 5, cw = ax - cx - 5;
  const body = "Durante semanas, passageiros relataram uma figura pálida que surgia no escuro dos vagões. O caso terminou nesta madrugada: não havia fantasma algum. Segundo a investigação, um engenheiro demitido após vinte anos de empresa usava um projetor holográfico e um drone de choque, controlados de uma sala secreta nos túneis da obra da Estação 42. O vigia noturno, atingido por uma descarga, passa bem. Preso, o engenheiro disse que \"só queria ser lembrado\".";
  serif(3.5); ctx.fillStyle = ink;
  const lines = wrapLines(body, cw);
  lines.slice(0, 15).forEach((l, i) => ctx.fillText(l, cx, fy + 3 + i * 4.1));
  R(cx - 2.5, fy, 0.3, 54, soft); R(ax - 2.5, fy, 0.3, 54, soft);
  // pé da página e fita adesiva
  R(x0 + 5, y0 + ph - 8, pw - 10, 0.3, soft);
  serif(3); ctx.fillStyle = soft; ctx.fillText("CIDADE · POLÍCIA · PÁGINA 3", x0 + 6, y0 + ph - 4);
  for (const [tx, ty, ta] of [[x0 + 4, y0 - 1, -0.5], [x0 + pw - 14, y0 - 1, 0.5]]) { ctx.save(); ctx.translate(tx + 6, ty + 2); ctx.rotate(ta); R(-7, -2.5, 14, 5, "rgba(235,232,210,.7)"); ctx.restore(); }
  // granulado do papel
  for (let k = 0; k < 260; k++) R(x0 + (k * 41.3 % pw), y0 + (k * 29.7 % ph), 0.5, 0.5, "rgba(60,45,25,.18)");
  ctx.restore();
  if (Math.sin(t * 7) > 0.93) R(0, 0, W, H, "rgba(255,240,200,.07)");
  for (const d of drops) R(d.x, d.y, 1, 4, "rgba(150,170,230,.16)");
}
function drawGhostSprite(x, feet, alpha, chase) {
  const top = feet - GHOST.length - 4 + Math.round(Math.sin(gameState.clock * 3) * 2);
  ctx.globalAlpha = alpha;
  for (let r = 0; r < GHOST.length; r++) {
    const off = Math.round(Math.sin(gameState.clock * 5 + r * 0.6) * (r > 12 ? 1.5 : 0.5)), row = GHOST[r];
    for (let i = 0; i < row.length; i++) {
      const ch = row[i];
      if (ch === ".") continue;
      R(x + i + off, top + r, 1, 1, ch === "w" ? "#dfe9ff" : ch === "r" ? chase ? "#ff2a2a" : "#05060c" : "#05060c");
    }
  }
  ctx.globalAlpha = 1;
}
function c3Lamps() {
  if (state3.run.sec === "w1") return [[75, 1], [215, Math.sin(gameState.clock * 19) > -0.2 || Math.sin(gameState.clock * 2) > 0.6 ? 1 : 0], [300, 0], [450, 0]];
  if (state3.run.sec === "w2") return [[60, Math.sin(gameState.clock * 23) > 0 ? 1 : 0], [200, 1], [330, Math.sin(gameState.clock * 7) > 0.3 ? 1 : 0]];
  return [];
}
function creepyWall(Wd, dark) {
  for (const [x, y] of [[40, 40], [150, 60], [260, 44], [370, 62], [470, 50]]) if (x < Wd) for (let k = 0; k < 3; k++) line(x + k * 3, y, x + k * 3 + 6, y + 10, "#14101c");
  for (let x = 60; x < Wd - 20; x += 60) {
    const sw = Math.round(Math.sin(gameState.clock * 1.3 + x) * 2);
    line(x, 12, x + sw, 26, "#5a5a6a");
    R(x + sw - 1, 26, 3, 3, "#7a7a8a");
  }
  ctx.globalCompositeOperation = "source-over";
  for (let k = 0; k < 6; k++) {
    const y = 120 + k * 3;
    for (let x = 0; x < Wd; x += 6) R(x, y + Math.round(Math.sin(x * 0.05 + gameState.clock * 0.5 + k) * 1.5), 6, 3, "rgba(170,185,220,.035)");
  }
  if (dark) R(dark, 0, Wd - dark, 144, "rgba(0,0,0,.45)");
}
function drawW1() {
  carShell([30, 110, 200, 276, 352, 430], "#15131f");
  bench(20, 160);
  bench(400, 470);
  R(186, 10, 22, 4, "#3a3550");
  R(190, 14, 14, 2, "#1b1726");
  R(222, 26, 40, 24, "rgba(0,0,0,0)");
  for (const [hx, hy] of [[214, 30], [222, 34], [440, 30]]) {
    R(hx, hy, 4, 5, "rgba(220,230,255,.35)");
    R(hx, hy - 2, 1, 2, "rgba(220,230,255,.3)");
    R(hx + 2, hy - 3, 1, 3, "rgba(220,230,255,.3)");
    R(hx + 4, hy - 1, 1, 2, "rgba(220,230,255,.3)");
  }
  btext("42", 300, 58, "#6a1414", 2);
  for (let k = 0; k < 5; k++) R(302 + k * 5, 68, 1, 4 + k * 7 % 6, "#6a1414");
  R(296, 10, 1, 10 + Math.round(Math.sin(gameState.clock * 2) * 2), "#2a2a2a");
  if (gameState.clock * 6 % 3 < 0.2) {
    R(295, 22, 3, 3, "#bff3ff");
  }
  R(338, 40, 28, 60, "#3a3440");
  R(339, 41, 26, 58, "#4a4352");
  R(351, 41, 1, 58, "#2a2432");
  R(346, 64, 2, 6, "#8a8aa0");
  R(355, 64, 2, 6, "#8a8aa0");
  text("ACHADOS", 338, 32, "#6a6070");
  R(196, 122, 18, 6, "#c9c0a8");
  R(198, 123, 10, 1, "#5a5040");
  creepyWall(gameState.worldWidth, 380);
  if (state3.run.phase === "hunt" || state3.run.phase === "out" || state3.run.phase === "corr" || state3.run.phase === "room") spriteRot(ARL_ROWS, ARL_PAL, 300, 122, Math.PI / 2, false);
  const A = state3.run.arl;
  if (state3.run.phase === "escape") {
    if (A.st === "run") {
      const fr = (gameState.clock * 12 | 0) % 2;
      sprite(runRows(ARL_ROWS, fr), ARL_PAL, A.x, 98 - fr, true);
      R(A.x - 4, 108, 3, 2, "#ffe7a0");
      text("CORRE!", A.x - 6, 86, "#ffd27a");
    } else if (A.st !== "gone" || true) spriteRot(ARL_ROWS, ARL_PAL, A.x + 6, Math.round(fallY(120, A.p)), fallAng(A.p), true);
    if (A.st === "taken" && gameState.clock * 12 % 2 < 1) R(A.x - 2, 108, 22, 14, "rgba(150,220,255,.35)");
  }
}
function drawW2() {
  carShell([30, 110, 190, 270, 350], "#13101b");
  bench(20, 100);
  bench(160, 240);
  for (const cx of [120, 250]) {
    R(cx, 96, 30, 32, "#5a4028");
    R(cx, 96, 30, 1, "#7a5a38");
    R(cx, 108, 30, 1, "#3a2818");
    R(cx + 2, 98, 1, 28, "#3a2818");
    R(cx + 27, 98, 1, 28, "#3a2818");
    R(cx + 4, 84, 22, 12, "#6a4a30");
    R(cx + 4, 84, 22, 1, "#8a6a40");
  }
  R(300, 50, 32, 24, "#3a3f5a");
  R(302, 52, 28, 10, "#10131f");
  R(304, 54, 8, 1, gameState.clock % 1 < 0.5 ? "#ff3a3a" : "#5fe08a");
  R(304, 57, 14, 1, "#5fe08a");
  const ang = gameState.clock * 3;
  ctx.globalCompositeOperation = "lighter";
  for (let k = 0; k < 30; k++) {
    const a = ang + k * 0.02;
    R(210 + Math.cos(a) * k * 3, 16 + Math.abs(Math.sin(a)) * k * 2.4, 3, 3, `rgba(255,40,30,${0.05 * (1 - k / 30)})`);
  }
  ctx.globalCompositeOperation = "source-over";
  R(206, 10, 8, 6, "#5a1a1a");
  R(208, 12, 4, 3, gameState.clock * 3 % 1 < 0.5 ? "#ff3a2a" : "#8a1a1a");
  if (!state3.run.hatch) {
    R(382, 36, 30, 64, "#4a5060");
    R(383, 37, 28, 62, "#5a6070");
    R(396, 60, 4, 8, "#c9a530");
    text("MANUT", 384, 40, "#2a2e38");
  } else {
    R(386, 40, 24, 60, "#050407");
    R(388, 42, 20, 4, "#2a2a2a");
    for (let y = 48; y < 98; y += 8) R(390, y, 16, 1, "#3a3a3a");
    R(352, 36, 30, 64, "#4a5060");
    text("MANUT", 354, 40, "#2a2e38");
  }
  R(300, 116, 26, 12, "#6a3a8a");
  R(300, 116, 26, 1, "#8a5aaa");
  R(304, 112, 12, 4, "#2a5a7a");
  creepyWall(gameState.worldWidth, 0);
}
/* ---------- porta do corredor arrombada pelo fantasma ---------- */
function doorKnock() {
  const ac = gameState.audioCtx;
  if (!ac) return;
  noiseHit(ac, ac.destination, ac.currentTime, 0.2, 0.6, 30, 380);
  tone(ac, ac.destination, "sine", 72, ac.currentTime, 0.28, 0.5, 0.003);
}
function doorCrash() {
  const ac = gameState.audioCtx;
  if (!ac) return;
  const t0 = ac.currentTime;
  noiseHit(ac, ac.destination, t0, 0.5, 0.8, 40, 2500);
  tone(ac, ac.destination, "sine", 60, t0, 0.45, 0.6, 0.003);
  for (let k = 0; k < 6; k++) noiseHit(ac, ac.destination, t0 + 0.05 + Math.random() * 0.4, 0.04, 0.3, 1200, 6000);
  tone(ac, ac.destination, "triangle", 1900, t0 + 0.08, 0.35, 0.08, 0.002);
}
function drawCorrDoor() {
  const r3 = state3.run;
  if (!r3.doorBroken) {
    const sh = r3.doorShake > 0 ? Math.round(Math.sin(gameState.clock * 80) * 1.5) : 0;
    R(0, 22, 18, 78, "#1a1814");
    R(2 + sh, 24, 14, 76, "#4a4a52"); R(2 + sh, 24, 14, 1, "#6a6a72");
    R(5 + sh, 34, 8, 10, "#2a2a30"); R(13 + sh, 62, 2, 5, "#c9a530");
    for (let y = 50; y < 98; y += 12) R(3 + sh, y, 12, 1, "#3a3a42");
    if (r3.doorShake > 0) for (let k = 0; k < 4; k++) R(16 + Math.random() * 6, 30 + Math.random() * 60, 1, 1, "#8a8070");
  } else {
    R(0, 22, 3, 78, "#1a1814"); R(15, 22, 3, 78, "#1a1814");
    R(3, 24, 12, 76, "#0a0908");
    ctx.save(); ctx.translate(30, 124); ctx.rotate(-0.12); R(-14, -3, 28, 5, "#4a4a52"); R(-14, -3, 28, 1, "#6a6a72"); R(-8, -2, 2, 3, "#2a2a30"); ctx.restore();
    for (const d of r3.debris || []) {
      if (d.t < 2) { d.t += 1 / 60; d.vy += 140 / 60; d.x += d.vx / 60; d.y = Math.min(127, d.y + d.vy / 60); if (d.y >= 127) { d.vx *= 0.8; d.vy = 0; } }
      R(d.x, d.y, d.s, d.s * 0.6, "#5a5a62");
    }
  }
}
function drawCorr() {
  const Wd = gameState.worldWidth;
  R(0, 0, Wd, 100, "#26221c");
  for (let y = 10; y < 100; y += 12) {
    R(0, y, Wd, 1, "#1e1a15");
  }
  for (let x = 0; x < Wd; x += 34) R(x, 0, 1, 100, "#1e1a15");
  drawCorrDoor();
  R(0, 14, Wd, 4, "#4a3e30");
  R(0, 22, Wd, 2, "#3a3026");
  for (let x = 20; x < Wd; x += 90) {
    R(x, 40, 30, 14, "#c9a530");
    text("42", x + 8, 44, "#15121c");
  }
  for (let x = 60; x < Wd; x += 120) {
    R(x, 28, 5, 4, "#3a1a1a");
    R(x + 1, 29, 3, 2, Math.sin(gameState.clock * 4 + x) > -0.5 ? "#ff3a2a" : "#5a1a1a");
  }
  R(0, 100, Wd, 44, "#3a3020");
  for (let x = 0; x < Wd; x += 9) R(x, 110 + x * 7 % 14, 5, 2, "#6a5a22");
  R(0, 100, Wd, 2, "#5a4a2a");
  for (const o of OBST) {
    if (o.k === "low") {
      R(o.x - 4, 128 - 10, 6, 10, "#4a4038");
      R(o.x + o.w - 2, 128 - 14, 6, 14, "#4a4038");
      for (let k = 0; k < 10; k++) R(o.x + k * (o.w / 10), 92 + k * 0.6, o.w / 10 + 1, 9, "#6a6a72");
      R(o.x, 92, o.w, 1, "#8a8a94");
      R(o.x + 4, 94, 2, 5, "#3a3a42");
      R(o.x + o.w - 6, 97, 2, 5, "#3a3a42");
      const near = (o.x - P.x) * 1 > 6 && o.x - P.x < 46, crouching = state3.run.crouch || state3.run.crouchHold;
      if ((near && !crouching && gameState.clock * 3 % 1 < 0.7) || state3.run.blockT > 0) {
        text("AGACHE", o.x - 8, 80, "#ffd27a");
        R(o.x - 1, 87, 5, 1, "#ffd27a"); R(o.x, 88, 3, 1, "#ffd27a"); R(o.x + 1, 89, 1, 1, "#ffd27a");
      }
    } else if (o.k === "steam") {
      R(o.x, 124, o.w, 4, "#5a5a62");
      R(o.x + 5, 118, 6, 6, "#7a7a82");
      if (steamOn(o)) for (let k = 0; k < 10; k++) {
        const p = (gameState.clock * 2 + k * 0.1) % 1;
        R(o.x + 2 + Math.sin(p * 9 + k) * 4, 122 - p * 44, 4 + p * 4, 4 + p * 4, `rgba(230,230,240,${0.6 * (1 - p)})`);
      }
      else if (gameState.clock * 4 % 1 < 0.3) R(o.x + 7, 115, 2, 2, "rgba(230,230,240,.5)");
    } else {
      R(o.x + 6, 10, 2, 30, "#2a2a2a");
      if (steamOn(o)) {
        let y = 40, x = o.x + 7;
        for (let k = 0; k < 8; k++) {
          const nx = o.x + 3 + Math.random() * o.w * 0.7, ny = y + 11;
          line(x | 0, y, nx | 0, ny, "#9fe0ff");
          x = nx;
          y = ny;
        }
        R(o.x, 124, o.w, 4, "rgba(160,230,255,.6)");
      } else if (gameState.clock * 5 % 1 < 0.2) R(o.x + 6, 40, 3, 3, "#bff3ff");
    }
  }
  R(736, 24, 22, 76, "#3a3a42");
  R(738, 26, 18, 72, "#4a4a52");
  R(752, 60, 3, 6, "#c9a530");
  R(736, 98, 22, 2, "rgba(95,224,255,.7)");
}
function drawRoom() {
  R(0, 0, gameState.worldWidth, 100, "#12121a");
  R(0, 100, gameState.worldWidth, 44, "#1a1a22");
  R(30, 30, 60, 40, "#2a2a2e");
  R(32, 32, 56, 36, "#d9cdb0");
  btext("42", 48, 40, "#7a1a1a", 2);
  line(36, 36, 80, 60, "#b33a2e");
  line(40, 62, 84, 38, "#b33a2e");
  for (const [x, y] of [[40, 40], [70, 44], [60, 58]]) R(x, y, 4, 4, "#e9e4f8");
  for (let k = 0; k < 3; k++) {
    R(130 + k * 34, 34, 30, 22, "#0a0c12");
    R(132 + k * 34, 36, 26, 18, k === 1 ? "#0f2a2a" : "#10141c");
    if (k === 1) {
      ctx.globalAlpha = 0.6;
      for (let r = 0; r < GHOST.length; r += 2) R(140 + k * 34 - 34 + 34, 38 + r * 0.7, 8, 1, "#9fe0ff");
      ctx.globalAlpha = 1;
    } else for (let r = 0; r < 4; r++) R(134 + k * 34, 38 + r * 4, (r * 7 + k * 5) % 20 + 4, 1, "#2a9a5a");
  }
  R(120, 80, 120, 8, "#3a3026");
  R(124, 88, 4, 40, "#2a2018");
  R(232, 88, 4, 40, "#2a2018");
  R(200, 72, 18, 6, "#5a5a62");
  R(198, 70, 4, 2, "#3a3a3a");
  R(216, 70, 4, 2, "#3a3a3a");
  for (let k = 0; k < 4; k++) line(150 + k * 20, 88, 160 + k * 16, 128, "#1e1e24");
  sprite(ENG_SIT, ENG_PAL, 170, 74, true);
  R(166, 88, 8, 5, "#2a2a34");
  R(167, 89, 6, 3, gameState.clock % 0.5 < 0.25 ? "#5fe0ff" : "#3fc0e0");
  ctx.globalCompositeOperation = "lighter";
  for (let r = 0; r < 12; r++) R(166 - r * 0.3, 76 + r, 12 + r * 0.6, 1, `rgba(95,224,255,${0.18 - r * 0.012})`);
  ctx.globalCompositeOperation = "source-over";
}
function drawCase3() {
  if (!state3.run) return;
  if (state3.run.sec === "w1") drawW1();
  else if (state3.run.sec === "w2") drawW2();
  else if (state3.run.sec === "corr") drawCorr();
  else drawRoom();
  const G = state3.run.G;
  if (G.on && G.sec === state3.run.sec && state3.run.js <= 0) drawGhostSprite(Math.round(G.x) - 7, 124, 0.55 + 0.25 * Math.sin(gameState.clock * 9), G.st === "chase" || state3.run.sec === "corr");
  if (G.on && G.sec === state3.run.sec && G.alert > 0) R(Math.round(G.x) - 2, 90, 4, 8, "#ff2a2a");
}
function c3Doors() {
  const y = "#e8b04a", g = "#3fb36b";
  if (state3.run.sec === "w1") {
    c1Door(0, "SAIDA", state3.run.phase === "escape" && gameState.clock * 4 % 2 < 1 ? "#ff6a4a" : g, false);
    c1Door(gameState.worldWidth - 16, "VAGAO 2", state3.run.phase === "pre" ? "#5a5a62" : y, true);
  } else if (state3.run.sec === "w2") c1Door(0, "VAGAO 1", y, false);
}
/** Viga redesenhada na frente do detetive enquanto ele passa por baixo, com poeira caindo. */
function drawLowFront() {
  if (state3.run.sec !== "corr") return;
  for (const o of OBST) {
    if (o.k !== "low" || P.x < o.x - 6 || P.x > o.x + o.w + 4) continue;
    for (let k = 0; k < 10; k++) R(o.x + k * (o.w / 10), 92 + k * 0.6, o.w / 10 + 1, 9, "#6a6a72");
    R(o.x, 92, o.w, 1, "#8a8a94");
    R(o.x, 100.5, o.w, 1.2, "rgba(0,0,0,.35)");
    const c = gameState.clock;
    for (let k = 0; k < 4; k++) { const p = (c * 1.6 + k / 4) % 1; R(o.x + 3 + (k * 7) % (o.w - 4), 102 + p * 18, 0.8, 0.8, `rgba(200,190,160,${0.7 * (1 - p)})`); }
    txt("PASSANDO POR BAIXO", Math.round(P.x) - 22, 86, "#ffd27a", 3.2);
  }
}
function drawC3Front() {
  drawLowFront();
  if (state3.run.hidden) {
    const z = state3.run.hidden, ex = Math.round(P.x) - 2;
    if (z.k === "bench") {
      R(ex - 4, 97, 14, 3, "#05040a");
      if (gameState.clock * 0.6 % 3 > 0.15) {
        R(ex, 98, 1, 1, "#e9f0ff");
        R(ex + 3, 98, 1, 1, "#e9f0ff");
      }
    } else {
      if (gameState.clock * 0.6 % 3 > 0.15) {
        R(z.x1 - 1, 88, 1, 1, "#e9f0ff");
        R(z.x1 - 1, 86, 3, 1, "#2a2436");
      }
    }
  }
}
/** Placa luminosa de passagem sobre as portas entre vagões, desenhada por cima da escuridão. */
function drawC3DoorSigns(c) {
  const r = state3.run, Wd = gameState.worldWidth, t = gameState.clock;
  if (r.sec !== "w1" && r.sec !== "w2") return;
  const MAN = ["...XX.", "...XX.", ".XXXX.", "X.XX.X", "..XXX.", ".X..X.", "X....X"];
  const sign = (x, label, color, arrowDir) => {
    const red = color.indexOf("232,120") >= 0;
    const sx = x - c, w = label.length * 2.7 + 16, hh = 11, bx = sx - w / 2 + (x < 40 ? w / 2 - 4 : -(w / 2 - 4)), by = 25;
    if (bx > W || bx + w < 0) return;
    // falha de energia: a placa pisca e às vezes apaga, como uma lâmpada velha
    const n = Math.sin(t * 37 + x) * Math.sin(t * 11.3 + x * 0.7);
    const lit = n < 0.82 && !(t % 5.3 < 0.12), dim = n > 0.6 ? 0.55 : 1;
    const panel = red ? (lit ? "#8a2420" : "#2a0c0a") : (lit ? "#1c8a3e" : "#0a2412");
    const ink = red ? "#ffd8cc" : "#dcffe4";
    if (lit) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(bx + w / 2, by + hh / 2, 2, bx + w / 2, by + hh / 2, 30);
      g.addColorStop(0, red ? `rgba(255,80,60,${0.3 * dim})` : `rgba(70,255,120,${0.3 * dim})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fillRect(bx - 24, by - 20, w + 48, hh + 46);
      ctx.restore();
    }
    R(bx - 1.2, by - 1.2, w + 2.4, hh + 2.4, "#121212");
    R(bx, by, w, hh, panel);
    R(bx, by, w, 0.6, lit ? (red ? "#c84a40" : "#3ec26a") : "#14301c");
    ctx.save(); ctx.globalAlpha = lit ? dim : 0.35;
    for (let r2 = 0; r2 < MAN.length; r2++) for (let k = 0; k < 6; k++) if (MAN[r2][k] === "X") R(bx + 2.5 + k * 0.9, by + 1.8 + r2 * 1.05, 0.9, 1.05, ink);
    txt(label, bx + 10 + (w - 10) / 2, by + 8, ink, 4.6, "center");
    ctx.restore();
    for (let yy = 0; yy < hh; yy += 1.2) R(bx, by + yy, w, 0.35, "rgba(0,0,0,.18)");
    for (const [px, py] of [[0, 0], [w - 1, 0], [0, hh - 1], [w - 1, hh - 1]]) R(bx + px, by + py, 1, 1, "#2a2a2a");
    if (arrowDir && r.phase === "hunt") for (let k = 0; k < 3; k++) {
      const ph = (t * 1.6 + k / 3) % 1, ax = x - c - arrowDir * (34 - ph * 22);
      txt(arrowDir > 0 ? ">" : "<", ax, 127, `rgba(90,240,140,${0.25 + 0.6 * (1 - ph)})`, 6, "center");
    }
  };
  if (r.sec === "w1") {
    if (r.phase === "pre") sign(Wd - 10, "VAGÃO 2 · EMPERRADA", "rgba(232,120,90,1)", 0);
    else sign(Wd - 10, "VAGÃO 2  >", "rgba(110,240,150,1)", 1);
    sign(10, "SAÍDA", "rgba(110,240,150,1)", 0);
  } else sign(10, "<  VAGÃO 1", "rgba(110,240,150,1)", -1);
}
function c3Fx() {
  const c = Math.round(gameState.cameraX * 4) / 4;
  tm.globalCompositeOperation = "source-over";
  tm.clearRect(0, 0, W, H);
  let a = state3.run.sec === "room" ? 0.9 : gameState.glassesOn ? 0.6 : 0.78;
  if (state3.run.flk > 0 && Math.sin(gameState.clock * 50) > 0) a = 0.96;
  tm.fillStyle = `rgba(2,2,8,${a})`;
  tm.fillRect(0, 0, W, H);
  tm.globalCompositeOperation = "destination-out";
  if (!state3.run.hidden) {
    const px = P.x - c, py = state3.run.sec === "corr" && (state3.run.crouch || state3.run.crouchHold) ? 116 : 108;
    tHole(px, py, 40, 0.35);
    tHole(px, py, 28, 0.6);
    tHole(px, py, 18, 0.85);
  } else {
    tHole(P.x - c, 104, 16, 0.4);
  }
  for (const [lx, on] of c3Lamps()) if (on) {
    tHole(lx - c + 15, 30, 34, 0.35);
    tHole(lx - c + 15, 30, 20, 0.6);
  }
  // as portas entre vagões ficam iluminadas, para não se perderem no escuro
  if (state3.run.sec === "w1") { tHole(gameState.worldWidth - 8 - c, 58, 30, 0.55); tHole(8 - c, 58, 22, 0.4); }
  if (state3.run.sec === "w2") tHole(8 - c, 58, 30, 0.55);
  if (state3.run.sec === "corr") for (let x = 60; x < gameState.worldWidth; x += 120) tHole(x + 2 - c, 30, 20, 0.4);
  if (state3.run.sec === "corr") tHole(746 - c, 96, 20, 0.5);
  if (state3.run.sec === "room") {
    tHole(170 - c, 82, 22, 0.75);
    tHole(166 - c, 46, 40, 0.35);
  }
  const G = state3.run.G;
  if (G.on && G.sec === state3.run.sec) tHole(G.x - c, 108, 16, 0.25);
  if (state3.run.phase === "escape") tHole(state3.run.arl.x + 6 - c, 108, 20, 0.4);
  ctx.drawImage(TMASK, 0, 0);
  drawC3DoorSigns(c);
  if (G.on && G.sec === state3.run.sec && state3.run.phase !== "room") {
    const d = Math.max(0, 1 - Math.abs(G.x - P.x) / 180);
    if (d > 0) {
      const p = 0.25 * d * (0.6 + 0.4 * Math.sin(gameState.clock * 8));
      R(0, 0, W, 6, `rgba(120,0,0,${p})`);
      R(0, H - 6, W, 6, `rgba(120,0,0,${p})`);
      R(0, 0, 6, H, `rgba(120,0,0,${p})`);
      R(W - 6, 0, 6, H, `rgba(120,0,0,${p})`);
    }
  }
  if (state3.run.phase === "hunt" && !gameState.dialogLine && !gameState.choiceOpen) {
    const z = hideZone();
    if (state3.run.hidden) text("ESCONDIDO", W / 2 - 18, H - 10, "#7fd6a0");
    else if (z && G.sec === state3.run.sec) text("ESPACO: ESCONDER", W / 2 - 32, H - 10, "#9aa0c8");
    if (state3.run.tooLate > 0) { state3.run.tooLate -= 1 / 60; txt("TARDE DEMAIS PARA SE ESCONDER!", W / 2, H - 18, "#ff6a6a", 5, "center"); }
  }
  if (state3.run.sec === "corr" && !gameState.dialogLine) text(state3.run.crouch || state3.run.crouchHold ? "AGACHADO" : "CORRENDO", 4, 13, state3.run.crouch || state3.run.crouchHold ? "#ffd27a" : "#7fd6a0");
  if (state3.run.js > 0) {
    const k = 1 - state3.run.js;
    R(0, 0, W, H, "#000");
    const s = Math.round(9 + k * 5), fx = 128 - 7 * s + Math.round((Math.random() - 0.5) * 6), fy = 72 - 6 * s + Math.round((Math.random() - 0.5) * 6);
    for (let r = 0; r < 12; r++) for (let i = 0; i < 14; i++) {
      const ch = GHOST[r][i];
      if (ch === ".") continue;
      R(fx + i * s, fy + r * s, s, s, ch === "w" ? "#e9f0ff" : ch === "r" ? "#ff1a1a" : "#000");
    }
    if (state3.run.js > 0.85) R(0, 0, W, H, "rgba(255,255,255,.7)");
  }
}
