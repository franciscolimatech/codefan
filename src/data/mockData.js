// ============================================
// MOCK DATA - CodeFan
// ============================================

export const currentUser = {
  id: 'u1',
  nome: 'Francisco Mendes',
  email: 'francisco.mendes@unifan.edu.br',
  ra: '2024001042',
  avatar: null,
  iniciais: 'FM',
  tipo: 'aluno',
  nivel: 12,
  xp: 2840,
  xpProximoNivel: 3500,
  titulo: 'Explorador',
  desafiosResolvidos: 47,
  sequenciaDias: 8,
  comunidades: ['c1', 'c2', 'c3', 'c5'],
  stats: { arenasParticipadas: 5, taxaAcerto: 73, melhorPosicao: 7 },
};

export const professores = [
  { id: 'p1', nome: 'Prof. Ricardo Almeida', iniciais: 'RA', disciplina: 'Engenharia de Software' },
  { id: 'p2', nome: 'Profa. Camila Santos', iniciais: 'CS', disciplina: 'Banco de Dados' },
  { id: 'p3', nome: 'Prof. Eduardo Lima', iniciais: 'EL', disciplina: 'Algoritmos e Estruturas de Dados' },
  { id: 'p4', nome: 'Profa. Ana Beatriz Costa', iniciais: 'AC', disciplina: 'Desenvolvimento Web' },
];

export const usuarios = [
  { id: 'u1', nome: 'Francisco Mendes', iniciais: 'FM', nivel: 12 },
  { id: 'u2', nome: 'Mariana Oliveira', iniciais: 'MO', nivel: 18 },
  { id: 'u3', nome: 'Felipe Rocha', iniciais: 'FR', nivel: 9 },
  { id: 'u4', nome: 'Isabela Souza', iniciais: 'IS', nivel: 15 },
  { id: 'u5', nome: 'Gabriel Santos', iniciais: 'GS', nivel: 21 },
  { id: 'u6', nome: 'Larissa Ferreira', iniciais: 'LF', nivel: 7 },
  { id: 'u7', nome: 'Pedro Henrique', iniciais: 'PH', nivel: 14 },
  { id: 'u8', nome: 'Juliana Alves', iniciais: 'JA', nivel: 11 },
  { id: 'u9', nome: 'Rafael Costa', iniciais: 'RC', nivel: 16 },
  { id: 'u10', nome: 'Beatriz Lima', iniciais: 'BL', nivel: 20 },
  { id: 'u11', nome: 'Thiago Nascimento', iniciais: 'TN', nivel: 6 },
  { id: 'u12', nome: 'Amanda Rodrigues', iniciais: 'AR', nivel: 13 },
];

export const comunidades = [
  {
    id: 'c1',
    nome: 'Backend com Java',
    descricao: 'Comunidade dedicada ao desenvolvimento backend utilizando Java, Spring Boot e boas práticas de arquitetura.',
    membros: 89,
    tipo: 'aberta',
    categoria: 'Linguagem',
    responsavel: 'Prof. Ricardo Almeida',
    icone: '☕',
    cor: '#f97316',
    ativa: true,
    canais: ['geral', 'dúvidas', 'materiais', 'projetos', 'carreira'],
    membro: true,
  },
  {
    id: 'c2',
    nome: 'Banco de Dados',
    descricao: 'SQL, NoSQL, modelagem, otimização de queries e tudo sobre persistência de dados.',
    membros: 124,
    tipo: 'aberta',
    categoria: 'Disciplina',
    responsavel: 'Profa. Camila Santos',
    icone: '🗄️',
    cor: '#06b6d4',
    ativa: true,
    canais: ['geral', 'dúvidas', 'sql-prática', 'materiais', 'off-topic'],
    membro: true,
  },
  {
    id: 'c3',
    nome: 'Algoritmos',
    descricao: 'Estudo e prática de algoritmos, complexidade e estruturas de dados para competições e entrevistas.',
    membros: 156,
    tipo: 'aberta',
    categoria: 'Disciplina',
    responsavel: 'Prof. Eduardo Lima',
    icone: '🧮',
    cor: '#8b5cf6',
    ativa: true,
    canais: ['geral', 'dúvidas', 'desafios-semanais', 'materiais', 'entrevistas'],
    membro: true,
  },
  {
    id: 'c4',
    nome: 'DevOps & Cloud',
    descricao: 'Docker, Kubernetes, CI/CD, AWS, GCP e práticas de infraestrutura moderna.',
    membros: 52,
    tipo: 'por_solicitacao',
    categoria: 'Tecnologia',
    responsavel: 'Prof. Ricardo Almeida',
    icone: '☁️',
    cor: '#3b82f6',
    ativa: true,
    canais: ['geral', 'dúvidas', 'labs', 'materiais'],
    membro: false,
  },
  {
    id: 'c5',
    nome: 'Frontend React',
    descricao: 'React, hooks, componentes, estado, performance e ecossistema frontend moderno.',
    membros: 97,
    tipo: 'aberta',
    categoria: 'Tecnologia',
    responsavel: 'Profa. Ana Beatriz Costa',
    icone: '⚛️',
    cor: '#06b6d4',
    ativa: true,
    canais: ['geral', 'dúvidas', 'showcase', 'materiais', 'vagas'],
    membro: true,
  },
  {
    id: 'c6',
    nome: 'Segurança da Informação',
    descricao: 'OWASP, vulnerabilidades, criptografia, autenticação e segurança em aplicações.',
    membros: 38,
    tipo: 'por_solicitacao',
    categoria: 'Área',
    responsavel: 'Prof. Eduardo Lima',
    icone: '🔒',
    cor: '#ef4444',
    ativa: true,
    canais: ['geral', 'dúvidas', 'ctf', 'materiais'],
    membro: false,
  },
  {
    id: 'c7',
    nome: 'Python para Iniciantes',
    descricao: 'Primeiros passos com Python: sintaxe, lógica, estruturas de dados e projetos introdutórios.',
    membros: 203,
    tipo: 'aberta',
    categoria: 'Linguagem',
    responsavel: 'Profa. Camila Santos',
    icone: '🐍',
    cor: '#22c55e',
    ativa: true,
    canais: ['geral', 'dúvidas', 'exercícios', 'materiais', 'off-topic'],
    membro: false,
  },
  {
    id: 'c8',
    nome: 'Preparação para Hackathons',
    descricao: 'Troca de experiências, formação de equipes e preparação para hackathons e maratonas.',
    membros: 45,
    tipo: 'aberta',
    categoria: 'Grupo de Estudo',
    responsavel: 'Gabriel Santos',
    icone: '🚀',
    cor: '#f59e0b',
    ativa: true,
    canais: ['geral', 'equipes', 'ideias', 'resultados'],
    membro: false,
  },
];

