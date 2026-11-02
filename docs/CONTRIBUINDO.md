# Contribuindo com o CodeFan

O CodeFan é colaborativo. Prepare alterações em branch própria e use Pull Requests para revisão antes da integração em `main`.

## Preparar uma alteração

1. Confira `git status` e preserve alterações locais de outras tarefas.
2. Com a árvore limpa, atualize a base e crie a branch:

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c docs/descricao-da-alteracao
   ```

   Use um nome descritivo conforme a tarefa e a convenção combinada com a equipe. Branches criadas pelo Codex usam o prefixo `codex/`.

3. Faça alterações focadas e atualize a documentação afetada. Não versione `.env`, credenciais, dependências instaladas, builds ou capturas de testes.
4. Execute as verificações pertinentes e revise `git diff` e `git diff --check`.
5. Adicione somente os arquivos da tarefa, faça um commit descritivo e publique a branch:

   ```bash
   git add caminho/do/arquivo
   git commit -m "docs: atualiza guia de desenvolvimento"
   git push -u origin HEAD
   ```

6. Abra um PR para `main` com problema, resultado, validação e limitações. Aguarde a revisão da equipe e os checks aplicáveis antes do merge.

Não force push em branches compartilhadas nem misture mudanças de comportamento com uma reorganização documental sem explicar o novo escopo.

## Verificações

| Alteração | Verificação |
| --- | --- |
| Documentação | Links relativos, comandos contra os manifests, distinção entre implementado e previsto, `git diff --check`. |
| Frontend | `npm run lint`, `npm test` e `npm run build`, dentro de `web/`. Para fluxos de navegação, também `npm run test:e2e` com preview ativo. |
| API | `poetry run task lint`, `poetry run python manage.py check` e `poetry run pytest -q`, dentro de `api/`, com ambiente configurado. |
| Docker/Compose | Build da imagem e validação do fluxo afetado, conforme o [guia da API](../api/README.md). |

Os workflows [Frontend CI](../.github/workflows/frontend-ci.yml) e [API CI](../.github/workflows/api-ci.yml) executam em todos os PRs para `main`, inclusive documentais. Em pushes para `main`, usam filtros de caminhos. O lint do frontend tem `continue-on-error: true`; portanto, um workflow verde não comprova ausência de problemas de lint. O E2E não está incluído no CI atual.

## Manter a documentação

- O [README principal](../README.md) apresenta o produto, o estado atual e como começar.
- Os READMEs de [web](../web/README.md) e [api](../api/README.md) ficam junto aos componentes e documentam sua execução.
- `docs/` concentra visão, escopo, arquitetura e situação da integração.
- Use caminhos relativos nos links do repositório e mantenha os destinos atualizados ao mover arquivos.
- Registre decisões de produto sem transformar propostas ou simulações em funcionalidades entregues.
- Ao alterar scripts, variáveis, rotas ou regras pedagógicas, revise o guia correspondente.
