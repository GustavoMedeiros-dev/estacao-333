// js/ui/cover.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var COVER_PANELS = {
  sobre: { title: "SOBRE", html: "<p>Esse jogo foi desenvolvido por estudantes do curso bacharelado em Ciência da Computação da UFPB. Inteiramente desenvolvido utilizando Inteligências Artificiais generativas.</p>" },
  devs: { title: "DESENVOLVEDORES", html: "<ul><li>Arthur Henrique</li><li>Cristiano Asafe</li><li>Gustavo Medeiros</li><li>José Otávio</li><li>Severino Carlos</li></ul>" }
};
var coverPanel, coverPanelTitle, coverPanelBody, coverNav = [];
function coverPanelOpen() { return !!coverPanel && coverPanel.classList.contains("open"); }
function closePanel() {
  if (!coverPanel) return;
  coverPanel.classList.remove("open");
  coverNav.forEach((b) => b.classList.toggle("on", b.dataset.panel === "jogo"));
}
function openPanel(key) {
  const p = COVER_PANELS[key];
  if (!p) { closePanel(); return; }
  coverPanelTitle.textContent = p.title;
  coverPanelBody.innerHTML = p.html;
  coverPanel.classList.add("open");
  coverNav.forEach((b) => b.classList.toggle("on", b.dataset.panel === key));
}
function installCover() {
  coverPanel = document.getElementById("mpanel");
  if (!coverPanel || !coverPanel.querySelector) return;
  coverPanelTitle = coverPanel.querySelector(".ph");
  coverPanelBody = coverPanel.querySelector(".pb");
  coverNav = Array.from(document.querySelectorAll ? document.querySelectorAll(".pxnav") : []);
  coverNav.forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); openPanel(b.dataset.panel); }));
  const close = document.getElementById("mclose");
  if (close) close.addEventListener("click", (e) => { e.stopPropagation(); closePanel(); });
  const play = document.getElementById("play");
  if (play) play.addEventListener("click", (e) => { e.stopPropagation(); closePanel(); if (IS_TOUCH) enterFullscreen(); startGame(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") closePanel(); });
  closePanel();
}