const desafiosBase = [
  {
    id: 'd1',
    titulo: 'Validador de CPF',
    descricao: 'Implemente uma função que valide números de CPF seguindo as regras oficiais da Receita Federal, incluindo cálculo dos dígitos verificadores.',
    categoria: 'Backend',
    dificuldade: 'Fácil',
    linguagens: ['Java', 'Python', 'JavaScript'],
    autor: 'Prof. Ricardo Almeida',
    resolvido: true,
    tentativas: 312,
    taxaAcerto: 78,
    xp: 100,
    tags: ['validação', 'lógica', 'strings'],
  },
  {
    id: 'd2',
    titulo: 'API REST de Tarefas',
    descricao: 'Construa uma API REST completa para gerenciamento de tarefas com endpoints CRUD, validação de dados e tratamento de erros adequado.',
    categoria: 'Backend',
    dificuldade: 'Médio',
    linguagens: ['Java', 'Python'],
    autor: 'Prof. Ricardo Almeida',
    resolvido: false,
    tentativas: 187,
    taxaAcerto: 52,
    xp: 250,
    tags: ['api', 'rest', 'crud', 'http'],
  },
  {
    id: 'd3',
    titulo: 'Consulta SQL Otimizada',
    descricao: 'Dado um schema com tabelas de pedidos, produtos e clientes, escreva queries que retornem relatórios específicos com performance adequada.',
    categoria: 'Banco de Dados',
    dificuldade: 'Médio',
    linguagens: ['SQL'],
    autor: 'Profa. Camila Santos',
    resolvido: false,
    tentativas: 145,
    taxaAcerto: 61,
    xp: 200,
    tags: ['sql', 'joins', 'performance', 'agregação'],
  },
  {
    id: 'd4',
    titulo: 'Encontre o Bug: Deadlock',
    descricao: 'Analise o código fornecido que apresenta um deadlock em ambiente multi-threaded. Identifique a causa raiz e implemente a correção.',
    categoria: 'Debugging',
    dificuldade: 'Difícil',
    linguagens: ['Java'],
    autor: 'Prof. Eduardo Lima',
    resolvido: false,
    tentativas: 89,
    taxaAcerto: 34,
    xp: 400,
    tags: ['threads', 'concorrência', 'deadlock', 'debug'],
  },
  {
    id: 'd5',
    titulo: 'Componente de Formulário',
    descricao: 'Crie um componente React reutilizável de formulário com validação em tempo real, estados de erro e feedback visual ao usuário.',
    categoria: 'Frontend',
    dificuldade: 'Médio',
    linguagens: ['JavaScript'],
    autor: 'Profa. Ana Beatriz Costa',
    resolvido: true,
    tentativas: 223,
    taxaAcerto: 65,
    xp: 200,
    tags: ['react', 'componentes', 'formulários', 'validação'],
  },
  {
    id: 'd6',
    titulo: 'Busca Binária Recursiva',
    descricao: 'Implemente o algoritmo de busca binária de forma recursiva. Trate casos de array vazio e elemento não encontrado.',
    categoria: 'Algoritmos',
    dificuldade: 'Fácil',
    linguagens: ['Java', 'Python', 'JavaScript', 'C'],
    autor: 'Prof. Eduardo Lima',
    resolvido: true,
    tentativas: 456,
    taxaAcerto: 85,
    xp: 80,
    tags: ['busca', 'recursão', 'arrays'],
  },
  {
    id: 'd7',
    titulo: 'Testes Unitários para Carrinho',
    descricao: 'Escreva uma suíte completa de testes unitários para uma classe CarrinhoDeCompras, cobrindo adição, remoção, cálculo de total e cupons de desconto.',
    categoria: 'Testes',
    dificuldade: 'Médio',
    linguagens: ['Java', 'Python'],
    autor: 'Prof. Ricardo Almeida',
    resolvido: false,
    tentativas: 98,
    taxaAcerto: 58,
    xp: 250,
    tags: ['testes', 'junit', 'cobertura', 'tdd'],
  },
  {
    id: 'd8',
    titulo: 'Árvore Binária de Busca',
    descricao: 'Implemente uma árvore binária de busca com inserção, remoção, busca e travessia em ordem. Garanta o balanceamento da estrutura.',
    categoria: 'Algoritmos',
    dificuldade: 'Difícil',
    linguagens: ['Java', 'Python', 'C'],
    autor: 'Prof. Eduardo Lima',
    resolvido: false,
    tentativas: 134,
    taxaAcerto: 41,
    xp: 350,
    tags: ['árvores', 'estruturas de dados', 'recursão'],
  },
  {
    id: 'd9',
    titulo: 'Configuração de Git Hooks',
    descricao: 'Configure hooks de pre-commit e pre-push que executem linting e testes antes de permitir as operações no repositório.',
    categoria: 'Git',
    dificuldade: 'Fácil',
    linguagens: ['Bash'],
    autor: 'Prof. Ricardo Almeida',
    resolvido: true,
    tentativas: 67,
    taxaAcerto: 88,
    xp: 100,
    tags: ['git', 'hooks', 'automação', 'ci'],
  },
  {
    id: 'd10',
    titulo: 'Pattern Matching em Logs',
    descricao: 'Crie um parser que extraia informações estruturadas de arquivos de log em diferentes formatos, identificando erros, warnings e timestamps.',
    categoria: 'Backend',
    dificuldade: 'Médio',
    linguagens: ['Python', 'Java'],
    autor: 'Profa. Camila Santos',
    resolvido: false,
    tentativas: 112,
    taxaAcerto: 55,
    xp: 200,
    tags: ['regex', 'parsing', 'logs', 'strings'],
  },
  {
    id: 'd11',
    titulo: 'Contagem de frequência',
    descricao: 'Dada uma lista de palavras, descubra quantas vezes cada uma aparece e devolva o resultado organizado.',
    categoria: 'Programação',
    dificuldade: 'Fácil',
    linguagens: ['Python'],
    autor: 'Prof. Eduardo Lima',
    resolvido: false,
    tentativas: 264,
    taxaAcerto: 63,
    xp: 120,
    tags: ['contagem', 'loops', 'strings'],
  },
  {
    id: 'd12',
    titulo: 'Agenda de Contatos',
    descricao: 'Monte uma pequena agenda que adiciona, busca e lista contatos usando funções e estruturas de dados do Python.',
    categoria: 'Programação',
    dificuldade: 'Médio',
    linguagens: ['Python'],
    autor: 'Profa. Camila Santos',
    resolvido: false,
    tentativas: 118,
    taxaAcerto: 49,
    xp: 220,
    tags: ['funções', 'listas', 'dicionários'],
  },
];

export const arenas = [
  {
    id: 'a1',
    titulo: 'Desafio Semanal #14',
    descricao: 'Resolva 3 desafios de lógica e algoritmos em 90 minutos. Teste suas habilidades de resolução sob pressão.',
    tipo: 'aberta',
    status: 'agendada',
    inicio: '2026-10-07T19:00:00',
    duracao: 90,
    desafios: 3,
    participantes: 34,
    maxParticipantes: null,
    categoria: 'Algoritmos',
    criador: 'Prof. Eduardo Lima',
    inscrito: true,
  },
  {
    id: 'a2',
    titulo: 'Sprint de Backend',
    descricao: 'Desafios práticos de API e arquitetura backend. Construa endpoints, trate erros e otimize performance.',
    tipo: 'comunidade',
    comunidade: 'Backend com Java',
    status: 'agendada',
    inicio: '2026-10-09T14:00:00',
    duracao: 120,
    desafios: 4,
    participantes: 18,
    maxParticipantes: 50,
    categoria: 'Backend',
    criador: 'Prof. Ricardo Almeida',
    inscrito: false,
  },
  {
    id: 'a3',
    titulo: 'Blitz SQL',
    descricao: 'Rodada rápida de queries SQL. 5 consultas em 45 minutos. Foco em joins, agregações e subqueries.',
    tipo: 'aberta',
    status: 'em_andamento',
    inicio: '2026-10-06T08:00:00',
    duracao: 45,
    desafios: 5,
    participantes: 42,
    maxParticipantes: null,
    categoria: 'Banco de Dados',
    criador: 'Profa. Camila Santos',
    inscrito: false,
  },
  {
    id: 'a4',
    titulo: 'Avaliação Prática - Eng. Software',
    descricao: 'Arena verificada da disciplina de Engenharia de Software. Resolução individual em laboratório sob supervisão.',
    tipo: 'verificada',
    status: 'agendada',
    inicio: '2026-10-12T08:00:00',
    duracao: 180,
    desafios: 5,
    participantes: 45,
    maxParticipantes: 45,
    categoria: 'Backend',
    criador: 'Prof. Ricardo Almeida',
    inscrito: true,
  },
  {
    id: 'a5',
    titulo: 'Code Rush - Outubro',
    descricao: 'Competição mensal aberta a todos os alunos. Desafios variados de múltiplas categorias. Os melhores aparecem no ranking!',
    tipo: 'aberta',
    status: 'finalizada',
    inicio: '2026-09-28T19:00:00',
    duracao: 120,
    desafios: 6,
    participantes: 78,
    maxParticipantes: null,
    categoria: 'Mista',
    criador: 'Prof. Eduardo Lima',
    inscrito: true,
    resultado: { posicao: 7, pontos: 420, total: 78 },
  },
];

