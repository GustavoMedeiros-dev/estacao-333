<div align="center">

# 🚉 Estação 3:33

**Um detetive. Uma IA. Sem previsão de retorno.**

Jogo de investigação point-and-click em pixel art, que roda direto no navegador.

[![Jogar agora](https://img.shields.io/badge/▶_Jogar_agora-GitHub_Pages-e8b04a?style=for-the-badge)](https://GustavoMedeiros-dev.github.io/estacao-333/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas_2D-333333?style=flat-square)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-5a4a8a?style=flat-square)
![Sem dependências](https://img.shields.io/badge/dependências-nenhuma-success?style=flat-square)

[🇺🇸 English](README.md) · 🇧🇷 Português

</div>

---

## 📖 Sumário

- [Sobre](#️-sobre)
- [A história](#️-a-história)
- [Funcionalidades](#-funcionalidades)
- [Os casos](#-os-casos)
- [Como começar](#-como-começar)
- [Controles](#-controles)
- [Tecnologias](#️-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Arquitetura](#️-arquitetura)
- [Feedback](#-feedback)
- [Equipe](#-equipe)
- [Agradecimentos](#-agradecimentos)

---

## 🕵️ Sobre

Oi! Meu nome é Gustavo, e este é o meu primeiro projeto da faculdade, na **UFPB (Universidade Federal da Paraíba)**. A gente adoraria saber o que as pessoas acham do nosso jogo. Então, se você quer jogar algo interessante, este é o jogo perfeito.

O *Estação 3:33* foi desenvolvido por estudantes de Ciência da Computação da UFPB, **inteiramente com Inteligências Artificiais generativas**. É um único arquivo HTML: sem instalação, sem servidor, sem downloads. É só abrir e jogar.

## 🌧️ A história

Um detetive chega a uma estação de trem numa noite de chuva e percebe algo estranho: o relógio da parede parou às **3h33**, exatamente no momento em que ele entrou.

Ele explora a estação e conversa com as pessoas que estão por lá, cada uma com sua personalidade, inspiradas em brasileiros típicos, apressados para suas rotinas. Depois, embarca em um dos três trens, e cada trem leva a um caso diferente, com clima e mistério próprios.

Para resolvê-los, o detetive conta com seus **óculos de IA**, que analisam objetos, revelam pegadas e apontam a região onde as pistas estão escondidas. Descobrir o que elas significam fica por conta dele.

## ✨ Funcionalidades

- 🔍 **Três casos completos** com climas diferentes: mistério, roubo e terror
- 🤓 **Óculos de IA (modo detetive)**: rastro de pegadas, varredura da área e análise de objetos (pista, objeto comum ou pessoa)
- 🧠 **Sistema de dedução**: as pistas coletadas viram memórias que levam à conclusão do caso
- 🎭 **Múltiplos finais** no caso 1, além de um final do jogo com créditos e cena pós-créditos
- 🔫 **Tiroteio com coberturas**, fantasma que persegue o jogador, esconderijos e trechos com tempo limite
- 🎵 **Áudio procedural**: todas as músicas e efeitos são sintetizados em tempo real, sem nenhum arquivo de áudio
- 🎨 **Pixel art feita em código**: personagens e cenários são desenhados por programação
- 📱 **Suporte a celular**: controles de toque estilo console, tela cheia e layout responsivo
- 🗺️ **Ordem livre dos casos**, com progresso salvo por caso e mostrado no quadro de partidas

## 🚆 Os casos

| # | Caso | Clima | Resumo |
|:-:|---|---|---|
| 1 | **O sumiço da violinista** | Mistério | Uma solista some num apagão dentro do trem. Pistas em dois vagões, um túnel de esgoto guiado pelo som do violino e três finais diferentes. |
| 2 | **A Lágrima do Sertão** | Roubo | Um diamante é roubado depois de um gás sonífero. Máscara improvisada, contagem regressiva até a próxima estação e tiroteio com coberturas. |
| 3 | **O fantasma da Estação 42** | Terror | Um trem assombrado. Jumpscare, fuga, esconderijos, caça às pistas com o fantasma à solta e perseguição num corredor secreto. |

Depois que os três casos são resolvidos, o relógio da estação volta a andar…

## 🚀 Como começar

### Jogar online

Acesse a **[versão publicada no GitHub Pages](https://GustavoMedeiros-dev/estacao-333/)**.

### Jogar no computador

```bash
git clone https://github.com/GustavoMedeiros-dev/estacao-333.git
cd estacao-333
```

Depois, abra o `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox ou Safari). Não precisa compilar, instalar nada nem rodar servidor.

> 💡 Os navegadores só liberam som depois da primeira interação. Clique em qualquer lugar da capa para ouvir a chuva.

## 🎮 Controles

| Ação | Computador | Celular |
|---|---|---|
| Andar | Setas ou clicar no chão | Direcional ◀ ▶ ou tocar no chão |
| Interagir / avançar diálogo | Clique ou `E` | Botão `A` ou tocar |
| Colocar e tirar os óculos (modo detetive) | `Q` ou ícone dos óculos | Botão `B` |
| Agachar / se esconder (casos 2 e 3) | `Espaço` ou `↓` | Botão `▼` |
| Recarregar (tiroteio do caso 2) | `R` | Abrigar-se recarrega |
| Tela cheia | `F` ou botão ⛶ | Automático ao jogar |
| Voltar à capa | `Esc` | — |

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5 Canvas 2D** | Todo o desenho, numa tela lógica de 256×144 renderizada em resolução interna 4× maior |
| **JavaScript puro** | Lógica do jogo, organizada em módulos ES |
| **esbuild** | Empacota todos os módulos num único `index.html` |
| **Web Audio API** | Síntese em tempo real de músicas, chuva, trovões, tiros e efeitos |
| **CSS** | Interface (diálogos, menus, botões em pixel) e parte do pós-processamento |
| **Playwright** | Testes automatizados no navegador durante o desenvolvimento |

Sem frameworks, sem dependências em tempo de execução e sem servidor.

## 📁 Estrutura do projeto

```
estacao-333/
├── index.html              # O jogo completo num único arquivo (é ele que roda)
├── README.md               # Versão em inglês
├── README.pt-BR.md         # Este arquivo
├── docs/
│   └── ARQUITETURA.md      # Arquitetura, módulo por módulo
└── codigo-por-modulo/      # O mesmo código separado por módulo, para estudo
    ├── css/styles.css
    └── js/
        ├── core/           # Motor: configuração, estado, canvas, diálogos, áudio, entrada
        ├── game/           # Laço principal e desenho da cena
        ├── render/         # Detetive e pós-processamento (brilho, gradação, vinheta)
        ├── sprites/        # Gerador de personagens e paletas de cores
        ├── scenes/         # Capa, estação, vida da estação e final do jogo
        ├── ui/             # HUD, óculos de IA, dedução, capa, controles de celular
        ├── audio/          # Sons ambientes e trilhas geradas por código
        └── cases/          # Os três casos, o registro de casos e o progresso
```

> O jogo é distribuído como um único `index.html` para abrir com dois cliques e publicar em qualquer lugar. A pasta `codigo-por-modulo` mostra o mesmo código dividido nos módulos de onde ele veio, para leitura e estudo da arquitetura.

## 🏗️ Arquitetura

O jogo roda um **game loop** clássico (`requestAnimationFrame`, limitado a 60 quadros por segundo): a cada quadro, ele lê a entrada, atualiza o estado e desenha a cena.

Todos os casos seguem o mesmo **contrato** (`enterFresh`, `tick`, `draw`, `progress`…), então o motor trata qualquer caso do mesmo jeito, e um caso novo é só um módulo novo. Inimigos como o fantasma e os bandidos são controlados por **máquinas de estados**.

📄 Detalhes completos: **[docs/ARQUITETURA.md](docs/ARQUITETURA.md)**

## 💬 Feedback

Este é o nosso primeiro projeto, e a gente quer muito saber o que você achou!

- 🐛 Encontrou um bug? [Abra uma issue](https://github.com/GustavoMedeiros-dev/estacao-333/issues)
- ⭐ Gostou do jogo? Deixe uma estrela no repositório

## 👥 Equipe

| | Desenvolvedor |
|:-:|---|
| 🎮 | Arthur Henrique |
| 🎮 | Cristiano Asafe |
| 🎮 | Gustavo Medeiros |
| 🎮 | José Otávio |
| 🎮 | Severino Carlos |

## 🙏 Agradecimentos

- **UFPB**, curso de Bacharelado em Ciência da Computação
- Inspirado nos clássicos jogos de detetive point-and-click em pixel art
- Desenvolvido com a ajuda de ferramentas de IA generativa

---

<div align="center">

Feito com ☕ e 🌧️ no Brasil · 2026

</div>
