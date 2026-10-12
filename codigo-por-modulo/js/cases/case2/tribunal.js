// js/cases/case2/tribunal.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var JUIZA = npcRows({ hair: "long", glasses: true }).slice(0, 17);
var JUIZA_PAL = pl({ u: "#3a2418", t: "#c99670", a: "#15121c", A: "#0c0a10", g: "#e9e4f8", x: "#c9a44a" });
var gavelT = 0;
var lastLine = null;
function drawTribunal() {
  if (gameState.dialogLine !== lastLine) {
    lastLine = gameState.dialogLine;
    if (gameState.dialogLine && (gameState.dialogLine[1].includes("culpados") || gameState.dialogLine[1].includes("encerrada"))) gavelT = 0.5;
  }
  if (gavelT > 0) gavelT -= 1 / 60;
  R(0, 0, W, H, "#2a1a12");
  R(0, 0, W, 60, "#d9cdb0");
  for (let x = 0; x < W; x += 32) R(x, 0, 1, 60, "#c9bc9a");
  R(0, 58, W, 3, "#8a5a32");
  R(0, 61, W, 51, "#5a3a22");
  for (let x = 0; x < W; x += 16) {
    R(x, 61, 1, 51, "#4a2e1a");
    R(x + 3, 66, 10, 40, "#63412a");
  }
  for (const wx of [12, 214]) {
    R(wx, 8, 30, 40, "#8ab0c8");
    R(wx + 14, 8, 2, 40, "#e9e4d8");
    R(wx, 26, 30, 2, "#e9e4d8");
    R(wx - 2, 6, 34, 2, "#8a5a32");
  }
  ctx.globalCompositeOperation = "lighter";
  for (let y = 48; y < 130; y++) {
    const s = (y - 48) * 0.5;
    R(14 + s, y, 26, 1, "rgba(255,240,200,.025)");
    R(212 - s, y, 26, 1, "rgba(255,240,200,.025)");
  }
  ctx.globalCompositeOperation = "source-over";
  disc(128, 22, 13, "#8a6a2a");
  disc(128, 22, 11, "#2a4a8a");
  R(127, 13, 2, 16, "#e8c86a");
  R(119, 16, 18, 1, "#e8c86a");
  line(120, 17, 117, 24, "#e8c86a");
  line(120, 17, 123, 24, "#e8c86a");
  R(116, 24, 8, 1, "#e8c86a");
  line(136, 17, 133, 24, "#e8c86a");
  line(136, 17, 139, 24, "#e8c86a");
  R(132, 24, 8, 1, "#e8c86a");
  R(123, 29, 10, 2, "#e8c86a");
  R(196, 10, 1, 60, "#8a8a8a");
  R(197, 12, 20, 14, "#2a9a4a");
  for (let dy = -4; dy <= 4; dy++) {
    const w = 16 - Math.abs(dy) * 3;
    R(207 - w / 2, 19 + dy, w, 1, "#e8d14a");
  }
  disc(207, 19, 3, "#2a3a9a");
  R(204, 19, 7, 1, "#e9e4f8");
  R(60, 54, 136, 8, "#6b4430");
  R(60, 54, 136, 1, "#8a5a40");
  sprite(JUIZA, JUIZA_PAL, 122, 37, false);
  const up = gavelT > 0.25;
  R(141, up ? 44 : 50, 2, 7, "#5a3a22");
  R(138, up ? 41 : 48, 8, 4, "#7a4a2a");
  if (gavelT > 0 && gavelT < 0.25) {
    R(136, 52, 2, 1, "#fff1b8");
    R(146, 52, 2, 1, "#fff1b8");
  }
  R(56, 62, 144, 40, "#6b4430");
  R(56, 62, 144, 2, "#8a5a40");
  for (let x = 64; x < 196; x += 22) R(x, 68, 16, 28, "#5a3822");
  R(112, 72, 32, 9, "#e9dfc2");
  text("JUIZA", 118, 74, "#3a2418");
  R(0, 112, W, 32, "#3a2418");
  for (let x = 0; x < W; x += 12) R(x, 112, 1, 32, "#32200f");
  R(8, 100, 58, 6, "#6b4430");
  R(10, 106, 4, 10, "#4a2e1a");
  R(60, 106, 4, 10, "#4a2e1a");
  sprite(COND_ROWS.slice(0, 15), COND2_PAL, 16, 86, false);
  R(20, 95, 4, 1, "#e9e4f8");
  sprite(WES_ROWS.slice(0, 15), WES_PAL, 38, 86, false);
  R(40, 97, 6, 2, "#e9e4f8");
  R(28, 98, 6, 1, "#c0c0c8");
  R(50, 98, 6, 1, "#c0c0c8");
  sprite(POLICE_ROWS, POLICE_PAL, 2, 80, false);
  R(190, 100, 58, 6, "#6b4430");
  R(192, 106, 4, 10, "#4a2e1a");
  R(242, 106, 4, 10, "#4a2e1a");
  R(204, 98, 10, 2, "#e9e4f8");
  sprite(OT_STAND.slice(0, 15), OTAVIO_PAL, 220, 86, true);
  R(0, 128, W, 4, "#5a3822");
  R(0, 128, W, 1, "#7a5a3a");
  const crowd = [[20, "#e9e4f8", "#8a3a5a"], [44, "#3a2a20", "#4a6a8a"], [68, "#d9d9e0", "#5a7a5a"], [150, "#15121c", "#3a8a5a"], [174, "#2a1a14", "#e2dccb"], [198, "#2a2436", "#6d7456"]];
  crowd.forEach(([x, hc, bc], i) => {
    R(x, 132, 12, 12, bc);
    disc(x + 6, 128, 5, hc);
    if (i === 5) {
      R(x - 1, 122, 14, 2, "#2a2436");
      R(x + 2, 119, 8, 3, "#2a2436");
    }
  });
  if (gavelT > 0) R(0, 0, W, H, `rgba(255,240,200,${gavelT * 0.08})`);
}
