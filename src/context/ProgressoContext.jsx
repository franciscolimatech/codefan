import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  progressoInicial,
  trilhas,
  desafios,
  habilidades,
  currentUser,
  getDesafio,
} from '../data/mockData';
import { calcularEstado } from '../data/aprendizagem';

import {
  nivelamentoVazio,
  validarNivelamento,
  evidenciaNivelamento,
  questoes,
  tipoResposta,
  recomendacaoNivelamento,
} from '../data/nivelamento';
import { lerLocal, salvarLocal } from '../data/persistencia';

// Uma fonte local compartilhada por todas as telas da demonstração.
const ProgressoContext = createContext(null);

const SEM_EVIDENCIA = { desafios: 0, checkpoints: 0, guiados: 0 };
const TIPOS_DE_ESTUDO = ['conceito', 'exemplo', 'exercicio_guiado'];

// Marca como concluídas as etapas que satisfazem o predicado, em todas as trilhas.
function concluirEtapas(etapasAtuais, predicado) {
  const proximas = { ...etapasAtuais };
  trilhas.forEach((t) => {
    const novas = t.etapas.filter(predicado).map((e) => e.id);
    proximas[t.id] = [...new Set([...(proximas[t.id] || []), ...novas])];
  });
  return proximas;
}

function carregarProgresso() {
  const raw = lerLocal('codefan-progresso-v1', null);
  if (
    !raw ||
    !Array.isArray(raw.desafiosResolvidos) ||
    !Array.isArray(raw.conceitosPraticados) ||
    !raw.etapasConcluidas ||
    typeof raw.etapasConcluidas !== 'object'
  )
    return structuredClone(progressoInicial);
  const resolvidos = [
    ...new Set(
      raw.desafiosResolvidos.filter((id) => desafios.some((d) => d.id === id))
    ),
  ];
  const praticados = [
    ...new Set(
      raw.conceitosPraticados.filter((id) =>
        habilidades.some((h) => h.id === id)
      )
    ),
  ];
  const etapas = Object.fromEntries(
    trilhas.map((t) => [
      t.id,
      t.etapas
        .filter(
          (e) =>
            Array.isArray(raw.etapasConcluidas[t.id]) &&
            raw.etapasConcluidas[t.id].includes(e.id)
        )
        .map((e) => e.id),
    ])
  );
  const evidencias = Object.fromEntries(
    habilidades.map((h) => {
      const feitos = desafios.filter(
        (d) => resolvidos.includes(d.id) && d.habilidades?.includes(h.id)
      );
      const checkpoint = (d) =>
        trilhas.some((t) =>
          t.etapas.some((e) => e.desafioId === d.id && e.tipo === 'checkpoint')
        );
      return [
        h.id,
        {
          desafios: feitos.filter((d) => !checkpoint(d)).length,
          checkpoints: feitos.filter(checkpoint).length,
          guiados: praticados.includes(h.id) ? 1 : 0,
        },
      ];
    })
  );
  return {
    ultimaTrilha: trilhas.some((t) => t.id === raw.ultimaTrilha)
      ? raw.ultimaTrilha
      : trilhas[0].id,
    etapasConcluidas: etapas,
    desafiosResolvidos: resolvidos,
    conceitosPraticados: praticados,
    evidencias,
  };
}

function carregarMapa(chave, validar) {
  const mapa = lerLocal(chave, {});
  if (!mapa || typeof mapa !== 'object' || Array.isArray(mapa)) return {};
  return Object.fromEntries(
    Object.entries(mapa).filter(
      ([id, valor]) => desafios.some((d) => d.id === id) && validar(valor, id)
    )
  );
}

