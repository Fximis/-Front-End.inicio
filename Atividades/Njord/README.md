# Documento de Requisitos — Landing Page Njord

**Projeto:** Njord — Aplicativo de Controle Financeiro Pessoal (landing page de apresentação)
**Disciplina:** Desenvolvimento Web (HTML/CSS/JavaScript)
**Autor:** Fellipe Schmidt
**Data:** 2026-06-09
**Versão do produto documentada:** 2.0 "Aurora Nórdica"

---

## 1. Contexto e Objetivo

O **Njord** é um conceito de aplicativo de controle financeiro pessoal cujo diferencial é a
**automação da entrada de dados**: em vez de o usuário digitar cada gasto, o app captura
despesas de quatro fontes (e-mail com NF-e, foto de cupom via OCR, fatura/extrato em PDF e
notificações do banco) e as categoriza automaticamente.

Esta entrega é a **landing page** do produto. Seus objetivos são:

1. **Comunicar a proposta de valor** em segundos ("Pare de digitar. Deixe Njord fazer o trabalho.");
2. **Explicar o funcionamento** (4 canais de captura + fluxo Captura → Automação → Análise);
3. **Demonstrar o resultado** (preview do dashboard com gráficos e metas);
4. **Converter** o visitante por meio de chamadas para ação (CTAs) claras.

---

## 2. Requisitos Funcionais

| ID | Requisito | Implementação | Status |
|----|-----------|---------------|--------|
| RF01 | Navegação fixa entre as seções da página | Navbar fixa com âncoras + smooth scroll (`main.js`) | ✅ |
| RF02 | Navbar deve reagir ao scroll (ganhar fundo ao sair do topo) | Classe `is-scrolled` alternada via evento `scroll` | ✅ |
| RF03 | Seção hero apresentando a proposta de valor com CTA | Seção `#hero` (100vh) com 2 CTAs e mockup animado | ✅ |
| RF04 | Apresentar as 4 dores do usuário (pain points) | Seção `#problema` com 4 cards numerados | ✅ |
| RF05 | Apresentar os 4 canais de captura de dados | Seção `#features` com ícones SVG por canal | ✅ |
| RF06 | Visualizar o fluxo Captura → Automação → Análise | Seção `#fluxo` com 3 passos conectados | ✅ |
| RF07 | Preview do dashboard com dados ilustrativos | Seção `#dashboard`: stat cards, donut SVG, metas | ✅ |
| RF08 | Contadores numéricos animados (moeda BRL e %) | `counters.js` — `requestAnimationFrame` + `Intl.NumberFormat` | ✅ |
| RF09 | Elementos devem revelar-se gradualmente ao scroll | `scroll-animations.js` — `IntersectionObserver` + classe `.is-visible` | ✅ |
| RF10 | Barras de progresso de metas animadas ao entrar na tela | `IntersectionObserver` + classe `.is-filled` | ✅ |
| RF11 | Efeito de profundidade 3D nos cards ao passar o mouse | Tilt magnético em `main.js` (`perspective/rotateX/rotateY`) | ✅ |
| RF12 | Botões CTA devem responder ao clique | Handlers via `data-action` com feedback (`alert`) | ✅ |
| RF13 | Footer com navegação interna e links externos | `<footer>` com 3 colunas | ✅ |

> **Nota sobre RF12:** o produto ainda não possui cadastro real; os CTAs exibem um `alert()`
> informativo, comportamento adequado a uma landing page de pré-lançamento.

---

## 3. Requisitos Não Funcionais

| ID | Requisito | Implementação | Status |
|----|-----------|---------------|--------|
| RNF01 | Zero dependências de frameworks/bibliotecas | HTML5 + CSS3 + JS vanilla; único recurso externo: Google Fonts | ✅ |
| RNF02 | Hospedável em servidor estático (GitHub Pages) | Apenas arquivos estáticos, caminhos relativos | ✅ |
| RNF03 | Responsividade (desktop-first) | Breakpoints em 980px e 560px; testado em 1440px e 375px sem overflow | ✅ |
| RNF04 | Acessibilidade de movimento | `@media (prefers-reduced-motion)` no CSS + guardas `matchMedia` no JS | ✅ |
| RNF05 | Acessibilidade semântica | HTML5 semântico, `aria-label`, `aria-hidden`, `rel="noopener"` | ✅ |
| RNF06 | Performance (animações a 60fps) | Animações via `transform`/`opacity` (compostas na GPU), `requestAnimationFrame` | ✅ |
| RNF07 | Código organizado e manutenível | CSS modular em 3 arquivos por responsabilidade; JS em 3 módulos; tokens centralizados em `:root` | ✅ |
| RNF08 | Compatibilidade com navegadores modernos | Fallbacks: `-webkit-` prefixes, fallback sem `IntersectionObserver` (mostra tudo) | ✅ |

