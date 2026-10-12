// js/audio/ambient.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

/* Som ambiente: chuva com trovões na capa; gotas pingando e a música da sanfona na estação. */
var noiseBuf = null;
var ambi = { rain: null, station: null, lastLightning: 0, unlocked: false };
function getNoise(ac) {
  if (noiseBuf) return noiseBuf;
  noiseBuf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
  const d = noiseBuf.getChannelData(0);
  let b = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; b = 0.97 * b + 0.03 * w; d[i] = w * 0.6 + b * 2.2; }
  return noiseBuf;
}
function fadeOut(node, ac, then) {
  node.gain.setTargetAtTime(0, ac.currentTime, 0.4);
  setTimeout(then, 1800);
}
/* ---------- capa: chuva pesada, trovões e um grave sombrio ---------- */
function rainStart(ac) {
  if (ambi.rain) return;
  const out = ac.createGain(); out.gain.value = 0; out.connect(ac.destination);
  out.gain.setTargetAtTime(0.5, ac.currentTime, 1.2);
  const src = ac.createBufferSource(); src.buffer = getNoise(ac); src.loop = true;
  const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 350;
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3200;
  const g = ac.createGain(); g.gain.value = 0.16;
  src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(out); src.start();
  const lfo = ac.createOscillator(); lfo.frequency.value = 0.13; const lg = ac.createGain(); lg.gain.value = 0.05; lfo.connect(lg); lg.connect(g.gain); lfo.start();
  const drone = ac.createOscillator(); drone.type = "sawtooth"; drone.frequency.value = 43.6;
  const d2 = ac.createOscillator(); d2.type = "sawtooth"; d2.frequency.value = 46.2;
  const dl = ac.createBiquadFilter(); dl.type = "lowpass"; dl.frequency.value = 140;
  const dg = ac.createGain(); dg.gain.value = 0.05;
  drone.connect(dl); d2.connect(dl); dl.connect(dg); dg.connect(out); drone.start(); d2.start();
  ambi.rain = { out, nodes: [src, lfo, drone, d2] };
}
/** Trovão: estrondo grave que rola e some. Na estação chega mais abafado e com atraso (está longe). */
function thunderInto(ac, dest, peak, cutoff, delay) {
  const src = ac.createBufferSource(); src.buffer = getNoise(ac);
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = cutoff;
  const g = ac.createGain(); const t0 = ac.currentTime + delay;
  g.gain.setValueAtTime(0.0001, ac.currentTime); g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(peak, t0 + 0.18);
  g.gain.exponentialRampToValueAtTime(peak * 0.35, t0 + 0.9);
  g.gain.exponentialRampToValueAtTime(peak * 0.6, t0 + 1.3);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 3.6);
  src.connect(lp); lp.connect(g); g.connect(dest); src.start(); src.stop(t0 + 3.8);
}
function thunder(ac) {
  if (!ambi.rain) return;
  thunderInto(ac, ambi.rain.out, 0.9, 180, 0.25);
}
function rainStop(ac) {
  if (!ambi.rain) return;
  const r = ambi.rain; ambi.rain = null;
  fadeOut(r.out, ac, () => r.nodes.forEach((n) => { try { n.stop(); } catch (e) {} }));
}
/* ---------- estação: gotas e a sanfona do Seu Zé ---------- */
// Melodia original em ré menor, com cromatismo e trítono: clima de filme noir com mistério.
var ZE_MEL = [[62, 1], [65, 0.5], [69, 0.5], [68, 1], [69, 1], [65, 0.5], [64, 0.5], [62, 1], [61, 1], [0, 1],
  [62, 0.5], [65, 0.5], [70, 1], [69, 0.5], [67, 0.5], [65, 1], [64, 0.5], [65, 0.5], [64, 0.5], [61, 0.5], [62, 2],
  [69, 1], [72, 0.5], [70, 0.5], [69, 1], [68, 1], [67, 0.5], [65, 0.5], [64, 1], [63, 1], [0, 1],
  [62, 0.5], [64, 0.5], [65, 0.5], [68, 0.5], [69, 1], [61, 1], [62, 3], [0, 1]];
