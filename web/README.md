# CodeFan — frontend

Protótipo React/Vite navegável de aprendizagem, com dados demonstrativos e persistência no navegador. Não depende da API para a demonstração atual. Consulte a [visão do produto](../docs/VISAO-PRODUTO.md) e o [estado da integração](../docs/INTEGRACAO-MVP.md).

## Ambiente e execução

Use Node.js 22 atualizado, alinhado ao CI, e npm. Execute a partir da raiz do repositório:

```bash
cd web
npm ci
npm run dev
```

Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`). `npm ci` utiliza o `package-lock.json` versionado. O frontend atual não exige variáveis de ambiente nem banco de dados.

## Comandos

Execute dentro de `web/`:

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento. |
| `npm run lint` | Análise estática com Oxlint. |
| `npm test` | Testes de nivelamento e persistência com o runner do Node. |
| `npm run build` | Build de produção em `web/dist/`. |
| `npm run preview -- --host 127.0.0.1` | Servir o build localmente para inspeção. |
| `npm run test:e2e` | Testar navegação com Playwright e Chromium. |

## Navegação automatizada

Prepare o navegador e o build:

```bash
cd web
npm ci
npx playwright install chromium
npm run build
npm run preview -- --host 127.0.0.1
```

Em outro terminal, a partir da raiz:

```bash
cd web
npm run test:e2e
```

O teste usa `http://127.0.0.1:4173`. Se o preview estiver em outra porta, ajuste o endereço:

```bash
CODEFAN_URL=http://127.0.0.1:4174 npm run test:e2e
```

O ambiente precisa oferecer as bibliotecas de sistema necessárias ao Chromium. Capturas são gravadas em `web/test-results/`, ignorado pelo Git. O teste altera somente o estado local dos contextos de navegador que cria.

## Organização e limites

- `src/App.jsx`: rotas registradas e redirecionamento de caminhos desconhecidos.
- `src/pages/`: telas; há componentes legados de Comunidades e Arenas sem rotas ativas.
- `src/components/aprendizagem/`: orientação, dicas e estados de habilidade.
- `src/data/`: catálogos, regras determinísticas, nivelamento e acesso ao armazenamento.
- `src/context/ProgressoContext.jsx`: progresso, dicas, rascunhos e nivelamento compartilhados.

O nivelamento disponível é de Python. Dicas, diagnóstico e rascunhos persistem em `localStorage`; se indisponível, há fallback em memória. Refazer o nivelamento preserva a prática anterior nas trilhas.

Autenticação, execução de código, submissões e parte das métricas são demonstrativas. “Simular submissão” não comprova que uma solução esteja correta. A API Django ainda não está conectada ao frontend.

`vercel.json` configura fallback para `index.html`, necessário às rotas da SPA. Para hospedar este componente, a raiz de build é `web/` e a saída é `dist/`; esse arquivo não comprova que exista uma publicação ativa. O preview é destinado à verificação local.

Voltar ao [README principal](../README.md) · [Contribuir](../docs/CONTRIBUINDO.md).