---

## 4. Decisões de Layout e Interface

### 4.1 Direção estética — "Aurora Nórdica" (dark premium)

- **O quê:** fundo escuro contínuo (`#0B0A1A`) com três blobs de aurora (azul, roxo, laranja)
  desfocados que derivam lentamente atrás de todo o conteúdo, mais uma textura de grão sutil.
- **Por quê:** Njord é o deus nórdico da riqueza e do mar — a aurora boreal conecta a marca à
  identidade. O dark premium transmite sofisticação de fintech e evita a estética genérica de
  "template branco". A primeira versão (V1, fundo branco) foi descartada por esse motivo.

### 4.2 Estrutura narrativa — 7 seções em jornada

`Hero → Problema → Features → Fluxo → Dashboard → Benefícios → CTA (+ Footer)`

- **Por quê:** a ordem conta uma história de venda: gancho emocional (hero) → identificação
  com a dor (problema) → solução (features/fluxo) → prova do resultado (dashboard) →
  reforço de valor (benefícios) → conversão (CTA). O visitante é conduzido do "por que me
  importar" ao "o que fazer agora" em um único scroll.

### 4.3 Glassmorphism como sistema de componentes

- **O quê:** classe utilitária `.glass-card` (fundo translúcido + `backdrop-filter: blur` +
  borda semitransparente + borda-gradiente no topo via máscara CSS) reaproveitada em todos
  os cards da página.
- **Por quê:** (1) coesão visual — todos os componentes compartilham a mesma linguagem;
  (2) o vidro deixa a aurora "vazar" por trás, reforçando a atmosfera; (3) DRY — um único
  bloco CSS serve hero, problema, features, fluxo, dashboard, benefícios e CTA.

### 4.4 Tipografia em três papéis

| Fonte | Papel | Por quê |
|-------|-------|---------|
| Bricolage Grotesque | Títulos (display) | Personalidade e modernidade; foge das fontes de sistema genéricas |
| Geist | Corpo de texto | Legível e refinada, sem competir com os títulos |
| Geist Mono | Números e dados | Monoespaçada com `tnum` — alinhamento tabular transmite precisão financeira |

### 4.5 Cor com papel semântico

- **Azul `#4D8DFF`** — confiança (acento primário, dados);
- **Laranja `#FF8A3D`** — energia (alertas de orçamento, calor);
- **Roxo `#A855F7`** — modernidade (aurora central, glow da marca);
- **Verde `#34D399`** — exclusivo para status positivo/"ao vivo".
- O gradiente azul→roxo→laranja é a assinatura da marca (logo, título, botão primário, glow do CTA).

### 4.6 Movimento orquestrado (não decorativo)

- **Reveals com stagger:** cada card entra com atraso sequencial (`data-reveal-delay`),
  guiando o olhar na ordem de leitura.
- **Contadores animados:** o valor "crescendo" até R$ 3.254,50 dramatiza a ideia de dados
  chegando em tempo real — o mesmo argumento do produto.
- **Tilt 3D nos cards:** responsividade tátil ao cursor, reforçando o tom premium; é
  **desativado** em telas touch e para quem prefere movimento reduzido.
- **Princípio:** um carregamento bem orquestrado > micro-interações espalhadas. Toda animação
  tem função narrativa (contar a história da automação) ou de orientação (guiar o scroll).

### 4.7 Hero com "prova visual"

- O mockup do painel de saldo + cards flutuantes ("Cupom capturado", "Categorizado") mostram
  o produto funcionando **antes** de qualquer explicação textual — show, don't tell.

### 4.8 Responsividade desktop-first

- **Por quê:** a avaliação e a apresentação ocorrem em desktop; o público-alvo da landing
  pesquisa produtos financeiros no computador.
- **Breakpoints:** 980px (grids de 4 → 2 colunas; fluxo horizontal → vertical com setas
  rotacionadas; navbar colapsa para marca + CTA) e 560px (tudo em 1 coluna).

---

## 5. Tecnologias Aplicadas

### 5.1 HTML5
- **Marcação semântica:** `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>` —
  estrutura legível por leitores de tela e mecanismos de busca.
- **Atributos `data-*` como contrato HTML↔JS:** `data-reveal`, `data-reveal-delay`,
  `data-tilt`, `data-number`, `data-action`. O JS seleciona comportamentos por atributo,
  sem acoplar-se a classes visuais — é possível reestilizar sem quebrar o script.
- **SVG inline:** ícones das features e gráfico donut do dashboard — escaláveis, estilizáveis
  via CSS (`currentColor`) e sem requests extras.
