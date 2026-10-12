// js/cases/case2/logic.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function npcTalk2(n) {
  if (n.p >= 1) {
    say([["Óculos", n.name + " está desacordado. Respiração normal."]]);
    return;
  }
  if (n.p > 0 || n.dz) {
    say([[n.name, "Hã...? Que... que horas são?"]]);
    return;
  }
  const post = state2.run.phase === "inv";
  say(post ? n.pc++ ? n.postR : n.post : n.bc++ ? n.preR : n.pre);
}
function npcHS2(n) {
  const top = n.sit ? 72 : 98, h = n.sit ? 28 : 22;
  return { name: n.name, x: n.x - 1, y: top, w: 14, h, wx: n.sit ? n.x + 6 : n.x - 10, n: 0, go: () => npcTalk2(n), npc: n };
}
function goSec2(sec, px) {
  state2.run.sec = sec;
  gameState.hotspots = state2.run.hs[sec];
  gameState.worldWidth = state2.run.W[sec];
  P.x = px;
  P.tx = null;
  P.pending = null;
  gameState.cameraX = clamp(P.x - W / 2, 0, gameState.worldWidth - W);
  gameState.fadeIn = 0.5;
  if (sec === "b" && gameState.caseSolved && state2.run.phase === "inv") startStandoff();
}
function ventGo(vx) {
  if (state2.run.phase === "mask") {
    if (vx === SRC_VENT) {
      say([[D, "Achei. Um cilindro de gás preso com fita dentro da grade."], [D, "Tem um registro aqui... Fechando."]], gasOff);
      return;
    }
    say([[D, "Só ar parado saindo daqui."], ["Óculos", "A névoa não vem desta grade. Ela está mais densa no vagão 2, perto da porta da tripulação."]]);
    return;
  }
  if (vx === SRC_VENT && state2.run.phase !== "pre") {
    say([[D, "A grade onde estava o cilindro. Alguém da tripulação sabia exatamente onde fica a tubulação deste vagão."]]);
    return;
  }
  say([[D, "Uma grade de ventilação. Sai um ventinho gelado."]]);
}
var cluesLeft = (sec) => state2.run.hs[sec].some((x) => x.clue && x.n === 0);
function crewDoorGo() {
  if (state2.run.phase !== "inv") {
    say([["Óculos", "Área da tripulação. Trancada."]]);
    return;
  }
  const mainDone = gameState.cluesFound >= gameState.clueTotal - 1 || !cluesLeft("a") && !cluesLeft("b");
  if (!mainDone) {
    say([["Óculos", "Área da tripulação. Ainda não tenho motivo para forçar a trava."], ["Óculos", "Termine de examinar os vagões de passageiros primeiro."]]);
    return;
  }
  if (!state2.run.restOpen) {
    state2.run.restOpen = true;
    say([["Óculos", "As pistas apontam para alguém da tripulação. Liberando a trava."]], () => goSec2("rest", 30));
    return;
  }
  goSec2("rest", 30);
}
function initC2() {
  state2.run = {
    sec: "a",
    W: { a: 420, b: 480, rest: 320 },
    hs: {},
    phase: "pre",
    gt: 0,
    ct: 0,
    arr: ARR,
    filter: 100,
    faint: 0,
    mask: false,
    dp: 0,
    dsw: 0,
    shake: 0,
    warn: [0, 0, 0],
    revealed: false,
    maskOff: false,
    camFix: null,
    F: null,
    fightDone: false,
    restOpen: false
  };
  allC2().forEach((n) => {
    n.bc = 0;
    n.pc = 0;
    n.p = 0;
    n.sw = 0;
    n.dz = 0;
    n.gone = false;
    n.flee = false;
    n.walkTo = null;
    if (n.otavio) {
      n.sit = 1;
      n.rows = npcRows({ hair: "bald", glasses: true, mustache: true, sit: true });
      n.x = 158;
    }
  });
  const dec = (name, x, y, w, h, wx, d) => ({ name, x, y, w, h, wx, n: 0, talk: [[[D, d]], [[D, d]]] });
  const cof = (x) => ({ name: "Máquina de café", x, y: 52, w: 26, h: 50, wx: x + 12, n: 0, talk: [[[D, "Café de máquina. Amargo como a minha noite."]]] });
  const vent = (x) => ({ name: "Ventilação", x: x - 2, y: 6, w: 28, h: 12, wx: x + 12, n: 0, go: () => ventGo(x) });
  const exitGo = () => {
    if (state2.run.phase !== "pre" && state2.run.phase !== "inv") say([[D, "Não posso sair agora."]]);
    else exitCase();
  };
  state2.run.hs.a = [
    { name: "Voltar à plataforma", x: 0, y: 22, w: 20, h: 78, wx: 20, n: 0, go: exitGo },
    { name: "Vagão 2", x: 400, y: 22, w: 20, h: 78, wx: 396, n: 0, go: () => goSec2("b", 30) },
    cof(164),
    vent(48),
    vent(330),
    dec("Jornal dobrado", 260, 64, 16, 12, 268, "Um jornal de esportes dobrado no banco. O time perdeu de novo."),
    dec("Guarda-chuva esquecido", 116, 106, 12, 24, 122, "Um guarda-chuva esquecido no chão. Nem choveu hoje.")
  ].concat(C2NPC.a.map(npcHS2));
  state2.run.hs.b = [
    { name: "Vagão 1", x: 0, y: 22, w: 20, h: 78, wx: 20, n: 0, go: () => goSec2("a", 390) },
    { name: "Porta da tripulação", x: 460, y: 22, w: 20, h: 78, wx: 456, n: 0, go: crewDoorGo },
    cof(352),
    vent(236),
    vent(SRC_VENT),
    dec("Marmita vazia", 244, 64, 16, 12, 252, "Uma marmita vazia, lambida até o fim. Alguém jantou bem.")
  ].concat(C2NPC.b.map(npcHS2));
  state2.run.hs.rest = [
    { name: "Vagão 2", x: 0, y: 22, w: 20, h: 78, wx: 20, n: 0, go: () => goSec2("b", 440) },
    dec("Armário de emergência", 30, 40, 38, 60, 50, "O armário de equipamentos de emergência está aberto. Nos ganchos, faltam duas máscaras de gás."),
    dec("Sofá", 80, 78, 70, 24, 116, "Um sofá afundado no formato exato de alguém que cochila aqui todo dia."),
    dec("Micro-ondas", 214, 38, 22, 14, 224, "Cheiro de pipoca queimada de três turnos atrás."),
    dec("Geladeira", 244, 58, 18, 42, 252, 'Um bilhete na porta da geladeira: "NÃO MEXAM NO MEU IOGURTE. Valter." O condutor se chama Valter.'),
    dec("Televisão", 270, 26, 26, 18, 282, "Reprise do jogo de ontem. Ninguém aguenta mais esse placar."),
    dec("Planta", 300, 78, 14, 22, 306, "Uma planta de plástico. Até ela parece cansada.")
  ];
  return state2.run.hs.a;
}
function c2Reveal() {
  CL2.forEach((k, j) => {
    const mem = CASES[1].mem;
    state2.run.hs[C2SEC[j]].push({ name: k[0], x: k[1], y: k[2], w: k[3], h: k[4], wx: k[5], clue: true, n: 0, talk: [[[D, k[6]], ["Óculos", k[7]], ["Memória", "«" + mem[j][0] + "»"]], [["Óculos", k[7]]]] });
  });
}
function c2DoorTarget() {
  if (gameState.caseIndex !== 1 || !state2.run) return null;
  let go = null;
  if (state2.run.phase === "mask") {
    if (state2.run.sec === "a") go = "Vagão 2";
    else if (state2.run.sec === "b") return gameState.hotspots.find((x) => x.name === "Ventilação" && x.x === SRC_VENT - 2) || null;
  } else if (state2.run.phase === "inv" && gameState.caseSolved) {
    if (state2.run.sec === "rest") go = "Vagão 2";
    else if (state2.run.sec === "a") go = "Vagão 2";
  } else if (state2.run.phase === "inv") {
    if (cluesLeft("a") || cluesLeft("b")) {
      if (state2.run.sec === "a" && cluesLeft("b")) go = "Vagão 2";
      else if (state2.run.sec === "b" && cluesLeft("a")) go = "Vagão 1";
      else if (state2.run.sec === "rest") go = "Vagão 2";
    } else if (cluesLeft("rest")) {
      if (state2.run.sec === "a") go = "Vagão 2";
      else if (state2.run.sec === "b") go = "Porta da tripulação";
    }
  }
  return go ? gameState.hotspots.find((x) => x.name === go) || null : null;
}
function c2Fail() {
  gameState.inputLocked = false;
  state2.run.camFix = null;
  say([["Óculos", "O trem chegou à próxima estação. No tumulto do desembarque, os ladrões sumiram com o diamante."], ["Óculos", "Recomeçando a investigação."]], () => {
    state2.run = null;
    caseSave[1] = null;
    gameState.cluesFound = 0;
    gameState.caseSolved = false;
    gameState.promptStarted = false;
    setAdvice("");
    enterCase(1);
  });
}
function gasStart() {
  state2.run.phase = "gas";
  state2.run.gt = 0;
  state2.run.gp = [];
  gameState.inputLocked = true;
  P.tx = null;
  P.pending = null;
  P.dir = 1;
  state2.run.shake = 0.4;
  allC2().forEach((n) => {
    n.fs = 2 + Math.random() * 1;
  });
  C2NPC.b.find((n) => n.otavio).fs = 2.1;
}
function gasOff() {
  state2.run.phase = "clear";
  state2.run.ct = 0;
  setAdvice("");
  say([["Óculos", "Fluxo de gás interrompido. O ar está limpando."]]);
}
function c2GasTick(dt) {
  gasParticles(dt, state2.run.phase === "gas" ? 14 : state2.run.phase === "mask" ? 3 : 0);
  if (state2.run.phase === "gas") {
    state2.run.gt += dt;
    const g = state2.run.gt;
    allC2().forEach((n) => {
      n.p = clamp01((g - n.fs) / 0.6);
      n.sw = g > n.fs - 0.7 && g < n.fs ? 1 : 0;
    });
    state2.run.dp = clamp01((g - 3.2) / 0.7);
    state2.run.dsw = g > 2.6 && g < 3.2 ? 1 : 0;
    if (g > 3.2 && g < 3.4) state2.run.shake = 0.15;
    if (g > 4.4 && !state2.run.blackSaid) {
      state2.run.blackSaid = true;
      gameState.inputLocked = false;
      const w = C2NPC.b.find((n) => n.wes);
      w.gone = true;
      state2.run.hs.b = state2.run.hs.b.filter((h) => h.npc !== w);
      if (state2.run.sec === "b") gameState.hotspots = state2.run.hs.b;
      say([
        ["", "..."],
        ["Óculos", "Detetive. Detetive! Acorde."],
        [D, "Minha cabeça... o que foi isso?"],
        ["Óculos", "Gás sonífero, liberado pelas ventilações. Usei o filamento da minha armação para imprimir uma máscara para você."],
        ["Óculos", "Ela segura o gás, mas o filtro é improvisado. Encontre a origem do gás e corte o fluxo antes que ele acabe."]
      ], () => {
        state2.run.phase = "mask";
        state2.run.mask = true;
        state2.run.filter = 100;
        state2.run.dp = 1;
        gameState.fadeIn = 0.6;
        setAdvice("Encontre a origem do gás e corte o fluxo.");
        say([[D, "Todo mundo desmaiado... e a maleta do Seu Otávio sumiu."]]);
      });
    }
    return;
  }
  if (state2.run.phase === "mask") {
    if (state2.run.faint > 0) {
      state2.run.dp = Math.min(1, state2.run.dp + dt * 1.6);
      state2.run.faint -= dt;
      gameState.inputLocked = true;
      if (state2.run.faint <= 0) {
        state2.run.filter = 100;
        say([["Óculos", "Você desmaiou de novo. Reimprimi o filtro, mas não temos material para muitos."], ["Óculos", "A névoa está mais grossa no vagão 2. Procure lá."]]);
      }
      return;
    }
    if (state2.run.dp > 0) {
      state2.run.dp = Math.max(0, state2.run.dp - dt * 0.9);
      gameState.inputLocked = state2.run.dp > 0;
      P.tx = null;
      return;
    }
    if (!gameState.dialogLine && !gameState.choiceOpen) {
      state2.run.filter -= dt * 0.85;
      if (state2.run.filter <= 0) {
        state2.run.filter = 0;
        state2.run.faint = 1.6;
        P.tx = null;
        P.pending = null;
      }
    }
    return;
  }
  if (state2.run.phase === "clear") {
    state2.run.ct += dt;
    const c = state2.run.ct;
    allC2().forEach((n) => {
      if (n.gone) return;
      n.p = 1 - clamp01((c - n.wk) / 1.1);
      n.sw = 0;
      n.dz = c >= n.wk && c < n.wk + 2.6 ? 1 : 0;
    });
    if (c > 3 && !state2.run.maskOff && !gameState.dialogLine) {
      state2.run.maskOff = true;
      state2.run.mask = false;
      say([["Óculos", "Ar respirável. Recolhendo a máscara."], [D, "Finalmente. Essa coisa cheirava a plástico queimado."]]);
    }
    const ot = C2NPC.b.find((n) => n.otavio);
    if (state2.run.maskOff && ot.p <= 0 && !ot.walkTo && !state2.run.revealed && state2.run.sec === "b" && !gameState.dialogLine && !gameState.choiceOpen) {
      ot.sit = 0;
      ot.rows = OT_STAND;
      ot.dz = 0;
      ot.walkTo = P.x + (ot.x < P.x ? -20 : 20);
      gameState.inputLocked = true;
      P.tx = null;
      P.pending = null;
      P.dir = ot.x < P.x ? -1 : 1;
    }
    if (ot.walkTo !== null && !state2.run.revealed) {
      const d = ot.walkTo - ot.x;
      ot.walking = Math.abs(d) > 1;
      ot.x += Math.sign(d) * Math.min(Math.abs(d), 60 * dt);
      const h = state2.run.hs.b.find((h2) => h2.npc === ot);
      if (h) {
        h.x = ot.x - 1;
        h.y = 98;
        h.h = 22;
        h.wx = ot.x + (ot.x < P.x ? 18 : -10);
      }
      if (!ot.walking) {
        state2.run.revealed = true;
        gameState.inputLocked = false;
        say([
          ["Seu Otávio", "Detetive! A MALETA! Levaram a minha maleta!"],
          ["Seu Otávio", "A Lágrima do Sertão! Trinta quilates! Estava aqui, no meu colo, quando o mundo apagou!"],
          ["Seu Otávio", "Eu levo essa pedra para uma joalheria do Recife. Trinta anos de profissão e nunca perdi uma encomenda. Por favor..."],
          ["Óculos", "Novos pontos de interesse detectados nos vagões. Cada pista que você tocar vira uma memória minha."],
          ["Óculos", "E o trem chega à próxima estação em " + arrText() + ". Quem roubou vai tentar descer lá."]
        ], () => {
          state2.run.phase = "inv";
          c2Reveal();
        });
      }
    }
  }
}
function abandonCase2() {
  state2.run.camFix = null;
  setAdvice("");
  exitCase();
  caseSave[1] = null;
  state2.run = null;
  gameState.cluesFound = 0;
  gameState.caseSolved = false;
  gameState.promptStarted = false;
  say([["Óculos", "O caso 2 vai recomeçar do zero quando você voltar à plataforma 2."]]);
}
function c2Tick(dt) {
  if (gameState.scene !== "case" || gameState.caseIndex !== 1 || !state2.run) return;
  if (state2.run.shake > 0) state2.run.shake -= dt;
  if (state2.run.phase === "standoff") {
    P.x = clamp(P.x, 190, 440);
    if (P.x < 200 && !gameState.dialogLine && !gameState.choiceOpen) confront();
    return;
  }
  if (state2.run.phase === "flee" || state2.run.phase === "fight") {
    c2FightTick(dt);
    return;
  }
  if (state2.run.phase !== "gas") c2Clock(dt);
  if (!state2.run) return;
  if (state2.run.phase === "pre") {
    if (state2.run.sec === "b" && !gameState.dialogLine && !gameState.choiceOpen && gameState.cutscene < 0 && gameState.fadeIn <= 0 && P.x > 174) gasStart();
    return;
  }
  if (state2.run.phase !== "inv") {
    c2GasTick(dt);
    return;
  }
  if (gameState.caseSolved && !state2.run.condGone) {
    state2.run.condGone = true;
    state2.run.hs.b.forEach((h) => {
      if (h.npc && h.npc.cond) h.x = -999;
    });
    setAdvice("Volte ao vagão 2. O Seu Otávio pode estar em perigo.");
  }
}
/** Tempo até a próxima estação, em texto ("6 minutos e 30 segundos"). */
function arrText() {
  const a = Math.max(0, Math.round(state2.run.arr)), m = Math.floor(a / 60), s = a % 60;
  return (m ? m + (m === 1 ? " minuto" : " minutos") : "") + (m && s ? " e " : "") + (s ? s + " segundos" : "");
}
/** O relógio da chegada corre desde que o detetive entra no trem, até o caso ser deduzido. */
function c2Clock(dt) {
  if (gameState.caseSolved || gameState.dialogLine || gameState.choiceOpen || gameState.cutscene >= 0 || gameState.fadeIn > 0 || gameState.inputLocked || gameState.mode !== "play") return;
  if (state2.run.phase === "mask" && state2.run.faint > 0) return;
  state2.run.arr -= dt;
  const w = state2.run.warn;
  if (!w[0] && state2.run.arr <= 180) {
    w[0] = 1;
    state2.run.shake = 0.5;
    say([["Óculos", "Faltam 3 minutos para o trem chegar à próxima estação."]]);
  } else if (!w[1] && state2.run.arr <= 90) {
    w[1] = 1;
    state2.run.shake = 0.5;
    say([["Óculos", "Falta um minuto e meio."]]);
  } else if (!w[2] && state2.run.arr <= 30) {
    w[2] = 1;
    state2.run.shake = 0.6;
    say([["Óculos", "Trinta segundos! O trem está freando!"]]);
  }
  if (state2.run.arr <= 0) {
    state2.run.arr = 0;
    c2Fail();
  }
}
function gasLevel() {
  if (!state2.run) return 0;
  if (state2.run.phase === "gas") return clamp01((state2.run.gt - 0.9) / 2.2);
  if (state2.run.phase === "mask") return 1;
  if (state2.run.phase === "clear") return Math.max(0, 1 - state2.run.ct / 4);
  return 0;
}
