// Regras determinísticas de aprendizagem (sem IA, sem backend).
import { habilidades } from './mockData';

export const habilidadePorId = (id) => habilidades.find((h) => h.id === id);

// Estado qualitativo de uma habilidade, baseado em evidências.
export function calcularEstado({ desafios = 0, checkpoints = 0, guiados = 0 } = {}) {
  if (desafios >= 6 && checkpoints >= 2) return 'consistente';
  if (desafios >= 3) return 'praticando';
  if (desafios + checkpoints + guiados >= 1) return 'comecando';
  return 'nao_praticado';
}

const plural = (n, singular, pluralForm) => `${n} ${n === 1 ? singular : pluralForm}`;

// Linhas curtas descrevendo as evidências ("4 desafios realizados", ...).
export function descreverEvidencia({ desafios = 0, checkpoints = 0, guiados = 0 } = {}) {
  const linhas = [];
  if (desafios) linhas.push(plural(desafios, 'desafio realizado', 'desafios realizados'));
  if (checkpoints) linhas.push(plural(checkpoints, 'checkpoint concluído', 'checkpoints concluídos'));
  if (guiados) linhas.push(plural(guiados, 'exercício guiado', 'exercícios guiados'));
  return linhas;
}

// Habilidades que o desafio usa: pré-requisitos primeiro, depois as praticadas, sem repetir.
export function habilidadesDoDesafio(desafio) {
  const ids = [...(desafio.prerequisitos || []), ...(desafio.habilidades || [])];
  return [...new Set(ids)];
}

// Destino de uma etapa de trilha.
export function destinoEtapa(trilha, etapa) {
  if (etapa.desafioId) return `/desafios/${etapa.desafioId}?trilha=${trilha.id}`;
  return `/conceitos/${etapa.habilidade}?trilha=${trilha.id}`;
}
