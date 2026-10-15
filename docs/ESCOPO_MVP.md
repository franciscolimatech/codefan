# CodeFan — Definição de Escopo do MVP

Status: proposta em elaboração, sujeita à revisão da equipe e à orientação pedagógica da mentora.

## 1. Apresentação e objetivo

O CodeFan é uma plataforma educacional voltada inicialmente aos estudantes da UNIFAN, com o propósito de identificar dificuldades em conhecimentos técnicos de programação e orientar o desenvolvimento de habilidades por meio de conteúdos e prática.

A experiência central segue o percurso: **Diagnosticar → Orientar → Praticar → Mostrar evolução**.

O produto busca oferecer liberdade para explorar conteúdos e, ao mesmo tempo, orientação para que o estudante saiba como avançar quando encontrar dificuldades.

## 2. Contexto acadêmico e governança

- O projeto foi apresentado ao coordenador, que autorizou a equipe a conduzir seu desenvolvimento com autonomia.
- A professora **Elianeide** já conhece o projeto, viu o protótipo e aceitou participar como mentora.
- A equipe define prioridades, organiza as entregas, documenta decisões e implementa o produto.
- A mentora contribui com orientação acadêmica, especialmente na avaliação da proposta pedagógica e na experiência de aprendizagem.
- A autorização para conduzir o projeto não implica aprovação prévia de todos os detalhes do MVP. Decisões pedagógicas e de produto ainda devem ser registradas e revisadas.

## 3. Público-alvo e perfis previstos

### Aluno

Realiza nivelamentos, consulta resultados, acessa trilhas e conceitos, pratica desafios, solicita orientação e acompanha sua evolução.

### Professor

Consulta informações acadêmicas autorizadas, identifica dificuldades recorrentes e acompanha a aprendizagem. Suas permissões para cadastrar, editar e publicar conteúdos ainda precisam ser definidas.

### Administrador

Gerencia as funcionalidades administrativas necessárias ao funcionamento da plataforma, de acordo com a matriz de permissões a ser aprovada.

A forma de vincular estudantes, professores, turmas e matrícula acadêmica (RA) permanece em definição. O RA não deverá, isoladamente, servir como comprovação de identidade.

## 4. Funcionalidades previstas no escopo do MVP

As funcionalidades abaixo compõem a proposta de escopo do produto; sua distribuição entre entregas incrementais ainda será definida.

### 4.1. Contas e acesso

- Cadastro e autenticação de usuários conforme os perfis aprovados.
- Identificação do usuário autenticado e controle de acesso.
- Proteção dos dados pessoais e acadêmicos.

### 4.2. Nivelamento técnico

- Seleção da área de conhecimento disponível.
- Questões relacionadas a habilidades técnicas.
- Registro de respostas independentes, assistidas por dicas, incorretas e ignoradas.
- Identificação das habilidades demonstradas e de lacunas que exigem reforço.
- Apresentação de resultados e preservação do histórico de tentativas.

O ponto de partida proposto é o nivelamento de **Backend com Python**, que já possui conteúdo demonstrativo no protótipo. Frontend e Banco de Dados dependerão de novos conteúdos e critérios validados.

### 4.3. Trilhas e conceitos

- Organização de trilhas por área, habilidade e pré-requisitos.
- Consulta de conceitos e materiais educativos.
- Recomendações de aprendizagem com justificativas compreensíveis.
- Registro de progresso individual e retomada de conteúdos.

### 4.4. Desafios e orientação

- Catálogo e detalhamento de desafios de programação.
- Editor de código, rascunhos e histórico de tentativas.
- Orientação “Não sei por onde começar”, com indicação de pré-requisitos e dicas progressivas.
- Retorno ao desafio sem perda do código escrito.
- Submissões para correção automática por casos de teste, condicionadas à implantação segura do Judge.

### 4.5. Evolução das habilidades

- Estados qualitativos: **Não demonstrado**, **Começando**, **Praticando** e **Consistente**.
- Distinção entre evidências independentes e assistidas.
- Evolução fundamentada em evidências acumuladas, e não em um único acerto.
- Registro do histórico de aprendizagem e recomendações de reforço.

### 4.6. Painel do professor

- Consulta de alunos e turmas para os quais o professor possui autorização.
- Indicadores de nivelamentos e dificuldades por área ou habilidade.
- Acompanhamento do progresso em conteúdos e desafios.
- Informações baseadas em dados reais, sem apresentar métricas demonstrativas como dados acadêmicos verdadeiros.

## 5. Fora do escopo inicial

