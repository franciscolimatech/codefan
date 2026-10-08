// O armazenamento é opcional: a demonstração continua em memória se indisponível.
export function lerLocal(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave) || 'null') ?? padrao;
  } catch {
    return padrao;
  }
}
export function salvarLocal(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}
