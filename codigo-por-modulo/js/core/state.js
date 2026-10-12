// js/core/state.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var gameState = {
  worldWidth: 640,
  // largura do mundo atual (px)
  dialogQueue: [],
  // falas pendentes
  dialogLine: null,
  // fala atual [quem, texto]
  dialogShown: 0,
  // caracteres exibidos
  dialogAfter: null,
  // função chamada ao fim do diálogo
  scene: "station",
  // 'station' ou 'case'
  hotspots: null,
  // objetos interativos do cenário atual
  cluesFound: 0,
  // pistas coletadas no caso
  caseSolved: false,
  // o prompt final já foi deduzido?
  promptStarted: false,
  // cutscene do prompt já disparada?
  adviceText: "",
  // orientação da IA no canto da tela
  cutscene: -1,
  // -1 = nenhuma; 0-2 = encerramento; 3 = primeira pessoa
  choiceOpen: false,
  // menu de opções aberto?
  fadeIn: 0,
  // tempo restante do fade de transição
  choiceHandlers: [],
  // ações das opções do menu
  clueTotal: 6,
  // total de pistas do caso
  caseIndex: 0,
  // índice do caso atual
  inputLocked: false,
  // entrada bloqueada por evento
  audioCtx: null,
  // contexto de áudio
  mode: "menu",
  // 'menu' | 'fade' | 'play'
  clock: 0,
  // relógio do jogo (s)
  fadeTimer: 0,
  // tempo da transição menu → jogo
  cameraX: 0,
  // posição X da câmera
  hovered: null,
  // hotspot sob o mouse
  glassesOn: false,
  // óculos colocados?
  scanProgress: 0,
  // progresso da varredura dos óculos
  lightningIn: 6 + Math.random() * 6,
  // tempo até o próximo relâmpago
  lightning: 0,
  // brilho do relâmpago atual
  smokeTimer: 0
};
var done = [false, false, false];
var caseSave = [null, null, null];
var P = { x: 70, dir: 1, tx: null, pending: null, walk: 0, moving: false, vel: 0, lead: 0 };
var keys = { l: false, r: false };
var mouse = { x: -1, y: -1, in: false };
var smoke = [];
var drops = [];
for (let i = 0; i < 110; i++) drops.push({ x: Math.random() * W, y: Math.random() * H, v: 130 + Math.random() * 90 });
