# 📖 Guia Completo: GitHub Actions para Agregação de Repositórios

## 🎯 O Que Acontece?

Este projeto usa **GitHub Actions** para **automaticamente**:

1. **Clonar** seus repositórios (ecopontos-aep, front-end.faculdade, CursoEmVideo)
2. **Copiar** os arquivos para pastas específicas
3. **Gerar** um `index.html` dinâmico com todos os projetos agregados
4. **Fazer commit** das mudanças
5. **Publicar** no GitHub Pages

Tudo isso **sem você fazer nada** — basta fazer um `git push`!

---

## 🏗️ Estrutura do Projeto

```
-Front-End.inicio/
├── .github/
│   └── workflows/
│       └── aggregate-repos.yml          ← Action principal
├── scripts/
│   └── generate-index.js                ← Gera index.html
├── assets/
│   ├── css/
│   │   ├── neon.css                     ← Estilos base
│   │   └── portfolio-dinamico.css       ← Estilos novos
│   ├── img/
│   └── curriculo.pdf
├── faculdade/
│   ├── index.html                       ← Seletor de disciplinas
│   ├── front-end.html                   ← Já existente
│   ├── curso/                           ← Cópia de CursoEmVideo
│   └── materiais/                       ← Cópia de front-end.faculdade
├── projetos/
│   └── ecopontos/
│       ├── index.html                   ← Cópia de ecopontos-aep
│       └── README.md
├── Atividades/
│   └── Njord/                           ← Já existente
├── index.html                           ← GERADO DINAMICAMENTE
├── em-breve.html
└── GUIA-GITHUB-ACTIONS.md               ← Este arquivo
```

---

## ⚙️ Como Funciona o Workflow

### 1. **Trigger (O que ativa a Action)**

```yaml
on:
  push:
    branches: [ main ]              # Roda quando faz push em main
  workflow_dispatch:                # Roda manualmente
  schedule:
    - cron: '0 23 * * 5'           # Toda sexta às 23h UTC (20h Brasília)
```

**Isso significa:**
- ✅ Roda **automaticamente** quando você faz `git push` para `main`
- ✅ Roda **manualmente** se você clicar em "Run workflow" no GitHub
- ✅ Roda **toda sexta-feira às 20h** (seu horário local) - mantém tudo sincronizado

---

### 2. **Os Passos (Steps)**

#### **Step 1: Checkout do repositório principal**
```yaml
- name: Checkout do repositório principal
  uses: actions/checkout@v4
```
Baixa o código do seu repositório `-Front-End.inicio` para a máquina virtual do GitHub.

---

#### **Step 2-4: Clonar os repositórios**
```yaml
- name: Clone ecopontos-aep
  run: |
    git clone --depth 1 https://github.com/Fximis/ecopontos-aep.git ./temp-repos/ecopontos
```

**O que faz:**
- 🔽 Baixa apenas o **commit mais recente** (`--depth 1`)
- 📁 Salva em pasta temporária `./temp-repos/`
- ⚡ **Rápido** porque não baixa histórico inteiro

**Repete para:**
- `front-end.faculdade`
- `CursoEmVideo-HTML-CSS`

---

#### **Step 5: Organizar estrutura de pastas**
```yaml
- name: Organizar estrutura de pastas
  run: |
    mkdir -p projetos/ecopontos
    mkdir -p faculdade/curso
    mkdir -p faculdade/materiais
    
    cp ./temp-repos/ecopontos/HTML\ -\ Base\ .html ./projetos/ecopontos/index.html
```

**O que faz:**
- 📂 **Cria** as pastas necessárias
- 📄 **Copia** os arquivos para os locais corretos
- 🧹 **Deleta** as pastas temporárias

---

#### **Step 6: Gerar index.html dinâmico**
```yaml
- name: Gerar index.html dinâmico
  run: |
    node scripts/generate-index.js
```

**Executa:** `scripts/generate-index.js` que:
1. **Lê** os metadados dos projetos (nome, descrição, links)
2. **Gera** um HTML completo com:
   - Cards interativos dos projetos
   - Links automáticos para disciplinas
   - Grid responsivo de skills
   - Contatos e links sociais
3. **Escreve** em `index.html`

---

#### **Step 7: Commit e Push**
```yaml
- name: Commit mudanças
  run: |
    git config --local user.email "action@github.com"
    git config --local user.name "GitHub Action"
    git add -A
    git commit -m "chore: atualizar conteúdo agregado ($(date '+%Y-%m-%d %H:%M:%S'))"
    git push origin ${{ github.ref }}
```

**O que faz:**
- 🤖 Se configura como "GitHub Action" (um bot)
- ✅ Faz `git add -A` (adiciona todas as mudanças)
- 💬 Cria um commit com mensagem + data
- 🚀 Faz `git push` (envia de volta ao repositório)

---

#### **Step 8: Deploy no GitHub Pages**
```yaml
- name: Deploy no GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./
```

**O que faz:**
- 🌐 Pega **todo** o conteúdo da raiz (`./`)
- 📡 **Publica** automaticamente no GitHub Pages
- 🔗 Fica acessível em: `https://fximis.github.io/-Front-End.inicio/`

---

## 📝 Script: generate-index.js