export function ProgressoProvider({ children }) {
  const [progresso, setProgresso] = useState(carregarProgresso);
  const [dicasReveladas, setDicasReveladas] = useState(() =>
    carregarMapa(
      'codefan-dicas-v1',
      (n, id) =>
        Number.isInteger(n) &&
        n >= 0 &&
        n <= (getDesafio(id).dicas || []).length
    )
  );
  const [rascunhos, setRascunhos] = useState(() =>
    carregarMapa('codefan-rascunhos-v1', (s) => typeof s === 'string')
  );
  const [nivelamento, setNivelamento] = useState(() =>
    validarNivelamento(lerLocal('codefan-assessment', null))
  );
  const [armazenamentoDisponivel, setArmazenamentoDisponivel] = useState(true);

  useEffect(() => {
    const respostas = nivelamento.answers.map((answer, i) => ({
      question: i,
      skill: questoes[i].skill,
      answer,
      usedHint: nivelamento.helped.includes(i),
      kind: tipoResposta(questoes[i], answer, nivelamento.helped.includes(i)),
    }));
    const resultados = [
      salvarLocal('codefan-progresso-v1', progresso),
      salvarLocal('codefan-assessment', {
        ...nivelamento,
        responses: respostas,
      }),
      salvarLocal('codefan-dicas-v1', dicasReveladas),
      salvarLocal('codefan-rascunhos-v1', rascunhos),
    ];
    // Sincroniza o aviso com a disponibilidade real do armazenamento externo.
    // oxlint-disable-next-line react/set-state-in-effect
    setArmazenamentoDisponivel(resultados.every(Boolean));
  }, [progresso, nivelamento, dicasReveladas, rascunhos]);

  const recomendacao = useMemo(
    () => recomendacaoNivelamento(nivelamento),
    [nivelamento]
  );
  const usuario = useMemo(
    () => ({
      ...currentUser,
      desafiosResolvidos: progresso.desafiosResolvidos.length,
      xp:
        currentUser.xp +
        desafios
          .filter(
            (d) =>
              progresso.desafiosResolvidos.includes(d.id) &&
              !progressoInicial.desafiosResolvidos.includes(d.id)
          )
          .reduce((total, d) => total + (d.xp || 0), 0),
    }),
    [progresso]
  );
  const atividades = useMemo(
    () => [
      ...(nivelamento.completed
        ? [
            {
              id: 'nivelamento',
              text: 'Nivelamento de Backend com Python concluído',
              destino: '/nivelamento/resultado',
              tipo: 'nivelamento',
            },
          ]
        : []),
      ...progresso.conceitosPraticados
        .slice()
        .reverse()
        .map((id) => ({
          id: `conceito-${id}`,
          text: `Conceito de ${habilidades.find((h) => h.id === id)?.nome} concluído`,
          destino: `/conceitos/${id}`,
          tipo: 'conceito',
        })),
      ...progresso.desafiosResolvidos
        .slice()
        .reverse()
        .map((id) => ({
          id,
          text: `Prática demonstrativa: ${getDesafio(id).titulo}`,
          destino: `/desafios/${id}`,
          tipo: 'desafio',
        })),
    ],
    [progresso, nivelamento.completed]
  );

  const iniciarNivelamento = useCallback(
    () =>
      setNivelamento((atual) => (atual.completed ? nivelamentoVazio() : atual)),
    []
  );
  const selecionarResposta = useCallback(
    (selected) => setNivelamento((atual) => ({ ...atual, selected })),
    []
  );
  const pedirDicaNivelamento = useCallback(
    () =>
      setNivelamento((atual) => ({
        ...atual,
        helped: [...new Set([...atual.helped, atual.index])],
      })),
    []
  );
  const registrarResposta = useCallback(
    () =>
      setNivelamento((atual) => {
        if (atual.selected === null || atual.completed) return atual;
        const answers = [...atual.answers, atual.selected];
        const completed = answers.length === questoes.length;
        return {
          ...atual,
          answers,
          completed,
          index: completed ? atual.index : atual.index + 1,
          selected: null,
        };
      }),
    []
  );

  const evidenciaDe = useCallback(
    (habilidadeId) => {
      const ev = progresso.evidencias[habilidadeId] || SEM_EVIDENCIA;
      const diagnostico = evidenciaNivelamento(habilidadeId, nivelamento);
      return {
        ...ev,
        independentes: diagnostico.contagens.independente,
        assistidas: diagnostico.contagens.assistida,
      };
    },
    [progresso, nivelamento]
  );
  const estadoDe = useCallback(
    (habilidadeId) => calcularEstado(evidenciaDe(habilidadeId)),
    [evidenciaDe]
  );

  const etapasConcluidas = useCallback(
    (trilhaId) => progresso.etapasConcluidas[trilhaId] || [],
    [progresso]
  );

  // Resumo de progresso de uma trilha: concluídas, total e etapa atual (primeira não concluída).
  const resumoTrilha = useCallback(
    (trilha) => {
      const feitas = etapasConcluidas(trilha.id);
      const indiceAtual = trilha.etapas.findIndex(
        (e) => !feitas.includes(e.id)
      );
      return {
        concluidas: feitas.length,
        total: trilha.etapas.length,
        iniciada: feitas.length > 0,
        finalizada: indiceAtual === -1,
        indiceAtual,
        etapaAtual: indiceAtual === -1 ? null : trilha.etapas[indiceAtual],
      };
    },
    [etapasConcluidas]
  );

  // Concluir um conceito curto (e seu exercício guiado): gera evidência uma única vez.
  const praticarConceito = useCallback((habilidadeId) => {
    setProgresso((atual) => {
      if (atual.conceitosPraticados.includes(habilidadeId)) {
        return {
          ...atual,
          etapasConcluidas: concluirEtapas(
            atual.etapasConcluidas,
            (e) =>
              e.habilidade === habilidadeId && TIPOS_DE_ESTUDO.includes(e.tipo)
          ),
        };
      }
      const ev = atual.evidencias[habilidadeId] || SEM_EVIDENCIA;
      return {
        ...atual,
        conceitosPraticados: [...atual.conceitosPraticados, habilidadeId],
        evidencias: {
          ...atual.evidencias,
          [habilidadeId]: { ...ev, guiados: ev.guiados + 1 },
        },
        etapasConcluidas: concluirEtapas(
          atual.etapasConcluidas,
          (e) =>
            e.habilidade === habilidadeId && TIPOS_DE_ESTUDO.includes(e.tipo)
        ),
      };
    });
  }, []);

  // Prática demonstrativa registrada: soma evidência simulada uma única vez.
  const registrarDesafio = useCallback((desafioId) => {
    setProgresso((atual) => {
      if (atual.desafiosResolvidos.includes(desafioId)) return atual;
      const desafio = getDesafio(desafioId);
      const ehCheckpoint = trilhas.some((t) =>
        t.etapas.some(
          (e) => e.desafioId === desafioId && e.tipo === 'checkpoint'
        )
      );
      const evidencias = { ...atual.evidencias };
      (desafio.habilidades || []).forEach((h) => {
        const ev = evidencias[h] || SEM_EVIDENCIA;
        evidencias[h] = ehCheckpoint
          ? { ...ev, checkpoints: ev.checkpoints + 1 }
          : { ...ev, desafios: ev.desafios + 1 };
      });
      return {
        ...atual,
        desafiosResolvidos: [...atual.desafiosResolvidos, desafioId],
        evidencias,
        etapasConcluidas: concluirEtapas(
          atual.etapasConcluidas,
          (e) => e.desafioId === desafioId
        ),
      };
    });
  }, []);

  const abrirTrilha = useCallback((trilhaId) => {
    setProgresso((atual) =>
      atual.ultimaTrilha === trilhaId
        ? atual
        : { ...atual, ultimaTrilha: trilhaId }
    );
  }, []);

  const revelarDica = useCallback((desafioId, total) => {
    setDicasReveladas((atual) => ({
      ...atual,
      [desafioId]: Math.min((atual[desafioId] || 0) + 1, total),
    }));
  }, []);

  const salvarRascunho = useCallback((desafioId, codigo) => {
    setRascunhos((atual) => ({ ...atual, [desafioId]: codigo }));
  }, []);

  const valor = useMemo(
    () => ({
      progresso,
      usuario,
      atividades,
      nivelamento,
      recomendacao,
      armazenamentoDisponivel,
      iniciarNivelamento,
      selecionarResposta,
      pedirDicaNivelamento,
      registrarResposta,
      evidenciaDe,
      estadoDe,
      etapasConcluidas,
      resumoTrilha,
      praticarConceito,
      registrarDesafio,
      abrirTrilha,
      dicasReveladas,
      revelarDica,
      rascunhos,
      salvarRascunho,
    }),
    [
      progresso,
      usuario,
      atividades,
      nivelamento,
      recomendacao,
      armazenamentoDisponivel,
      iniciarNivelamento,
      selecionarResposta,
      pedirDicaNivelamento,
      registrarResposta,
      evidenciaDe,
      estadoDe,
      etapasConcluidas,
      resumoTrilha,
      praticarConceito,
      registrarDesafio,
      abrirTrilha,
      dicasReveladas,
      revelarDica,
      rascunhos,
      salvarRascunho,
    ]
  );

  return (
    <ProgressoContext.Provider value={valor}>
      {children}
    </ProgressoContext.Provider>
  );
}

export function useProgresso() {
  const ctx = useContext(ProgressoContext);
  if (!ctx)
    throw new Error('useProgresso deve ser usado dentro de ProgressoProvider');
  return ctx;
}
