// js/cases/case2/index.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

CASES[1] = { cl: CL2, W: 420, sx: 90, draw: drawCase2 };
Object.assign(CASES[1], {
  pfx: "Como provar que",
  ord: [0, 1, 2, 3, 4, 6, 5],
  mem: [
    mk("Roubo planejado", " ", "o roubo foi planejado"),
    mk("Dois assaltantes acordados", " ", "por dois assaltantes"),
    mk("Equipamento da tripulação", ", ", "com equipamento da equipe"),
    mk("Maleta aberta sem arrombamento", ", ", "maleta aberta"),
    mk("Código da maleta", ", ", "código do bilhete"),
    mk("Dívida com agiota", " e ", "dívida"),
    mk("Cúmplice sumido do assento", ", ", "um cúmplice")
  ],
  start: [["", "Plataforma 2. Um expresso noturno, de vagões azuis. As portas se fecham e o trem parte."], [D, "Viagem curta até a próxima estação. Vamos ver o que tem de interessante por aqui."], ["Óculos", "Chegada à próxima estação em 9 minutos. O tempo já está correndo: o relógio fica no alto da tela."], ["Óculos", "Nada fora do comum detectado. São dois vagões de passageiros; a área da tripulação fica no fim do segundo."]],
  povN: [["", "O detetive olha a cafeteira ainda quente. Ele respira fundo e acessa a interface dos óculos."]],
  dir: "Dupla identificada: o condutor Valter e o rapaz de moletom, Wesley. Eles leram o código, taparam a câmera e soltaram o gás. O diamante ainda está com eles. Volte ao vagão 2: Seu Otávio está em perigo.",
  adv: "Volte ao vagão 2. O Seu Otávio pode estar em perigo.",
  cut: {
    a: [["", "O policial algema o Valter e o Wesley. Os dois estão feridos, mas vivos."], ["Condutor", "Eu devia dinheiro para gente perigosa, doutor... Eles iam atrás da minha família."], ["Policial", "Então o senhor devia ter procurado a polícia, não um diamante."]],
    card: [["", "Alguns dias depois."]],
    b: [
      ["", "Tribunal de Justiça. Sala de audiências da Vara Criminal."],
      ["Juíza", "Diante das provas reunidas pela investigação e do depoimento das testemunhas, declaro os réus Valter e Wesley culpados por roubo qualificado."],
      ["Juíza", "A pena será cumprida em regime fechado. A Lágrima do Sertão deve ser devolvida ao seu portador. Está encerrada a sessão."],
      ["Seu Otávio", "Obrigado, excelência. E obrigado, detetive."],
      ["", "O Seu Otávio entregou o diamante à joalheria do Recife, com um dia de atraso e uma história para contar."],
      ["", "E a Dona Marlene chegou ao aniversário do neto com a feijoada ainda quente."]
    ]
  }
});
Object.assign(CASES[1], {
  drawPlayerAccessory(px, gy) {
    if (state2.run && state2.run.mask) {
      px(4, gy + 1, "#2a2a34");
      [5, 6, 7, 8].forEach((c) => px(c, gy + 1, "#7a8094"));
      px(9, gy + 1, "#5a5f6a");
      px(6, gy + 2, "#7a8094");
      px(7, gy + 2, "#5a5f6a");
      px(8, gy + 2, "#7a8094");
      px(9, gy + 2, "#3a3f4a");
      px(10, gy + 2, "#3a3f4a");
      px(10, gy + 3, "#3a3f4a");
    }
  },
  actionLabel() {
    return state2.run && state2.run.phase === "fight" && state2.run.F && state2.run.F.on && !gameState.dialogLine && !gameState.choiceOpen ? state2.run.F.out ? "ABRIGAR" : "SAIR" : null;
  },
  tick: c2Tick,
  drawDoors: c2Doors,
  doorTarget: c2DoorTarget,
  drawCut: drawCut2,
  drawFx: c2Fx,
  drawFront() {
    if (state2.run && state2.run.sec === "b") drawC2Front();
  },
  shaking: () => !!state2.run && state2.run.shake > 0,
  showClueCounter: () => !!state2.run && state2.run.phase === "inv" && !state2.run.fight,
  cameraFix: () => state2.run && state2.run.camFix != null ? state2.run.camFix : null,
  drawPlayer() {
    if (!state2.run) return false;
    if (state2.run.dp > 0 || state2.run.dsw > 0) spriteRot(DET_IDLE, DET_PAL, Math.round(P.x), Math.round(fallY(FEET, state2.run.dp)), fallAng(state2.run.dp) + (state2.run.dsw > 0 ? Math.sin(gameState.clock * 8) * 0.12 : 0), P.dir < 0);
    else drawDetective(P.x, FEET + (state2.run.phase === "fight" ? state2.run.F && state2.run.F.out ? 8 : 12 : state2.run.phase === "flee" ? 8 : 0), P.dir, P.moving, P.walk);
    return true;
  },
  onPointer(p) {
    if (state2.run && state2.run.phase === "fight" && state2.run.F && state2.run.F.on && !gameState.dialogLine && !gameState.choiceOpen) {
      fightClick(p);
      return true;
    }
    return false;
  },
  onKeyDown(e) {
    if (!(state2.run && state2.run.phase === "fight" && state2.run.F && state2.run.F.on && !gameState.dialogLine && !gameState.choiceOpen)) return;
    const k = e.key;
    if ([" ", "ArrowDown", "s", "S", "c", "C"].includes(k)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleCrouch();
    } else if (k === "r" || k === "R") {
      e.preventDefault();
      e.stopImmediatePropagation();
      reloadGun();
    }
  },
  onActionButton() {
    toggleCrouch();
  },
  enterFresh() {
    gameState.hotspots = initC2();
    say(CASES[1].start);
  },
  enterBack() {
    if (state2.run) {
      state2.run.sec = "a";
      if (state2.run.phase === "pre") {
        say([["Óculos", "De volta ao expresso."]]);
        return;
      }
    }
    welcomeBack();
  },
  /** O caso já foi começado? */
  started: () => !!state2.run,
  /** Porcentagem: sobreviver ao gás (10) + pistas (50) + dedução (15) + confronto (10) + tiroteio (10). */
  progress(found, solved) {
    const r = state2.run;
    if (!r) return 0;
    const after = ["gas", "mask", "clear", "inv", "standoff", "flee", "fight"].indexOf(r.phase);
    return (r.revealed ? 10 : after >= 0 ? 5 : 0) + 50 * found / CL2.length + (solved ? 15 : 0) + (after >= 4 ? 10 : 0) + (r.phase === "fight" ? 10 : 0);
  },
  reset() {
    state2.run = null;
  }
});
Object.assign(CLUE_ART, C2ART);
