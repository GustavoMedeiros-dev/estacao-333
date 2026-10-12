// js/scenes/station-life.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var STEP_A = ["..pp...pp...", ".pp.....pp..", ".pp.....pp..", ".oo.....ooo."];
var STEP_B = ["...pp..pp...", "...pp..pp...", "....pppp....", "...ooo.ooo.."];
var walkRows = (rows, f) => rows.slice(0, 18).concat(f ? STEP_A : STEP_B);
var WALKERS = [
  {
    name: "Rafael, o motoboy",
    rows: npcRows({ hair: "cap" }),
    pal: pl({ u: "#b33a2e", U: "#8a2a24", t: "#8a5a3e", a: "#15121c", A: "#0c0a10", g: "#e8b04a", p: "#2a3a5a" }),
    speed: 34,
    x: 40,
    bag: "#e8b04a",
    talk: [
      [["Rafael", "Fala, chefe! Rapidinho, que eu tô com três entregas atrasadas e o aplicativo já tá me dando nota baixa."], ["Rafael", "Se o senhor vir um X-tudo esfriando por aí, é meu."]],
      [["Rafael", "Não posso parar não, chefe! Cada minuto parado é uma corrida perdida."]]
    ]
  },
  {
    name: "Dona Cida, a diarista",
    rows: npcRows({ hair: "bun", dress: true }),
    pal: pl({ u: "#3a2418", t: "#6e4630", a: "#c4507a", A: "#9a3a5e" }),
    speed: -22,
    x: 420,
    bag: "#2a5a7a",
    talk: [
      [["Dona Cida", "Ai, moço, não posso parar não! Pego às seis do outro lado da cidade: são dois ônibus e um trem."], ["Dona Cida", "Se eu me atraso, a patroa diz que eu não tenho compromisso. Compromisso eu tenho é com o horário do ônibus."]],
      [["Dona Cida", "Deus te abençoe, meu filho, mas eu tô correndo!"]]
    ]
  },
  {
    name: "Lucas, o estudante",
    rows: npcRows({ hair: "curly" }),
    pal: pl({ u: "#15121c", t: "#8a5a3e", a: "#3a8a5a", A: "#2a6a44", p: "#2a3a6a" }),
    speed: 30,
    x: 250,
    bag: "#5a4a8a",
    talk: [
      [["Lucas", "Cursinho às sete, Enem em três semanas, e eu ainda não entendi logaritmo."], ["Lucas", "Desculpa, tio, tenho que correr. Se perder esse trem, perco a aula de redação."]],
      [["Lucas", "Tema da redação deste ano? Se o senhor souber, me conta!"]]
    ]
  },
  {
    name: "Seu Jorge, o pedreiro",
    rows: npcRows({ hair: "cap", mustache: true }),
    pal: pl({ u: "#e2dccb", U: "#c9c2a8", t: "#a8704f", a: "#d0702f", A: "#a8541f", p: "#3a4a6a", m: "#2a2026" }),
    speed: -26,
    x: 560,
    bag: "#c9d4e4",
    talk: [
      [["Seu Jorge", "A obra começa às sete, mas o mestre quer todo mundo às seis e meia. Marmita tá aqui, café tá na garrafa."], ["Seu Jorge", "Hoje é dia de bater laje, doutor. E laje não espera ninguém."]],
      [["Seu Jorge", "Bom dia, boa tarde, boa noite, que eu já tô atrasado!"]]
    ]
  }
];
WALKERS.forEach((w) => {
  w.x0 = w.x;
  w.n = 0;
  w.talking = false;
  w.hs = { name: w.name, x: w.x, y: 98, w: 14, h: 24, wx: w.x, n: 0, go: () => talkWalker(w) };
});
function talkWalker(w) {
  w.talking = true;
  say(w.talk[Math.min(w.n++, w.talk.length - 1)], () => {
    w.talking = false;
  });
}
var SANFONEIRO = { rows: npcRows({ hair: "cap", mustache: true, sit: true }), pal: pl({ u: "#c9a44a", U: "#8a6a2a", t: "#8a5a3e", a: "#b33a2e", A: "#8a2a24", m: "#2a2026" }), x: 276 };
var LEITORA = { rows: npcRows({ hair: "bun", glasses: true, dress: true, sit: true }), pal: pl({ u: "#d9d9e0", t: "#c48a62", a: "#3a6a8a", A: "#2a5068", x: "#2a2233" }), x: 128 };
var TICKER = "ESTACAO CENTRAL - BEM-VINDOS - TREM DA PLATAFORMA 3 ATRASADO HA 5 ANOS - NAO ALIMENTE OS POMBOS - CAFE QUENTE NA MAQUINA - FORRO AO VIVO NA PLATAFORMA 2 - ";
var THIEVES = {
  wes: { rows: npcRows({ hair: "cap" }), pal: pl({ u: "#4a4a52", U: "#3a3a42", t: "#a8704f", a: "#6a6a72", A: "#4a4a52", g: "#5a5a62", p: "#2a3a5a" }), x: 604 },
  cond: { rows: npcRows({ hair: "cap", mustache: true }), pal: pl({ u: "#8a2a2a", U: "#5e1f27", t: "#a8704f", a: "#4a5a6a", A: "#344452", m: "#2a2026" }), x: 621 },
  n: 0
};
THIEVES.hs = { name: "Dois sujeitos cochichando", x: 600, y: 94, w: 36, h: 30, wx: 586, n: 0, go: talkThieves };
function thievesHere() {
  return !done[1] && !(CASES[1] && CASES[1].started && CASES[1].started());
}
function talkThieves() {
  const lines = THIEVES.n++ === 0 ? [["Rapaz de boné", "Ô, tio! Perdeu alguma coisa aqui?"], ["Homem de quepe", "Circulando, doutor. Conversa de funcionário."], ["Rapaz de boné", "Vaza, vaza! Xô!"], ["Óculos", "Dois homens cochichando em cima de um mapa dos vagões. Guarde o rosto deles."]] : [["Homem de quepe", "Já falamos, doutor. Some daqui."], ["Rapaz de boné", "Ou quer que a gente chame o segurança?"]];
  say(lines, () => {
    P.tx = 500;
    P.pending = null;
  });
}
function drawThieves() {
  if (!thievesHere()) {
    THIEVES.hs.x = -999;
    return;
  }
  THIEVES.hs.x = 600;
  const c = gameState.clock, near = P.x > 560, { wes, cond } = THIEVES;
  R(wes.x - 1, 119, 32, 2, "rgba(0,0,0,.3)");
  sprite(wes.rows, wes.pal, wes.x, 98, near);
  sprite(cond.rows, cond.pal, cond.x, 98, true);
  if (!near) {
    R(wes.x + 10, 108, 9, 6, "#d9cdb0");
    line(wes.x + 11, 109, wes.x + 17, 112, "#b33a2e");
    R(wes.x + 13, 110, 2, 2, "#2a2233");
    const who = (c * 0.8 | 0) % 2;
    if (c * 2 % 2 < 1.4) {
      const bx = who ? cond.x + 2 : wes.x + 2;
      R(bx, 86, 9, 5, "#15121c");
      R(bx + 1, 87, 7, 3, "#9aa0c8");
      R(bx + 2, 88, 1, 1, "#15121c");
      R(bx + 4, 88, 1, 1, "#15121c");
      R(bx + 6, 88, 1, 1, "#15121c");
    }
  } else if (c * 3 % 2 < 1) {
    R(cond.x + 3, 84, 8, 10, "#15121c");
    R(cond.x + 4, 85, 6, 8, "#f1e6c8");
    text("!", cond.x + 6, 86, "#b33a2e");
  }
  R(596, 0, 44, 128, "rgba(5,4,12,.42)");
}
var LIFE_HS = [
  THIEVES.hs,
  ...WALKERS.map((w) => w.hs),
  { name: "Seu Zé da Sanfona", x: 272, y: 86, w: 22, h: 34, wx: 262, n: 0, talk: [
    [["Seu Zé da Sanfona", "Boa noite, doutor! Forró pra quem espera trem que não sai. Ninguém reclama."], ["Seu Zé da Sanfona", "O relógio da estação parou faz tempo. O xote não para nunca."]],
    [["Seu Zé da Sanfona", "Deixa uma moedinha no chapéu, que a sanfona agradece."]],
    [["Seu Zé da Sanfona", "Essa aqui eu aprendi com meu pai, no São João de Campina. Escuta só."]]
  ] },
  { name: "Dona Fátima", x: 126, y: 82, w: 16, h: 22, wx: 146, n: 0, talk: [
    [["Dona Fátima", "Estou esperando o trem das 3h33 faz tanto tempo que já li esse jornal três vezes."], ["Dona Fátima", "A notícia não muda. Nem o horário."]],
    [["Dona Fátima", "Dizem que o trem da plataforma 3 é assombrado. Eu digo que é só atrasado."]],
    [[D, "Ela virou a página. É a mesma página."]]
  ] }
];
function drawTicker() {
  const Wd = gameState.worldWidth, len = TICKER.length * 4, cam = gameState.cameraX;
  R(0, 0, Wd, 7, "#0a0910");
  const off = gameState.clock * 26 % (len + Wd);
  for (const base of [Wd - off, Wd - off + len]) {
    if (base > cam + W || base + len < cam) continue;
    for (let k = 0; k < TICKER.length; k++) {
      const cx = base + k * 4;
      if (cx >= cam - 4 && cx <= cam + W) text(TICKER[k], cx, 1, "#e8b04a");
    }
  }
}
var lastClock = 0;
function drawWalkers() {
  const Wd = gameState.worldWidth, c = gameState.clock, dt = Math.max(0, Math.min(0.1, c - lastClock));
  lastClock = c;
  for (const w of WALKERS) {
    const waiting = w.talking || P.pending === w.hs;
    if (!waiting) {
      w.x += w.speed * dt;
      if (w.x > Wd + 20) w.x = -20;
      if (w.x < -20) w.x = Wd + 20;
    }
    const x = w.x, f = waiting ? 0 : (c * Math.abs(w.speed) / 7 | 0) % 2, left = waiting ? P.x < x + 6 : w.speed < 0;
    w.hs.x = Math.round(x) - 1;
    w.hs.wx = P.x < x ? x - 12 : x + 22;
    R(x - 1, 121, 14, 2, "rgba(0,0,0,.25)");
    sprite(waiting ? w.rows : walkRows(w.rows, f), w.pal, x, 100 - f, left);
    if (w.bag) R(left ? x - 3 : x + 11, 113 - f, 5, 6, w.bag);
  }
}
function drawSanfoneiro() {
  const { x, rows, pal } = SANFONEIRO, top = 90, c = gameState.clock, bw = 7 + Math.round(Math.sin(c * 5) * 2.5);
  R(x - 2, 108, 18, 12, "#5a3e22");
  R(x - 2, 108, 18, 1, "#7a5a32");
  sprite(rows, pal, x, top, false);
  R(x + 4, top + 12, 3, 8, "#e9e4f8");
  for (let k = 0; k < 4; k++) R(x + 4, top + 13 + k * 2, 3, 1, "#15121c");
  for (let k = 0; k < bw; k += 2) R(x + 7 + k, top + 12, 1, 8, k % 4 ? "#8a2a24" : "#c9a44a");
  R(x + 7 + bw, top + 12, 3, 8, "#3a3a42");
  for (let k = 0; k < 3; k++) {
    const p = (c * 0.5 + k / 3) % 1, nx = x + 14 + Math.sin(p * 6 + k) * 4, ny = top + 4 - p * 22;
    R(nx, ny, 2, 2, `rgba(232,176,74,${1 - p})`);
    R(nx + 1, ny - 4, 1, 4, `rgba(232,176,74,${1 - p})`);
  }
  R(x - 12, 124, 9, 2, "#2a2436");
  R(x - 11, 122, 7, 2, "#3a3446");
  if (c * 1.3 % 2 < 0.2) R(x - 9, 123, 1, 1, "#ffe7a0");
}
function drawLeitora() {
  const { x, rows, pal } = LEITORA, top = 86, turn = gameState.clock % 9 < 0.4;
  sprite(rows, pal, x, top, false);
  R(x + 8, top + 5, turn ? 4 : 8, 10, "#e9e4d8");
  R(x + 9, top + 7, turn ? 2 : 6, 1, "#8a806a");
  R(x + 9, top + 10, turn ? 2 : 5, 1, "#8a806a");
}
function drawDarkTrain(ax, aw) {
  const c = gameState.clock;
  R(ax + 2, 43, aw - 4, 3, "#0e0c14");
  R(ax + 2, 46, aw - 4, 46, "#17151f");
  R(ax + 2, 78, aw - 4, 2, "#4a1418");
  for (const [rx, ry, rw] of [[ax + 6, 70, 8], [ax + 44, 84, 10], [ax + 20, 50, 5]]) {
    R(rx, ry, rw, 3, "#3a2218");
    R(rx + 1, ry + 3, rw - 3, 2, "#2a1810");
  }
  for (let k = 0, wx = ax + 6; wx + 10 < ax + aw - 2; k++, wx += 16) {
    const glow2 = Math.sin(c * 0.7 + k * 1.9) > 0.85;
    R(wx, 52, 10, 12, glow2 ? "#2a3a4a" : "#0a0c12");
    line(wx + 1, 53, wx + 4, 57, "#1e2430");
    if (k === 1 && c % 7.3 < 0.6) {
      R(wx + 3, 54, 4, 5, "#cfd8e8");
      R(wx + 4, 55, 1, 1, "#05060c");
      R(wx + 6, 55, 1, 1, "#05060c");
      R(wx + 4, 57, 2, 1, "#05060c");
    }
  }
  R(ax + 30, 48, 10, 30, "#0e0c14");
  text("42", ax + 50, 68, "#7a1a1a");
  R(ax + 51, 73, 1, 3, "#7a1a1a");
  R(ax + 55, 73, 1, 2, "#7a1a1a");
  line(ax + 8, 66, ax + 14, 74, "#2a2632");
  line(ax + 10, 66, ax + 16, 74, "#2a2632");
  line(ax, 30, ax + 9, 39, "rgba(200,200,220,.35)");
  line(ax, 34, ax + 6, 39, "rgba(200,200,220,.25)");
  line(ax + 3, 30, ax + 3, 37, "rgba(200,200,220,.25)");
  for (let k = 0; k < 8; k++) {
    const p = (c * 0.25 + k / 8) % 1;
    R(ax + k * 9 % aw, 96 - p * 8, 6, 2, `rgba(120,90,160,${0.18 * (1 - p)})`);
  }
}
function drawConcertTrain(ax, aw) {
  const c = gameState.clock;
  R(ax + 2, 43, aw - 4, 3, "#5e1f27");
  R(ax + 2, 46, aw - 4, 46, "#8c2f39");
  R(ax + 2, 76, aw - 4, 2, "#e9dfc2");
  for (let k = 0, wx = ax + 6; wx + 10 < ax + aw - 2; k++, wx += 16) {
    R(wx, 52, 10, 12, "#f3d27a");
    if (k === 0) {
      R(wx + 2, 57, 3, 3, "#3a2418");
      R(wx + 2, 60, 4, 4, "#5a3a2a");
      R(wx + 6, 58, 3, 3, "#2a1a14");
      R(wx + 6, 61, 4, 3, "#3a4a6a");
    }
    if (k === 1) {
      R(wx + 3, 56, 4, 4, "#15121c");
      R(wx + 3, 60, 4, 4, "#2a2340");
      R(wx + 1, 59, 3, 2, "#6b3a22");
      const bo = Math.round(Math.sin(c * 4) * 2);
      line(wx + 1 + bo, 57, wx + 8 + bo, 62, "#d9d0b0");
    }
    if (k === 3) {
      R(wx + 4, 57, 3, 3, "#c99670");
      R(wx + 3, 60, 5, 4, "#7a5a8a");
    }
  }
  R(ax + 30, 48, 10, 30, "#5e1f27");
  R(ax + 34, 60, 1, 4, "#e8b04a");
  R(ax + 44, 66, 18, 10, "#e9dfc2");
  R(ax + 44, 66, 18, 2, "#b33a2e");
  R(ax + 50, 69, 3, 3, "#15121c");
  R(ax + 53, 70, 5, 1, "#15121c");
  R(ax + 6, 81, 28, 7, "#0a0910");
  text("TEATRO", ax + 8, 82, c % 2 < 1.6 ? "#e8b04a" : "#8a6a2a");
}
function drawExpressTrain(ax, aw) {
  const c = gameState.clock;
  R(ax + 2, 43, aw - 4, 3, "#121a36");
  R(ax + 2, 46, aw - 4, 46, "#1e2c5a");
  R(ax + 2, 48, aw - 4, 1, "#c9a44a");
  R(ax + 2, 77, aw - 4, 1, "#c9a44a");
  for (let k = 0, wx = ax + 6; wx + 10 < ax + aw - 2; k++, wx += 16) {
    R(wx, 52, 10, 12, "#f3d27a");
    R(wx, 52, 3, 12, "#6a2a3a");
    R(wx + 7, 52, 3, 12, "#6a2a3a");
    R(wx, 52, 10, 1, "#8a3a4a");
    if (k === 0) {
      R(wx + 4, 56, 3, 2, "#1b2440");
      R(wx + 4, 58, 3, 3, "#c99670");
      R(wx + 3, 61, 5, 3, "#1b2440");
      R(wx + 4, 62, 1, 1, "#e8b04a");
    }
    if (k === 1) {
      R(wx + 4, 61, 3, 2, "#e9e4f8");
      for (let j = 0; j < 2; j++) {
        const p = (c * 0.6 + j * 0.5) % 1;
        R(wx + 5 + Math.sin(p * 6), 59 - p * 6, 1, 1, `rgba(240,240,250,${0.7 * (1 - p)})`);
      }
    }
    if (k === 3 && c % 5 < 0.35) {
      R(wx + 5, 57, 1, 1, "#ffffff");
      R(wx + 4, 58, 3, 1, "#bff3ff");
      R(wx + 5, 59, 1, 1, "#ffffff");
    }
  }
  R(ax + 30, 48, 10, 30, "#121a36");
  R(ax + 34, 60, 1, 4, "#c9a44a");
  text("EXPRESSO", ax + 4, 82, "#c9a44a");
  R(ax + 40, 81, 26, 7, "#0a0910");
  text("RECIFE", ax + 42, 82, c % 3 < 2.4 ? "#e8b04a" : "#8a6a2a");
}
function darkPlateColor() {
  return Math.sin(gameState.clock * 9) > -0.3 || Math.sin(gameState.clock * 1.7) > 0.5 ? "#8a2a24" : "#3a1414";
}
function drawStationLife() {
  drawCeliaWalking();
  drawThieves();
  drawLeitora();
  drawSanfoneiro();
  drawWalkers();
}
function resetStationLife() {
  WALKERS.forEach((w) => {
    w.x = w.x0;
    w.n = 0;
    w.talking = false;
  });
  THIEVES.n = 0;
}
