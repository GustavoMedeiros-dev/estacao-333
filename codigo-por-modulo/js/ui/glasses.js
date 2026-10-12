// js/ui/glasses.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var gTold = false;
function toggleGlasses() {
  if (gameState.mode !== "play" || gameState.cutscene >= 0 || gameState.choiceOpen || gameState.inputLocked) return;
  gameState.glassesOn = !gameState.glassesOn;
  if (gameState.glassesOn) visionStart = gameState.clock;
  gameState.scanProgress = gameState.glassesOn ? 1 : 0;
  gbtn.classList.toggle("on", gameState.glassesOn);
  if (gameState.glassesOn && !gTold && !gameState.dialogLine) {
    gTold = true;
    say([["Óculos", "Modo detetive ativo. Siga a luz azul que corre pelas pegadas: ela aponta o caminho."], ["Óculos", "Eu mostro a região do sinal, não o objeto. Toque em algo para que eu analise: pista, objeto comum ou pessoa."]]);
  }
}
var lastTarget = null;
function trailTarget() {
  if (!gameState.hotspots._order) gameState.hotspots._order = [];
  const novas = gameState.hotspots.filter((h2) => h2.clue && !gameState.hotspots._order.includes(h2));
  for (let i = novas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novas[i], novas[j]] = [novas[j], novas[i]];
  }
  gameState.hotspots._order = gameState.hotspots._order.concat(novas);
  const h = gameState.hotspots._order.find((c) => c.n === 0) || null;
  if (h !== lastTarget) {
    if (lastTarget && h && gameState.glassesOn) gameState.scanProgress = 0.6;
    lastTarget = h;
  }
  return h;
}
var CLUE_ART = {
  // CASO 1
  "Estojo do violino": (x, y) => {
    R(x, y + 1, 26, 4, "#3e1e10");
    R(x + 1, y + 2, 24, 2, "#5a2e1a");
    R(x, y + 5, 26, 8, "#5a2e1a");
    R(x + 1, y + 5, 24, 5, "#8a2a3a");
    R(x + 3, y + 6, 7, 3, "#4e1420");
    R(x + 10, y + 7, 3, 1, "#4e1420");
    R(x + 13, y + 6, 6, 3, "#4e1420");
    R(x + 19, y + 7, 6, 1, "#4e1420");
    R(x + 2, y + 10, 2, 2, "#e8b04a");
    R(x + 22, y + 10, 2, 2, "#e8b04a");
    R(x, y + 12, 26, 1, "#2a140a");
  },
  "Bilhete de metrô": (x, y) => {
    R(x + 1, y + 5, 15, 7, "rgba(0,0,0,.35)");
    R(x, y + 4, 14, 7, "#f1e6c8");
    R(x, y + 4, 14, 2, "#b33a2e");
    R(x + 2, y + 8, 1, 1, "#2a2233");
    R(x + 4, y + 8, 1, 1, "#2a2233");
    R(x + 7, y + 7, 5, 1, "#8a806a");
    R(x + 9, y + 8, 4, 2, "#7a4f8a");
  },
  "Pôster do concerto": (x, y) => {
    R(x + 2, y + 2, 16, 7, "#e9dfc2");
    R(x + 2, y + 2, 16, 2, "#b33a2e");
    R(x + 7, y + 5, 3, 3, "#15121c");
    R(x + 10, y + 6, 4, 1, "#15121c");
    for (let k = 0; k < 7; k++) R(x + 18, y + 2 + k, 1, 1, k % 2 ? "#e9dfc2" : "rgba(0,0,0,0)");
    R(x + 21, y + 3, 15, 6, "#e9dfc2");
    R(x + 21, y + 3, 15, 1, "#b33a2e");
    for (let k = 0; k < 6; k++) R(x + 21, y + 3 + k, 1, 1, k % 2 ? "#352f4a" : "#e9dfc2");
    R(x + 24, y + 5, 9, 1, "#8a806a");
    R(x + 24, y + 7, 6, 1, "#8a806a");
  },
  "Luz de emergência": (x, y) => {
    R(x, y + 2, 26, 4, "#3a3550");
    R(x + 2, y + 6, 22, 2, "#1b1726");
    R(x + 3, y + 8, 3, 3, "#b33a2e");
    R(x + 8, y + 8, 2, 4, "#8a2a2a");
    R(x + 15, y + 8, 3, 2, "#b33a2e");
    R(x + 20, y + 8, 2, 3, "#8a2a2a");
    R(x + 12, y + 8, 1, 5, "#2a2233");
    if (gameState.clock * 7 % 2 < 0.25) {
      R(x + 11, y + 13, 3, 1, "#fff1b8");
      R(x + 12, y + 12, 1, 3, "#5fe0ff");
    }
  },
  "Painel da porta": (x, y) => {
    R(x + 1, y + 1, 16, 24, "#4a4268");
    R(x + 2, y + 2, 14, 22, "#5c5380");
    for (let k = 0; k < 12; k += 2) R(x + 3 + k, y + 4, 1, 2, "#15121c");
    for (let k = 1; k < 12; k += 2) R(x + 3 + k, y + 4, 1, 2, "#e8b04a");
    R(x + 8, y + 9, 2, 4, "#3a3550");
    R(x + 7, y + 13, 4, 7, "#b33a2e");
    R(x + 6, y + 19, 6, 2, "#d9483a");
    line(x + 3, y + 10, x + 6, y + 15, "#e9e4f8");
    line(x + 12, y + 9, x + 15, y + 14, "#e9e4f8");
    line(x + 4, y + 17, x + 6, y + 21, "#e9e4f8");
    R(x + 13, y + 21, 2, 2, gameState.clock % 1 < 0.5 ? "#ff3a3a" : "#5a1a1a");
  },
  "Mancha na janela": (x, y) => {
    const c = "#0b0907";
    R(x + 3, y + 7, 6, 6, c);
    R(x + 3, y + 3, 1, 4, c);
    R(x + 5, y + 2, 1, 5, c);
    R(x + 7, y + 3, 1, 4, c);
    R(x + 9, y + 5, 1, 3, c);
    R(x + 2, y + 9, 1, 3, c);
    R(x + 5, y + 13, 1, 5, c);
    R(x + 8, y + 13, 1, 3, c);
    R(x + 4, y + 8, 1, 1, "#5a5040");
    R(x + 6, y + 4, 1, 1, "#5a5040");
  },
  // CASO 2
  "Maleta cortada": (x, y) => {
    R(x + 9, y + 1, 8, 1, "#3a2418");
    R(x + 9, y + 1, 1, 3, "#3a2418");
    R(x + 16, y + 1, 1, 3, "#3a2418");
    R(x + 1, y + 4, 24, 11, "#6b4430");
    R(x + 1, y + 4, 24, 1, "#8a5a40");
    R(x + 1, y + 14, 24, 1, "#3a2418");
    R(x + 3, y + 6, 2, 2, "#e8b04a");
    R(x + 21, y + 6, 2, 2, "#e8b04a");
    line(x + 5, y + 13, x + 20, y + 6, "#1b1210");
    line(x + 6, y + 13, x + 21, y + 6, "#f1e6c8");
    R(x + 12, y + 8, 3, 2, "#f1e6c8");
  },
  "Frasco de remédio vazio": (x, y) => {
    R(x, y + 4, 8, 5, "#d9822e");
    R(x, y + 4, 8, 1, "#f0a050");
    R(x + 8, y + 3, 2, 7, "#f1e6c8");
    R(x + 2, y + 5, 4, 3, "#f1e6c8");
    R(x + 3, y + 6, 2, 1, "#b33a2e");
  },
  "Perfurador de bilhetes": (x, y) => {
    R(x + 1, y + 3, 10, 2, "#9aa0b4");
    R(x + 1, y + 6, 10, 2, "#7a8094");
    R(x + 9, y + 2, 2, 7, "#c0c6d8");
    R(x + 1, y + 2, 3, 2, "#b33a2e");
    R(x + 1, y + 6, 3, 2, "#b33a2e");
    R(x + 10, y + 4, 1, 1, "#15121c");
  },
  "Câmera de segurança": (x, y) => {
    R(x + 7, y, 3, 4, "#2a2a34");
    R(x + 2, y + 4, 13, 6, "#3a3a48");
    R(x + 2, y + 4, 13, 1, "#5a5a6a");
    R(x + 12, y + 5, 6, 6, "#e86aa0");
    R(x + 13, y + 6, 2, 1, "#ffb0d0");
    R(x + 14, y + 11, 2, 2, "#e86aa0");
    R(x + 3, y + 6, 1, 1, gameState.clock % 1 < 0.5 ? "#ff3a3a" : "#5a1a1a");
  },
  "Relógio do entregador": (x, y) => {
    R(x + 5, y, 2, 12, "#2a2a2a");
    disc(x + 6, y + 6, 4, "#c0c0c8");
    disc(x + 6, y + 6, 3, "#f1e6c8");
    R(x + 6, y + 4, 1, 3, "#15121c");
    R(x + 6, y + 6, 2, 1, "#15121c");
    line(x + 3, y + 4, x + 9, y + 8, "#7a8094");
  },
  "Grade de ventilação": (x, y) => {
    R(x, y, 22, 16, "#2a2a34");
    for (let k = 2; k < 15; k += 3) R(x + 2, y + k, 18, 1, "#4a4a58");
    R(x + 1, y + 1, 2, 2, "#c0c0c8");
    R(x + 19, y + 1, 2, 2, "#c0c0c8");
    R(x + 1, y + 13, 2, 2, "#c0c0c8");
    R(x + 20, y + 16, 2, 2, "#c0c0c8");
    line(x + 3, y + 3, x + 8, y + 9, "#e9e4f8");
    line(x + 14, y + 12, x + 19, y + 7, "#e9e4f8");
  },
  "Garrafa térmica": (x, y) => {
    R(x + 3, y, 6, 3, "#2a2a34");
    R(x + 2, y + 3, 8, 13, "#b33a2e");
    R(x + 2, y + 3, 8, 1, "#d9483a");
    R(x + 3, y + 7, 6, 4, "#c0c0c8");
    R(x + 4, y + 7, 1, 4, "#f1f1f8");
    if (gameState.clock * 1.5 % 3 < 0.3) R(x + 8, y + 4, 1, 1, "#ffffff");
  },
  // CASO 3
  "Bilhete enigmático": (x, y) => {
    R(x + 1, y + 2, 12, 9, "#d9c48a");
    R(x + 1, y + 2, 12, 1, "#b8a46a");
    R(x + 7, y + 2, 1, 9, "#c4ae74");
    for (let k = 0; k < 3; k++) {
      R(x + 2, y + 4 + k * 2, 4, 1, "#4a3a8a");
      R(x + 9, y + 4 + k * 2, 3, 1, "#4a3a8a");
    }
    R(x + 2, y + 9, 2, 1, "#b33a2e");
  },
  "Crachá antigo": (x, y) => {
    line(x + 7, y, x + 2, y + 3, "#3a6aaa");
    line(x + 7, y, x + 12, y + 3, "#3a6aaa");
    R(x + 2, y + 3, 11, 8, "#e9e4f8");
    R(x + 3, y + 4, 4, 4, "#8a8090");
    R(x + 4, y + 5, 2, 2, "#c99670");
    R(x + 8, y + 5, 4, 1, "#5a5a6a");
    R(x + 2, y + 9, 11, 2, "#b33a2e");
  },
  "Celular da vítima": (x, y) => {
    R(x + 1, y + 2, 12, 7, "#15121c");
    R(x + 2, y + 3, 10, 5, "#0b0a12");
    line(x + 3, y + 3, x + 7, y + 6, "#c9d4e4");
    line(x + 7, y + 6, x + 11, y + 4, "#c9d4e4");
    line(x + 7, y + 6, x + 8, y + 8, "#c9d4e4");
  },
  "USB no painel": (x, y) => {
    R(x + 14, y + 10, 5, 3, "#c0c0c8");
    R(x + 19, y + 9, 8, 5, "#2a6aca");
    R(x + 19, y + 9, 8, 1, "#5a9aea");
    R(x + 25, y + 11, 1, 1, gameState.clock % 0.6 < 0.3 ? "#5fe08a" : "#ff3a3a");
  },
  "Pegadas de bota": (x, y) => {
    for (let k = 0; k < 5; k++) {
      const px = x + 2 + k * 11, py = y + (k % 2 ? 7 : 2);
      R(px, py, 5, 3, "#c9a530");
      R(px + 6, py, 2, 3, "#c9a530");
      R(px + 1, py + 1, 3, 1, "#a8862a");
      R(px + 5, py + 3, 1, 1, "#d9b840");
    }
  },
  "Lâmpada do teto": (x, y) => {
    R(x + 8, y, 6, 4, "#3a3550");
    R(x + 9, y + 4, 4, 2, "#8a8aa0");
    const on = Math.sin(gameState.clock * 19) > 0.2 || Math.sin(gameState.clock * 3) > 0.7;
    R(x + 12, y + 6, 5, 5, on ? "#fff1b8" : "#6a5a3a");
    R(x + 15, y + 10, 3, 3, on ? "#fff1b8" : "#6a5a3a");
  },
  "Cheiro de ozônio": (x, y) => {
    const ph = gameState.clock * 3 % 1;
    for (let k = 0; k < 3; k++) {
      const bx = x + 3 + k * 7, by = y + 4 + (k * 5 + (gameState.clock * 4 | 0)) % 9;
      line(bx, by, bx + 2, by + 2, "#9fe0ff");
      line(bx + 2, by + 2, bx, by + 4, "#9fe0ff");
    }
    if (ph < 0.15) {
      R(x + 10, y + 8, 1, 1, "#ffffff");
      R(x + 9, y + 9, 3, 1, "#bff3ff");
    }
  }
};
function glint(x, y, ph) {
  const p = (gameState.clock + ph) % 3.2;
  if (p > 0.45) return;
  const a = 1 - Math.abs(p - 0.22) / 0.23;
  R(x, y, 1, 1, `rgba(255,255,255,${a})`);
  R(x - 1, y, 1, 1, `rgba(255,250,220,${a * 0.7})`);
  R(x + 1, y, 1, 1, `rgba(255,250,220,${a * 0.7})`);
  R(x, y - 1, 1, 1, `rgba(255,250,220,${a * 0.7})`);
  R(x, y + 1, 1, 1, `rgba(255,250,220,${a * 0.7})`);
  if (a > 0.6) {
    R(x - 2, y, 1, 1, `rgba(255,250,220,${a * 0.4})`);
    R(x + 2, y, 1, 1, `rgba(255,250,220,${a * 0.4})`);
    R(x, y - 2, 1, 1, `rgba(255,250,220,${a * 0.4})`);
    R(x, y + 2, 1, 1, `rgba(255,250,220,${a * 0.4})`);
  }
}
function drawClues() {
  for (const h of gameState.hotspots) {
    if (!h.clue) continue;
    const art = CLUE_ART[h.name];
    if (art) art(h.x, h.y);
    if (h.n === 0) glint(h.x + h.w - 2, h.y + 2, h.x * 0.37 % 3.2);
  }
}
var THOUGHTS = [
  "mapeando assinaturas térmicas",
  "comparando pegadas com o banco de dados",
  "calculando trajetória provável",
  "filtrando ruído do ambiente",
  "reconstruindo a rota recente",
  "buscando resíduos e fibras",
  "cruzando horários e movimentos",
  "analisando superfícies tocadas"
];
var CYAN = "95,224,255";
var visionStart = 0;
var trailT0 = 0;
var trailFrom = null;
var pendingLabel = null;
var fmt = (n, d = 1) => n.toFixed(d);
var hexId = (h) => "0x" + ((h.x * 31 + h.y * 17 + (h.w | 0) * 7 & 4095) + 256).toString(16).toUpperCase();
function kindOf(h) {
  if (h.clue) return "OBJETO";
  if (/^(Voltar|Vagão|Porta|Saída|Galeria|Cabine)/.test(h.name)) return "PASSAGEM";
  return h.y >= 66 && h.h >= 20 ? "PESSOA" : "OBJETO";
}
function brackets(x, y, w, h, len, a, lw = 0.6) {
  ctx.strokeStyle = `rgba(${CYAN},${a})`;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.moveTo(x + w, y + h - len);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w - len, y + h);
  ctx.moveTo(x + len, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + h - len);
  ctx.stroke();
}
function footprint(x, y, dir, a) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = `rgba(${CYAN},${a * 0.16})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, 4, 2.1, 0, 0, 6.2832);
  ctx.fill();
  ctx.fillStyle = `rgba(140,236,255,${Math.min(1, a * 1.1)})`;
  ctx.beginPath();
  ctx.ellipse(1.1, 0, 2.2, 1.05, 0, 0, 6.2832);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-1.9, 0, 1, 0.8, 0, 0, 6.2832);
  ctx.fill();
  ctx.fillStyle = `rgba(240,253,255,${a})`;
  ctx.beginPath();
  ctx.ellipse(1.6, 0, 1.1, 0.5, 0, 0, 6.2832);
  ctx.fill();
  ctx.restore();
}
function ring(x, y, rx, ry, a, lw = 0.5) {
  ctx.strokeStyle = `rgba(${CYAN},${a})`;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, 6.2832);
  ctx.stroke();
}
function drawVision() {
  const t = gameState.clock, c = Math.round(gameState.cameraX * K) / K, vt = t - visionStart;
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  R(c, 0, W, H, "#5878b8");
  ctx.globalCompositeOperation = "screen";
  R(c, 0, W, H, "rgba(10,50,100,.40)");
  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = `rgba(${CYAN},.16)`;
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  for (let k = 0; k < 9; k++) {
    const y = 101 + k * k * 0.62 + k * 1.2;
    ctx.moveTo(c, y);
    ctx.lineTo(c + W, y);
  }
  const vx = c + W / 2;
  for (let x = Math.floor(c / 14) * 14 - 14; x < c + W + 14; x += 14) {
    ctx.moveTo(x, 101);
    ctx.lineTo(vx + (x - vx) * 2.1, 144);
  }
  ctx.stroke();
  // a varredura passa uma vez só, quando os óculos são ligados
  const sweepT = vt * 85;
  if (sweepT < W + 48) {
    const sx = c - 24 + sweepT;
    const sg = ctx.createLinearGradient(sx - 22, 0, sx, 0);
    sg.addColorStop(0, `rgba(${CYAN},0)`);
    sg.addColorStop(1, `rgba(${CYAN},.26)`);
    ctx.fillStyle = sg;
    ctx.fillRect(sx - 22, 0, 22, H);
    R(sx, 0, 0.6, H, `rgba(190,248,255,.9)`);
  }
  if (vt < 1.8) for (let k = 0; k < 3; k++) {
    const ph = vt * 0.55 + k / 3;
    if (ph < 1) ring(P.x, 122, 8 + ph * 78, 2.4 + ph * 14, (1 - ph) * 0.5);
  }
  let nObj = 0, nPes = 0;
  const target = gameState.scene === "case" ? currentTarget() : null;
  for (const h of gameState.hotspots) {
    if (h.x + h.w < c - 4 || h.x > c + W + 4 || h.x < -100) continue;
    const kind = kindOf(h), reveal = vt > (h.x - c) / W * 1.3 + 0.1;
    if (kind === "PESSOA") nPes++;
    else if (kind === "OBJETO") nObj++;
    void reveal;
  }
  gameState._visionCount = [nObj, nPes];
  if (target) drawTrail(target, t);
  if (gameState.scene === "station") {
    const head = t * 11 % 28 - 2;
    for (let k = 0; k < 9; k++) footprintWave(540 - k * 11, 124 + k % 2 * 2, -1, Math.max(0, 1 - Math.abs(k - head) / 2.2));
    txt("RASTRO", 494, 111, `rgba(${CYAN},.9)`, 3.8);
  }
  drawObjScan(t);
  ctx.restore();
}
function currentTarget() {
  let h = trailTarget();
  if (!h && CASES[gameState.caseIndex].doorTarget) h = CASES[gameState.caseIndex].doorTarget();
  return h || null;
}
/** Pegada escura; quando a onda azul passa por ela, acende em azul. */
function footprintWave(x, y, dir, glow) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);
  ctx.fillStyle = "rgba(4,6,12,.82)";
  ctx.beginPath();
  ctx.ellipse(1.1, 0, 2.3, 1.1, 0, 0, 6.2832);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-1.9, 0, 1.05, 0.85, 0, 0, 6.2832);
  ctx.fill();
  if (glow > 0.02) {
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = `rgba(${CYAN},${glow * 0.22})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.2, 2.2, 0, 0, 6.2832);
    ctx.fill();
    ctx.fillStyle = `rgba(140,236,255,${glow})`;
    ctx.beginPath();
    ctx.ellipse(1.1, 0, 2.2, 1.05, 0, 0, 6.2832);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-1.9, 0, 1, 0.8, 0, 0, 6.2832);
    ctx.fill();
  }
  ctx.restore();
}
/** Centro da "região" de um alvo: perto do objeto, mas deslocado de propósito (não entrega o ponto exato). */
function regionOf(h) {
  if (h._region) return h._region;
  const seed = Math.abs(Math.sin(h.x * 12.9898 + h.y * 78.233) * 43758.5453) % 1;
  const cx = h.x + h.w / 2 + (seed - 0.5) * 36;
  return h._region = { cx, cy: Math.min(110, Math.max(30, h.y + h.h / 2 + (seed - 0.5) * 20)), r: 30 + seed * 10 };
}
function drawTrail(h, t) {
  if (h !== trailFrom) {
    trailFrom = h;
    trailT0 = t;
  }
  const isDoor = !h.clue, reg = regionOf(h);
  const tx = isDoor ? (h.wx !== void 0 ? h.wx : h.x + h.w / 2) : reg.cx;
  const dist = tx - P.x, dir = Math.sign(dist) || 1, lane = 126;
  const stopBefore = isDoor ? 6 : 16;
  // pegadas presas ao chão: posições fixas no mundo, contadas a partir do destino (não andam com o detetive)
  const spots = [];
  for (let k = 0; k < 80; k++) {
    const x = tx - dir * (stopBefore + k * 9);
    if ((x - P.x) * dir < 10) break;
    spots.push({ x, k });
  }
  const n = spots.length, shown = (t - trailT0) * 16;
  // a onda azul corre do lado do detetive em direção ao destino
  // velocidade e ritmo constantes: 11 pegadas por segundo, uma onda a cada ~2,5 s, perto ou longe
  // a onda é medida pela distância até o destino, então não acelera nem pula quando o detetive anda
  const WAVE_SPEED = 100, WAVE_GAP = 260;
  for (let i = 0; i < n; i++) {
    const s = spots[n - 1 - i];
    if (i > shown) break;
    const dToTarget = (tx - s.x) * dir;
    const ph = ((dToTarget + t * WAVE_SPEED) % WAVE_GAP + WAVE_GAP) % WAVE_GAP;
    const gap = Math.min(ph, WAVE_GAP - ph);
    footprintWave(s.x, lane + (s.k % 2 ? 1.5 : -1.5), dir, Math.max(0, 1 - gap / 22));
  }
  // região aproximada do alvo: uma névoa, sem marcar o objeto
  if (Math.abs(dist) < W) {
    const a = 0.10 + 0.05 * Math.sin(t * 2.2);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const g = ctx.createRadialGradient(reg.cx, reg.cy, 0, reg.cx, reg.cy, reg.r);
    g.addColorStop(0, `rgba(${CYAN},${a})`);
    g.addColorStop(1, `rgba(${CYAN},0)`);
    ctx.fillStyle = g;
    ctx.fillRect(reg.cx - reg.r, reg.cy - reg.r, reg.r * 2, reg.r * 2);
    ctx.restore();
    const label = isDoor ? "PASSAGEM" : "SINAL NA REGIÃO";
    const lw = label.length * 2.2 + 4, lx = Math.min(Math.max(reg.cx - lw / 2, 2), gameState.worldWidth - lw - 2);
    pendingLabel = { x: lx, y: Math.max(2, reg.cy - reg.r * 0.55 - 8), w: lw, label };
  }
}
/* ---------- análise de um objeto ao clicar com os óculos ---------- */
const PERSON_RE = /^(Dona|Seu|Professora|Policial|Condutor|Lívia|Júnior|Thiago|Kaique|Pedrinho|Cris|Marcos|Thalita|Wesley|Rafael|Lucas|Dois sujeitos|Clara|Engenheiro)/;
function scanWorthy(h) {
  if (/^(Voltar|Vagão|Porta|Saída|Galeria|Cabine|Trem da plataforma|Quadro de partidas|Assaltantes|Área)/.test(h.name)) return false;
  return gameState.mode === "play" && gameState.cutscene < 0 && !gameState.choiceOpen;
}
function verdictOf(h) {
  if (h.clue) return h.n === 0 ? [["Óculos", "Análise concluída: PISTA. Isso tem relação com o caso."]] : [["Óculos", "Pista já registrada na memória."]];
  if (h.name === "Pombo") return [["Óculos", "Análise concluída: um pombo. Sinais vitais normais. Ele também não viu nada."]];
  if (h.npc || PERSON_RE.test(h.name)) return [["Óculos", "Análise concluída: PESSOA. " + h.name.split(",")[0] + ". Sinais vitais estáveis."]];
  return [["Óculos", "Análise concluída: objeto comum. Não é uma pista."]];
}
function startObjScan(h, then) {
  gameState.objScan = { h, t0: gameState.clock, then };
  gameState.inputLocked = true;
}
function drawObjScan(t) {
  const s = gameState.objScan;
  if (!s) return;
  const h = s.h, p = Math.min(1, (t - s.t0) / 0.9);
  const grow = (1 - Math.min(1, p * 2.5)) * 6, x = h.x - 3 - grow, y = h.y - 3 - grow, w = h.w + 6 + grow * 2, hh = h.h + 6 + grow * 2;
  ctx.save();
  R(x, y, w, hh, `rgba(${CYAN},.07)`);
  ctx.strokeStyle = `rgba(${CYAN},.25)`;
  ctx.lineWidth = 0.25;
  ctx.beginPath();
  for (let gx = x + 3; gx < x + w; gx += 3) { ctx.moveTo(gx, y); ctx.lineTo(gx, y + hh); }
  for (let gy = y + 3; gy < y + hh; gy += 3) { ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); }
  ctx.stroke();
  const sy = y + hh * (p * 2 % 1);
  R(x, sy, w, 0.6, "rgba(190,248,255,.95)");
  brackets(x, y, w, hh, 3, 0.95, 0.8);
  txt("ANALISANDO " + Math.round(p * 100) + "%", x, y - 2, "#bff3ff", 3.4);
  ctx.restore();
  if (p >= 1) {
    gameState.objScan = null;
    gameState.inputLocked = false;
    say(verdictOf(h), s.then);
  }
}
function drawVisionHud() {
  const t = gameState.clock, vt = t - visionStart;
  ctx.save();
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.85);
  vg.addColorStop(0, `rgba(${CYAN},0)`);
  vg.addColorStop(1, `rgba(${CYAN},.22)`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
  const sy = vt * 34 - 10;
  if (sy < H + 10) {
    const g2 = ctx.createLinearGradient(0, sy - 10, 0, sy);
    g2.addColorStop(0, `rgba(${CYAN},0)`);
    g2.addColorStop(1, `rgba(${CYAN},.10)`);
    ctx.fillStyle = g2;
    ctx.fillRect(0, sy - 10, W, 10);
  }
  const cl = 9, m = 2.5;
  ctx.strokeStyle = `rgba(${CYAN},.9)`;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(m, m + cl);
  ctx.lineTo(m, m);
  ctx.lineTo(m + cl, m);
  ctx.moveTo(W - m - cl, m);
  ctx.lineTo(W - m, m);
  ctx.lineTo(W - m, m + cl);
  ctx.moveTo(W - m, H - m - cl);
  ctx.lineTo(W - m, H - m);
  ctx.lineTo(W - m - cl, H - m);
  ctx.moveTo(m + cl, H - m);
  ctx.lineTo(m, H - m);
  ctx.lineTo(m, H - m - cl);
  ctx.stroke();
  const px = W - 70, py = 22, pw = 66, ph = 50;
  R(px, py, pw, ph, "rgba(3,22,38,.70)");
  brackets(px, py, pw, ph, 2.6, 0.8, 0.4);
  const blink = Math.sin(t * 5) > 0;
  R(px + 2.5, py + 2.8, 1.6, 1.6, blink ? "#5fe0ff" : "#1a5a70");
  txt("MODO ANÁLISE", px + 6.5, py + 5.4, "#bff3ff", 3.8);
  const prog = Math.min(1, vt / 1.4), cyc = vt * 0.18 % 1;
  const status = vt < 1.4 ? "CALIBRANDO " + Math.round(prog * 100) + "%" : "VARREDURA CONCLUÍDA";
  txt(status, px + 2.5, py + 11, `rgba(${CYAN},.95)`, 3.3);
  R(px + 2.5, py + 12.4, pw - 5, 1.4, "rgba(95,224,255,.18)");
  R(px + 2.5, py + 12.4, (pw - 5) * (vt < 1.4 ? prog : 1), 1.4, "#5fe0ff");
  void cyc;
  const [no, np] = gameState._visionCount || [0, 0];
  txt("OBJETOS " + no + "  PESSOAS " + np, px + 2.5, py + 19, "#8fd8ec", 3.1);
  txt("TEMP " + fmt(21.4 + Math.sin(t * 0.4) * 0.6) + "°C  UMID " + Math.round(66 + Math.sin(t * 0.3) * 4) + "%", px + 2.5, py + 24, "#6fb6cc", 3);
  txt("CAMPO EM " + fmt(0.3 + Math.abs(Math.sin(t * 1.3)) * 0.12, 2) + " µT", px + 2.5, py + 29, "#6fb6cc", 3);
  for (let i = 0; i < 20; i++) {
    const hgt = 1.5 + (Math.sin(t * (3 + i % 5) + i * 1.7) * 0.5 + 0.5) * 8 * (0.4 + 0.6 * Math.abs(Math.sin(t * 0.7 + i)));
    R(px + 2.5 + i * 2.6, py + 40 - hgt, 1.6, hgt, `rgba(${CYAN},${0.35 + 0.4 * (hgt / 9.5)})`);
  }
  R(px + 2.5, py + 40.4, pw - 5, 0.4, "rgba(95,224,255,.6)");
  const idx = Math.floor(t / 2.2) % THOUGHTS.length, shown = Math.floor(t % 2.2 / 2.2 * (THOUGHTS[idx].length + 10));
  if (pendingLabel) {
    const L = pendingLabel, lx = L.x - Math.round(gameState.cameraX * K) / K;
    R(lx, L.y, L.w, 7, "rgba(4,26,44,.9)");
    brackets(lx, L.y, L.w, 7, 1.4, 0.95, 0.4);
    txt(L.label, lx + 2, L.y + 5.4, "#bff3ff", 4.4);
    pendingLabel = null;
  }
  txt("› " + THOUGHTS[idx].slice(0, shown) + (blink ? "_" : ""), px + 2.5, py + 47, "#bff3ff", 3.1);
  ctx.restore();
}
