# Arquitetura

## Estrutura implementada

| Diretório ou arquivo | Papel atual |
| --- | --- |
| `web/` | Aplicação React com Vite, React Router, Tailwind CSS e Lucide. |
| `web/src/data/` | Catálogos demonstrativos, regras de aprendizagem, nivelamento e persistência local. |
| `web/src/context/ProgressoContext.jsx` | Estado compartilhado de progresso, dicas, rascunhos e nivelamento. |
| `api/` | Estrutura inicial Django com Django REST Framework e configuração PostgreSQL. |
| `api/config/urls.py` | Expõe apenas a rota `admin/`; ainda não há endpoints do domínio. |
| `compose.yml` | PostgreSQL 16 e API, com volume persistente e healthcheck do banco. |
| `.github/workflows/` | Verificações independentes de frontend e API em Pull Requests para `main`. |

O frontend funciona de forma independente e persiste dados no navegador. Não existe integração dos fluxos de aprendizagem com a API. A presença do Django REST Framework não significa que existam endpoints de autenticação, desafios ou submissões.

O Dockerfile da API usa build em estágios, Python 3.13, dependências de execução instaladas com Poetry e Gunicorn com usuário sem privilégios. O Compose não inclui frontend, fila, workers nem Judge. Migrações não são executadas automaticamente na inicialização do contêiner.

## Módulos conceituais

O [diagrama de referência](VISAO-PRODUTO.md#referências) define responsabilidades de produto. Estes módulos **não representam oito serviços já implementados**, nem determinam, por si só, uma arquitetura de microsserviços.

| Módulo | Responsabilidades previstas |
| --- | --- |
| Identidade e acesso | Autocadastro por RA, pré-cadastro individual, ativação, validação, antiduplicidade, login/logout, recuperação, sessão, perfil, status da conta e vínculo, papéis e permissões. |
| Comunidades | Criação e descoberta; acesso aberto, por solicitação ou convite; gestão de membros e papéis; canais, mensagens, respostas, threads e fixação; materiais; associação de desafios e Arenas. |
| Conteúdo e desafios | Catálogo, pesquisa e filtros; autoria, rascunho, publicação e aposentadoria; enunciado, dificuldade, categoria, arquivos iniciais e testes; audiência UNIFAN, comunidade ou privada; versionamento e embargo. |
| Treinamento | Exploração e resolução, tentativas, dicas, feedback e histórico; XP e níveis; mapa e evolução de habilidades; trilhas e recomendações de prática. |
| Competição | Arenas abertas, de comunidade e verificadas; inscrição, elegibilidade, desistência e lobby; duração, desafios, tentativas, penalidades e pontuação; timer, placar provisório, apuração e classificação final. |
| Julgamento | Recepção e registro de submissões vinculadas à versão do desafio; fila com prioridade de Arena; workers, sandbox, limites de recursos, testes visíveis e ocultos e vereditos. |
| Resultados | Histórico de desafios, tentativas e Arenas; acertos, erros, tempo e categorias; score e classificação; estatísticas individuais e de comunidade; dashboards de aluno, professor e coordenador; XP e evolução. |
| Administração | Gestão de usuários e acessos excepcionais; papéis e permissões; denúncias e moderação; auditoria de ações sensíveis; configurações; monitoramento de filas, workers, falhas e disponibilidade. |

## Relações e limites previstos

Conteúdo fornece versões de desafios para Treinamento e Competição. Esses contextos enviam submissões ao Julgamento, que produz vereditos. Resultados organiza histórico e indicadores, mantendo XP, pontuação competitiva e evidências de habilidade separados. Comunidades organizam participação e vinculam conteúdos e Arenas; Identidade e acesso controla as permissões sobre os recursos.

O Judge deverá executar código isolado, limitar tempo e memória e impedir acesso indevido. Os vereditos previstos são: aceito, resposta incorreta, erro de compilação, erro de execução, tempo excedido, memória excedida e erro de infraestrutura. Este último não deve penalizar o participante.

A apuração de uma Arena precisa considerar submissões pendentes antes de publicar a classificação final. Soluções e conteúdo competitivo podem estar sob embargo, e versões publicadas não devem ser alteradas em lugar.

## Decisões técnicas pendentes

- Modelagem de usuários, vínculo institucional, comunidades, versões, evidências e submissões.
- Contratos da API, autenticação, autorização por recurso e integração com o frontend.
- Tecnologia de fila, workers, sandbox e linguagem inicial do Judge.
- Regras de idempotência, reprocessamento, apuração e falhas de infraestrutura.
- Persistência dos eventos de aprendizagem, métricas e auditoria.
- Estratégia de ambientes, hospedagem, arquivos estáticos, observabilidade e operação.

A arquitetura conceitual orienta essas decisões, mas não substitui contratos técnicos e critérios de aceite. Consulte o [escopo](ESCOPO_MVP.md) antes de assumir que um módulo entra na primeira entrega.