export const mensagensComunidade = [
  {
    id: 'm1',
    autor: { nome: 'Mariana Oliveira', iniciais: 'MO', nivel: 18 },
    conteudo: 'Pessoal, alguém já trabalhou com Spring Security e OAuth2? Estou tentando implementar autenticação com Google e travei na configuração do token.',
    timestamp: '2026-10-06T07:45:00',
    canal: 'dúvidas',
    respostas: 3,
  },
  {
    id: 'm2',
    autor: { nome: 'Gabriel Santos', iniciais: 'GS', nivel: 21 },
    conteudo: 'Sim! Tive o mesmo problema. O truque é configurar o redirect URI certinho. Vou compartilhar um trecho do meu application.yml que resolveu.',
    timestamp: '2026-10-06T07:52:00',
    canal: 'dúvidas',
    resposta_para: 'm1',
  },
  {
    id: 'm3',
    autor: { nome: 'Prof. Ricardo Almeida', iniciais: 'RA', nivel: null, professor: true },
    conteudo: 'Boa discussão! Aproveitem para olhar o material que postei sobre autenticação na aba de materiais. Tem um passo a passo completo com Spring Boot 3.',
    timestamp: '2026-10-06T08:01:00',
    canal: 'dúvidas',
    resposta_para: 'm1',
  },
  {
    id: 'm4',
    autor: { nome: 'Felipe Rocha', iniciais: 'FR', nivel: 9 },
    conteudo: 'Acabei de resolver o desafio "API REST de Tarefas" depois de 4 tentativas 🎉 A parte de validação com Bean Validation facilitou bastante.',
    timestamp: '2026-10-06T07:30:00',
    canal: 'geral',
  },
  {
    id: 'm5',
    autor: { nome: 'Isabela Souza', iniciais: 'IS', nivel: 15 },
    conteudo: 'Parabéns, Felipe! Esse desafio é bem completo. Eu errei bastante no tratamento de exceções antes de acertar.',
    timestamp: '2026-10-06T07:35:00',
    canal: 'geral',
    resposta_para: 'm4',
  },
  {
    id: 'm6',
    autor: { nome: 'Francisco Mendes', iniciais: 'FM', nivel: 12 },
    conteudo: 'Alguém tem recomendação de livro ou curso sobre Clean Architecture aplicado a Java? Quero melhorar a organização dos meus projetos.',
    timestamp: '2026-10-06T06:15:00',
    canal: 'geral',
  },
  {
    id: 'm7',
    autor: { nome: 'Pedro Henrique', iniciais: 'PH', nivel: 14 },
    conteudo: 'O "Clean Architecture" do Uncle Bob é referência. Mas para Java especificamente, recomendo o "Get Your Hands Dirty on Clean Architecture" do Tom Hombergs. É bem prático.',
    timestamp: '2026-10-06T06:28:00',
    canal: 'geral',
    resposta_para: 'm6',
  },
];

export const materiaisComunidade = [
  {
    id: 'mat1',
    titulo: 'Spring Boot 3 - Guia de Autenticação',
    tipo: 'PDF',
    autor: 'Prof. Ricardo Almeida',
    data: '2026-10-04',
    tamanho: '2.4 MB',
  },
  {
    id: 'mat2',
    titulo: 'Design Patterns em Java - Exemplos Práticos',
    tipo: 'Link',
    autor: 'Gabriel Santos',
    data: '2026-10-02',
    url: '#',
  },
  {
    id: 'mat3',
    titulo: 'Documentação Spring Data JPA',
    tipo: 'Link',
    autor: 'Prof. Ricardo Almeida',
    data: '2026-09-28',
    url: '#',
  },
  {
    id: 'mat4',
    titulo: 'Projeto exemplo - API REST com testes',
    tipo: 'Repositório',
    autor: 'Mariana Oliveira',
    data: '2026-09-25',
    url: '#',
  },
];

export const rankingArena = [
  { posicao: 1, nome: 'Gabriel Santos', iniciais: 'GS', pontos: 580, desafiosResolvidos: 6, tempo: '1h42m' },
  { posicao: 2, nome: 'Beatriz Lima', iniciais: 'BL', pontos: 550, desafiosResolvidos: 6, tempo: '1h48m' },
  { posicao: 3, nome: 'Mariana Oliveira', iniciais: 'MO', pontos: 520, desafiosResolvidos: 5, tempo: '1h35m' },
  { posicao: 4, nome: 'Rafael Costa', iniciais: 'RC', pontos: 490, desafiosResolvidos: 5, tempo: '1h52m' },
  { posicao: 5, nome: 'Pedro Henrique', iniciais: 'PH', pontos: 460, desafiosResolvidos: 5, tempo: '1h58m' },
  { posicao: 6, nome: 'Isabela Souza', iniciais: 'IS', pontos: 430, desafiosResolvidos: 4, tempo: '1h22m' },
  { posicao: 7, nome: 'Francisco Mendes', iniciais: 'FM', pontos: 420, desafiosResolvidos: 4, tempo: '1h30m' },
  { posicao: 8, nome: 'Juliana Alves', iniciais: 'JA', pontos: 380, desafiosResolvidos: 4, tempo: '1h45m' },
  { posicao: 9, nome: 'Amanda Rodrigues', iniciais: 'AR', pontos: 350, desafiosResolvidos: 3, tempo: '1h10m' },
  { posicao: 10, nome: 'Thiago Nascimento', iniciais: 'TN', pontos: 280, desafiosResolvidos: 3, tempo: '1h55m' },
];

export const atividadesRecentes = [
  { tipo: 'desafio', texto: 'Você resolveu "Validador de CPF"', tempo: '2 horas atrás', xp: 100 },
  { tipo: 'comunidade', texto: 'Nova mensagem em Backend com Java', tempo: '3 horas atrás' },
  { tipo: 'arena', texto: 'Você ficou em 7º no Code Rush - Outubro', tempo: '1 semana atrás', xp: 150 },
  { tipo: 'nivel', texto: 'Você alcançou o nível 12!', tempo: '1 semana atrás' },
  { tipo: 'desafio', texto: 'Você resolveu "Componente de Formulário"', tempo: '2 semanas atrás', xp: 200 },
];

