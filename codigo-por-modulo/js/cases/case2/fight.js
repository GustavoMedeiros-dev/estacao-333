// js/cases/case2/fight.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function startStandoff() {
  state2.run.phase = "standoff";
  state2.run.camFix = 40;
  setAdvice("Confronte os assaltantes.");
  const ot = C2NPC.b.find((n) => n.otavio);
  ot.sit = 0;
  ot.rows = OT_STAND;
  ot.x = 94;
  ot.walkTo = null;
  ot.walking = false;
  state2.run.hs.b = [
    { name: "Porta da tripulação", x: 460, y: 22, w: 20, h: 78, wx: 456, n: 0, go: () => say([[D, "Não vou deixar o Seu Otávio sozinho com eles."]]) },
    { name: "Assaltantes", x: 64, y: 94, w: 70, h: 32, wx: 210, n: 0, go: confront }
  ];
  gameState.hotspots = state2.run.hs.b;
  P.x = 440;
  P.tx = 262;
  P.pending = null;
  say([
    ["", "O detetive volta ao vagão 2 e para junto da porta."],
    ["Wesley", 'Cadê a outra pedra, velho?! No bilhete diz "dois volumes"!'],
    ["Seu Otávio", "O outro volume é o certificado! Papel! Juro por Deus!"],
    ["Condutor", "Revista ele, Wesley. O trem para em dois minutos."],
    ["Óculos", "Eles ainda não notaram você. O policial está encurralado lá no fundo, atrás do carrinho de limpeza."],
    ["Óculos", "Chame a atenção deles: toque nos assaltantes."]
  ]);
}
function newFight(atCover) {
  return {
    on: false,
    hp: 4,
    ammo: 6,
    rl: 0,
    out: false,
    hurt: 0,
    msg: "",
    msgT: 0,
    tr: [],
    gun: null,
    esc: false,
    escT: 0,
    cop: { st: atCover ? "hide" : "run", x: atCover ? FX.cop.hide : 306, tm: 2 },
    b: [
      { name: "Wesley", rows: WES_ROWS, pal: WES_PAL, hx: 156, ox: 190, x: atCover ? 156 : 70, hp: 4, st: atCover ? "hide" : "run", tm: 1.4, x0: 70 },
      { name: "Condutor", rows: COND_ROWS, pal: COND2_PAL, hx: 206, ox: 246, x: atCover ? 206 : 118, hp: 4, st: atCover ? "hide" : "run", tm: 2.6 }
    ]
  };
}
function confront() {
  if (state2.run.phase !== "standoff" || state2.run.confronting) return;
  state2.run.confronting = true;
  say([
    [D, "Ninguém revista ninguém. Larguem as armas."],
    ["Condutor", "O detetive?! Como você está de pé?!"],
    ["Wesley", "Sujou! Sujou!"],
    ["", "Os passageiros aproveitam a distração e correm para o vagão 1."]
  ], () => {
    state2.run.phase = "flee";
    state2.run.fleeT = 0;
    setAdvice("");
    state2.run.camFix = FIGHT_CAM;
    state2.run.hs.b = state2.run.hs.b.filter((h) => h.name !== "Assaltantes");
    gameState.hotspots = state2.run.hs.b;
    C2NPC.b.forEach((n) => {
      if (!n.cop && !n.cond && !n.wes) {
        n.flee = true;
        n.rows = standRows(n);
        n.sit = 0;
      }
    });
    state2.run.F = newFight(false);
  });
}
function fightReady(short) {
  const F = state2.run.F;
  say(
    short ? [["Óculos", "De novo. Saia, atire e volte para a cobertura antes da mira vermelha."]] : [
      ["Óculos", "Modo de combate. Você está abrigado atrás das caixas."],
      ["Óculos", "Toque na tela para sair da cobertura. Fora dela, toque nos assaltantes para atirar."],
      ["Óculos", "ESPAÇO, ↓ ou o botão ABRIGAR: volta para a cobertura, onde você recarrega. Quando a mira vermelha aparecer, se esconda!"],
      ["Óculos", "O policial ajuda lá de trás, mas os tiros dele não vão resolver sozinhos. Quem decide é você."]
    ],
    () => {
      F.on = true;
      F.out = false;
    }
  );
}
var bExposed = (b) => b.st === "step" || b.st === "aim" || b.st === "rec";
/* ---------- sons do tiroteio ---------- */
function sfxOut(pan) {
  const ac = gameState.audioCtx;
  if (!ac) return null;
  const g = ac.createGain();
  if (ac.createStereoPanner) { const p = ac.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(ac.destination); }
  else g.connect(ac.destination);
  const dly = ac.createDelay(); dly.delayTime.value = 0.085; const fb = ac.createGain(); fb.gain.value = 0.22;
  g.connect(dly); dly.connect(fb); fb.connect(dly); dly.connect(ac.destination);
  setTimeout(() => { try { g.disconnect(); dly.disconnect(); } catch (e) {} }, 1500);
  return g;
}
/** Disparo: estalo de ruído + um "tum" grave. det = mais perto e alto; bandit/cop = mais distantes. */
function gunshot(kind) {
  audioInit();
  const ac = gameState.audioCtx;
  if (!ac) return;
  const cfg = kind === "det" ? { peak: 0.85, lp: 5200, pan: 0.35 } : kind === "cop" ? { peak: 0.5, lp: 3600, pan: 0.15 } : { peak: 0.62, lp: 3000, pan: -0.45 };
  const out = sfxOut(cfg.pan), t0 = ac.currentTime;
  if (!out) return;
  const src = ac.createBufferSource(); src.buffer = getNoise(ac);
  const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 160;
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(cfg.lp, t0); lp.frequency.exponentialRampToValueAtTime(700, t0 + 0.25);
  const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(cfg.peak, t0 + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32);
  src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out); src.start(t0, Math.random()); src.stop(t0 + 0.35);
  const o = ac.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(140, t0); o.frequency.exponentialRampToValueAtTime(40, t0 + 0.14);
  const og = ac.createGain(); og.gain.setValueAtTime(cfg.peak * 0.9, t0); og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
  o.connect(og); og.connect(out); o.start(t0); o.stop(t0 + 0.18);
}
/** Bala batendo em metal/cobertura. */
function ricochet(delay) {
  const ac = gameState.audioCtx;
  if (!ac) return;
  const out = sfxOut(Math.random() * 0.6 - 0.3), t0 = ac.currentTime + (delay || 0.04);
  if (!out) return;
  const f = 2200 + Math.random() * 1400;
  const o = ac.createOscillator(); o.type = "triangle"; o.frequency.setValueAtTime(f, t0); o.frequency.exponentialRampToValueAtTime(f * 0.45, t0 + 0.22);
  const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.24);
  o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + 0.26);
}
/** Clique seco (arma vazia) e estalos da recarga. */
function gunClick(n) {
  const ac = gameState.audioCtx;
  if (!ac) return;
  const out = sfxOut(0.35);
  if (!out) return;
  for (let k = 0; k < (n || 1); k++) {
    const t0 = ac.currentTime + k * 0.16;
    const o = ac.createOscillator(); o.type = "square"; o.frequency.setValueAtTime(1800 - k * 500, t0);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.08, t0 + 0.002); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.035);
    o.connect(g); g.connect(out); o.start(t0); o.stop(t0 + 0.04);
  }
}
function fightClick(p) {
  const F = state2.run.F;
  if (!F || !F.on) return;
  if (!F.out) {
    F.out = true;
    return;
  }
  if (F.rl > 0) {
    F.msg = "RECARREGANDO";
    F.msgT = 0.8;
    return;
  }
  if (F.ammo <= 0) {
    F.msg = "SEM BALAS";
    F.msgT = 1;
    gunClick(1);
    return;
  }
  F.ammo--;
  gunshot("det");
  const wx = p.x + gameState.cameraX, wy = p.y;
  F.tr.push({ x0: P.x - 10, y0: 118, x1: wx, y1: wy, t: 0.08, c: "#fff1b8" });
  for (const b of F.b) {
    if (!bExposed(b)) continue;
    if (wx >= b.x - 2 && wx <= b.x + 14 && wy >= 98 && wy <= 126) {
      b.hp--;
      state2.run.shake = 0.15;
      b.st = b.hp <= 0 ? "down" : "hurt";
      b.tm = 0.45;
      if (F.b.every((x) => x.st === "down")) fightWin();
      return;
    }
  }
  F.tr[F.tr.length - 1].spark = 1;
  ricochet(0.05);
}
function toggleCrouch() {
  const F = state2.run && state2.run.F;
  if (!F || !F.on || gameState.dialogLine || gameState.choiceOpen) return;
  F.out = !F.out;
}
function reloadGun() {
  const F = state2.run && state2.run.F;
  if (!F || !F.on || F.rl > 0 || F.ammo === 6) return;
  F.rl = 1.2;
  F.out = false;
  gunClick(2);
}
function fightWin() {
  const F = state2.run.F;
  F.on = false;
  state2.run.fightDone = true;
  F.out = false;
  say([
    ["Condutor", "Ai! Chega, chega! Eu desisto!"],
    ["Wesley", "Não atira mais! Meu braço... eu me rendo!"],
    ["Policial", "Armas no chão! Mãos na cabeça!"],
    ["Policial", "Estão feridos, mas vão ficar bem. Ninguém morre no meu turno."],
    ["Policial", "E essa garrafa térmica pendurada no seu cinto, Valter? Vamos ver o que tem dentro."],
    ["", "O policial desenrosca a tampa. Lá dentro, enrolada num pano, está a Lágrima do Sertão."],
    ["Seu Otávio", "É ela! Graças a Deus! Detetive, eu nem sei como agradecer!"]
  ], () => {
    state2.run.camFix = null;
    startCut();
  });
}
function fightLose() {
  const F = state2.run.F;
  F.on = false;
  F.out = false;
  F.esc = true;
  F.escT = 0;
  F.b.forEach((b) => {
    if (b.st !== "down") b.st = "run";
  });
}
function afterEscape() {
  say([
    [D, "Argh... o ombro..."],
    ["Policial", "Detetive! Eles estão fugindo pelo vagão 1!"],
    ["", "O trem freia na estação. As portas se abrem, e os dois somem no meio da multidão."],
    ["Óculos", "Os assaltantes escaparam com o diamante. Caso perdido."]
  ], () => {
    showOpts("E AGORA?", [{ t: "Tentar o confronto de novo", f: retryFight }, { t: "Voltar à estação", f: abandonCase2 }]);
  });
}
function retryFight() {
  state2.run.F = newFight(true);
  state2.run.phase = "fight";
  P.x = FX.cover;
  fightReady(true);
}
function c2FightTick(dt) {
  const F = state2.run.F;
  if (state2.run.phase === "flee") {
    state2.run.fleeT += dt;
    C2NPC.b.forEach((n) => {
      if (n.flee && !n.gone) {
        n.x -= 95 * dt;
        n.walking = true;
        if (n.x < -16) n.gone = true;
      }
    });
    const to = FX.cover - P.x;
    P.x += Math.sign(to) * Math.min(Math.abs(to), 70 * dt);
    P.dir = -1;
    P.moving = Math.abs(to) > 1;
    F.b.forEach((b) => {
      const d = b.hx - b.x;
      b.x += Math.sign(d) * Math.min(Math.abs(d), 70 * dt);
      if (Math.abs(d) < 1 && b.st === "run") {
        b.st = "hide";
      }
    });
    const c2 = F.cop, dc = FX.cop.hide - c2.x;
    c2.x += Math.sign(dc) * Math.min(Math.abs(dc), 80 * dt);
    if (Math.abs(dc) < 1) c2.st = "hide";
    if (state2.run.fleeT > 2.4 && !state2.run.throwSaid && !gameState.dialogLine) {
      state2.run.throwSaid = true;
      say([["Policial", "Detetive! Pega!"]], () => {
        F.gun = { t: 0 };
      });
    }
    if (F.gun) {
      F.gun.t += dt;
      if (F.gun.t >= 0.75) {
        F.gun = null;
        state2.run.phase = "fight";
        fightReady(false);
      }
    }
    return;
  }
  P.x = F.out ? FX.out : FX.cover;
  P.dir = -1;
  P.tx = null;
  P.pending = null;
  F.tr.forEach((s) => s.t -= dt);
  F.tr = F.tr.filter((s) => s.t > 0);
  if (F.msgT > 0) F.msgT -= dt;
  if (F.hurt > 0) F.hurt -= dt;
  if (F.esc) {
    F.escT += dt;
    F.b.forEach((b) => {
      if (b.st === "run") b.x -= 110 * dt;
    });
    if (F.escT > 1.6 && !F.escSaid) {
      F.escSaid = true;
      afterEscape();
    }
    return;
  }
  if (!F.on || gameState.dialogLine || gameState.choiceOpen) return;
  if (!F.out && F.ammo < 6 && F.rl <= 0) F.rl = 1;
  if (F.rl > 0) {
    F.rl -= dt;
    if (F.rl <= 0) {
      F.rl = 0;
      F.ammo = 6;
    }
  }
  const c = F.cop;
  c.tm -= dt;
  if (c.st === "hide" && c.tm <= 0) {
    c.st = "out";
    c.tm = 0.7;
  } else if (c.st === "out") {
    c.x += Math.sign(FX.cop.out - c.x) * Math.min(Math.abs(FX.cop.out - c.x), 120 * dt);
    if (c.tm <= 0.35 && !c.shot) {
      c.shot = true;
      const tg = F.b.find(bExposed) || F.b.find((b) => b.st !== "down");
      if (tg) {
        const hit2 = bExposed(tg) && Math.random() < 0.18;
        F.tr.push({ x0: c.x - 2, y0: 100, x1: tg.x + 6, y1: hit2 ? 108 : 112, t: 0.08, c: "#ffe7a0", spark: hit2 ? 0 : 1 });
        gunshot("cop");
        if (!hit2) ricochet(0.06);
        if (hit2) {
          tg.hp--;
          tg.st = tg.hp <= 0 ? "down" : "hurt";
          tg.tm = 0.45;
          if (F.b.every((x) => x.st === "down")) {
            fightWin();
            return;
          }
        }
      }
    }
    if (c.tm <= 0) {
      c.st = "back";
      c.shot = false;
    }
  } else if (c.st === "back") {
    const d = FX.cop.hide - c.x;
    c.x += Math.sign(d) * Math.min(Math.abs(d), 120 * dt);
    if (Math.abs(d) < 1) {
      c.st = "hide";
      c.tm = 1.8 + Math.random() * 1.6;
    }
  }
  const aiming = F.b.some((b) => b.st === "aim" || b.st === "step");
  for (const b of F.b) {
    if (b.st === "down") continue;
    b.tm -= dt;
    if (b.st === "hide" && b.tm <= 0) {
      if (aiming && Math.random() < 0.6) b.tm = 0.5;
      else {
        b.st = "step";
      }
    } else if (b.st === "step") {
      const d = b.ox - b.x;
      b.x += Math.sign(d) * Math.min(Math.abs(d), 110 * dt);
      if (Math.abs(d) < 1) {
        b.st = "aim";
        b.tm = 0.85;
        b.tg = c.st === "out" && Math.random() < 0.35 ? "cop" : "det";
      }
    } else if (b.st === "aim" && b.tm <= 0) {
      gunshot("bandit");
      if (b.tg === "cop" || !F.out) ricochet(0.07);
      if (b.tg === "cop") {
        F.tr.push({ x0: b.x + 16, y0: 110, x1: c.x + 6, y1: 98, t: 0.1, c: "#ff8a6a", spark: 1 });
        c.st = "back";
        c.shot = false;
      } else if (F.out) {
        F.hp--;
        F.hurt = 0.5;
        state2.run.shake = 0.35;
        F.out = false;
        F.tr.push({ x0: b.x + 16, y0: 110, x1: P.x, y1: 118, t: 0.1, c: "#ff8a6a" });
      } else F.tr.push({ x0: b.x + 16, y0: 110, x1: C2COV[3].x + 4, y1: 124, t: 0.1, c: "#ff8a6a", spark: 1 });
      b.st = "rec";
      b.tm = 0.35;
      if (F.hp <= 0) {
        fightLose();
        return;
      }
    } else if ((b.st === "rec" || b.st === "hurt") && b.tm <= 0) {
      b.st = "back";
    } else if (b.st === "back") {
      const d = b.hx - b.x;
      b.x += Math.sign(d) * Math.min(Math.abs(d), 110 * dt);
      if (Math.abs(d) < 1) {
        b.st = "hide";
        b.tm = 1 + Math.random() * 1.4;
      }
    }
  }
}
