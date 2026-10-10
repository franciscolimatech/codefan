import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, Clock, BookOpen, Eye, Puzzle, Code2, Flag, Trophy, Target,
} from 'lucide-react';
import { trilhas, tiposEtapa } from '../data/mockData';
import { habilidadePorId, destinoEtapa } from '../data/aprendizagem';
import { useProgresso } from '../context/ProgressoContext';
import EstadoHabilidade from '../components/aprendizagem/EstadoHabilidade';

const ICONES = {
  conceito: BookOpen,
  exemplo: Eye,
  exercicio_guiado: Puzzle,
  desafio: Code2,
  checkpoint: Flag,
  desafio_final: Trophy,
};

export default function TrilhaDetalhe() {
  const { id } = useParams();
  const { resumoTrilha, etapasConcluidas, estadoDe, abrirTrilha } = useProgresso();
  const trilha = trilhas.find((t) => t.id === id);

  useEffect(() => {
    if (trilha) abrirTrilha(trilha.id);
  }, [trilha, abrirTrilha]);

  if (!trilha) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-4">
        <p className="text-[#e4e6ef]">Trilha não encontrada.</p>
        <Link to="/trilhas" className="text-sm text-[#7c5cfc] hover:text-[#e4e6ef]">Ver todas as trilhas</Link>
      </div>
    );
  }

  const resumo = resumoTrilha(trilha);
  const feitas = etapasConcluidas(trilha.id);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      <Link to="/trilhas" className="inline-flex items-center text-sm text-[#8b90a5] hover:text-[#e4e6ef] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para trilhas
      </Link>

      {/* Cabeçalho */}
      <section className="bg-[#12141f] border border-[#252a3a] rounded-xl p-6 space-y-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-[#e4e6ef]">{trilha.nome}</h1>
            <span className="text-xs text-[#8b90a5] bg-[#181b2a] border border-[#252a3a] px-2 py-0.5 rounded-full">{trilha.nivel}</span>
            <span className="flex items-center gap-1 text-xs text-[#555a6e]">
              <Clock className="w-3 h-3" />
              {trilha.duracao}
            </span>
          </div>
          <p className="text-sm text-[#8b90a5]">{trilha.descricao}</p>
          <p className="flex items-start gap-2 text-sm text-[#e4e6ef]">
            <Target className="w-4 h-4 text-[#7c5cfc] mt-0.5 flex-shrink-0" />
            {trilha.objetivo}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#252a3a]">
          <div className="space-y-2 flex-1 max-w-sm">
            <div className="flex justify-between text-sm">
              <span className="text-[#e4e6ef] font-medium">{resumo.concluidas} de {resumo.total} etapas concluídas</span>
            </div>
            <div className="bg-[#181b2a] rounded-full h-2 overflow-hidden">
              <div className="bg-[#7c5cfc] h-full rounded-full transition-all duration-500" style={{ width: `${(resumo.concluidas / resumo.total) * 100}%` }} />
            </div>
          </div>
          {resumo.etapaAtual ? (
            <Link
              to={destinoEtapa(trilha, resumo.etapaAtual)}
              className="flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4be6] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-[#7c5cfc]/20"
            >
              {resumo.iniciada ? 'Continuar de onde parou' : 'Começar trilha'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-sm font-medium text-emerald-400">Trilha concluída</span>
          )}
        </div>
      </section>

      {/* Habilidades abordadas */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[#e4e6ef]">Habilidades abordadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trilha.habilidades.map((hid) => (
            <div key={hid} className="flex items-center justify-between gap-3 bg-[#12141f] border border-[#252a3a] rounded-lg px-4 py-3">
              <span className="text-sm text-[#e4e6ef]">{habilidadePorId(hid)?.nome}</span>
              <EstadoHabilidade estado={estadoDe(hid)} />
            </div>
          ))}
        </div>
      </section>

      {/* Etapas */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-[#e4e6ef]">Etapas</h2>
          <p className="text-xs text-[#8b90a5] mt-0.5">A ordem é uma sugestão. Você pode abrir qualquer etapa.</p>
        </div>

        <ol className="relative">
          {trilha.etapas.map((etapa, i) => {
            const concluida = feitas.includes(etapa.id);
            const atual = i === resumo.indiceAtual;
            const Icone = ICONES[etapa.tipo] || BookOpen;
            const ultima = i === trilha.etapas.length - 1;
            return (
              <li key={etapa.id} className="relative flex gap-4 pb-4">
                {!ultima && <span className="absolute left-[15px] top-8 bottom-0 w-px bg-[#252a3a]" aria-hidden="true" />}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border text-xs font-semibold
                    ${concluida ? 'bg-emerald-400/10 border-emerald-400/40 text-emerald-400' : atual ? 'bg-[#7c5cfc] border-[#7c5cfc] text-white' : 'bg-[#181b2a] border-[#252a3a] text-[#8b90a5]'}`}
                >
                  {concluida ? <Check className="w-4 h-4" /> : i + 1}
                </div>

                <Link
                  to={destinoEtapa(trilha, etapa)}
                  className={`flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 transition-colors
                    ${atual ? 'bg-[#7c5cfc]/5 border-[#7c5cfc]/40' : 'bg-[#12141f] border-[#252a3a] hover:border-[#7c5cfc]/30'}`}
                >
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-sm font-medium ${concluida ? 'text-[#8b90a5]' : 'text-[#e4e6ef]'}`}>{etapa.titulo}</h3>
                      {atual && <span className="text-[10px] font-bold tracking-wider text-[#7c5cfc] bg-[#7c5cfc]/10 px-2 py-0.5 rounded">ETAPA ATUAL</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8b90a5]">
                      <span className="flex items-center gap-1">
                        <Icone className="w-3.5 h-3.5" />
                        {tiposEtapa[etapa.tipo]}
                      </span>
                      <span>{habilidadePorId(etapa.habilidade)?.nome}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {etapa.duracao}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${atual ? 'text-[#7c5cfc]' : 'text-[#8b90a5]'}`}>
                    {concluida ? 'Revisar' : atual ? 'Continuar' : 'Abrir'}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