- **Acessibilidade:** `aria-hidden` em elementos decorativos, `aria-label` em navegações,
  `rel="noopener"` em links externos.

### 5.2 CSS3
- **Custom properties (`:root`):** todos os tokens de design (cores, fontes, raios, sombras,
  easings) centralizados — mudar a marca inteira = editar um bloco.
- **Grid e Flexbox:** Grid para os layouts de cards e do dashboard; Flexbox para alinhamentos
  internos e para o fluxo de 3 passos.
- **`clamp()`:** tipografia e espaçamentos fluidos (ex.: título do hero escala de 2.6rem a
  5rem conforme a viewport) sem media queries adicionais.
- **`backdrop-filter`:** o desfoque real do glassmorphism (com prefixo `-webkit-`).
- **Máscaras CSS (`mask-composite`):** técnica da borda-gradiente dos glass cards — um
  gradiente recortado para aparecer só na borda de 1px.
- **`@keyframes`:** aurora (drift), gradiente animado (gradShift), float, pulse, spin,
  growBar, nudge, scrollDot.
- **`@media (prefers-reduced-motion: reduce)`:** desliga animações para usuários sensíveis a
  movimento.

### 5.3 JavaScript (vanilla, ES6+)
- **`IntersectionObserver`:** detecta elementos entrando na viewport — dispara reveals,
  contadores e barras de meta. Mais performático que escutar `scroll` e calcular posições
  manualmente; cada elemento é desobservado após animar (`unobserve`).
- **`requestAnimationFrame`:** loop dos contadores sincronizado com o refresh do monitor
  (60fps), com easing `easeOutExpo` (rápido no início, desacelera no fim — percepção natural).
- **`Intl.NumberFormat('pt-BR')`:** formatação de moeda brasileira nativa do navegador
  (R$ 3.254,50) — sem biblioteca de formatação.
- **`matchMedia`:** guardas de acessibilidade — tilt 3D só ativa se o dispositivo tem hover
  (mouse) e o usuário não pediu movimento reduzido.
- **Progressive enhancement:** se `IntersectionObserver` não existir, todo o conteúdo é
  exibido imediatamente (fallback) — a página nunca fica invisível.
- **Organização:** 3 módulos por responsabilidade — `main.js` (interação direta),
  `scroll-animations.js` (observação de viewport), `counters.js` (animação numérica).

### 5.4 O que NÃO foi usado — e por quê

| Alternativa considerada | Por que foi descartada |
|------------------------|------------------------|
| React / Vue | Overhead desnecessário para uma página estática; build step complica o deploy no GitHub Pages |
| Bootstrap / Tailwind | Visual genérico de framework; CSS próprio dá controle total da identidade "Aurora Nórdica" |
| jQuery | APIs nativas (`querySelector`, `IntersectionObserver`) já cobrem tudo |
| Bibliotecas de animação (GSAP, AOS) | CSS transitions + `IntersectionObserver` entregam o mesmo resultado sem dependência |
| Imagens/ilustrações externas | SVG inline + CSS puro = zero requests de mídia, carregamento instantâneo |

---

## 6. Testes e Validação

Bateria de **19 testes funcionais automatizados** (Playwright + Chromium, 2026-06-09) —
**100% aprovados**:

- Carregamento sem erros de console e sem requests falhos (CSS, JS, fontes);
- Reveals: 6/6 no hero ao carregar; 27/27 na página após scroll completo;
- Contadores atingem os valores exatos (R$ 3.254,50 · 62%);
- Navbar alterna `is-scrolled` ao rolar;
- Barras de metas preenchem (3/3) com largura correta;
- Tilt 3D aplica `transform` no mousemove e limpa no mouseleave;
- CTAs disparam os alerts esperados;
- Smooth scroll atinge a seção alvo com precisão (±0px no teste);
- Todas as âncoras internas têm destino válido;
- Sem overflow horizontal em 1440px (desktop) e 375px (mobile);
- Navbar colapsa no mobile;
- Conteúdo 100% visível com `prefers-reduced-motion` ativo.

---

## 7. Estrutura de Arquivos

```
Njord/
├── index.html               # Estrutura semântica: navbar + 7 seções + footer
├── css/
│   ├── style.css            # Tokens, reset, tipografia, atmosfera, navbar, botões, glass
│   ├── sections.css         # Layout de cada seção + media queries
│   └── animations.css       # Keyframes + sistema de reveal
└── js/
    ├── main.js              # Navbar, CTAs, tilt 3D, smooth scroll
    ├── scroll-animations.js # IntersectionObserver (reveals + barras)
    └── counters.js          # Contadores animados
```

**Critério de separação:** CSS dividido por papel (fundação / seções / movimento) e JS por
responsabilidade — facilita localizar e manter cada comportamento isoladamente.