export const conquistas = [
  { id: 'ach1', titulo: 'Primeiro Passo', descricao: 'Resolva seu primeiro desafio', conquistada: true, icone: '🎯' },
  { id: 'ach2', titulo: 'Persistente', descricao: 'Mantenha uma sequência de 7 dias', conquistada: true, icone: '🔥' },
  { id: 'ach3', titulo: 'Explorador', descricao: 'Resolva desafios de 3 categorias diferentes', conquistada: true, icone: '🧭' },
  { id: 'ach4', titulo: 'Competidor', descricao: 'Participe de sua primeira Arena', conquistada: true, icone: '⚔️' },
  { id: 'ach5', titulo: 'Top 10', descricao: 'Fique entre os 10 primeiros em uma Arena', conquistada: true, icone: '🏆' },
  { id: 'ach6', titulo: 'Mentor', descricao: 'Ajude 10 colegas nas comunidades', conquistada: false, icone: '🤝', progresso: 6, total: 10 },
  { id: 'ach7', titulo: 'Centurião', descricao: 'Resolva 100 desafios', conquistada: false, icone: '💯', progresso: 47, total: 100 },
  { id: 'ach8', titulo: 'Poliglota', descricao: 'Resolva desafios em 4 linguagens diferentes', conquistada: false, icone: '🌐', progresso: 2, total: 4 },
];

export const desafioDetalhe = {
  id: 'd2',
  titulo: 'API REST de Tarefas',
  descricao: `## Descrição

Construa uma API REST completa para gerenciamento de tarefas (To-Do List) utilizando os princípios RESTful.

## Requisitos

A API deve implementar os seguintes endpoints:

- \`GET /tarefas\` — Listar todas as tarefas
- \`GET /tarefas/{id}\` — Buscar tarefa por ID
- \`POST /tarefas\` — Criar nova tarefa
- \`PUT /tarefas/{id}\` — Atualizar tarefa existente
- \`DELETE /tarefas/{id}\` — Remover tarefa

## Modelo de Dados

Cada tarefa possui:
- \`id\` (Long) — Identificador único
- \`titulo\` (String) — Título da tarefa (obrigatório, max 100 caracteres)
- \`descricao\` (String) — Descrição detalhada (opcional, max 500 caracteres)
- \`concluida\` (Boolean) — Status de conclusão
- \`criadaEm\` (LocalDateTime) — Data de criação

## Validações

- O campo \`titulo\` é obrigatório e não pode estar em branco
- Retornar status HTTP adequados (201 para criação, 404 para não encontrado, etc.)
- Tratar exceções globalmente com mensagens de erro padronizadas

## Dicas

- Utilize Spring Boot com Spring Data JPA
- Configure um banco H2 em memória para simplificar
- Use Bean Validation (\`@Valid\`, \`@NotBlank\`, etc.)`,
  categoria: 'Backend',
  dificuldade: 'Médio',
  linguagens: ['Java', 'Python'],
  autor: 'Prof. Ricardo Almeida',
  tentativas: 187,
  taxaAcerto: 52,
  xp: 250,
  tags: ['api', 'rest', 'crud', 'http'],
  testes: [
    { nome: 'Teste 1: GET /tarefas retorna lista vazia', visivel: true },
    { nome: 'Teste 2: POST /tarefas cria tarefa', visivel: true },
    { nome: 'Teste 3: GET /tarefas/{id} retorna tarefa', visivel: true },
    { nome: 'Teste 4: PUT /tarefas/{id} atualiza tarefa', visivel: false },
    { nome: 'Teste 5: DELETE /tarefas/{id} remove tarefa', visivel: false },
    { nome: 'Teste 6: POST sem título retorna 400', visivel: false },
    { nome: 'Teste 7: GET id inexistente retorna 404', visivel: false },
  ],
  codigoInicial: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TarefasApplication {

    public static void main(String[] args) {
        SpringApplication.run(TarefasApplication.class, args);
    }
}

// TODO: Implemente o modelo Tarefa
// TODO: Implemente o repositório
// TODO: Implemente o controller REST
// TODO: Implemente o tratamento de exceções`,
};



// ============================================
// APRENDIZAGEM - Habilidades, Trilhas e Orientação
// (dados fictícios; nenhuma recomendação é calculada por IA)
// ============================================

export const habilidades = [
  { id: 'variaveis', nome: 'Variáveis', descricao: 'Guardar e nomear valores para usá-los depois.' },
  { id: 'condicionais', nome: 'Condicionais', descricao: 'Tomar decisões no código com if, elif e else.' },
  { id: 'loops', nome: 'Loops', descricao: 'Repetir instruções com for e while.' },
  { id: 'funcoes', nome: 'Funções', descricao: 'Agrupar um trecho de código reutilizável, com nome e parâmetros.' },
  { id: 'listas', nome: 'Listas', descricao: 'Guardar vários valores em ordem e acessá-los pela posição.' },
  { id: 'dicionarios', nome: 'Dicionários', descricao: 'Associar valores a chaves para encontrá-los rapidamente.' },
  { id: 'strings', nome: 'Strings', descricao: 'Trabalhar com texto: percorrer, medir e transformar.' },
  { id: 'recursao', nome: 'Recursão', descricao: 'Resolver um problema chamando a própria função para uma versão menor dele.' },
  { id: 'arvores', nome: 'Árvores', descricao: 'Organizar dados em nós com filhos, como na árvore binária de busca.' },
  { id: 'regex', nome: 'Expressões regulares', descricao: 'Descrever padrões de texto para encontrar ou extrair trechos.' },
  { id: 'excecoes', nome: 'Exceptions', descricao: 'Tratar erros em tempo de execução sem derrubar o programa.' },
  { id: 'rest', nome: 'REST', descricao: 'Expor recursos por URLs e verbos HTTP em uma API.' },
  { id: 'sql-basico', nome: 'SELECT e filtros', descricao: 'Consultar tabelas escolhendo colunas e filtrando linhas.' },
  { id: 'join', nome: 'JOIN', descricao: 'Combinar linhas de duas tabelas a partir de uma coluna em comum.' },
  { id: 'testes-unitarios', nome: 'Testes unitários', descricao: 'Verificar automaticamente pequenos trechos de código.' },
  { id: 'git', nome: 'Git', descricao: 'Registrar o histórico do projeto e trabalhar em equipe com branches.' },
  { id: 'concorrencia', nome: 'Concorrência', descricao: 'Lidar com várias threads executando ao mesmo tempo.' },
  { id: 'componentes', nome: 'Componentes React', descricao: 'Montar interfaces com componentes, props e estado.' },
];

