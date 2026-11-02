# Escopo do MVP e entregas

Status: proposta para revisão da equipe. Atualizado em 2 de novembro de 2026 com o pitch e a arquitetura conceitual fornecidos pela equipe.

## Visão e recorte

O CodeFan reúne aprendizado prático, comunidades técnicas, trilhas, gamificação e Arenas para alunos inicialmente da UNIFAN. Seu diferencial é orientar o estudante quando encontra dificuldades: conhecimentos a reforçar, dicas progressivas e conceitos curtos com retorno ao desafio.

**Comunidades e Arenas fazem parte da visão do produto.** A exclusão dessas áreas registrada na versão anterior deste documento descrevia um recorte anterior de aprendizagem e não deve ser tratada como decisão atual e definitiva. No código, suas telas legadas continuam sem rotas ativas. Reintroduzi-las exige trabalho de produto e implementação.

O diagrama apresenta o alcance conceitual da plataforma, mas não fixa quais funcionalidades devem estar prontas no primeiro MVP integrado. A priorização abaixo permanece proposta, sem presumir aprovação da equipe.

## Situação por capacidade

| Capacidade | Situação atual | Trabalho previsto |
| --- | --- | --- |
| Contas e vínculo UNIFAN | Login demonstrativo; Django com admin padrão. | Cadastro, ativação, validação de RA, recuperação, sessão e permissões dos quatro perfis. |
| Nivelamento e orientação | Seis questões de Python, evidências locais e recomendação determinística. | Persistência real, histórico e validação pedagógica dos critérios. |
| Trilhas, conceitos e desafios | Catálogos locais, prática guiada, dicas e rascunhos. | Autoria, audiência, versões e publicação com API. |
| Submissões e Judge | Execução e submissão simuladas. | Fila, sandbox, testes, vereditos e histórico confiável. |
| Comunidades | Arquivos legados sem rotas registradas. | Descoberta, acesso, membros, papéis, canais, materiais e integração com desafios e Arenas. |
| Gamificação e habilidades | Progresso local e métricas demonstrativas. | Regras persistentes para XP, nível e evidências, separadas do score competitivo. |
| Arenas | Arquivos legados sem rotas registradas. | Inscrição, lobby, regras, tempo, placar, apuração e modalidade verificada. |
| Acompanhamento acadêmico | Painel demonstrativo do professor. | Visões autorizadas para professor e coordenador com dados reais. |
| Administração | Admin padrão do Django. | Gestão de domínio, moderação, configurações, auditoria e operação. |

## Proposta de entregas incrementais

1. **Fundação e aprendizagem integrada:** identidade e permissões mínimas, persistência de nivelamento e progresso, consulta de trilhas/conceitos/desafios e fluxo explicável de orientação.
2. **Conteúdo e avaliação real:** autoria e versões de desafios, submissões isoladas e acompanhamento pedagógico com dados reais.
3. **Comunidades e competição:** participação e organização de comunidades, Arenas e apuração, reutilizando conteúdo, identidade e julgamento.

Essa sequência é uma proposta de dependências, não um cronograma aprovado. A equipe pode priorizar Comunidades ou Arenas antes, desde que explicite o recorte e suas dependências. Não há compromisso de prazo ou de incluir todos os oito módulos na primeira entrega.

## Critérios para uma entrega integrada

- Fluxo demonstrável com persistência no backend e permissões verificadas.
- Separação visível entre dados reais, simulações e recomendações determinísticas.
- Dicas assistidas distinguíveis de respostas independentes e recomendações explicáveis.
- Rascunho preservado ao consultar um conceito e retornar ao desafio.
- Se houver Judge, isolamento e limites verificados antes de receber código de alunos.
- Testes pertinentes ao fluxo, documentação atualizada e revisão por Pull Request.
- Critérios pedagógicos revisados antes de apresentar estados de habilidade como avaliação acadêmica validada.

## Decisões a registrar pela equipe

- Recorte obrigatório da primeira entrega e do MVP validável; participação de Comunidades e Arenas em cada marco.
- Processo de validação do RA e do vínculo com a UNIFAN, ativação e recuperação de acesso.
- Matriz de permissões de aluno, professor, coordenador, superadmin e papéis de comunidade.
- Responsáveis pela revisão e publicação de desafios, trilhas, conceitos e critérios pedagógicos.
- Regras de XP, evidências, score, penalidades, dicas durante Arenas e resultados oficiais.
- Linguagem inicial, contratos e requisitos operacionais do Judge.
- Ambientes, hospedagem e critérios de liberação para usuários reais.

A documentação anterior registra a professora Elianeide como mentora e o Trello como ferramenta de acompanhamento. Essa referência histórica não equivale a aprovação do novo escopo; decisões e responsáveis devem ser confirmados pela equipe.

Consulte a [visão do produto](VISAO-PRODUTO.md), a [arquitetura](ARQUITETURA.md) e o [estado do protótipo](INTEGRACAO-MVP.md).
