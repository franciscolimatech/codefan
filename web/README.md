# CodeFan MVP

MVP navegável para a apresentação ao coordenador: **Nivelamento → identificação de lacunas → trilhas → conceitos → desafios → orientação → progresso**.

O projeto React/Vite original foi preservado. O redesign e as seis questões de Python foram integrados a partir do ZIP do Figma Make, sem substituir o aplicativo pelo export.

```bash
npm install
npm run dev
npm run build
npm test
```

Para validar a navegação automatizada, execute o preview em um terminal e o teste em outro:

```bash
npm run preview -- --host 127.0.0.1
```

```bash
npx playwright install chromium
npm run test:e2e
```

`CODEFAN_URL` permite testar outro endereço. Capturas geradas ficam em `test-results/`, ignorado pelo Git.

O nivelamento, o progresso, as dicas e os rascunhos persistem no navegador. Há fallback em memória quando o armazenamento é bloqueado. Refazer o nivelamento substitui somente o diagnóstico da tentativa; a prática nas trilhas continua preservada.

O nivelamento inicial nunca atribui **CONSISTENTE**. Acertos independentes e assistidos são evidências diferentes; erros e “Não sei ainda” indicam evidência insuficiente, sem concluir ausência de conhecimento.

O MVP não tem backend real. O Judge, os dados agregados da turma, o nível e a constância são demonstrativos. A execução não avalia código; a submissão simulada registra a prática local de um rascunho alterado. Banco de Dados e Frontend permanecem indisponíveis para nivelamento, conforme o protótipo.

Detalhes, arquivos e validação: [Relatório da integração](docs/INTEGRACAO-MVP.md).
