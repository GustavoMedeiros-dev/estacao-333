# Estação 3:33

> Um detetive, uma IA, sem previsão de retorno.

Jogo de investigação em pixel art, estilo point-and-click, que roda direto no navegador. Uma estação de trem parada às 3h33 serve de ponto de partida para três casos policiais. O detetive usa óculos com inteligência artificial que analisam pistas, mostram rastros e ajudam a montar a dedução final.

Desenvolvido por estudantes do curso de Bacharelado em Ciência da Computação da UFPB, inteiramente com Inteligências Artificiais generativas.

## Como jogar

Abra o `index.html` em qualquer navegador moderno, ou acesse a versão publicada no GitHub Pages. Não precisa instalar nada.

| Ação | Computador | Celular |
|---|---|---|
| Andar | Setas ou clicar no chão | Direcional ◀ ▶ ou tocar no chão |
| Interagir / avançar diálogo | Clique ou E | Botão A ou tocar |
| Colocar e tirar os óculos (modo detetive) | Q ou ícone dos óculos | Botão B |
| Agachar / se esconder (casos 2 e 3) | Espaço ou ↓ | Botão ▼ |
| Recarregar (tiroteio do caso 2) | R | Abrigar-se recarrega |
| Tela cheia | F ou botão ⛶ | Automático ao jogar |
| Voltar à capa | Esc | — |

## Os casos

| Caso | Nome | Resumo |
|---|---|---|
| 1 | O sumiço da violinista | Uma solista some num apagão dentro do trem. Pistas em dois vagões, perseguição sonora pelo túnel do esgoto e três finais diferentes. |
| 2 | A Lágrima do Sertão | Um diamante é roubado depois de um gás sonífero. Máscara improvisada pela IA, relógio até a próxima estação e tiroteio com coberturas. |
| 3 | O fantasma da Estação 42 | Um trem assombrado. Jumpscare, fuga, esconderijos, caça às pistas com o fantasma à solta e perseguição no corredor secreto. |

Depois dos três casos, há um final com créditos e uma cena pós-créditos.

## Estrutura do repositório

```
estacao-333/
├── index.html            ← o jogo completo, num único arquivo (é ele que roda)
├── README.md             ← este arquivo
├── docs/
│   └── ARQUITETURA.md    ← como o jogo foi construído, módulo por módulo
└── codigo-por-modulo/    ← o mesmo código do index.html, separado por módulo, para estudo
    ├── css/styles.css
    └── js/
        ├── core/         ← motor: configuração, estado, canvas, diálogos, áudio, entrada
        ├── game/         ← laço principal e desenho da cena
        ├── render/       ← detetive e pós-processamento (brilho, gradação, vinheta)
        ├── sprites/      ← modelos de personagens e paletas
        ├── scenes/       ← capa, estação, vida da estação e final do jogo
        ├── ui/           ← HUD, óculos de IA, dedução, capa, controles de celular
        ├── audio/        ← sons ambientes e trilhas geradas por código
        └── cases/        ← os três casos, o registro de casos e o progresso
```

O jogo é distribuído como um único `index.html` para abrir com dois cliques e publicar facilmente. A pasta `codigo-por-modulo` mostra o mesmo código dividido nas partes de onde ele veio, para leitura e estudo da arquitetura.

## Tecnologias

- HTML5 Canvas 2D, com toda a arte desenhada por código (sem imagens externas, exceto a arte da capa e as fotos do jornal, embutidas no próprio arquivo)
- JavaScript puro, organizado em módulos ES e empacotado com esbuild
- Web Audio API: músicas, chuva, trovões, tiros e efeitos são sintetizados em tempo real
- CSS para a interface (diálogos, menus, botões em pixel) e parte do pós-processamento
- Sem frameworks, sem servidor, sem dependências em tempo de execução

Detalhes técnicos estão em [docs/ARQUITETURA.md](docs/ARQUITETURA.md).

## Equipe

Arthur Henrique · Cristiano Asafe · Gustavo Medeiros · José Otávio · Severino Carlos
