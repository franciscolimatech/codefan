# Estado do protótipo e integração

Levantamento do código em 2 de novembro de 2026. Este documento substitui o antigo relato pontual de integração do redesign, cujos caminhos absolutos e resultados de testes se referiam a outro ambiente. O histórico anterior permanece no Git.

## O que pode ser demonstrado

O frontend é navegável e oferece o fluxo **nivelamento → diagnóstico → trilha → conceito → desafio → orientação → prática → progresso**. Também permite explorar o catálogo de desafios e as trilhas diretamente.

- Nivelamento de Backend com Python com seis questões; Frontend e Banco de Dados aparecem como indisponíveis.
- Respostas independentes, assistidas, incorretas ou ignoradas; revelar uma dica mantém a tentativa marcada como assistida mesmo após ocultá-la.
- Dicas progressivas, indicação de pré-requisitos e conceitos com exercícios guiados.
- Editor com rascunho persistido e retorno ao desafio após orientação.
- Perfil com progresso, habilidades, conquistas e histórico demonstrativos.
- Painel do professor com catálogo local e visão do aluno demonstrativo; agregados de turma são fictícios.

## Rotas atuais

| Rota | Uso |
| --- | --- |
| `/` | Home e entrada para aprendizagem. |
| `/login` | Tela demonstrativa de acesso. |
| `/nivelamento`, `/nivelamento/questoes`, `/nivelamento/resultado` | Seleção, tentativa e diagnóstico. |
| `/trilhas`, `/trilhas/:id` | Catálogo e detalhe de trilha. |
| `/conceitos/:habilidadeId` | Conceito e prática guiada. |
| `/desafios`, `/desafios/:id` | Catálogo e detalhe de desafio. |
| `/resolver/:id` | Editor, dicas e simulação. |
| `/perfil`, `/professor`, `/configuracoes` | Telas de acompanhamento e configuração. |

A fonte das rotas é [App.jsx](../web/src/App.jsx). Caminhos desconhecidos redirecionam para a Home. As antigas URLs de Comunidades e Arenas seguem esse comportamento: seus componentes permanecem no repositório, mas não são importados por `App.jsx`.

## Persistência e regras demonstrativas

O [ProgressoContext](../web/src/context/ProgressoContext.jsx) utiliza `localStorage` para progresso (`codefan-progresso-v1`), dicas (`codefan-dicas-v1`), rascunhos (`codefan-rascunhos-v1`) e nivelamento (`codefan-assessment`). Dados inválidos são tratados; quando o armazenamento está bloqueado, o uso continua em memória com aviso. Não há sincronização entre dispositivos ou contas reais.

Refazer o nivelamento substitui o diagnóstico daquela tentativa e preserva a prática anterior nas trilhas. A recomendação é determinística e aponta para Fundamentos de Python e Agenda de Contatos; não existe recomendação por IA.

No [nivelamento](../web/src/data/nivelamento.js), uma evidência correta independente ou assistida pode produzir “Começando”, e duas independentes na mesma habilidade produzem “Praticando”. O diagnóstico inicial nunca atribui “Consistente”. Erros e respostas ignoradas indicam evidência insuficiente, não ausência de conhecimento.

No [progresso acumulado](../web/src/data/aprendizagem.js), “Consistente” exige pelo menos seis desafios e dois checkpoints; “Praticando” exige três desafios ou duas respostas independentes; uma evidência contabilizada pode gerar “Começando”. Esses limiares descrevem o código demonstrativo e ainda requerem validação pedagógica. O diagnóstico da tentativa e o progresso acumulado são informações distintas.

## Limites da integração

- A execução não executa nem avalia código. A submissão simulada registra prática de um rascunho alterado e não é um veredito de correção.
- Login, perfis e telas de professor não implementam autorização real.
- Há uma estrutura Django/PostgreSQL, mas não há endpoints de domínio nem integração com o frontend.
- Não existem fila, workers, sandbox ou Judge implementados neste repositório.
- Comunidades e Arenas pertencem à visão atual, mas não estão disponíveis na navegação.
- Nível, constância, conquistas e métricas demonstrativas não são resultados acadêmicos ou competitivos oficiais.
- Não há envio real de notificações nem fluxo de autoria integrado ao backend.

## Como verificar

Os comandos reproduzíveis estão no [guia do frontend](../web/README.md) e no [guia da API](../api/README.md). A suíte [nivelamento.test.js](../web/tests/nivelamento.test.js) cobre regras e persistência; [navegacao.mjs](../web/tests/navegacao.mjs) cobre o fluxo, retomada, redirecionamentos legados, telas móveis e armazenamento indisponível.

Os testes de navegação ainda exigem ausência de Comunidades e Arenas nas telas ativas. Quando essas áreas forem reintroduzidas, os testes precisarão acompanhar o novo comportamento. Resultados históricos de validação não substituem executar as verificações da alteração atual.