var ZE_BASS = [[38, [50, 53, 57]], [45, [49, 52, 55]], [38, [50, 53, 57]], [43, [50, 55, 58]], [46, [50, 53, 58]], [45, [49, 52, 55]], [38, [50, 53, 57]], [45, [49, 52, 55]]];
function reed(ac, dest, m, t0, dur, vol, bright) {
  const f = 440 * Math.pow(2, (m - 69) / 12);
  const o1 = ac.createOscillator(); o1.type = "square"; o1.frequency.value = f;
  const o2 = ac.createOscillator(); o2.type = "sawtooth"; o2.frequency.value = f * 1.004;
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = bright;
  const g = ac.createGain();
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + 0.05);
  g.gain.setValueAtTime(vol * 0.85, Math.max(t0 + 0.06, t0 + dur - 0.08)); g.gain.linearRampToValueAtTime(0, t0 + dur);
  const trem = ac.createOscillator(); trem.frequency.value = 5.6; const tg = ac.createGain(); tg.gain.value = vol * 0.18; trem.connect(tg); tg.connect(g.gain);
  o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(dest);
  [o1, o2, trem].forEach((o) => { o.start(t0); o.stop(t0 + dur + 0.05); });
}
function stationStart(ac) {
  if (ambi.station) return;
  const out = ac.createGain(); out.gain.value = 0; out.connect(ac.destination);
  const pan = ac.createStereoPanner ? ac.createStereoPanner() : null;
  const music = ac.createGain(); music.gain.value = 0;
  if (pan) { music.connect(pan); pan.connect(out); } else music.connect(out);
  const dly = ac.createDelay(); dly.delayTime.value = 0.32; const fb = ac.createGain(); fb.gain.value = 0.22;
  music.connect(dly); dly.connect(fb); fb.connect(dly); dly.connect(out);
  out.gain.setTargetAtTime(1, ac.currentTime, 0.8);
  // chuva lá fora, abafada pelas paredes da estação
  const rsrc = ac.createBufferSource(); rsrc.buffer = getNoise(ac); rsrc.loop = true;
  const rhp = ac.createBiquadFilter(); rhp.type = "highpass"; rhp.frequency.value = 220;
  const rlp = ac.createBiquadFilter(); rlp.type = "lowpass"; rlp.frequency.value = 1150;
  const rg = ac.createGain(); rg.gain.value = 0.065;
  rsrc.connect(rhp); rhp.connect(rlp); rlp.connect(rg); rg.connect(out); rsrc.start();
  const st = { out, music, pan, rain: rsrc, next: ac.currentTime + 0.4, i: 0, bar: 0, beat: 0 };
  const beat = 60 / 76;
  st.timer = setInterval(() => {
    if (ambi.station !== st) return;
    while (st.next < ac.currentTime + 0.3) {
      const [m, b] = ZE_MEL[st.i % ZE_MEL.length];
      const swing = b === 0.5 && st.beat % 1 === 0 ? 1.15 : b === 0.5 ? 0.85 : 1;
      const dur = b * beat * swing;
      if (m) reed(ac, music, m, st.next, dur * 0.95, 0.07, 2100);
      const whole = Math.floor(st.beat);
      if (Math.abs(st.beat - whole) < 1e-6) {
        const [root, chord] = ZE_BASS[Math.floor(whole / 4) % ZE_BASS.length];
        if (whole % 2 === 0) reed(ac, music, root, st.next, beat * 0.45, 0.06, 600);
        else chord.forEach((c) => reed(ac, music, c, st.next, beat * 0.35, 0.025, 1200));
      }
      st.beat += b; st.next += dur; st.i++;
    }
    void 0;
  }, 80);
  ambi.station = st;
}
function stationStop(ac) {
  if (!ambi.station) return;
  const st = ambi.station; ambi.station = null;
  clearInterval(st.timer);
  fadeOut(st.out, ac, () => { try { st.rain.stop(); st.out.disconnect(); } catch (e) {} });
}
/** Chamado a cada quadro: decide o que deve tocar. */
function ambientAudio() {
  const ac = gameState.audioCtx;
  if (!ac || !ambi.unlocked) return;
  const cover = gameState.mode === "menu" || gameState.mode === "fade" && gameState.fadeTimer < 0.5;
  const station = gameState.mode === "play" && gameState.scene === "station" && gameState.cutscene < 0 && !FIN.on && !gameState.finaleClock;
  if (cover) rainStart(ac); else rainStop(ac);
  if (station) stationStart(ac); else stationStop(ac);
  if (gameState.lightning > 0 && ambi.lastLightning <= 0) {
    if (ambi.rain) thunder(ac);
    else if (ambi.station && Math.random() < 0.6) thunderInto(ac, ambi.station.out, 0.32, 140, 0.4 + Math.random() * 1.2);
  }
  ambi.lastLightning = gameState.lightning;
  const st = ambi.station;
  if (st) {
    // a música vem da sanfona: mais alta perto do Seu Zé e do lado em que ele está
    const dx = SANFONEIRO.x + 6 - P.x, near = Math.max(0, 1 - Math.abs(dx) / 300);
    st.music.gain.setTargetAtTime(0.1 + 0.35 * near * near, ac.currentTime, 0.15);
    if (st.pan) st.pan.pan.setTargetAtTime(Math.max(-0.8, Math.min(0.8, dx / 160)), ac.currentTime, 0.15);
  }
}
function installAmbient() {
  const unlock = () => { audioInit(); ambi.unlocked = !!gameState.audioCtx; };
  for (const ev of ["pointerdown", "keydown", "touchstart"]) addEventListener(ev, unlock, { passive: true });
}