// Habilidades, pré-requisitos recomendados e dicas progressivas de cada desafio.
// As dicas vão do mais sutil ao mais direto e nunca entregam a solução.
const ensinoDesafios = {
  d1: {
    habilidades: ['strings', 'loops', 'funcoes'],
    prerequisitos: ['variaveis', 'condicionais', 'strings'],
    dicas: [
      'Que informações você precisa separar do CPF antes de calcular qualquer coisa?',
      'Cada dígito verificador sai de uma soma ponderada dos dígitos anteriores. Pense em como percorrer os dígitos junto com seus pesos.',
      'Percorra os 9 primeiros dígitos com um loop, multiplicando cada um por um peso decrescente, e compare o resto da divisão por 11 com o dígito informado.',
    ],
  },
  d2: {
    habilidades: ['rest', 'excecoes'],
    prerequisitos: ['funcoes', 'excecoes'],
    dicas: [
      'Que operações uma lista de tarefas precisa permitir? Tente associar cada uma a um verbo HTTP.',
      'Cada endpoint vira um método do controller. O tratamento de erros pode ficar em um único lugar, compartilhado por todos os endpoints.',
      'Comece pelo modelo Tarefa e pelo repositório; depois crie o controller com um mapeamento por verbo e uma classe central para tratar as exceções.',
    ],
  },
  d3: {
    habilidades: ['sql-basico', 'join'],
    prerequisitos: ['sql-basico'],
    dicas: [
      'De quais tabelas vêm as informações que o relatório pede? Elas se relacionam por qual coluna?',
      'Quando os dados estão em tabelas diferentes, você precisa ligá-las antes de filtrar ou agrupar.',
      'Use JOIN com ON para ligar pedidos, clientes e produtos; só depois aplique WHERE, GROUP BY e funções de agregação.',
    ],
  },
  d4: {
    habilidades: ['concorrencia'],
    prerequisitos: ['funcoes'],
    dicas: [
      'Quais recursos cada thread tenta obter, e em que ordem?',
      'Um deadlock aparece quando duas threads seguram um recurso e esperam pelo que a outra segura.',
      'Garanta que todas as threads peçam os locks na mesma ordem, ou reduza o trecho que fica sincronizado.',
    ],
  },
  d5: {
    habilidades: ['componentes', 'condicionais'],
    prerequisitos: ['funcoes'],
    dicas: [
      'O que muda na tela quando o usuário digita? Onde esse dado precisa ficar guardado?',
      'O valor de cada campo e a mensagem de erro são estados do componente.',
      'Guarde valores e erros em useState e valide a cada mudança, mostrando a mensagem só quando houver erro.',
    ],
  },
  d6: {
    habilidades: ['recursao', 'listas'],
    prerequisitos: ['loops', 'listas', 'funcoes'],
    dicas: [
      'Se você olhar só o elemento do meio, o que descobre sobre o resto da lista?',
      'A cada passo o problema fica pela metade: a mesma função resolve a parte menor.',
      'Defina o caso base (lista vazia ou intervalo inválido) e chame a função de novo apenas para a metade em que o valor pode estar.',
    ],
  },
  d7: {
    habilidades: ['testes-unitarios'],
    prerequisitos: ['funcoes', 'excecoes'],
    dicas: [
      'Quais comportamentos do carrinho você consegue descrever em uma frase cada?',
      'Cada comportamento vira um teste curto: prepare o cenário, execute a ação e verifique o resultado.',
      'Crie um teste por caso (adicionar, remover, total, cupom) e inclua também os casos de borda, como carrinho vazio.',
    ],
  },
  d8: {
    habilidades: ['arvores', 'recursao'],
    prerequisitos: ['funcoes', 'listas', 'recursao'],
    dicas: [
      'Dado um valor, como você decide se ele vai para a esquerda ou para a direita de um nó?',
      'Cada subárvore também é uma árvore de busca, então a mesma operação serve para ela.',
      'Escreva inserção e busca recursivas: compare com o nó atual e continue na subárvore correspondente até achar um espaço vazio.',
    ],
  },
  d9: {
    habilidades: ['git'],
    prerequisitos: [],
    dicas: [
      'Em que momento do fluxo do Git você quer que a verificação aconteça?',
      'Hooks são scripts que o Git executa automaticamente em eventos específicos.',
      'Crie os arquivos pre-commit e pre-push em .git/hooks, torne-os executáveis e faça-os terminar com erro quando o lint ou os testes falharem.',
    ],
  },
  d10: {
    habilidades: ['regex', 'strings', 'dicionarios'],
    prerequisitos: ['strings', 'loops'],
    dicas: [
      'O que as linhas de log têm em comum? Que parte do texto se repete em todas?',
      'Descreva cada parte da linha (data, nível, mensagem) como um padrão de texto.',
      'Use uma expressão regular com grupos nomeados para extrair os campos e guarde cada resultado em um dicionário.',
    ],
  },
  d11: {
    habilidades: ['loops', 'dicionarios'],
    prerequisitos: ['variaveis', 'condicionais', 'loops'],
    dicas: [
      'Como você poderia guardar quantas vezes cada valor apareceu?',
      'Você precisa associar cada elemento a uma quantidade.',
      'Considere usar um dicionário para armazenar elemento → quantidade.',
    ],
  },
  d12: {
    habilidades: ['listas', 'dicionarios', 'funcoes'],
    prerequisitos: ['funcoes', 'listas', 'dicionarios'],
    dicas: [
      'Que informações cada contato precisa guardar? Como você as agruparia?',
      'Cada contato pode ser um conjunto de campos nomeados, e a agenda é uma coleção desses contatos.',
      'Represente cada contato como um dicionário, guarde todos em uma lista e crie uma função para cada operação (adicionar, buscar, listar).',
    ],
  },
};

export const desafios = desafiosBase.map((d) => ({ ...d, ...ensinoDesafios[d.id] }));

// Detalhes extras (enunciado completo, testes e código inicial) por desafio.
export const detalhesDesafios = {
  d2: desafioDetalhe,
  d11: {
    descricao: `## Descrição

Dada uma lista de palavras, descubra quantas vezes cada uma aparece e devolva o resultado organizado.

## Requisitos

- Implemente a função \`contar_frequencia(palavras)\`
- A função recebe uma lista de strings
- Ela devolve a contagem de cada palavra distinta
- Uma lista vazia deve devolver um resultado vazio
- Palavras iguais com letras maiúsculas e minúsculas diferentes contam como a mesma palavra

## Exemplo

Entrada: ["maçã", "pera", "maçã", "uva", "pera", "maçã"]
Saída: maçã aparece 3 vezes, pera 2 vezes e uva 1 vez.`,
    testes: [
      { nome: 'Teste 1: lista com palavras repetidas', visivel: true },
      { nome: 'Teste 2: lista vazia', visivel: true },
      { nome: 'Teste 3: todas as palavras diferentes', visivel: true },
      { nome: 'Teste 4: maiúsculas e minúsculas', visivel: false },
      { nome: 'Teste 5: lista com 10 mil palavras', visivel: false },
    ],
    codigoInicial: `def contar_frequencia(palavras):
    # TODO: devolva quantas vezes cada palavra aparece
    pass


print(contar_frequencia(["maçã", "pera", "maçã", "uva", "pera", "maçã"]))`,
  },
  d12: {
    descricao: `## Descrição

Monte uma pequena agenda de contatos que funcione pelo terminal.

## Requisitos

- \`adicionar(agenda, nome, telefone)\` — cadastra um contato
- \`buscar(agenda, nome)\` — devolve o contato ou informa que não existe
- \`listar(agenda)\` — devolve todos os contatos em ordem alfabética
- Não permita dois contatos com o mesmo nome`,
    testes: [
      { nome: 'Teste 1: adicionar e listar um contato', visivel: true },
      { nome: 'Teste 2: buscar contato existente', visivel: true },
      { nome: 'Teste 3: buscar contato inexistente', visivel: false },
      { nome: 'Teste 4: nome duplicado', visivel: false },
    ],
    codigoInicial: `agenda = []


def adicionar(agenda, nome, telefone):
    # TODO
    pass


def buscar(agenda, nome):
    # TODO
    pass


def listar(agenda):
    # TODO
    pass`,
  },
};

// Desafio completo (lista + detalhes) a partir do id da rota.
export function getDesafio(id) {
  const base = desafios.find((d) => String(d.id) === String(id)) || desafios[0] || {};
  return { ...base, ...(detalhesDesafios[base.id] || {}) };
}

