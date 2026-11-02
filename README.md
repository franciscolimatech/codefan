# CodeFan

Plataforma voltada inicialmente aos alunos da **UNIFAN**, reunindo aprendizado prático de programação e Engenharia de Software, comunidades técnicas, gamificação e competição.

A proposta é permitir que o aluno explore desafios livremente, participe de comunidades, siga trilhas, ganhe XP e dispute Arenas. Quando encontra dificuldade, recebe orientação sobre conhecimentos a reforçar, dicas progressivas e acesso a conceitos curtos antes de retornar ao problema. Professores podem criar desafios, comunidades e Arenas; coordenadores acompanham dificuldades de aprendizagem.

## Estado atual

O projeto possui uma arquitetura conceitual definida e um **protótipo navegável para demonstração**. A implementação ainda não corresponde à plataforma completa:

- **Frontend:** React/Vite com nivelamento de Python, trilhas, conceitos, desafios, dicas e progresso persistidos no navegador.
- **Backend:** estrutura inicial Django/PostgreSQL, com admin, Docker e CI; sem endpoints de domínio e sem integração com o frontend.
- **Simulações:** autenticação, execução e submissão de código e parte das métricas são demonstrativas. Não há Judge real.
- **Comunidades e Arenas:** fazem parte da visão do produto; os componentes legados não estão nas rotas ativas do protótipo.

Consulte o [estado da integração](docs/INTEGRACAO-MVP.md) para entender o que já pode ser demonstrado e o [escopo do MVP](docs/ESCOPO_MVP.md) para as entregas propostas e decisões pendentes.

## Executar a demonstração

Com Node.js 22 atualizado e npm, a partir da raiz:

```bash
cd web
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`. A demonstração atual funciona sem iniciar a API.

Para iniciar Django e PostgreSQL, siga o [guia da API](api/README.md), incluindo configuração do `.env` e migrações. Para build e testes do protótipo, consulte o [guia do frontend](web/README.md).

## Estrutura

```text
codefan/
├── web/                 # Frontend React/Vite
├── api/                 # Estrutura Django e testes
├── docs/                # Visão, escopo, arquitetura e colaboração
├── .github/workflows/   # CI de frontend e API
├── .env.example         # Modelo de configuração local
└── compose.yml          # API e PostgreSQL
```

## Documentação e colaboração

- [Visão do produto e princípios](docs/VISAO-PRODUTO.md)
- [Arquitetura e módulos](docs/ARQUITETURA.md)
- [Escopo do MVP](docs/ESCOPO_MVP.md)
- [Estado do protótipo](docs/INTEGRACAO-MVP.md)
- [Índice da documentação](docs/README.md)
- [Como contribuir](docs/CONTRIBUINDO.md)

Trabalhe em uma branch própria e envie um Pull Request para revisão da equipe antes do merge em `main`. Inclua as verificações executadas e atualize a documentação quando houver mudanças de comportamento, configuração ou escopo.
