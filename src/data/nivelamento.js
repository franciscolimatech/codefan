// Questões e critérios do protótipo Figma Make, ligados às habilidades do CodeFan.
export const questoes = [
  {
    skill: 'variaveis',
    title: 'Qual será o valor de total ao final deste código?',
    code: 'preco = 20\nquantidade = 3\ntotal = preco * quantidade',
    options: ['23', '60', '203', 'Não sei ainda'],
    answer: 1,
    concept: 'Variáveis guardam valores. O operador * multiplica dois números.',
  },
  {
    skill: 'condicionais',
    title: 'O que este código exibe quando idade é igual a 18?',
    code: 'idade = 18\nif idade >= 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")',
    options: [
      'Maior de idade',
      'Menor de idade',
      'Nenhuma mensagem',
      'Não sei ainda',
    ],
    answer: 0,
    concept: 'Uma condição com >= inclui o próprio valor comparado.',
  },
  {
    skill: 'loops',
    title: 'Quantas vezes a mensagem será exibida?',
    code: 'for numero in range(3):\n    print("Olá, CodeFan!")',
    options: ['2 vezes', '3 vezes', '4 vezes', 'Não sei ainda'],
    answer: 1,
    concept:
      'range(3) produz os valores 0, 1 e 2. O laço executa uma vez para cada valor.',
  },
  {
    skill: 'funcoes',
    title: 'Qual palavra devolve o resultado de uma função?',
    code: 'def somar(a, b):\n    ____ a + b',
    options: ['print', 'result', 'return', 'Não sei ainda'],
    answer: 2,
    concept:
      'return devolve um valor para o código que chamou a função. print apenas exibe uma mensagem.',
  },
  {
    skill: 'funcoes',
    title: 'Qual é o resultado desta chamada de função?',
    code: 'def dobro(numero):\n    return numero * 2\n\nresultado = dobro(5)',
    options: ['5', '10', '2', 'Não sei ainda'],
    answer: 1,
    concept:
      'O argumento 5 entra na função como numero. O valor retornado é 5 × 2.',
  },
  {
    skill: 'dicionarios',
    title: 'Como acessar o nome neste dicionário?',
    code: 'aluno = {\n    "nome": "Francisco",\n    "linguagem": "Python"\n}',
    options: ['aluno[0]', 'aluno.nome()', 'aluno["nome"]', 'Não sei ainda'],
    answer: 2,
    concept:
      'Dicionários organizam pares de chave e valor. Use a chave entre colchetes para acessar seu valor.',
  },
];
export const habilidadesNivelamento = [
  ...new Set(questoes.map((q) => q.skill)),
];
export const nivelamentoVazio = () => ({
  answers: [],
  index: 0,
  completed: false,
  helped: [],
  selected: null,
});

export function tipoResposta(questao, resposta, assistida) {
  if (resposta === questao.options.length - 1) return 'ignorada';
  if (resposta !== questao.answer) return 'incorreta';
  return assistida ? 'assistida' : 'independente';
}

export function evidenciaNivelamento(habilidadeId, dados) {
  const contagens = {
    independente: 0,
    assistida: 0,
    ignorada: 0,
    incorreta: 0,
  };
  // Só uma tentativa completa produz diagnóstico. Rascunhos não mudam habilidades.
  if (dados.completed)
    questoes.forEach((q, i) => {
      if (q.skill === habilidadeId)
        contagens[
          tipoResposta(q, dados.answers[i], dados.helped.includes(i))
        ]++;
    });
  const estado =
    contagens.independente >= 2
      ? 'praticando'
      : contagens.independente + contagens.assistida > 0
        ? 'comecando'
        : 'nao_demonstrado';
  const descricao =
    estado === 'praticando'
      ? 'Múltiplas evidências independentes; continue praticando para confirmar recorrência.'
      : contagens.independente > 0
        ? 'Evidência inicial independente, ainda insuficiente para afirmar domínio.'
        : contagens.assistida > 0
          ? 'Evidência inicial com dica; confirme em uma nova prática independente.'
          : 'Evidência insuficiente nesta tentativa; isso não significa ausência de conhecimento.';
  const resumo = Object.entries(contagens)
    .filter(([, n]) => n)
    .map(([tipo, n]) => `${n} ${tipo}${n > 1 ? 's' : ''}`)
    .join(' · ');
  return { habilidadeId, estado, contagens, descricao, resumo };
}

export function validarNivelamento(raw) {
  if (!raw || !Array.isArray(raw.answers)) return nivelamentoVazio();
  const answers = [];
  for (let i = 0; i < questoes.length; i++) {
    const resposta = raw.answers[i];
    if (
      !Number.isInteger(resposta) ||
      resposta < 0 ||
      resposta >= questoes[i].options.length
    )
      break;
    answers.push(resposta);
  }
  const completed =
    raw.completed === true && answers.length === questoes.length;
  // Um registro sem completed mas com todas as respostas também é recuperável.
  if (!completed && answers.length === questoes.length) answers.pop();
  const index = completed ? questoes.length - 1 : answers.length;
  const helped = Array.isArray(raw.helped)
    ? [
        ...new Set(
          raw.helped.filter((i) => Number.isInteger(i) && i >= 0 && i <= index)
        ),
      ]
    : [];
  const selected =
    !completed &&
    Number.isInteger(raw.selected) &&
    raw.selected >= 0 &&
    raw.selected < questoes[index].options.length
      ? raw.selected
      : null;
  return { answers, index, completed, helped, selected };
}

export function recomendacaoNivelamento(dados) {
  const mapa = dados.completed
    ? habilidadesNivelamento.map((id) => evidenciaNivelamento(id, dados))
    : [];
  const lacunas = mapa
    .filter((h) => h.estado !== 'praticando')
    .sort(
      (a, b) =>
        a.contagens.independente +
        a.contagens.assistida -
        (b.contagens.independente + b.contagens.assistida)
    );
  return { trilhaId: 'python-fundamentos', desafioId: 'd12', lacunas, mapa };
}