// Conceitos curtos (um por habilidade): ideia, exemplo e exercício guiado.
export const conceitos = {
  variaveis: {
    definicao: 'Uma variável é um nome que guarda um valor para você usar depois.',
    linguagem: 'Python',
    codigo: 'idade = 20\nnome = "Francisco"\nidade = idade + 1\nprint(nome, idade)  # Francisco 21',
    exercicios: [{
      enunciado: 'Qual linha guarda o número 10 na variável pontos?',
      opcoes: ['pontos == 10', 'pontos = 10', '10 = pontos'],
      correta: 1,
      explicacao: 'O sinal = atribui um valor. Já == compara dois valores.',
    }],
  },
  condicionais: {
    definicao: 'Uma condicional executa um bloco apenas quando uma condição é verdadeira.',
    linguagem: 'Python',
    codigo: 'nota = 7\nif nota >= 6:\n    print("Aprovado")\nelse:\n    print("Em recuperação")',
    exercicios: [{
      enunciado: 'Qual palavra completa o código para tratar o segundo caso?',
      codigo: 'if x > 0:\n    print("positivo")\n___ x < 0:\n    print("negativo")',
      opcoes: ['elif', 'else if', 'elseif'],
      correta: 0,
      explicacao: 'Em Python, "senão, se" é escrito elif.',
    }],
  },
  loops: {
    definicao: 'Um loop repete um bloco de código para cada item ou enquanto uma condição for verdadeira.',
    linguagem: 'Python',
    codigo: 'for letra in "casa":\n    print(letra)\n\ncontador = 0\nwhile contador < 3:\n    contador += 1',
    exercicios: [{
      enunciado: 'Quantas vezes o print é executado?',
      codigo: 'for i in range(3):\n    print(i)',
      opcoes: ['2 vezes', '3 vezes', '4 vezes'],
      correta: 1,
      explicacao: 'range(3) gera 0, 1 e 2: três valores, três repetições.',
    }],
  },
  funcoes: {
    definicao: 'Uma função agrupa um trecho de código com um nome, para que você possa reutilizá-lo.',
    linguagem: 'Python',
    codigo: 'def dobro(n):\n    return n * 2\n\nprint(dobro(4))  # 8',
    exercicios: [{
      enunciado: 'Qual palavra define uma função em Python?',
      opcoes: ['def', 'func', 'function'],
      correta: 0,
      explicacao: 'Em Python as funções são declaradas com def.',
    }],
  },
  listas: {
    definicao: 'Uma lista guarda vários valores em ordem. Cada item tem uma posição, começando em 0.',
    linguagem: 'Python',
    codigo: 'nomes = ["Ana", "Bruno", "Carla"]\nprint(nomes[0])       # Ana\nnomes.append("Davi")  # adiciona no final\nprint(len(nomes))     # 4',
    experimente: [
      { expr: 'nomes[0]', resultado: '"Ana"' },
      { expr: 'nomes[-1]', resultado: '"Carla"' },
      { expr: 'len(nomes)', resultado: '3' },
    ],
    exercicios: [{
      enunciado: 'O que nomes[1] devolve?',
      codigo: 'nomes = ["Ana", "Bruno", "Carla"]',
      opcoes: ['"Ana"', '"Bruno"', '"Carla"'],
      correta: 1,
      explicacao: 'A contagem começa em 0, então a posição 1 é o segundo item.',
    }],
  },
  dicionarios: {
    definicao: 'Um dicionário guarda valores associados a uma chave.',
    linguagem: 'Python',
    codigo: 'idades = {"Ana": 21, "Bruno": 19}\nprint(idades["Ana"])      # 21\nidades["Carla"] = 23      # adiciona uma nova chave\nprint("Bruno" in idades)  # True',
    experimente: [
      { expr: 'idades["Ana"]', resultado: '21' },
      { expr: '"Bruno" in idades', resultado: 'True' },
      { expr: 'idades.get("Davi", 0)', resultado: '0' },
      { expr: 'len(idades)', resultado: '2' },
    ],
    exercicios: [
      {
        enunciado: 'Complete a linha para somar 1 ao valor da chave "maçã", que já existe.',
        codigo: 'estoque = {"maçã": 3, "pera": 5}\n___\nprint(estoque["maçã"])  # 4',
        opcoes: ['estoque["maçã"] = estoque["maçã"] + 1', 'estoque[maçã] + 1', 'estoque.maçã += 1'],
        correta: 0,
        explicacao: 'Você lê o valor atual pela chave e grava o novo valor na mesma chave.',
      },
      {
        enunciado: 'O que acontece ao ler estoque["kiwi"] quando essa chave não existe?',
        codigo: 'estoque = {"maçã": 3, "pera": 5}\nprint(estoque["kiwi"])',
        opcoes: ['Devolve 0', 'Dá erro (KeyError)', 'Devolve None'],
        correta: 1,
        explicacao: 'Ler uma chave inexistente gera erro. Com estoque.get("kiwi", 0) você escolhe um valor padrão.',
      },
    ],
  },
  strings: {
    definicao: 'Uma string é uma sequência de caracteres. Dá para medir, percorrer e transformar o texto.',
    linguagem: 'Python',
    codigo: 'palavra = "banana"\nprint(len(palavra))     # 6\nprint(palavra[0])       # b\nprint(palavra.upper())  # BANANA',
    experimente: [
      { expr: 'len(palavra)', resultado: '6' },
      { expr: 'palavra[0]', resultado: '"b"' },
      { expr: 'palavra.upper()', resultado: '"BANANA"' },
    ],
    exercicios: [{
      enunciado: 'Quanto vale len("casa")?',
      opcoes: ['3', '4', '5'],
      correta: 1,
      explicacao: 'A palavra tem quatro caracteres: c, a, s, a.',
    }],
  },
  recursao: {
    definicao: 'Na recursão, uma função chama a si mesma para resolver uma versão menor do mesmo problema.',
    linguagem: 'Python',
    codigo: 'def fatorial(n):\n    if n <= 1:      # caso base\n        return 1\n    return n * fatorial(n - 1)',
    exercicios: [{
      enunciado: 'O que impede uma função recursiva de se chamar para sempre?',
      opcoes: ['Um caso base', 'Um loop for', 'Uma variável global'],
      correta: 0,
      explicacao: 'O caso base é a condição em que a função responde sem chamar a si mesma.',
    }],
  },
  arvores: {
    definicao: 'Uma árvore organiza dados em nós com filhos. Na árvore binária de busca, valores menores ficam à esquerda e maiores à direita.',
    linguagem: 'Python',
    codigo: 'class No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.esquerda = None\n        self.direita = None',
    exercicios: [{
      enunciado: 'Em uma árvore binária de busca, onde fica o valor 3 em relação ao nó 5?',
      opcoes: ['À esquerda', 'À direita', 'No próprio nó'],
      correta: 0,
      explicacao: '3 é menor que 5, então fica na subárvore da esquerda.',
    }],
  },
  regex: {
    definicao: 'Uma expressão regular descreve um padrão de texto para encontrar ou extrair trechos.',
    linguagem: 'Python',
    codigo: 'import re\n\nre.findall(r"\\d+", "pedido 42 e 7")  # ["42", "7"]',
    exercicios: [{
      enunciado: 'O que o padrão \\d+ encontra?',
      opcoes: ['Uma ou mais letras', 'Um ou mais dígitos', 'Espaços em branco'],
      correta: 1,
      explicacao: '\\d representa um dígito e o + significa "uma ou mais vezes".',
    }],
  },
  excecoes: {
    definicao: 'Uma exceção sinaliza que algo deu errado. Com try/catch você decide o que fazer em vez de deixar o programa quebrar.',
    linguagem: 'Java',
    codigo: 'try {\n    int n = Integer.parseInt("abc");\n} catch (NumberFormatException e) {\n    System.out.println("Número inválido");\n}',
    exercicios: [{
      enunciado: 'Qual bloco é executado quando a exceção acontece?',
      opcoes: ['try', 'catch', 'finally'],
      correta: 1,
      explicacao: 'O catch captura a exceção lançada dentro do try.',
    }],
  },
  rest: {
    definicao: 'REST organiza uma API em recursos acessados por URLs, e o verbo HTTP diz qual ação executar.',
    linguagem: 'HTTP',
    codigo: 'GET    /tarefas      -> lista as tarefas\nPOST   /tarefas      -> cria uma tarefa\nDELETE /tarefas/7    -> remove a tarefa 7',
    exercicios: [{
      enunciado: 'Qual verbo HTTP usar para criar uma nova tarefa?',
      opcoes: ['GET', 'POST', 'DELETE'],
      correta: 1,
      explicacao: 'POST envia dados para criar um novo recurso.',
    }],
  },
  'sql-basico': {
    definicao: 'SELECT escolhe as colunas que você quer ver e WHERE filtra as linhas.',
    linguagem: 'SQL',
    codigo: 'SELECT nome, preco\nFROM produtos\nWHERE preco < 50;',
    exercicios: [{
      enunciado: 'Qual cláusula filtra as linhas do resultado?',
      opcoes: ['WHERE', 'ORDER BY', 'GROUP BY'],
      correta: 0,
      explicacao: 'WHERE mantém apenas as linhas que atendem à condição.',
    }],
  },
  join: {
    definicao: 'JOIN combina linhas de duas tabelas usando uma coluna que existe nas duas.',
    linguagem: 'SQL',
    codigo: 'SELECT c.nome, p.total\nFROM clientes c\nJOIN pedidos p ON p.cliente_id = c.id;',
    exercicios: [{
      enunciado: 'O que vem depois de ON em um JOIN?',
      opcoes: ['A condição que liga as tabelas', 'O nome da coluna ordenada', 'O limite de linhas'],
      correta: 0,
      explicacao: 'O ON diz quais colunas devem ser iguais para ligar uma linha à outra.',
    }],
  },
  'testes-unitarios': {
    definicao: 'Um teste unitário verifica automaticamente se um pedaço pequeno do código se comporta como esperado.',
    linguagem: 'Java',
    codigo: '@Test\nvoid somaDoisNumeros() {\n    Calculadora calc = new Calculadora();\n    assertEquals(5, calc.somar(2, 3));\n}',
    exercicios: [{
      enunciado: 'O que assertEquals(5, resultado) faz?',
      opcoes: ['Falha o teste se resultado não for 5', 'Atribui 5 a resultado', 'Imprime o número 5'],
      correta: 0,
      explicacao: 'A asserção compara o valor esperado com o obtido e falha se forem diferentes.',
    }],
  },
  git: {
    definicao: 'O Git registra o histórico do projeto em commits. Branches permitem trabalhar em paralelo sem atrapalhar os colegas.',
    linguagem: 'Terminal',
    codigo: 'git checkout -b minha-feature\ngit add .\ngit commit -m "Adiciona validação"',
    exercicios: [{
      enunciado: 'Qual comando grava uma nova versão no histórico?',
      opcoes: ['git commit', 'git clone', 'git status'],
      correta: 0,
      explicacao: 'git commit cria um registro com as alterações que você preparou com git add.',
    }],
  },
  concorrencia: {
    definicao: 'Concorrência é quando várias threads executam ao mesmo tempo. Se duas esperam uma pela outra, acontece um deadlock.',
    linguagem: 'Java',
    codigo: 'synchronized (contaA) {\n    synchronized (contaB) {\n        transferir(contaA, contaB, 100);\n    }\n}',
    exercicios: [{
      enunciado: 'O que é um deadlock?',
      opcoes: ['Threads esperando umas pelas outras para sempre', 'Uma thread muito lenta', 'Um erro de sintaxe'],
      correta: 0,
      explicacao: 'Cada thread segura um recurso de que a outra precisa, e nenhuma consegue continuar.',
    }],
  },
  componentes: {
    definicao: 'Um componente React é uma função que recebe props e devolve interface. O estado guarda os dados que mudam.',
    linguagem: 'JavaScript',
    codigo: 'function Contador() {\n  const [n, setN] = useState(0);\n  return <button onClick={() => setN(n + 1)}>{n}</button>;\n}',
    exercicios: [{
      enunciado: 'Qual hook guarda um valor que muda e atualiza a tela?',
      opcoes: ['useState', 'useEffect', 'useMemo'],
      correta: 0,
      explicacao: 'useState devolve o valor atual e uma função para alterá-lo.',
    }],
  },
};

