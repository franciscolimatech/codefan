import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { progressoInicial, trilhas, getDesafio } from '../data/mockData';
import { calcularEstado } from '../data/aprendizagem';

// Estado local do aluno para a demonstração. Reiniciar a página volta ao estado inicial.
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

export function ProgressoProvider({ children }) {
  const [progresso, setProgresso] = useState(() => JSON.parse(JSON.stringify(progressoInicial)));
  const [dicasReveladas, setDicasReveladas] = useState({});
  const [rascunhos, setRascunhos] = useState({});

  const evidenciaDe = useCallback((habilidadeId) => progresso.evidencias[habilidadeId] || SEM_EVIDENCIA, [progresso]);
  const estadoDe = useCallback((habilidadeId) => calcularEstado(evidenciaDe(habilidadeId)), [evidenciaDe]);

  const etapasConcluidas = useCallback((trilhaId) => progresso.etapasConcluidas[trilhaId] || [], [progresso]);

  // Resumo de progresso de uma trilha: concluídas, total e etapa atual (primeira não concluída).
  const resumoTrilha = useCallback((trilha) => {
    const feitas = etapasConcluidas(trilha.id);
    const indiceAtual = trilha.etapas.findIndex((e) => !feitas.includes(e.id));
    return {
      concluidas: feitas.length,
      total: trilha.etapas.length,
      iniciada: feitas.length > 0,
      finalizada: indiceAtual === -1,
      indiceAtual,
      etapaAtual: indiceAtual === -1 ? null : trilha.etapas[indiceAtual],
    };
  }, [etapasConcluidas]);

  // Concluir um conceito curto (e seu exercício guiado): gera evidência uma única vez.
  const praticarConceito = useCallback((habilidadeId) => {
    setProgresso((atual) => {
      if (atual.conceitosPraticados.includes(habilidadeId)) return atual;
      const ev = atual.evidencias[habilidadeId] || SEM_EVIDENCIA;
      return {
        ...atual,
        conceitosPraticados: [...atual.conceitosPraticados, habilidadeId],
        evidencias: { ...atual.evidencias, [habilidadeId]: { ...ev, guiados: ev.guiados + 1 } },
        etapasConcluidas: concluirEtapas(
          atual.etapasConcluidas,
          (e) => e.habilidade === habilidadeId && TIPOS_DE_ESTUDO.includes(e.tipo),
        ),
      };
    });
  }, []);

  // Desafio aceito no treinamento: soma evidência nas habilidades praticadas.
  const registrarDesafio = useCallback((desafioId) => {
    setProgresso((atual) => {
      if (atual.desafiosResolvidos.includes(desafioId)) return atual;
      const desafio = getDesafio(desafioId);
      const ehCheckpoint = trilhas.some((t) => t.etapas.some((e) => e.desafioId === desafioId && e.tipo === 'checkpoint'));
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
        etapasConcluidas: concluirEtapas(atual.etapasConcluidas, (e) => e.desafioId === desafioId),
      };
    });
  }, []);

  const abrirTrilha = useCallback((trilhaId) => {
    setProgresso((atual) => (atual.ultimaTrilha === trilhaId ? atual : { ...atual, ultimaTrilha: trilhaId }));
  }, []);

  const revelarDica = useCallback((desafioId, total) => {
    setDicasReveladas((atual) => ({ ...atual, [desafioId]: Math.min((atual[desafioId] || 0) + 1, total) }));
  }, []);

  const salvarRascunho = useCallback((desafioId, codigo) => {
    setRascunhos((atual) => ({ ...atual, [desafioId]: codigo }));
  }, []);

  const valor = useMemo(() => ({
    progresso,
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
  }), [progresso, evidenciaDe, estadoDe, etapasConcluidas, resumoTrilha, praticarConceito, registrarDesafio, abrirTrilha, dicasReveladas, revelarDica, rascunhos, salvarRascunho]);

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>;
}

export function useProgresso() {
  const ctx = useContext(ProgressoContext);
  if (!ctx) throw new Error('useProgresso deve ser usado dentro de ProgressoProvider');
  return ctx;
}
