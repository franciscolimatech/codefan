import test from 'node:test';
import assert from 'node:assert/strict';
import {
  questoes,
  nivelamentoVazio,
  validarNivelamento,
  tipoResposta,
  evidenciaNivelamento,
  recomendacaoNivelamento,
} from '../src/data/nivelamento.js';
import { calcularEstado } from '../src/data/aprendizagem.js';
import { trilhas, desafios, progressoInicial } from '../src/data/mockData.js';
import { lerLocal, salvarLocal } from '../src/data/persistencia.js';

const tentativa = (answers = questoes.map((q) => q.answer), helped = []) => ({
  ...nivelamentoVazio(),
  answers,
  helped,
  index: 5,
  completed: true,
});

test('um acerto, mesmo independente, não prova consistência', () => {
  const ev = evidenciaNivelamento('variaveis', tentativa());
  assert.equal(ev.estado, 'comecando');
  assert.equal(calcularEstado({ independentes: 1 }), 'comecando');
  assert.equal(calcularEstado({ desafios: 6, checkpoints: 1 }), 'praticando');
  assert.equal(calcularEstado({ desafios: 6, checkpoints: 2 }), 'consistente');
});

test('duas respostas independentes em funções permitem PRATICANDO, nunca CONSISTENTE', () => {
  assert.equal(
    evidenciaNivelamento('funcoes', tentativa()).estado,
    'praticando'
  );
  assert.equal(
    evidenciaNivelamento('funcoes', tentativa(undefined, [3, 4])).estado,
    'comecando'
  );
  assert.equal(
    evidenciaNivelamento('funcoes', tentativa(undefined, [4])).estado,
    'comecando'
  );
});

test('dica, resposta incorreta e não sei são registrados separadamente', () => {
  assert.equal(tipoResposta(questoes[0], 1, true), 'assistida');
  assert.equal(tipoResposta(questoes[0], 0, true), 'incorreta');
  assert.equal(tipoResposta(questoes[0], 3, true), 'ignorada');
  const ev = evidenciaNivelamento(
    'funcoes',
    tentativa([1, 0, 1, 0, 3, 2], [3])
  );
  assert.deepEqual(ev.contagens, {
    independente: 0,
    assistida: 0,
    ignorada: 1,
    incorreta: 1,
  });
  assert.equal(ev.estado, 'nao_demonstrado');
});

test('rascunho incompleto não altera o diagnóstico', () => {
  assert.equal(
    evidenciaNivelamento('variaveis', { ...nivelamentoVazio(), answers: [1] })
      .estado,
    'nao_demonstrado'
  );
});

test('retomada recupera a seleção e uso da dica sem confiar em índice externo', () => {
  const recuperada = validarNivelamento({
    answers: [1, 0],
    index: 100,
    helped: [0, 2, 2, -1, 88],
    selected: 1,
    completed: true,
  });
  assert.deepEqual(recuperada, {
    answers: [1, 0],
    index: 2,
    helped: [0, 2],
    selected: 1,
    completed: false,
  });
  assert.equal(validarNivelamento(tentativa()).completed, true);
});

test('armazenamento malformado, lacunas nas respostas e seleção inválida são recuperáveis', () => {
  assert.deepEqual(validarNivelamento(null), nivelamentoVazio());
  assert.deepEqual(
    validarNivelamento({ answers: 'não é array' }),
    nivelamentoVazio()
  );
  const recuperada = validarNivelamento({
    answers: [1, 99, 1],
    selected: -1,
    helped: 'erro',
  });
  assert.deepEqual(recuperada, {
    answers: [1],
    index: 1,
    completed: false,
    helped: [],
    selected: null,
  });
  assert.equal(
    validarNivelamento({ ...tentativa(), completed: false }).index,
    5
  );
});

test('recomendação usa a trilha e o desafio reais, priorizando menos evidências', () => {
  const r = recomendacaoNivelamento(tentativa([1, 0, 1, 2, 1, 3]));
  assert.ok(trilhas.some((t) => t.id === r.trilhaId));
  assert.ok(desafios.some((d) => d.id === r.desafioId));
  assert.equal(r.lacunas[0].habilidadeId, 'dicionarios');
  assert.equal(
    r.mapa.some((h) => h.estado === 'consistente'),
    false
  );
});

test('evidências de treino iniciais correspondem às atividades do catálogo', () => {
  for (const [id, ev] of Object.entries(progressoInicial.evidencias)) {
    const realizados = desafios.filter(
      (d) =>
        progressoInicial.desafiosResolvidos.includes(d.id) &&
        d.habilidades?.includes(id)
    );
    assert.equal(ev.desafios, realizados.length);
    assert.equal(
      ev.guiados,
      progressoInicial.conceitosPraticados.includes(id) ? 1 : 0
    );
  }
});

test('armazenamento indisponível ou JSON corrompido preservam o uso em memória', () => {
  globalThis.localStorage = {
    getItem: () => '{quebrado',
    setItem: () => {
      throw new Error('bloqueado');
    },
  };
  assert.deepEqual(lerLocal('teste', {}), {});
  assert.equal(salvarLocal('teste', {}), false);
  delete globalThis.localStorage;
});