// Trilhas: jornadas progressivas, com tipos de etapa variados.
// tipo: conceito | exemplo | exercicio_guiado | desafio | checkpoint | desafio_final
export const trilhas = [
  {
    id: 'python-fundamentos',
    nome: 'Fundamentos de Python',
    descricao: 'Do primeiro print até estruturas de dados: a base para resolver a maioria dos desafios.',
    objetivo: 'Ao final, você escreve programas Python que tomam decisões, repetem tarefas e organizam dados em listas e dicionários.',
    nivel: 'Iniciante',
    duracao: '6 h',
    habilidades: ['variaveis', 'condicionais', 'loops', 'funcoes', 'listas', 'dicionarios'],
    etapas: [
      { id: 'py-1', titulo: 'Variáveis e tipos', tipo: 'conceito', habilidade: 'variaveis', duracao: '10 min' },
      { id: 'py-2', titulo: 'Condicionais', tipo: 'exemplo', habilidade: 'condicionais', duracao: '15 min' },
      { id: 'py-3', titulo: 'Laços', tipo: 'exercicio_guiado', habilidade: 'loops', duracao: '20 min' },
      { id: 'py-4', titulo: 'Funções', tipo: 'desafio', habilidade: 'funcoes', desafioId: 'd1', duracao: '40 min' },
      { id: 'py-5', titulo: 'Listas', tipo: 'exercicio_guiado', habilidade: 'listas', duracao: '20 min' },
      { id: 'py-6', titulo: 'Dicionários', tipo: 'conceito', habilidade: 'dicionarios', duracao: '10 min' },
      { id: 'py-7', titulo: 'Checkpoint: Contagem de frequência', tipo: 'checkpoint', habilidade: 'dicionarios', desafioId: 'd11', duracao: '30 min' },
      { id: 'py-8', titulo: 'Desafio final: Agenda de Contatos', tipo: 'desafio_final', habilidade: 'funcoes', desafioId: 'd12', duracao: '1 h' },
    ],
  },
  {
    id: 'java-backend',
    nome: 'Backend com Java',
    descricao: 'Exceções, APIs REST e testes: o que você precisa para construir serviços confiáveis.',
    objetivo: 'Ao final, você constrói uma API REST com tratamento de erros e testes automatizados.',
    nivel: 'Intermediário',
    duracao: '8 h',
    habilidades: ['excecoes', 'rest', 'testes-unitarios'],
    etapas: [
      { id: 'jb-1', titulo: 'Tratamento de exceções', tipo: 'conceito', habilidade: 'excecoes', duracao: '15 min' },
      { id: 'jb-2', titulo: 'Validador de CPF', tipo: 'desafio', habilidade: 'excecoes', desafioId: 'd1', duracao: '40 min' },
      { id: 'jb-3', titulo: 'O que é REST', tipo: 'conceito', habilidade: 'rest', duracao: '15 min' },
      { id: 'jb-4', titulo: 'API REST de Tarefas', tipo: 'desafio', habilidade: 'rest', desafioId: 'd2', duracao: '2 h' },
      { id: 'jb-5', titulo: 'Testes unitários', tipo: 'exercicio_guiado', habilidade: 'testes-unitarios', duracao: '30 min' },
      { id: 'jb-6', titulo: 'Desafio final: Testes para Carrinho', tipo: 'desafio_final', habilidade: 'testes-unitarios', desafioId: 'd7', duracao: '1 h 30' },
    ],
  },
  {
    id: 'banco-de-dados',
    nome: 'Banco de Dados',
    descricao: 'Consultar, relacionar e otimizar dados com SQL.',
    objetivo: 'Ao final, você escreve consultas que combinam várias tabelas com boa performance.',
    nivel: 'Iniciante',
    duracao: '5 h',
    habilidades: ['sql-basico', 'join'],
    etapas: [
      { id: 'bd-1', titulo: 'SELECT e filtros', tipo: 'conceito', habilidade: 'sql-basico', duracao: '15 min' },
      { id: 'bd-2', titulo: 'Combinando tabelas com JOIN', tipo: 'conceito', habilidade: 'join', duracao: '15 min' },
      { id: 'bd-3', titulo: 'Praticando JOIN', tipo: 'exercicio_guiado', habilidade: 'join', duracao: '30 min' },
      { id: 'bd-4', titulo: 'Desafio final: Consulta SQL Otimizada', tipo: 'desafio_final', habilidade: 'join', desafioId: 'd3', duracao: '1 h 30' },
    ],
  },
  {
    id: 'debugging',
    nome: 'Debugging',
    descricao: 'Aprenda a ler erros, formular hipóteses e encontrar a causa raiz de um bug.',
    objetivo: 'Ao final, você investiga falhas de forma metódica, inclusive as de concorrência.',
    nivel: 'Intermediário',
    duracao: '4 h',
    habilidades: ['excecoes', 'concorrencia'],
    etapas: [
      { id: 'dbg-1', titulo: 'Lendo mensagens de erro', tipo: 'conceito', habilidade: 'excecoes', duracao: '15 min' },
      { id: 'dbg-2', titulo: 'Threads e deadlock', tipo: 'conceito', habilidade: 'concorrencia', duracao: '20 min' },
      { id: 'dbg-3', titulo: 'Desafio final: Encontre o Bug', tipo: 'desafio_final', habilidade: 'concorrencia', desafioId: 'd4', duracao: '1 h 30' },
    ],
  },
  {
    id: 'git-colaboracao',
    nome: 'Git e Colaboração',
    descricao: 'Versione seu código e trabalhe em equipe sem medo de sobrescrever o trabalho dos outros.',
    objetivo: 'Ao final, você usa branches, commits e hooks no dia a dia de um projeto em equipe.',
    nivel: 'Iniciante',
    duracao: '3 h',
    habilidades: ['git'],
    etapas: [
      { id: 'gt-1', titulo: 'Commits e branches', tipo: 'conceito', habilidade: 'git', duracao: '15 min' },
      { id: 'gt-2', titulo: 'Configuração de Git Hooks', tipo: 'desafio', habilidade: 'git', desafioId: 'd9', duracao: '30 min' },
      { id: 'gt-3', titulo: 'Trabalhando em equipe', tipo: 'exercicio_guiado', habilidade: 'git', duracao: '30 min' },
    ],
  },
];

