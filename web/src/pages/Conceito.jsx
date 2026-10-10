import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, XCircle, Terminal, Route, Sparkles } from 'lucide-react';
import { conceitos, trilhas, getDesafio } from '../data/mockData';
import { habilidadePorId } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';

function Codigo({ children }) {
  return (
    <pre className="code-font text-sm text-[#e4e6ef] bg-[#0d1117] border border-[#252a3a] rounded-lg p-4 overflow-x-auto whitespace-pre">
      {children}
    </pre>
  );
}

// Conceito curto: ideia, exemplo e um exercício guiado. Não é uma aula.
export default function Conceito() {
  const { habilidadeId } = useParams();
  const [params] = useSearchParams();
  const { estadoDe, praticarConceito } = useProgresso();

  const habilidade = habilidadePorId(habilidadeId);
  const conceito = conceitos[habilidadeId];
  const desafioId = params.get('desafio');
  const origem = params.get('de') === 'detalhe' ? 'detalhe' : 'resolver';
  const trilhaId = params.get('trilha');
  const desafio = desafioId ? getDesafio(desafioId) : null;
  const trilha = trilhas.find((t) => t.id === trilhaId);

  const [passo, setPasso] = useState('entender'); // entender | praticar | concluido
  const [exibido, setExibido] = useState(null);
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState(null);

  if (!habilidade || !conceito) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-4">
        <p className="text-[#e4e6ef]">Não encontramos este conceito.</p>
        <Link to="/trilhas" className="text-sm text-[#7c5cfc] hover:text-[#e4e6ef]">Ver trilhas</Link>
      </div>
    );
  }

  const estado = estadoDe(habilidadeId);
  const exercicio = conceito.exercicios[indice];
  const acertou = escolha !== null && escolha === exercicio.correta;
  const errou = escolha !== null && !acertou;
  const ultimo = indice === conceito.exercicios.length - 1;

  const voltarAoDesafio = desafio ? `${origem === 'detalhe' ? '/desafios' : '/resolver'}/${desafio.id}?aprendeu=${habilidadeId}` : null;
  const linkVoltar = voltarAoDesafio || (trilha ? `/trilhas/${trilha.id}` : '/trilhas');
  const rotuloVoltar = desafio ? 'Voltar ao desafio' : trilha ? 'Voltar à trilha' : 'Ver trilhas';
  const trilhasAfetadas = trilhas.filter((t) => t.etapas.some((e) => e.habilidade === habilidadeId && ['conceito', 'exemplo', 'exercicio_guiado'].includes(e.tipo)));

  const avancar = () => {
    if (!ultimo) {
      setIndice(indice + 1);
      setEscolha(null);
      return;
    }
    praticarConceito(habilidadeId);
    setPasso('concluido');
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
      <Link to={linkVoltar} className="inline-flex items-center text-sm text-[#8b90a5] hover:text-[#e4e6ef] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {rotuloVoltar}
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 bg-[#7c5cfc]/10 text-[#7c5cfc] font-medium px-2.5 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            Conceito curto · cerca de 3 min
          </span>
          <EstadoHabilidade estado={estado} />
        </div>
        <h1 className="text-3xl font-bold text-[#e4e6ef] uppercase tracking-tight">{habilidade.nome}</h1>
        {desafio && (
          <p className="text-sm text-[#8b90a5]">
            Este conhecimento aparece em <strong className="text-[#e4e6ef]">{desafio.titulo}</strong>. Depois você volta direto para ele.
          </p>
        )}
        <div className={`items-center gap-2 text-xs text-[#8b90a5] ${passo === 'concluido' ? 'hidden' : 'flex'}`}>
          <span className={`px-2 py-0.5 rounded ${passo === 'entender' ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]' : 'text-[#555a6e]'}`}>1. Entender</span>
          <span className="text-[#555a6e]">→</span>
          <span className={`px-2 py-0.5 rounded ${passo === 'praticar' ? 'bg-[#7c5cfc]/10 text-[#7c5cfc]' : 'text-[#555a6e]'}`}>2. Praticar</span>
        </div>
      </header>

      {passo === 'entender' && (
        <div className="space-y-5">
          <blockquote className="bg-[#12141f] border border-[#252a3a] border-l-2 border-l-[#7c5cfc] rounded-xl p-6 text-lg text-[#e4e6ef] leading-relaxed">
            “{conceito.definicao}”
          </blockquote>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-[#8b90a5]">Exemplo · {conceito.linguagem}</p>
            <Codigo>{conceito.codigo}</Codigo>
          </div>

          {conceito.experimente && (
            <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-5 space-y-3">
              <p className="text-sm font-medium text-[#e4e6ef]">Experimente: toque em uma expressão para ver o resultado</p>
              <div className="flex flex-wrap gap-2">
                {conceito.experimente.map((item) => (
                  <button
                    key={item.expr}
                    onClick={() => setExibido(item)}
                    className={`code-font text-xs px-3 py-1.5 rounded-md border transition-colors ${exibido?.expr === item.expr ? 'bg-[#7c5cfc]/10 border-[#7c5cfc] text-[#e4e6ef]' : 'bg-[#181b2a] border-[#252a3a] text-[#8b90a5] hover:text-[#e4e6ef]'}`}
                  >
                    {item.expr}
                  </button>
                ))}
              </div>
              <div className="code-font text-sm bg-[#0d1117] border border-[#252a3a] rounded-lg px-4 py-3 min-h-[44px] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#555a6e] flex-shrink-0" />
                {exibido
                  ? <span className="text-emerald-400">{exibido.resultado}</span>
                  : <span className="text-[#555a6e]">O resultado aparece aqui</span>}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setPasso('praticar')}
              className="flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Praticar
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to={linkVoltar}
              className="flex items-center justify-center gap-2 bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {rotuloVoltar}
            </Link>
          </div>
        </div>
      )}

      {passo === 'praticar' && (
        <div className="space-y-5">
          <div className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8b90a5]">
              <span className="font-medium uppercase tracking-wider">Exercício guiado</span>
              <span>{indice + 1} de {conceito.exercicios.length}</span>
            </div>
            <p className="text-[#e4e6ef] font-medium">{exercicio.enunciado}</p>
            {exercicio.codigo && <Codigo>{exercicio.codigo}</Codigo>}

            <div className="space-y-2">
              {exercicio.opcoes.map((opcao, i) => {
                const selecionada = escolha === i;
                const estilo = selecionada
                  ? (i === exercicio.correta ? 'border-emerald-400 bg-emerald-400/10' : 'border-red-400 bg-red-400/10')
                  : 'border-[#252a3a] bg-[#181b2a] hover:border-[#7c5cfc]/40';
                return (
                  <button
                    key={opcao}
                    disabled={acertou}
                    onClick={() => setEscolha(i)}
                    className={`w-full text-left code-font text-sm text-[#e4e6ef] px-4 py-3 rounded-lg border transition-colors ${estilo}`}
                  >
                    {opcao}
                  </button>
                );
              })}
            </div>

            {errou && (
              <div className="flex items-start gap-2 text-sm text-red-400">
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Ainda não. Releia o exemplo e tente outra opção.</p>
              </div>
            )}
            {acertou && (
              <div className="flex items-start gap-2 text-sm text-emerald-400">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Isso mesmo! {exercicio.explicacao}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {acertou && (
              <button
                onClick={avancar}
                className="flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                {ultimo ? 'Concluir' : 'Próximo exercício'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => { setPasso('entender'); setEscolha(null); setIndice(0); }}
              className="flex items-center justify-center bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Rever o exemplo
            </button>
          </div>
        </div>
      )}

      {passo === 'concluido' && (
        <div className="space-y-5">
          <div className="bg-[#12141f] border border-emerald-400/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#e4e6ef]">Agora você consegue enxergar o próximo passo.</h2>
                <p className="text-sm text-[#8b90a5]">{habilidade.nome} entrou no seu progresso.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 bg-[#181b2a] border border-[#252a3a] rounded-lg p-3">
              <span className="text-sm text-[#e4e6ef]">{habilidade.nome}</span>
              <EstadoHabilidade estado={estado} />
              <span className="text-xs text-[#8b90a5]">exercício guiado registrado</span>
            </div>

            {trilhasAfetadas.length > 0 && (
              <div className="space-y-2">
                {trilhasAfetadas.map((t) => (
                  <Link
                    key={t.id}
                    to={`/trilhas/${t.id}`}
                    className="flex items-center gap-2 text-sm text-[#8b90a5] hover:text-[#e4e6ef] transition-colors"
                  >
                    <Route className="w-4 h-4 text-[#7c5cfc]" />
                    Etapa concluída na trilha <strong className="text-[#e4e6ef]">{t.nome}</strong>
                  </Link>
                ))}
              </div>
            )}

            {desafio && (
              <p className="text-sm text-[#8b90a5]">
                Em <strong className="text-[#e4e6ef]">{desafio.titulo}</strong>, volte ao enunciado e pense de novo em como guardar o que você precisa.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={linkVoltar}
              className="flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {rotuloVoltar}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {desafio && trilhasAfetadas[0] && (
              <Link
                to={`/trilhas/${trilhasAfetadas[0].id}`}
                className="flex items-center justify-center bg-[#181b2a] hover:bg-[#252a3a] text-[#e4e6ef] border border-[#252a3a] font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Ver minha trilha
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
