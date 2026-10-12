// js/core/config.js
// Trecho extraído do index.html (versão final empacotada) para leitura e estudo.
// Para jogar ou editar o jogo que roda, use o index.html na raiz do repositório.

var W = 256;
var H = 144;
var K = 4;
var FEET = 128;
var SPEED = 55;
var clamp01 = (v) => Math.max(0, Math.min(1, v));
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
