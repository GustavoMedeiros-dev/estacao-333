# Arquitetura do Estação 3:33

Este documento explica como o jogo é organizado e como as partes conversam entre si. O código de cada módulo citado aqui está em `codigo-por-modulo/`.

## Visão geral

O jogo é uma aplicação de página única, sem servidor. Tudo acontece num `<canvas>` de **256 × 144 pixels lógicos**, desenhado com resolução interna 4× maior e ampliado para a tela. Os textos de interface (diálogos, menus, botões) são HTML por cima do canvas.

```
          ┌──────────────── index.html ────────────────┐
          │  capa (HTML + arte)   canvas   diálogos/HUD │
          └───────────────┬────────────────────────────┘
                          │
                   game/loop.js  ── a cada quadro (até 60 por segundo):
                          │          1. atualiza o estado (update)
                          │          2. desenha a cena (render)
                          │          3. ajusta sons e trilhas
        ┌─────────────────┼──────────────────────┐
   scenes/ (estação,  cases/ (caso 1, 2, 3)   ui/ (óculos, HUD,
   capa, final)       via cases/registry.js    dedução, celular)
        └─────────── core/ (estado, canvas, diálogo, áudio, entrada) ───┘
```

## Camadas

### `core/`: o motor

| Módulo | Responsabilidade |
|---|---|
| `config.js` | Tamanho da tela lógica (256×144), escala interna e constantes |
| `state.js` | O estado global do jogo (`gameState`), o detetive (`P`), casos resolvidos (`done`) e progresso salvo |
| `dom.js` | Referências aos elementos HTML (diálogo, HUD, botões) |
| `canvas.js` | Primitivas de desenho em pixel: retângulo, linha, disco, sprite com contorno e sombra, textos em fonte bitmap e vetorial; ajuste de escala e tela cheia |
| `dialog.js` | Fila de falas com efeito de máquina de escrever (`say`) |
| `audio.js` | Base de áudio: contexto Web Audio e a música de violino do caso 1 |
| `input.js` | Teclado, mouse e toque: andar, interagir, atalhos |

### `game/`: laço e desenho

- `loop.js`: o laço principal (`requestAnimationFrame`, limitado a 60 quadros por segundo), atualização do estado, transições entre capa, jogo e cenas, e reinício.
- `render.js`: desenha a cena atual (estação ou caso), o detetive, os efeitos de luz e o HUD.

### `render/` e `sprites/`

- `sprites/shared.js`: gerador de personagens (`npcRows`) com cabeça grande, olhos, nariz, cabelos, óculos, bigode, roupas, poses sentado e criança. As paletas (`pl`) definem as cores, e o contorno escuro e a sombra da pele são automáticos.
- `render/detective.js`: o detetive (chapéu, sobretudo, cachecol, óculos de IA) com respiração, passos e animações.
- `render/fx.js`: pós-processamento: brilho (bloom), gradação de cor por cena, poeira no ar. Para ficar leve, o brilho é recalculado a cada 3 quadros, e a vinheta e o granulado são camadas CSS feitas pela placa de vídeo.

### `scenes/`: lugares fora dos casos

- `menu.js`: a chuva animada por cima da arte da capa.
- `station.js`: a estação central (hub), os três trens, o quadro de partidas e os personagens fixos (Dona Célia, Seu Bento).
- `station-life.js`: a vida da estação: passageiros apressados (com conversa), o sanfoneiro, a leitora de jornal, o letreiro de avisos, a aparência de cada trem e os ladrões tramando no canto (antes do caso 2).
- `finale.js`: o final do jogo depois dos três casos: o relógio voltando a andar, a Dona Célia, o trem sem retorno, créditos e a cena pós-créditos do caso 04.

### `cases/`: os casos

Cada caso é um módulo independente que segue o mesmo **contrato**, registrado em `cases/registry.js`:

| Gancho | Para que serve |
|---|---|
| `enterFresh()` / `enterBack()` | Entrar pela primeira vez ou voltar a um caso em andamento |
| `tick(dt)` | Lógica a cada quadro (fantasma, gás, tiroteio, eventos) |
| `draw()` / `drawDoors()` | Desenhar os vagões e as portas |
| `started()` / `progress()` | Informar se o caso começou e a porcentagem concluída |
| `cl`, `mem`, `dir`, `adv`, `cut` | Pistas, memórias para a dedução, conclusão, orientação e cenas finais |

Cada pasta de caso é dividida em:

- `data.js`: textos, pistas, personagens e falas
- `state.js`: o estado do caso (fase atual, posição do fantasma, relógio etc.)
- `logic.js`: regras e eventos
- `render.js`: desenho do cenário e dos personagens
- `index.js`: junta tudo e implementa o contrato

Arquivos extras: `case2/fight.js` (tiroteio com coberturas e sons de tiro), `case2/tribunal.js` (cena do tribunal), `case3/ambience.js` (sons do trem assombrado e música de perseguição).

Também em `cases/`:

- `progress.js`: liberdade para escolher qualquer caso, aviso ao trocar de caso e porcentagem no quadro de partidas.
- `cutscene.js`: as cenas finais de cada caso.
- `shared.js`: peças de cenário reaproveitadas (vagões, bancos, portas).

### `ui/`: interface

| Módulo | Responsabilidade |
|---|---|
| `hud.js` | Orientação dos óculos, contadores, menus de escolha |
| `glasses.js` | Modo detetive: varredura, pegadas com onda azul, região do sinal e análise de objetos ao clicar |
| `pov.js` | A dedução: os óculos montam a pergunta com as memórias coletadas e dão a conclusão |
| `cover.js` | Capa: botão JOGAR em pixel e painéis Sobre e Desenvolvedores |
| `mobile.js` | Tela cheia, controles de toque estilo console e aviso para girar o celular |

### `audio/`

`ambient.js` gera todo o som ambiente sem nenhum arquivo de áudio: chuva e trovões da capa e da estação, a sanfona do Seu Zé (com volume e lado dependendo da distância), a bossa de elevador do caso 1, o trem andando e a trilha de ação do caso 2, o chiado do gás e os sons do apagão.

## Fluxo de um caso

1. O jogador escolhe um trem (ou o quadro de partidas) → `progress.js` confirma se há outro caso em andamento.
2. `registry.enterCase()` ativa o caso, restaura pistas e cenário se ele já tinha sido começado.
3. O caso roda seus eventos em `tick()`. As pistas viram **memórias** quando o jogador as toca.
4. Com todas as memórias, `pov.js` faz a dedução e libera a parte final do caso.
5. `cutscene.js` mostra o desfecho, marca o caso como resolvido e volta para a estação.
6. Com os três resolvidos, `finale.js` assume.

## Como o jogo foi feito

O desenvolvimento foi feito em conversa com IAs generativas, em ciclos curtos: a equipe descrevia a ideia ("a violinista some num apagão", "o fantasma arromba a porta"), a IA implementava, e o resultado era testado no navegador e ajustado. Algumas práticas que mantiveram o projeto estável:

- **Testes automatizados** no navegador sem tela (Playwright): cada mudança era verificada percorrendo os casos e o final, com teclas e cliques aleatórios para achar erros.
- **Medição de desempenho** antes de otimizar: o perfil mostrou que o pós-processamento era o gargalo, e só ele foi mexido, sem perder qualidade visual.
- **Arquivo único** para distribuição: o código é escrito em módulos e empacotado com esbuild num só `index.html`, que abre com dois cliques e publica no GitHub Pages sem configuração.
