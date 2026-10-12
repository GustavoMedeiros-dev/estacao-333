// js/game/render.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

function drawPlay() {
  const c = Math.round(gameState.cameraX * K) / K, ac = activeCase();
  const shk = ac && ac.shaking && ac.shaking() ? Math.round(Math.random() * 2 - 1) : 0;
  ctx.save();
  ctx.translate(-c + shk, 0);
  if (ac) {
    ac.draw();
    drawClues();
    ac.drawDoors();
  } else drawStation();
  if (gameState.glassesOn) drawVision();
  if (gameState.cutscene !== 3) {
    if (!(ac && ac.drawPlayer && ac.drawPlayer())) drawDetective(P.x, FEET, P.dir, P.moving, P.walk);
    if (ac && ac.drawFront) ac.drawFront();
  }
  if (gameState.scene === "station") {
    ctx.globalCompositeOperation = "lighter";
    LAMPS.forEach((lx, i) => lampCone(lx, lampOn(i)));
    ctx.globalCompositeOperation = "source-over";
    for (const s of smoke) R(s.x, s.y, s.r, s.r, `rgba(120,110,130,${Math.max(0, s.a)})`);
  }
  if (gameState.hovered) {
    const h = gameState.hovered;
    R(h.x, h.y + h.h, h.w, 1, "rgba(232,176,74,.5)");
  }
  ctx.restore();
  const grade = gameState.glassesOn ? GRADES.vision : ac ? ac.grade ? ac.grade() : GRADES.wagon : GRADES.station;
  postProcess(grade);
  if (gameState.glassesOn) drawVisionHud();
  if (gameState.objScan && !gameState.glassesOn) {
    const s = gameState.objScan;
    gameState.objScan = null;
    gameState.inputLocked = false;
    s.then();
  }
  R(0, 0, W, 4, "rgba(0,0,0,.25)");
  R(0, H - 3, W, 3, "rgba(0,0,0,.3)");
  if (ac && !gameState.choiceOpen && !gameState.adviceText && gameState.cutscene < 0 && ac.showClueCounter()) text("PISTAS " + gameState.cluesFound + " DE " + gameState.clueTotal, 4, 6, "#5fe0ff");
  if (ac && ac.drawFx) ac.drawFx();
  if (gameState.fadeIn > 0) R(0, 0, W, H, `rgba(0,0,0,${Math.min(1, gameState.fadeIn * 2)})`);
}