Este script **gera o HTML dinamicamente**. Funciona assim:

### 1. **Define os Projetos**
```javascript
const projetos = [
  {
    id: 'ecopontos',
    nome: '🌱 EcoPontos',
    descricao: 'Plataforma de gamificação...',
    url: '/projetos/ecopontos/index.html',
    badges: ['HTML5', 'CSS3', 'JavaScript'],
    destaque: true
  }
];
```

### 2. **Define as Disciplinas**
```javascript
const disciplinas = [
  {
    nome: 'Front-end',
    descricao: 'HTML, CSS, JavaScript...',
    url: '/faculdade/front-end.html',
    icon: '🎨'
  }
];
```

### 3. **Gera HTML com Template Literal**
```javascript
${projetos.filter(p => p.destaque).map(p => `
  <a href="${p.url}" class="projeto-card">
    <h3>${p.nome}</h3>
    ${p.badges.map(b => `<span class="badge">${b}</span>`).join('')}
  </a>
`).join('')}
```

**Usa:**
- 🔄 `.filter()` para pegar só projetos com `destaque: true`
- 🗂️ `.map()` para transformar cada projeto em HTML
- 🔗 Template literals (backticks) para misturar dados com HTML

---

## 🎨 Novos Estilos: portfolio-dinamico.css

- **Grids Responsivos** que se adaptam do mobile ao desktop
- **Cards com Hover Interativo** que sobem ao passar o mouse
- **Animações Suaves** com transições elegantes
- **Design Glass Morphism** com neon

---

## 🚀 Cronograma de Execução

A Action roda nos seguintes momentos:

| Evento | Quando |
|--------|--------|
| **Manual** | Quando você vai em GitHub → Actions e clica "Run workflow" |
| **Push em main** | Automaticamente quando você faz `git push` para `main` |
| **Agendado** | **Toda sexta-feira às 20h** (seu horário, Brasília) |

---

## 📊 Ver o Resultado

### **No GitHub:**
- Vá em: **Actions** → Veja o workflow rodando em tempo real
- Veja os **logs** completos de cada step
- Veja os **commits** automáticos criados pela Action

### **No Seu Site:**
- Acesse: `https://fximis.github.io/-Front-End.inicio/`
- Veja o novo `index.html` dinâmico
- Todos os projetos com links funcionando

---

## 🔧 Modificações Futuras

### **Para Adicionar um Novo Projeto:**

1. Abra `scripts/generate-index.js`
2. Adicione ao array `projetos`:
   ```javascript
   {
     id: 'novo-projeto',
     nome: '🎨 Novo Projeto',
     descricao: 'Descrição...',
     url: '/projetos/novo/index.html',
     badges: ['Tech1', 'Tech2'],
     destaque: true,
     cor: '#00e5ff'
   }
   ```
3. Faça `git push`
4. A Action **regenera o HTML automaticamente**

### **Para Adicionar um Novo Repositório:**

1. Abra `.github/workflows/aggregate-repos.yml`
2. Adicione um novo step de clone:
   ```yaml
   - name: Clone novo-repo
     run: |
       git clone --depth 1 https://github.com/Fximis/novo-repo.git ./temp-repos/novo
   ```
3. Adicione a cópia na seção "Organizar estrutura":
   ```yaml
   cp -r ./temp-repos/novo/* ./faculdade/novo/ 2>/dev/null || true
   ```
4. Faça `git push` e a Action faz o resto!

---

## ⚠️ Considerações Importantes

### **Permissões**
- A Action usa `${{ secrets.GITHUB_TOKEN }}` (criado automaticamente)
- Você **não** precisa fazer nada especial
- GitHub cuida das permissões automaticamente

### **Tempo de Execução**
- Normalmente leva **2-3 minutos**
- Pode ser mais lento na primeira vez
- Se demorar: verifique a conexão de rede

### **Limite de Execuções**
- GitHub Actions tem limite de **2000 minutos/mês** (gratuito)
- Este workflow usa ~3 minutos por execução
- 1x por semana = ~12 execuções/mês = ~36 minutos/mês ✅
- **Sobra muito espaço!**

---

## 📚 Recursos Úteis

- 📖 [Docs GitHub Actions](https://docs.github.com/en/actions)
- 🔄 [Syntax de Workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- 🚀 [Marketplace de Actions](https://github.com/marketplace?type=actions)
- 📅 [Referência Cron](https://crontab.guru/)

---

## ✅ Checklist: Tudo Funcionando?

- [ ] `.github/workflows/aggregate-repos.yml` existe
- [ ] `scripts/generate-index.js` existe
- [ ] `assets/css/portfolio-dinamico.css` existe
- [ ] Você fez `git push` da branch `setup/github-actions`
- [ ] Criou Pull Request para `main`
- [ ] Mergiu o PR
- [ ] Action rodou com sucesso (em GitHub → Actions)
- [ ] Novo `index.html` foi gerado
- [ ] Site está online em GitHub Pages

---

## 🎉 Pronto!

Seu portfólio agora é **inteligente, dinâmico e atualiza sozinho**! 🚀

Sempre que você fizer um push, as mudanças se propagam automaticamente. E toda sexta às 20h, um sincronismo completo acontece!

Boa sorte! 😊