export const tiposEtapa = {
  conceito: 'Conceito curto',
  exemplo: 'Exemplo',
  exercicio_guiado: 'Exercício guiado',
  desafio: 'Desafio',
  checkpoint: 'Checkpoint',
  desafio_final: 'Desafio final',
};

// Trilhas em que um desafio aparece (derivado dos mocks de trilhas).
export function trilhasDoDesafio(desafioId) {
  return trilhas
    .map((t) => ({ trilha: t, etapa: t.etapas.find((e) => e.desafioId === desafioId) }))
    .filter((x) => x.etapa);
}

// Estado inicial do aluno. Evidências por habilidade: desafios, checkpoints e exercícios guiados.
export const progressoInicial = {
  ultimaTrilha: 'python-fundamentos',
  etapasConcluidas: {
    'python-fundamentos': ['py-1', 'py-2', 'py-3', 'py-4'],
    'java-backend': ['jb-1', 'jb-2'],
    'banco-de-dados': [],
    'debugging': [],
    'git-colaboracao': ['gt-1', 'gt-2'],
  },
  desafiosResolvidos: ['d1', 'd5', 'd6', 'd9'],
  conceitosPraticados: [],
  evidencias: {
    variaveis: { desafios: 9, checkpoints: 2, guiados: 3 },
    condicionais: { desafios: 8, checkpoints: 2, guiados: 2 },
    loops: { desafios: 4, checkpoints: 1, guiados: 2 },
    funcoes: { desafios: 5, checkpoints: 1, guiados: 1 },
    listas: { desafios: 2, checkpoints: 0, guiados: 0 },
    dicionarios: { desafios: 0, checkpoints: 0, guiados: 0 },
    strings: { desafios: 6, checkpoints: 1, guiados: 1 },
    recursao: { desafios: 2, checkpoints: 0, guiados: 0 },
    arvores: { desafios: 0, checkpoints: 0, guiados: 0 },
    regex: { desafios: 0, checkpoints: 0, guiados: 0 },
    excecoes: { desafios: 3, checkpoints: 1, guiados: 1 },
    rest: { desafios: 1, checkpoints: 0, guiados: 0 },
    'sql-basico': { desafios: 5, checkpoints: 1, guiados: 0 },
    join: { desafios: 0, checkpoints: 0, guiados: 0 },
    'testes-unitarios': { desafios: 1, checkpoints: 0, guiados: 0 },
    git: { desafios: 2, checkpoints: 0, guiados: 1 },
    concorrencia: { desafios: 0, checkpoints: 0, guiados: 0 },
    componentes: { desafios: 3, checkpoints: 0, guiados: 1 },
  },
};

// Visão do professor (dados agregados fictícios)
export const metricasAprendizagem = {
  alunosEmTrilhas: 118,
  alunosAtivos: 156,
  etapasConcluidasSemana: 342,
  pedidosDeAjudaSemana: 167,
  trilhasMaisUsadas: [
    { trilhaId: 'python-fundamentos', alunos: 74, etapasMedia: 4.2 },
    { trilhaId: 'java-backend', alunos: 39, etapasMedia: 2.8 },
    { trilhaId: 'banco-de-dados', alunos: 31, etapasMedia: 2.1 },
    { trilhaId: 'git-colaboracao', alunos: 22, etapasMedia: 1.9 },
  ],
  habilidadesComDificuldade: [
    { habilidadeId: 'dicionarios', pedidosDeAjuda: 42 },
    { habilidadeId: 'recursao', pedidosDeAjuda: 31 },
    { habilidadeId: 'join', pedidosDeAjuda: 27 },
    { habilidadeId: 'excecoes', pedidosDeAjuda: 19 },
  ],
};