- Comunidades, chat social e Arenas.
- Torneios e rankings competitivos.
- Correção de código por inteligência artificial.
- Suporte simultâneo a múltiplas linguagens no Judge.
- Relatórios acadêmicos avançados.
- Integrações institucionais complexas e implantação para múltiplas instituições.

Essas funcionalidades podem ser reavaliadas em etapas futuras, mediante decisão da equipe.

## 6. Diretrizes pedagógicas iniciais

- O diagnóstico considera habilidades e evidências, não apenas a quantidade de respostas corretas.
- Utilizar uma dica não equivale automaticamente a demonstrar conhecimento de forma independente.
- Um único acerto não comprova domínio consistente.
- Solicitar ajuda não deve ser apresentado como falha do estudante.
- O resultado da tentativa de nivelamento deve ser distinguido do progresso acumulado.
- As recomendações devem indicar claramente os motivos de cada sugestão.
- Os critérios de avaliação e progressão precisam ser revisados com a professora Elianeide antes de serem tratados como regras pedagógicas aprovadas.

## 7. Diretrizes técnicas previstas

- Aproveitar o frontend React/Vite existente, evitando reimplementar funcionalidades que já funcionam.
- Validar a arquitetura definitiva da API e a integração com o frontend.
- Utilizar persistência real no PostgreSQL, conforme a modelagem aprovada.
- Separar o serviço Judge do backend e não executar códigos de alunos sem isolamento e limites adequados.
- Aplicar autenticação, autorização, testes automatizados, práticas básicas de segurança e proteção de dados.
- Manter documentação e alterações versionadas no GitHub, com branches próprias e Pull Requests, conforme o guia de colaboração da equipe.
- Acompanhar atividades, revisões e entregas pelo Trello.

A escolha final da arquitetura e das tecnologias deve ser confirmada no card de arquitetura.

## 8. Situação atual do projeto

O repositório já contém uma aplicação frontend navegável e uma estrutura inicial de backend e infraestrutura. O protótipo contempla telas e fluxos de nivelamento em Python, trilhas, conceitos, desafios e orientação.

A documentação atual do frontend ainda descreve partes importantes como demonstrativas: dados persistidos no navegador, autenticação não integrada e ausência de correção real de código pelo Judge. A existência de arquivos e dependências de backend não comprova, por si só, que os fluxos estejam implementados e integrados.

Portanto, **funcionalidade presente no protótipo não significa funcionalidade concluída no MVP real**.

## 9. Estratégia de entregas

O desenvolvimento será incremental, com entregas demonstráveis e verificáveis.

Como primeira entrega interna, propõe-se avaliar a viabilidade de um fluxo completo com dados persistidos: um aluno de teste acessa o sistema, realiza o nivelamento inicial de Python, recebe um diagnóstico explicável, abre uma trilha recomendada e consulta um conceito.

A integração do Judge real e a ampliação do painel do professor podem constituir marcos posteriores, caso seja necessário por capacidade técnica e requisitos de segurança. **Essa divisão é uma proposta e não uma decisão aprovada.**

A disponibilização pública dependerá de revisão funcional, pedagógica e de segurança.

## 10. Decisões pendentes

- Quais funcionalidades são obrigatórias na primeira entrega interna e no MVP validável?
- O Judge real e o painel completo do professor entram na primeira entrega ou em marcos posteriores?
- Quais regras pedagógicas determinam a evolução dos estados por habilidade?
- Como ocorrerão cadastro, validação da identidade acadêmica, RA e vínculos entre alunos, professores e turmas?
- Qual matriz de permissões será adotada para aluno, professor e administrador?
- Quem poderá criar, revisar, editar e publicar trilhas, conceitos e desafios?
- Qual é a arquitetura final dos serviços, ambientes e hospedagem?
- Como a mentora participará da revisão dos critérios e dos resultados pedagógicos?

As decisões deverão ser registradas com seus responsáveis e desfechos, sem presumir aprovação antecipada.

## 11. Critérios de conclusão do Card 01

- [ ] Funcionalidades propostas para o MVP documentadas.
- [ ] Funcionalidades futuras separadas.
- [ ] Perfis de usuário e responsabilidades gerais identificados.
- [ ] Diferenças entre protótipo e produto integrado explicitadas.
- [ ] Primeira entrega interna delimitada e acordada pela equipe.
- [ ] Decisões e pendências registradas.
- [ ] Documento revisado pela equipe.
- [ ] Questões pedagógicas relevantes discutidas com a mentora ou registradas para validação.

A aprovação do texto e o merge no GitHub não devem ser confundidos com a implementação das funcionalidades descritas.