/* ---------- trilhas dos casos: elevador (caso 1), trem andando e ação (caso 2) ---------- */
var caseAud = { elev: null, train: null, action: null };
function schedLoop(ac, makeStep, stepLen, vol) {
  const out = ac.createGain(); out.gain.value = 0; out.connect(ac.destination);
  out.gain.setTargetAtTime(vol, ac.currentTime, 0.6);
  const st = { out, next: ac.currentTime + 0.1, i: 0 };
  st.timer = setInterval(() => {
    while (st.next < ac.currentTime + 0.3) { makeStep(st, st.next); st.next += stepLen; st.i++; }
  }, 70);
  return st;
}
function stopLoop(key) {
  const st = caseAud[key], ac = gameState.audioCtx;
  if (!st || !ac) return;
  caseAud[key] = null; clearInterval(st.timer);
  st.out.gain.setTargetAtTime(0, ac.currentTime, 0.4);
  setTimeout(() => { try { st.out.disconnect(); if (st.noise) st.noise.stop(); } catch (e) {} }, 1800);
}
function tone(ac, dest, type, f, t0, dur, vol, attack, cutoff) {
  const o = ac.createOscillator(); o.type = type; o.frequency.value = f;
  const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + (attack || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  if (cutoff) { const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = cutoff; o.connect(lp); lp.connect(g); } else o.connect(g);
  g.connect(dest); o.start(t0); o.stop(t0 + dur + 0.02);
}
function noiseHit(ac, dest, t0, dur, vol, hp, lp) {
  const s = ac.createBufferSource(); s.buffer = getNoise(ac);
  const h = ac.createBiquadFilter(); h.type = "highpass"; h.frequency.value = hp;
  const l = ac.createBiquadFilter(); l.type = "lowpass"; l.frequency.value = lp;
  const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  s.connect(h); h.connect(l); l.connect(g); g.connect(dest); s.start(t0, Math.random()); s.stop(t0 + dur + 0.02);
}
const mf = (m) => 440 * Math.pow(2, (m - 69) / 12);
// caso 1: "música de elevador" em bossa nova suave (vibrafone, baixo e chocalho)
var ELEV_CHORDS = [[48, [64, 67, 71, 74]], [45, [64, 67, 72, 76]], [50, [65, 69, 72, 76]], [43, [65, 71, 74, 77]]];
var ELEV_MEL = [76, 0, 74, 72, 0, 74, 0, 0, 72, 0, 69, 67, 0, 69, 0, 0, 77, 0, 76, 74, 0, 72, 0, 0, 74, 0, 72, 71, 0, 67, 0, 0];
function elevStart(ac) {
  if (caseAud.elev) return;
  const step = 60 / 104 / 2;
  caseAud.elev = schedLoop(ac, (st, t0) => {
    const k = st.i % 32, bar = Math.floor(st.i / 8) % 4, [root, ch] = ELEV_CHORDS[bar];
    if (k % 8 === 0) tone(ac, st.out, "triangle", mf(root - 12), t0, step * 2.6, 0.09, 0.01, 500);
    if (k % 8 === 3) tone(ac, st.out, "triangle", mf(root - 5), t0, step * 1.6, 0.06, 0.01, 500);
    if (k % 8 === 2 || k % 8 === 5) ch.forEach((c) => tone(ac, st.out, "sine", mf(c), t0, step * 2.2, 0.018, 0.02));
    if (ELEV_MEL[k]) { tone(ac, st.out, "sine", mf(ELEV_MEL[k]), t0, step * 3, 0.04, 0.01); tone(ac, st.out, "sine", mf(ELEV_MEL[k]) * 4, t0, step * 0.8, 0.006, 0.005); }
    noiseHit(ac, st.out, t0, 0.05, k % 2 ? 0.012 : 0.02, 5000, 12000);
  }, step, 0.55);
}
// caso 2: trem em movimento (ronco grave contínuo + batidas dos trilhos)
function trainStart(ac) {
  if (caseAud.train) return;
  const beat = 0.56;
  const st = schedLoop(ac, (s, t0) => {
    const k = s.i % 4;
    if (k === 0 || k === 1) { noiseHit(ac, s.out, t0 + (k ? 0.11 : 0), 0.12, 0.12, 60, 700); tone(ac, s.out, "sine", 70, t0 + (k ? 0.11 : 0), 0.12, 0.08); }
  }, beat, 0.45);
  const src = ac.createBufferSource(); src.buffer = getNoise(ac); src.loop = true;
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 260;
  const g = ac.createGain(); g.gain.value = 0.22;
  const lfo = ac.createOscillator(); lfo.frequency.value = 0.4; const lg = ac.createGain(); lg.gain.value = 0.05; lfo.connect(lg); lg.connect(g.gain); lfo.start();
  src.connect(lp); lp.connect(g); g.connect(st.out); src.start();
  st.noise = src;
  caseAud.train = st;
}
// caso 2: trilha de ação do tiroteio (bateria, baixo e cordas staccato)
var ACT_BASS = [40, 40, 52, 40, 43, 40, 47, 45];
var ACT_STAB = [[64, 67, 71], 0, 0, [64, 67, 71], 0, [65, 69, 72], 0, [62, 66, 69]];
function actionStart(ac) {
  if (caseAud.action) return;
  const step = 60 / 148 / 2;
  caseAud.action = schedLoop(ac, (st, t0) => {
    const k = st.i % 16, bar = Math.floor(st.i / 16) % 2;
    if (k % 4 === 0 || k === 14) { tone(ac, st.out, "sine", 120, t0, 0.18, 0.5, 0.003); tone(ac, st.out, "sine", 55, t0, 0.22, 0.4, 0.003); }
    if (k % 8 === 4) noiseHit(ac, st.out, t0, 0.16, 0.32, 900, 6000);
    noiseHit(ac, st.out, t0, 0.04, k % 2 ? 0.05 : 0.08, 7000, 14000);
    const b = ACT_BASS[(k >> 1) % 8] + (bar ? -2 : 0);
    if (k % 2 === 0) tone(ac, st.out, "sawtooth", mf(b), t0, step * 0.9, 0.09, 0.005, 700);
    const s = ACT_STAB[(k >> 1) % 8];
    if (s && k % 2 === 0) s.forEach((m) => tone(ac, st.out, "sawtooth", mf(m + (bar ? -2 : 0)), t0, step * 0.7, 0.03, 0.004, 2600));
  }, step, 0.5);
}
/* ---------- sons das luzes do trem (apagão do caso 1) ---------- */
function lightsFlickerSfx() {
  audioInit();
  const ac = gameState.audioCtx;
  if (!ac) return;
  const t0 = ac.currentTime;
  const hum = ac.createOscillator(); hum.type = "square"; hum.frequency.value = 120;
  const hl = ac.createBiquadFilter(); hl.type = "lowpass"; hl.frequency.value = 900;
  const hg = ac.createGain(); hg.gain.setValueAtTime(0.0001, t0);
  for (let k = 0; k < 9; k++) { const tk = t0 + k * 0.075 + Math.random() * 0.03; hg.gain.setValueAtTime(k % 2 ? 0.0001 : 0.06, tk); }
  hg.gain.setValueAtTime(0.0001, t0 + 0.72);
  hum.connect(hl); hl.connect(hg); hg.connect(ac.destination); hum.start(t0); hum.stop(t0 + 0.75);
  for (let k = 0; k < 7; k++) noiseHit(ac, ac.destination, t0 + Math.random() * 0.68, 0.025 + Math.random() * 0.03, 0.18 + Math.random() * 0.15, 1500, 9000);
}
function lightsOffSfx() {
  const ac = gameState.audioCtx;
  if (!ac) return;
  const t0 = ac.currentTime;
  noiseHit(ac, ac.destination, t0, 0.22, 0.55, 40, 500);
  tone(ac, ac.destination, "sine", 95, t0, 0.5, 0.45, 0.004);
  const o = ac.createOscillator(); o.type = "sawtooth"; o.frequency.setValueAtTime(880, t0); o.frequency.exponentialRampToValueAtTime(45, t0 + 0.9);
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1400;
  const g = ac.createGain(); g.gain.setValueAtTime(0.07, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.95);
  o.connect(lp); lp.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + 1);
  tone(ac, ac.destination, "triangle", 2600, t0 + 0.12, 0.25, 0.05, 0.002);
}
function lightsOnSfx() {
  const ac = gameState.audioCtx;
  if (!ac) return;
  const t0 = ac.currentTime;
  for (let k = 0; k < 3; k++) noiseHit(ac, ac.destination, t0 + k * 0.09, 0.03, 0.22, 2000, 9000);
  const o = ac.createOscillator(); o.type = "square"; o.frequency.setValueAtTime(55, t0); o.frequency.exponentialRampToValueAtTime(120, t0 + 0.5);
  const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 700;
  const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.07, t0 + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.1);
  o.connect(lp); lp.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + 1.15);
}
function caseMusic() {
  const ac = gameState.audioCtx;
  if (!ac || !ambi.unlocked) return;
  const inCase = gameState.mode === "play" && gameState.scene === "case" && gameState.cutscene < 0;
  const r1 = state1.run, r2 = state2.run;
  const elev = inCase && gameState.caseIndex === 0 && r1 && ["tras", "frente", "cab"].includes(r1.sec) && r1.ev !== 1;
  const train = inCase && gameState.caseIndex === 1 && r2 && r2.phase !== "gas";
  const action = inCase && gameState.caseIndex === 1 && r2 && (r2.phase === "flee" || r2.phase === "fight" && r2.F && (r2.F.on || r2.F.esc));
  if (elev) elevStart(ac); else stopLoop("elev");
  if (train) trainStart(ac); else stopLoop("train");
  if (action) actionStart(ac); else stopLoop("action");
  gasAudio(ac, inCase && gameState.caseIndex === 1 && r2 ? r2.phase : null);
}
/* ---------- caso 2: chiado do gás sonífero saindo das ventilações ---------- */
var gasAud = null, lastGasPhase = null;
function gasAudio(ac, phase) {
  const on = phase === "gas" || phase === "mask";
  if (phase === "gas" && lastGasPhase !== "gas") {
    // estouro inicial: o registro abre e o gás sai sob pressão
    noiseHit(ac, ac.destination, ac.currentTime, 0.6, 0.45, 1500, 9000);
    tone(ac, ac.destination, "sine", 85, ac.currentTime, 0.35, 0.3, 0.004);
  }
  lastGasPhase = phase;
  if (on && !gasAud) {
    const src = ac.createBufferSource(); src.buffer = getNoise(ac); src.loop = true;
    const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 4200; bp.Q.value = 0.6;
    const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1800;
    const g = ac.createGain(); g.gain.value = 0;
    const lfo = ac.createOscillator(); lfo.frequency.value = 0.7; const lg = ac.createGain(); lg.gain.value = 0.02; lfo.connect(lg); lg.connect(g.gain); lfo.start();
    src.connect(hp); hp.connect(bp); bp.connect(g); g.connect(ac.destination); src.start();
    gasAud = { src, g, lfo };
  }
  if (gasAud) {
    let v = 0;
    if (phase === "gas") v = 0.22;
    else if (phase === "mask") {
      // com a máscara, o chiado fica mais forte perto da grade de onde o gás está saindo
      const near = state2.run.sec === "b" ? Math.max(0, 1 - Math.abs(P.x - (SRC_VENT + 12)) / 260) : 0;
      v = 0.04 + 0.16 * near;
    }
    gasAud.g.gain.setTargetAtTime(v, ac.currentTime, 0.25);
    if (!on) {
      const a = gasAud; gasAud = null;
      setTimeout(() => { try { a.src.stop(); a.lfo.stop(); } catch (e) {} }, 1500);
    }
  }
}
