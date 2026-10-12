// js/render/fx.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var DW = W * K;
var DH = H * K;
var canvasOf = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};
var smooth = (c) => {
  const x = c.getContext("2d");
  x.imageSmoothingEnabled = true;
  x.imageSmoothingQuality = "high";
  return x;
};
var BW = DW / 8;
var BH = DH / 8;
var bloomA = canvasOf(BW, BH);
var bloomB = canvasOf(BW / 2, BH / 2);
var bA = smooth(bloomA);
var bB = smooth(bloomB);
var canFilter = typeof bA.filter === "string";
var vignetteC = canvasOf(DW, DH);
{
  const v = vignetteC.getContext("2d");
  const g = v.createRadialGradient(DW / 2, DH / 2, DH * 0.32, DW / 2, DH / 2, DH * 0.95);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,1)");
  v.fillStyle = g;
  v.fillRect(0, 0, DW, DH);
}
var grainC = canvasOf(160, 160);
{
  const g = grainC.getContext("2d");
  for (let i = 0; i < 2600; i++) {
    const a = Math.random();
    g.fillStyle = a > 0.5 ? `rgba(255,255,255,${0.35 + 0.4 * Math.random()})` : `rgba(0,0,0,${0.35 + 0.4 * Math.random()})`;
    g.fillRect(Math.random() * 160, Math.random() * 160, 1.5, 1.5);
  }
}
var dust = Array.from({ length: 46 }, () => ({
  x: Math.random() * DW,
  y: Math.random() * DH,
  vx: (Math.random() - 0.5) * 6,
  vy: -2 - Math.random() * 6,
  r: 0.7 + Math.random() * 1.6,
  ph: Math.random() * 6.28,
  z: 0.4 + Math.random() * 0.8
}));
var lastCam = 0;
var lite = false;
var fxFrame = 0;
var lastGrade = null;
var fxGameEl = document.getElementById("game");
if (fxGameEl && fxGameEl.style && typeof grainC.toDataURL === "function") fxGameEl.style.setProperty("--grain", "url(" + grainC.toDataURL() + ")");
function setGradeCss(g) {
  if (g === lastGrade || !fxGameEl || !fxGameEl.style) return;
  lastGrade = g;
  fxGameEl.style.setProperty("--fx-top", g.top);
  fxGameEl.style.setProperty("--fx-bottom", g.bottom);
  fxGameEl.style.setProperty("--fx-vig", g.vignette);
}
function fxAdapt(frameTime) {
  if (frameTime > 0.034) lite = true;
  else if (frameTime < 0.022) lite = false;
  if (fxGameEl && fxGameEl.classList) fxGameEl.classList.toggle("lite", lite);
}
var GRADES = {
  station: { bloom: 0.34, vignette: 0.5, top: "rgba(255,170,90,.06)", bottom: "rgba(50,80,210,.10)", dust: 0.35 },
  wagon: { bloom: 0.3, vignette: 0.55, top: "rgba(255,205,140,.05)", bottom: "rgba(40,70,170,.09)", dust: 0.32 },
  dark: { bloom: 0.3, vignette: 0.7, top: "rgba(120,160,255,.04)", bottom: "rgba(20,40,120,.10)", dust: 0.25 },
  menu: { bloom: 0.5, vignette: 0.55, top: "rgba(255,180,100,.06)", bottom: "rgba(40,50,160,.12)", dust: 0.3 },
  vision: { bloom: 0.5, vignette: 0.6, top: "rgba(80,200,255,.08)", bottom: "rgba(20,90,200,.12)", dust: 0.35 }
};
function postProcess(g = GRADES.wagon) {
  const t = gameState.clock;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  // o brilho (bloom) é recalculado a cada 3 quadros: ler o canvas inteiro é a parte mais cara
  if (fxFrame++ % 3 === 0) {
    bA.globalCompositeOperation = "copy";
    bA.drawImage(cv, 0, 0, DW, DH, 0, 0, BW, BH);
    bA.globalCompositeOperation = "lighter";
    bA.globalAlpha = 0.25;
    bA.drawImage(bloomA, 0, 0);
    bA.globalAlpha = 1;
    bA.globalCompositeOperation = "multiply";
    bA.drawImage(bloomA, 0, 0);
    bB.globalCompositeOperation = "copy";
    bB.drawImage(bloomA, 0, 0, BW, BH, 0, 0, BW / 2, BH / 2);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = g.bloom * 0.55;
  ctx.drawImage(bloomA, 0, 0, BW, BH, 0, 0, DW, DH);
  if (!lite) {
    ctx.globalAlpha = g.bloom * 0.65;
    ctx.drawImage(bloomB, 0, 0, BW / 2, BH / 2, 0, 0, DW, DH);
  }
  ctx.globalAlpha = 1;
  // gradação de cor, vinheta e granulado agora são camadas CSS (a placa de vídeo faz de graça)
  setGradeCss(g);
  const dcam = (gameState.cameraX - lastCam) * K;
  lastCam = gameState.cameraX;
  ctx.globalCompositeOperation = "lighter";
  if (!lite) for (const p of dust) {
    p.x += p.vx * 0.016 * K - dcam * p.z;
    p.y += p.vy * 0.016 * K;
    p.ph += 0.03;
    if (p.x < 0) p.x += DW;
    if (p.x > DW) p.x -= DW;
    if (p.y < -4) p.y = DH + 4;
    ctx.globalAlpha = g.dust * (0.18 + 0.18 * Math.sin(p.ph)) * p.z;
    ctx.fillStyle = "#fff0d0";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * K * 0.45, 0, 6.2832);
    ctx.fill();
  }
  ctx.restore();
  void t;
}
